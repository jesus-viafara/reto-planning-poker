import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearUsuarioComponent } from './modal-crear-usuario';

describe('ModalCrearUsuarioComponent', () => {
  let component: ModalCrearUsuarioComponent;
  let fixture: ComponentFixture<ModalCrearUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCrearUsuarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with roomName control', () => {
    expect(component.form.contains('userName')).toBe(true);
  });

  it('should validate roomName with required, minLength, maxLength, forbiddenName, maxNumbers, and soloNumeros validators', () => {
    const userNameControl = component.form.get('userName');
    userNameControl?.setValue('');
    expect(userNameControl?.valid).toBe(false);

    userNameControl?.setValue('ab');
    expect(userNameControl?.valid).toBe(false);

    userNameControl?.setValue('a'.repeat(21));
    expect(userNameControl?.valid).toBe(false);

    userNameControl?.setValue('validRoom123');
    expect(userNameControl?.valid).toBe(true);

    userNameControl?.setValue('1234');
    expect(userNameControl?.valid).toBe(false);

    userNameControl?.setValue('validRoom1234');
    expect(userNameControl?.valid).toBe(false);
  });
});
