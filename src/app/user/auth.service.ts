import {Injectable} from '@angular/core';
import {IUser} from './user.model';
import {AngularFire, FirebaseAuthState} from 'angularfire2';

@Injectable()
export class AuthService {
    currentUser: IUser;
    authState: FirebaseAuthState;

    constructor(private _af: AngularFire) {
        this.currentUser = {
            id: null,
            userName: '',
            firstName: '',
            lastName: ''
            };

        this._af.auth.subscribe((auth) => {
            this.authState = auth;
            this.currentUser.userName = this.authState.auth.email;
            this.currentUser.firstName = this.authState.auth.email;
            this.currentUser.id = this.authState.auth.uid;
        });
    }

    loginUser(userName: string, password: string) {
        /*
        this.currentUser = {
            id: 'xxx',
            userName: userName,
            firstName: 'test',
            lastName: 'user'
            };
        */
        this._af.auth.login({ email: userName, password: password }).catch(error => console.log(error));
    }

    isAuthenticated() {
        if (this.authState == null || this.authState.auth == null) { return false; }
        return !!this.authState.auth.uid;
    }
}
