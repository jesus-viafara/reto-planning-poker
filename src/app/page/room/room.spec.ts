import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComponent } from './room';
import { initialState } from '../../state/reducers/data.reducer';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render crea-usuario-modal when  user logged in', () => {
    component.isChildOpen = false;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('#crear-usuario');
    console.log(element);

    expect(element).toBeFalsy();
  });

  it('should render crea-usuario-modal when  user is not logged in', () => {
    component.isChildOpen = true;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('#crear-usuario');
    console.log(element);

    expect(element).toBeTruthy();
  });

  it('should render poker table ', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.poker-table');

    expect(element).toBeTruthy();
  });

  it('should render players cards', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.player-positions');

    expect(element).toBeTruthy();
  });

  it('should render card list', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('#card-list');

    expect(element).toBeTruthy();
  });

  it('should render results', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('#results');

    expect(element).toBeTruthy();
  });
});
