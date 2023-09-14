import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainChatComponent } from './home-main-chat.component';

describe('HomeMainChatComponent', () => {
  let component: HomeMainChatComponent;
  let fixture: ComponentFixture<HomeMainChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMainChatComponent]
    });
    fixture = TestBed.createComponent(HomeMainChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
