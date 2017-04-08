import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    returnUrl: string;
    userName: string;
    password: string;

    constructor(private authService: AuthService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login(formValues) {
        console.log(formValues);
        this.authService.loginUser(formValues.userName, formValues.password, this.returnUrl);
    }
}


