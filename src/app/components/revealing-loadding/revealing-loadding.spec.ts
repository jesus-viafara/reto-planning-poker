import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealingLoadding } from './revealing-loadding';

describe('RevealingLoadding', () => {
  let component: RevealingLoadding;
  let fixture: ComponentFixture<RevealingLoadding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevealingLoadding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevealingLoadding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
