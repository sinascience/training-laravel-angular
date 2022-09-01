import { Component, Input, OnInit, Output, SimpleChange, EventEmitter } from '@angular/core';
import { empty, Observable, ReplaySubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

import { LandaService } from 'src/app/core/services/landa.service';
import { RoleService } from '../../../roles/services/role-service.service';
import { UserService } from '../../../users/services/user-service.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';


@Component({
    selector: 'profile-form',
    templateUrl: './form-profile.component.html',
    styleUrls: ['./form-profile.component.scss']
})
export class FormProfileComponent implements OnInit {
    @Input() userId: number;
    @Output() afterSave  = new EventEmitter<boolean>();
    mode: string;
    listAkses: [];
    formModel : {
        id: number,
        nama: string,
        akses: {
            id: number,
            nama: string
        },
        foto: string,
        fotoUrl: string,
        email: string,
        password: string
    };
    emailLama: string;
    passLama: string;

    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private landaService: LandaService,
        private router: Router,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
       this.getRole();
    }
    
    
    ngOnChanges(changes: SimpleChange) {
        this.emptyForm();
    }

    emptyForm() {
        this.mode = 'add';
        this.formModel = {
            id: 0,
            nama: '',
            akses: {
                id: 0,
                nama: ''
            },
            foto: '',
            fotoUrl: '',
            email: '',
            password: ''
        }

        if (this.userId > 0) {
            this.mode = 'edit';
            this.getUser(this.userId);
        }
    }

    isChange(email, password) {
        if(this.emailLama != email || password != null) {
            return true;
        } else {
            return false;
        }
    }

    save() {
        this.userService.updateUser(this.formModel).subscribe((res : any) => {
            this.landaService.alertSuccess('Berhasil', res.message);
            this.afterSave.emit();
            if(this.isChange(res.data.email, this.formModel.password)) {
                console.log(this.isChange);
                this.authService.logout();
                this.router.navigate(['auth/login']);
            }
        }, err => {
            this.landaService.alertError('Mohon Maaf', err.error.errors);
        });
    }

    getRole() {
        this.roleService.getRoles([]).subscribe((res: any) => {
            this.listAkses = res.data.list;
        }, err => {
            console.log(err);
        })
    }

    getUser(userId) {
        this.userService.getUserById(userId).subscribe((res: any) => {
            this.formModel = res.data;
            this.emailLama = res.data.email;
            this.passLama = res.data.password;
        }, err => {
            console.log(err);
        });
    }

    onFileSelected(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              image.onload = rs => {
                const imgBase64Path = e.target.result;
                this.formModel.foto = imgBase64Path;
              };
            };
            reader.readAsDataURL(event.target.files[0]);
          }
    }
}
