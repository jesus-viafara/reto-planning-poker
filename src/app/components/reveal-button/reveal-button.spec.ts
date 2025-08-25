import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealButton } from './reveal-button';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../state/reducers/data.reducer';

describe('RevealButton', () => {
  let component: RevealButton;
  let fixture: ComponentFixture<RevealButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevealButton],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(RevealButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
