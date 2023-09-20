import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfilInfoComponent } from './dialog-profil-info.component';

describe('DialogProfilInfoComponent', () => {
  let component: DialogProfilInfoComponent;
  let fixture: ComponentFixture<DialogProfilInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogProfilInfoComponent]
    });
    fixture = TestBed.createComponent(DialogProfilInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
