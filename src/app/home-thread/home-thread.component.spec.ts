import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeThreadComponent } from './home-thread.component';

describe('HomeThreadComponent', () => {
  let component: HomeThreadComponent;
  let fixture: ComponentFixture<HomeThreadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeThreadComponent]
    });
    fixture = TestBed.createComponent(HomeThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
