import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteModeChange } from './vote-mode-change';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../state/reducers/data.reducer';

describe('VoteModeChange', () => {
  let component: VoteModeChange;
  let fixture: ComponentFixture<VoteModeChange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteModeChange],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(VoteModeChange);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render after the change mode button is clicked', () => {
    component.onChange = true;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.vote-mode-selection');
    expect(element).toBeTruthy();
  });
  it('should not render if the change mode hanot been clicked button is clicked', () => {
    component.onChange = false;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.vote-mode-selection');
    expect(element).toBeFalsy();
  });
});
