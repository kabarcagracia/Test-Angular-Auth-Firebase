import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoAccountComponent } from './photo-account.component';

describe('PhotoAccountComponent', () => {
  let component: PhotoAccountComponent;
  let fixture: ComponentFixture<PhotoAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
