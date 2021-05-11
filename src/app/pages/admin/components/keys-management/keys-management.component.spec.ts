import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysManagementComponent } from './keys-management.component';

describe('KeysManagementComponent', () => {
  let component: KeysManagementComponent;
  let fixture: ComponentFixture<KeysManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeysManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeysManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
