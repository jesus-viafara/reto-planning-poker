import { PokerTable } from './poker-table';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { initialState } from '../../state/reducers/data.reducer';

describe('PokerTable', () => {
  let component: PokerTable;
  let fixture: ComponentFixture<PokerTable>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokerTable],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(PokerTable);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render reveal button if user is admin and room state is hidden', () => {
    component.user.rol = 'admin';
    component.room.state = 'hidden';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('#reveal-button');
    expect(element).toBeTruthy();
  });

  it('should not render reveal button if user is not admin', () => {
    component.user.rol = 'player';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('#reveal-button');
    expect(element).toBeFalsy;
  });

  it('should render reset button if user is admin and room state is revealed', () => {
    component.user.rol = 'admin';
    component.room.state = 'revealed';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('#reset-button');
    expect(element).toBeTruthy();
  });

  it('should not render reset button if user is not admin', () => {
    component.user.rol = 'player';
    component.room.state = 'revealed';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('#reset-button');
    expect(element).toBeFalsy();
  });

  it('should render reveal loading if user is admin and room state is revealing', () => {
    component.user.rol = 'admin';
    component.room.state = 'revealing';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('#reveal-loading');
    expect(element).toBeTruthy();
  });

  it('should not render reveal loading if user is not admin ', () => {
    component.user.rol = 'player';
    component.room.state = 'revealing';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('#reveal-loading');
    expect(element).toBeFalsy();
  });
});
