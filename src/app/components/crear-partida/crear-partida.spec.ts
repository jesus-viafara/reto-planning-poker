import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPartidaComponent } from './crear-partida';

describe('CrearPartidaComponent', () => {
  let component: CrearPartidaComponent;
  let fixture: ComponentFixture<CrearPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPartidaComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
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
});
