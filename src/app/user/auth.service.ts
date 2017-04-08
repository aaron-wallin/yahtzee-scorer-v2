import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    currentUser: IUser;
    authState: FirebaseAuthState;

    constructor(private _af: AngularFire,
                private router: Router) {
        this.currentUser = {
            id: null,
            userName: '',
            firstName: '',
            lastName: ''
            };

        

/*
        this._af.auth.subscribe((auth) => {
            this.authState = auth;
            this.currentUser.userName = this.authState.auth.email;
            this.currentUser.firstName = this.authState.auth.email;
            this.currentUser.id = this.authState.auth.uid;
        });
        */
    }

    loginUser(userName: string, password: string, returnUrl: string) {
        this._af.auth.login(
            {
                email: userName,
                password: password
            }).then((val) => {
            this.authState = val;
            this.currentUser.userName = val.auth.email;
            this.currentUser.firstName = val.auth.email;
            this.currentUser.id = val.auth.uid;

            this.router.navigate([returnUrl || '/']);

        }).catch((err) => alert(err));

        /*
        .then((a: FirebaseAuthState) => {
            this.authState = a;
            this.currentUser.id = a.auth.uid;
            this.currentUser.userName = a.auth.email;
            this.currentUser.firstName = a.auth.email;
            this.currentUser.lastName = a.auth.email;
            })
        .catch(error => console.log(error));
        */
    }

    logoutUser() {
        this._af.auth.logout();
    }

    isAuthenticated() {
        if (this.authState == null || this.authState.auth == null) { return false; }
        return !!this.authState.auth.uid;
    }
}
