import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/client/api-client.service';
import { SECRET_KEY, StoreService } from 'src/app/services/store.service';
import { ToastStatus, UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  @Output() authenticated: EventEmitter<boolean> = new EventEmitter<boolean>();

  authLoading: boolean;

  constructor(
    private apiClient: ApiClientService,
    private utilsService: UtilsService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authLoading = false;
  }

  authenticate(key: string) {
    if (key) {
      this.authLoading = true;
      this.apiClient.getKeys(key).subscribe(_ => {
        this.authLoading = false;
        this.storeService.setSimpleItem(SECRET_KEY, key);
        this.authenticated.next(true);
        this.utilsService.presentToast('admin.authenticationSuccess', ToastStatus.Show);
      }, _ => {
        this.authLoading = false;
        this.utilsService.presentToast('admin.authenticationFail', ToastStatus.Error);
      });
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
