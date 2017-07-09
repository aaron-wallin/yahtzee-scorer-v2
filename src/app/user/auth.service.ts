import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
    user: Observable<firebase.User>;
    currentUser: IUser;
    authState: firebase.auth.Auth;

    constructor(private _af: AngularFireAuth,
                private router: Router) {

        this.user = _af.authState;

        this.currentUser = {
                id: null,
                userName: '',
                firstName: '',
                lastName: ''
            };

        this.user.subscribe((auth) => {
            this.currentUser.userName = this._af.auth.currentUser.email;
            this.currentUser.firstName = this._af.auth.currentUser.email;
            this.currentUser.id = this._af.auth.currentUser.uid;

            this.router.navigate(['/']);
        });
    }

    loginUser(userName: string, password: string, returnUrl: string) {
        this._af.auth.signInWithEmailAndPassword(userName, password).then((success) => {
            console.log(this._af.auth.currentUser.uid);
            console.log(this._af.auth.currentUser.email);

            this.currentUser.userName = this._af.auth.currentUser.email;
            this.currentUser.firstName = this._af.auth.currentUser.email;
            this.currentUser.id = this._af.auth.currentUser.uid;

            this.router.navigate([returnUrl || '/']);

        }).catch((err) => alert(err));
    }

    logoutUser() {
        this._af.auth.signOut().then((val) => {
            this.authState = null;
            this.currentUser = {
                id: null,
                userName: '',
                firstName: '',
                lastName: ''
            };
            this.router.navigate(['user/login']).catch((err) => alert(err));
        });
    }

    isAuthenticated() {
        if (this._af == null ||
            this._af.auth == null ||
            this._af.auth.currentUser == null) { return false; }

        return !!this._af.auth.currentUser.uid;
    }
}
