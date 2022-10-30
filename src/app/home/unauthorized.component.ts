import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth-service.component';

@Component({
    selector: 'app-unauthorized',
    template: 'unauthorized.component.html'
})

export class UnauthorizedComponent implements OnInit {
    constructor(
        private _authService: AuthService,
    ) { }

    ngOnInit(): void {
        
    }

    logOut() {
        this._authService.logout();
    }
}