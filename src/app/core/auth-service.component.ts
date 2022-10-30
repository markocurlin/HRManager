import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { Constants } from '../constants';
import { Observable, Subject } from 'rxjs';
import { AuthContext } from '../model/auth-context';
import { AuthContextApiService } from '../services/authcontext-api.service';

@Injectable()
export class AuthService {
    private userManager: UserManager;
    private user: User | undefined;
    private loginChangedSubject = new Subject<boolean>();

    loginChanged = this.loginChangedSubject.asObservable();
    authContext: AuthContext | undefined;

    authContext$!: Observable<AuthContext>;

    constructor(
        private authContextService: AuthContextApiService,
    ) {
        const stsSettings = {
            authority: Constants.stsAuthority,
            client_id: Constants.clientId,
            redirect_uri: `${Constants.clientRoot}/signin-callback`,
            scope: 'openid profile projects-api',
            response_type: 'code',
            post_logout_redirect_uri: `${Constants.clientRoot}/signout-callback`,
            automaticSilentRenew: true,
            silent_redirect_uri: `${Constants.clientRoot}/assets/silent-callback.html`
        };

        this.userManager = new UserManager(stsSettings);
        
        this.userManager.events.addAccessTokenExpired(_ => {
            this.loginChangedSubject.next(false);
        });

        this.userManager.events.addUserLoaded(user => {
            if (this.user !== user) {
                this.user = user;
                this.loadSecurityContext();
                this.loginChangedSubject.next(!!user && !user.expired);
            }
        });
    }

    login() {
        return this.userManager.signinRedirect();
    }

    isLoggedIn(): Promise<boolean> {
        return this.userManager.getUser().then(user => {
            const userCurrent = !!user && !user.expired;
            if (this.user !== user) {
                this.loginChangedSubject.next(userCurrent);
            }
            
            if (userCurrent && !this.authContext) {
                this.loadSecurityContext();
            }

            this.user = user!;
            return userCurrent;
        });
    }

    completeLogin() {
        return this.userManager.signinRedirectCallback().then(user => {
            this.user = user;
            this.loginChangedSubject.next(!!user && !user.expired);
            return user;
        });
    }

    logout() {
        this.userManager.signoutRedirect();
    }

    completeLogout() {
        this.user = null!;
        this.loginChangedSubject.next(false);
        
        return this.userManager.signoutRedirectCallback();
    }

    getAccessToken() {
        return this.userManager.getUser().then(user => {
            if (!!user && !user.expired) {
                return user.access_token;
            } else {
                return null;
            }
        });
    }
/*
    getUser() {
        return this.userManager.getUser().then(user => {
            if (!!user && !user.expired) {
                return user?.profile.email;
            } else {
                return null;
            }
        });
    }*/

    getUser() {
        return this.userManager.getUser().then(user => {
            if (!!user && !user.expired) {
                return user?.profile.email;
            } else {
                return null;
            }
        });
    }

    loadSecurityContext() {
        this.authContext$ = this.authContextService.getAuthContext();
        this.authContext$.subscribe(context => {
            console.log(context);
            this.authContext = new AuthContext();
            this.authContext.claims = context.claims;
            this.authContext.userProfile = context.userProfile;
            //this.getUser();
        },
        error => {
            console.log(error);
        });
    }
}