import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeObjavaComponent } from './change-objava.component';

describe('ChangeObjavaComponent', () => {
  let component: ChangeObjavaComponent;
  let fixture: ComponentFixture<ChangeObjavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeObjavaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeObjavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
