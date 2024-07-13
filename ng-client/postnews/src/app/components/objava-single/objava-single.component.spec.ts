import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjavaSingleComponent } from './objava-single.component';

describe('ObjavaSingleComponent', () => {
  let component: ObjavaSingleComponent;
  let fixture: ComponentFixture<ObjavaSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjavaSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjavaSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
