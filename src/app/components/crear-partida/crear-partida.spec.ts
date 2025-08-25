import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CrearPartidaComponent } from './crear-partida';
import { Router } from '@angular/router';
import { initialState } from '../../state/reducers/data.reducer';

describe('CrearPartidaComponent', () => {
  let component: CrearPartidaComponent;
  let fixture: ComponentFixture<CrearPartidaComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPartidaComponent],
      providers: [
        { provide: Router, useValue: { navigate: () => Promise.resolve(true) } },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CrearPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with roomName control', () => {
    expect(component.form.contains('roomName')).toBe(true);
  });

  it('should validate roomName with required, minLength, maxLength, forbiddenName, maxNumbers, and soloNumeros validators', () => {
    const roomNameControl = component.form.get('roomName');
    roomNameControl?.setValue('');
    expect(roomNameControl?.valid).toBe(false);

    roomNameControl?.setValue('ab');
    expect(roomNameControl?.valid).toBe(false);

    roomNameControl?.setValue('a'.repeat(21));
    expect(roomNameControl?.valid).toBe(false);

    roomNameControl?.setValue('validRoom123');
    expect(roomNameControl?.valid).toBe(true);

    roomNameControl?.setValue('1234');
    expect(roomNameControl?.valid).toBe(false);

    roomNameControl?.setValue('validRoom1234');
    expect(roomNameControl?.valid).toBe(false);
  });

  it('should navigate to the room page', () => {
    component.createRoom();
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.createRoom();
    const id = component.room.id;
    const expectedUrl = ['/room/' + id];
    // Assert that navigate was called with the expected path
    expect(navigateSpy).toHaveBeenCalledWith(expectedUrl);
  });
});
