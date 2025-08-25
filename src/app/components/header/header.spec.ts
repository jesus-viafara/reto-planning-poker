import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HeaderComponent } from './header';
import { initialState } from '../../state/reducers/data.reducer';
import { By } from '@angular/platform-browser';
import * as uuid from 'uuid';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render room name when in room route', () => {
    component.room.name = 'Room 1';
    component.room.id = uuid.v4();
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('#room-name'));
    expect(element).toBeTruthy();
  });

  it('should not render room name when there is not room created', () => {
    component.room.name = '';
    component.room.id = '';
    console.log(component.room.id);

    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('#room-name'));
    expect(element).toBeFalsy();
  });

  it('should not render invite link modal if invite button not clicked', () => {
    component.isInviteOpen = false;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('app-modal-invite-link'));
    expect(element).toBeFalsy();
  });

  it('should render visualization mode menu when in avatar is clicked route', () => {
    component.isChangeModo = true;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.change-modo-menu'));
    expect(element).toBeTruthy();
  });

  it('should not render visualization mode menu when in avatar is clicked route', () => {
    component.isChangeModo = false;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.change-modo-menu'));
    expect(element).toBeFalsy();
  });
});
