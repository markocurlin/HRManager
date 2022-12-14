import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth-service.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signout-callback',
    template: `<div></div>`,
})

export class SignoutRedirectCallbackComponent implements OnInit {
    constructor(
        private _authService: AuthService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this._authService.completeLogout().then(_ => {
            this._router.navigate(['/'], { replaceUrl: true });
        });
    }
}