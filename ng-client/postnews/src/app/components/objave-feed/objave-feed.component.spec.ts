import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjaveFeedComponent } from './objave-feed.component';

describe('ObjaveFeedComponent', () => {
  let component: ObjaveFeedComponent;
  let fixture: ComponentFixture<ObjaveFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjaveFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjaveFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
