import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInviteLink } from './modal-invite-link';

describe('ModalInviteLink', () => {
  let component: ModalInviteLink;
  let fixture: ComponentFixture<ModalInviteLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInviteLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInviteLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
