import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPComponent } from './info-p.component';

describe('InfoPComponent', () => {
  let component: InfoPComponent;
  let fixture: ComponentFixture<InfoPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
