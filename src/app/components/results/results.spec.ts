import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Results } from './results';
import { initialState } from '../../state/reducers/data.reducer';
import { By } from '@angular/platform-browser';

describe('Results', () => {
  let component: Results;
  let fixture: ComponentFixture<Results>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Results],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(Results);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render result after admin revealed them', () => {
    component.room.state = 'revealed';
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.results');
    expect(element).toBeTruthy();
  });

  it('should not render result if admin has not revealed them', () => {
    component.room.state = 'hidden';
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.results');
    expect(element).toBeFalsy();
  });

  it('should render the correct number of child components', () => {
    component.room.state = 'revealed';
    component.result.voteCount = { '1': 2, '2': 4, '3': 1 };
    component.count = ['1', '2', '3'];
    fixture.detectChanges();
    const childComponents = fixture.debugElement.queryAll(By.css('.votes-count'));
    expect(childComponents.length).toBe(3);
  });

  it('should render the average', () => {
    component.room.state = 'revealed';
    component.result.average = 15.5;
    component.count = ['1', '2', '3'];
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(element.textContent).toContain('15.5');
  });
});
