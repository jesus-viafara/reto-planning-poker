import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from './card';
import { initialState } from '../../state/reducers/data.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(Card);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have a background if user has not vote yet', () => {
    component.user.vote = '?';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.card')).nativeElement;
    expect(element.classList.contains('no-background')).toBeTruthy();
  });

  it('should have a pink background after user has casted a vote', () => {
    component.user.vote = '10';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.card')).nativeElement;
    expect(element.classList.contains('card-placeholder')).toBeTruthy();
  });

  it('should have a gray background is user in spectator mode', () => {
    component.user.vote = '10';
    component.user.modo = 'espectador';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.card')).nativeElement;
    expect(element.classList.contains('espectador')).toBeTruthy();
  });

  it('should not have a background when votes has been revealed', () => {
    component.user.vote = '34';
    component.roomState = 'revealed';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.card')).nativeElement;
    expect(element.classList.contains('no-background')).toBeTruthy();
  });

  it('should render the user vote when votes has been revealed', () => {
    component.user.vote = '34';
    component.user.modo = 'jugador';
    component.roomState = 'revealed';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('#vote-value');
    expect(element).toBeTruthy();
  });
});
