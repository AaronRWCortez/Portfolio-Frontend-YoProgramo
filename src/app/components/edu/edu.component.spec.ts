import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduComponent } from './edu.component';

describe('EduComponent', () => {
  let component: EduComponent;
  let fixture: ComponentFixture<EduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
