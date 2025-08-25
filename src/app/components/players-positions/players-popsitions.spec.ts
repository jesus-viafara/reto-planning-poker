import { PlayersPositions } from './players-positions';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../state/reducers/data.reducer';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PlayersPositions', () => {
  let component: PlayersPositions;
  let fixture: ComponentFixture<PlayersPositions>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersPositions],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersPositions);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of child components', () => {
    component.userList = [
      { id: 'u009', name: 'Natalia Peña', rol: 'jugador', modo: 'jugador', vote: '?' },
      { id: 'u010', name: 'Andrés Molina', rol: 'jugador', modo: 'espectador', vote: '4' },
      { id: 'u011', name: 'Valeria Torres', rol: 'jugador', modo: 'jugador', vote: '6' },
    ];
    fixture.detectChanges();
    const childComponents = debugElement.queryAll(By.css('.player-slot'));
    expect(childComponents.length).toBe(3);
  });

  it('should render the correct number of child components', () => {
    component.userList = [
      { id: 'u009', name: 'Natalia Peña', rol: 'jugador', modo: 'jugador', vote: '?' },
      { id: 'u010', name: 'Andrés Molina', rol: 'jugador', modo: 'espectador', vote: '4' },
    ];
    fixture.detectChanges();
    const childComponents = debugElement.queryAll(By.css('.player-slot'));
    expect(childComponents.length).toBe(2);
  });

  it('should render the avatar placeholder is user is admin and in spectator', () => {
    component.userList = [
      { id: 'u009', name: 'Natalia Peña', rol: 'admin', modo: 'espectador', vote: '?' },
    ];
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.admin-avatar');
    expect(element).toBeTruthy();
  });

  it('should not render the avatar placeholder is user is admin and in player mode', () => {
    component.userList = [
      { id: 'u009', name: 'Natalia Peña', rol: 'admin', modo: 'jugador', vote: '?' },
    ];
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.admin-avatar');
    expect(element).toBeFalsy();
  });

  it('should not render the avatar placeholder is user is player', () => {
    component.userList = [
      { id: 'u009', name: 'Natalia Peña', rol: 'player', modo: 'espectador', vote: '?' },
    ];
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.admin-avatar');
    expect(element).toBeFalsy();
  });

  it('should  render the card component is user is player regardless the mode', () => {
    component.userList = [
      { id: 'u009', name: 'Natalia Peña', rol: 'player', modo: 'jugador', vote: '?' },
    ];
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('app-card'));
    expect(element).toBeTruthy();
  });

  it('should not render the card component is user is admin in the spectator mode', () => {
    component.userList = [
      { id: 'u009', name: 'Natalia Peña', rol: 'admin', modo: 'espectador', vote: '?' },
    ];
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('app-card'));
    expect(element).toBeFalsy();
  });

  it('should allow admin change if user is admin', () => {
    component.userLogged = {
      id: 'u009',
      name: 'Natalia Peña',
      rol: 'admin',
      modo: 'jugador',
      vote: '?',
    };
    component.userList = [
      { id: 'u011', name: 'Valeria Torres', rol: 'jugador', modo: 'jugador', vote: '6' },
    ];
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.player-slot')).nativeElement;
    expect(element.classList.contains('cursor')).toBeTruthy();
  });

  it('should not allow admin change if user is not admin', () => {
    component.userLogged = {
      id: 'u009',
      name: 'Natalia Peña',
      rol: 'player',
      modo: 'jugador',
      vote: '?',
    };
    component.userList = [
      { id: 'u011', name: 'Valeria Torres', rol: 'jugador', modo: 'jugador', vote: '6' },
    ];
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.player-slot')).nativeElement;
    expect(element.classList.contains('no-cursor')).toBeFalsy();
  });

  it('should render admin change popup whe non admin cart is clicked by admin user', () => {
    component.userLogged.rol = 'admin';
    component.newAdminMenu = true;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.new-admin');
    expect(element).toBeTruthy();
  });

  it('should not render admin change popup whe non admin cart is clicked b y non admin user', () => {
    component.userLogged.rol = 'player';
    component.newAdminMenu = true;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.new-admin');
    expect(element).toBeFalsy();
  });
});
