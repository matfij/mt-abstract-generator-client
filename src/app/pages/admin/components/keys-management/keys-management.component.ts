import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ApiClientService } from 'src/app/client/api-client.service';
import { TesterClass } from 'src/app/client/constants';
import { KeyModel } from 'src/app/client/models';
import { DATE_FORMAT, DEFAULT_TESTER_CLASS, DEFAULT_USE_LIMIT, MAX_KEY_LENGTH, MIN_KEY_LENGTH } from 'src/app/core/config';
import { SECRET_KEY, StoreService } from 'src/app/services/store.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-keys-management',
  templateUrl: './keys-management.component.html',
  styleUrls: ['./keys-management.component.scss']
})
export class KeysManagementComponent implements OnInit, AfterViewInit {

  secretKey: string;
  keys: KeyModel[] = [];
  showKeyForm: boolean;
  tableLoading: boolean;
  formLoading: boolean;

  @ViewChild('keysTable', { static: false }) keysTable: AgGridAngular;
  columnDefs = [];
  rowData = [];

  keyForm = new FormGroup({
    key: new FormControl(
      '',
      { validators: [Validators.required, Validators.minLength(MIN_KEY_LENGTH), Validators.maxLength(MAX_KEY_LENGTH)] }
    ),
    testerName: new FormControl(
      '',
      { validators: [Validators.required] }
    ),
    testerClass: new FormControl(''),
    useLimit: new FormControl(''),
  });

  constructor(
    private apiClient: ApiClientService,
    private storeService: StoreService,
    private utilsService: UtilsService,
    private translateService: TranslateService,
    private datePipe: DatePipe
  ) {}

  get testerClass() { return this.utilsService.enumToConst(TesterClass, {namePrepend: 'admin.testerClassEnum.'}); }

  ngOnInit(): void {
    this.secretKey = this.storeService.getSimpleItem(SECRET_KEY);
    this.setupColumns();
  }

  ngAfterViewInit(): void {
    this.getKeys();
  }

  startTableLoading() {
    this.tableLoading = true;
    this.keysTable.api.showLoadingOverlay();
  }

  stopTableLoading() {
    this.tableLoading = false;
    this.keysTable.api.hideOverlay();
  }

  getKeys() {
    this.startTableLoading();

    this.apiClient.getKeys(this.secretKey).subscribe((keys: KeyModel[]) => {
      let rows = [];
      keys.forEach((key: KeyModel) => {
        rows.push({
          id: key.id,
          key: key.key,
          active: key.active,
          creationDate: this.datePipe.transform(key.creation_date, DATE_FORMAT),
          testerName: key.tester_name,
          testerClass: key.tester_class,
          useCount: key.use_count,
          useLimit: key.use_limit
        });
      });
      this.rowData = rows;
      this.stopTableLoading()
    }, error => {
      const message = JSON.stringify(error.error)
      this.utilsService.presentToast(message);
      this.stopTableLoading()
    });
  }

  setupColumns() {
    this.columnDefs = [
      { headerName: 'admin.id', field: 'id', filter: 'agNumberColumnFilter', checkboxSelection: true, width: 100 },
      { headerName: 'admin.key', field: 'key', editable: true, width: 200 },
      { headerName: 'admin.active', field: 'active', filter: true, editable: true, width: 100 },
      { headerName: 'admin.creationDate', field: 'creationDate', filter: 'agDateColumnFilter', width: 150 },
      { headerName: 'admin.testerName', field: 'testerName', editable: true, width: 200 },
      { headerName: 'admin.testerClass', field: 'testerClass', filter: true, editable: true, width: 100 },
      { headerName: 'admin.useCount', field: 'useCount', filter: 'agNumberColumnFilter', width: 100 },
      { headerName: 'admin.useLimit', field: 'useLimit', filter: 'agNumberColumnFilter', editable: true, width: 100 }
    ];

    this.columnDefs.forEach(column => {
      column.headerName = this.translateService.instant(column.headerName);
      column.sortable = true;
    });
  }

  validateFields() {
    if (!this.keyForm.controls.key.valid) {
      this.utilsService.presentToast('home.keyInvalid');
      return false;
    }
    if (!this.keyForm.controls.testerName.valid) {
      this.utilsService.presentToast('admin.testerNameInvalid');
      return false;
    }
    return true;
  }

  createKey() {
    if (!this.validateFields()) return;

    const params: KeyModel = {
      key: this.keyForm.controls.key.value,
      tester_name: this.keyForm.controls.testerName.value,
      tester_class: this.keyForm.controls.testerClass.value ? this.keyForm.controls.testerClass.value : DEFAULT_TESTER_CLASS,
      use_limit: this.keyForm.controls.useLimit.value ? this.keyForm.controls.useLimit.value : DEFAULT_USE_LIMIT
    };

    this.formLoading = true;
    this.apiClient.createKey(params, this.secretKey).subscribe(_ => {
      this.utilsService.presentToast('admin.keyCreated');
      this.refreshKeys();
      this.showKeyForm = false;
      this.formLoading = false;
    }, error => {
      const message = JSON.stringify(error.error)
      this.utilsService.presentToast(message);
      this.formLoading = false;
    })
  }

  refreshKeys() {
    this.rowData = [];
    this.getKeys();
  }

  updateKey() {
    const key = this.keysTable.api.getSelectedRows()[0];
    if (!key) return;

    const params: KeyModel = {
      id: key.id,
      key: key.key,
      active: key.active,
      tester_name: key.testerName,
      tester_class: key.testerClass,
      use_count: key.useCount,
      use_limit: key.useLimit
    };

    this.startTableLoading();
    this.apiClient.updateKey(params, this.secretKey).subscribe(_ => {
      this.utilsService.presentToast('admin.keyUpdated');
      this.stopTableLoading();
    }, error => {
      const message = JSON.stringify(error.error)
      this.utilsService.presentToast(message);
      this.stopTableLoading();
    });
  }

  deleteKey() {
    const key = this.keysTable.api.getSelectedRows()[0];
    if (!key) return;

    this.startTableLoading();
    this.apiClient.deleteKey(key.id, this.secretKey).subscribe(_ => {
      this.utilsService.presentToast('admin.keyDeleted');
      this.refreshKeys();
    }, error => {
      const message = JSON.stringify(error.error)
      this.utilsService.presentToast(message);
      this.stopTableLoading();
    });
  }
}
