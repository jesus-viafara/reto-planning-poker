import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardList } from './card-list';
import { initialState } from '../../state/reducers/data.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

describe('CardList', () => {
  let component: CardList;
  let fixture: ComponentFixture<CardList>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardList],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(CardList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render card set if the user is on player mode', () => {
    component.user.modo = 'jugador';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.votes');
    expect(element).toBeTruthy();
  });

  it('should not render card set if the user is on spectator mode', () => {
    component.user.modo = 'espectador';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.votes');
    expect(element).toBeFalsy();
  });

  it('should not render card set if the result has been revealed', () => {
    component.room.state = 'revealed';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.votes');
    expect(element).toBeFalsy();
  });

  it('should render the correct number cards', () => {
    component.user.modo = 'jugador';
    component.room.state = 'hidden';
    component.votes = ['1', '2', '3', '4', '5'];
    fixture.detectChanges();
    const childComponents = fixture.debugElement.queryAll(By.css('.vote-card'));
    expect(childComponents.length).toBe(6);
  });

  it('should  render change vote mode button if user is admin', () => {
    component.user.modo = 'jugador';
    component.room.state = 'hidden';
    component.user.rol = 'admin';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.vote-card_button');
    expect(element).toBeTruthy();
  });

  it('should not render change vote mode button if user is not admin', () => {
    component.user.modo = 'jugador';
    component.room.state = 'hidden';
    component.user.rol = 'player';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.vote-card_button');
    expect(element).toBeFalsy();
  });
});
