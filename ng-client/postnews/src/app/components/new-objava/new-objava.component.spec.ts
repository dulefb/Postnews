import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewObjavaComponent } from './new-objava.component';

describe('NewObjavaComponent', () => {
  let component: NewObjavaComponent;
  let fixture: ComponentFixture<NewObjavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewObjavaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewObjavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
