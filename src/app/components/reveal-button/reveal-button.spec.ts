import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealButton } from './reveal-button';

describe('RevealButton', () => {
  let component: RevealButton;
  let fixture: ComponentFixture<RevealButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevealButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevealButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
