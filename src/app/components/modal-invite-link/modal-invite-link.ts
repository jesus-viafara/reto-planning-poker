import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-invite-link',
  imports: [],
  templateUrl: './modal-invite-link.html',
  styleUrl: './modal-invite-link.css',
})
export class ModalInviteLink {
  @Output() close = new EventEmitter(); // or // close = output();
  inviteLink: string = 'https://prsgplanningpoker.com';
  linkCopied: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.inviteLink += this.router.url;
  }

  copyLink() {
    navigator.clipboard.writeText(this.inviteLink);
    this.linkCopied = true;
  }

  closeModal() {
    this.linkCopied = false;
    this.close.emit(true);
  }
}
