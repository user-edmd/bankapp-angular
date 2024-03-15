import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <div class="btn btn-primary" (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })">
        Log out
      </div>
    </ng-container>

    <ng-template #loggedOut>
      <div class="btn btn-primary" (click)="auth.loginWithRedirect()">Log in</div>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}