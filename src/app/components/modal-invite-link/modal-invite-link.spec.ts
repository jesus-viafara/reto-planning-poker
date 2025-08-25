import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInviteLink } from './modal-invite-link';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import * as uuid from 'uuid';

describe('ModalInviteLink', () => {
  let component: ModalInviteLink;
  let fixture: ComponentFixture<ModalInviteLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInviteLink],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            url: of([{ path: 'https://prsgplanningpoker.com' }]),
            params: of({ id: uuid.v4 }),
            snapshot: {
              url: [{ path: 'snapshot-path' }],
              params: { id: '456' },
              queryParams: { sort: 'asc' },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInviteLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate the url link with the room id', () => {
    let id = uuid.v4;
    component.inviteLink += '/room/' + id;
    fixture.detectChanges();
    expect(component.inviteLink).toContain(`/room/${id}`);
  });
});
