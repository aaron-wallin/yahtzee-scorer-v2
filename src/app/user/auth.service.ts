import {Injectable} from '@angular/core';
import {IUser} from './user.model';

@Injectable()
export class AuthService {
    currentUser: IUser;
    loginUser(userName: string, password: string) {
        this.currentUser = {
            id: 'xxx',
            userName: userName,
            firstName: 'test',
            lastName: 'user'
            };
    }

    isAuthenticated() {
        return !!this.currentUser;
    }
}
