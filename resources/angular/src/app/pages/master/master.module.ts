import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    NgbModule,
    NgbTooltipModule,
    NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

import { MasterRoutingModule } from './master-routing.module';
import { DaftarUserComponent } from './users/components/daftar-user/daftar-user.component';
import { FormUserComponent } from './users/components/form-user/form-user.component';
import { DaftarRolesComponent } from './roles/components/daftar-roles/daftar-roles.component';
import { FormRolesComponent } from './roles/components/form-roles/form-roles.component';
import { DaftarCustomerComponent } from './customers/components/daftar-customer/daftar-customer.component';
import { FormCustomerComponent } from './customers/components/form-customer/form-customer.component';
import { DaftarPromoComponent } from './promo/components/daftar-promo/daftar-promo.component';
import { FormPromoComponent } from './promo/components/form-promo/form-promo.component';
import { FormItemComponent } from './items/components/form-item/form-item.component';
import { DaftarItemComponent } from './items/components/daftar-item/daftar-item.component';
import { DaftarDiskonComponent } from './diskon/components/daftar-diskon/daftar-diskon.component';
import { FormDiskonComponent } from './diskon/components/form-diskon/form-diskon.component';
import { UserProfileComponent } from './profile/components/user-profile/user-profile.component';
import { FormProfileComponent } from './profile/components/form-user/form-profile.component';
import { DaftarVoucherComponent } from './vouchers/components/daftar-voucher/daftar-voucher.component';
import { FormVoucherComponent } from './vouchers/components/form-voucher/form-voucher.component';



@NgModule({
    declarations: [DaftarDiskonComponent, DaftarUserComponent, FormUserComponent, DaftarRolesComponent, FormRolesComponent, DaftarCustomerComponent, FormCustomerComponent, FormItemComponent, DaftarItemComponent, UserProfileComponent, FormProfileComponent, DaftarPromoComponent, FormPromoComponent, FormDiskonComponent, DaftarVoucherComponent, FormVoucherComponent ],
    imports: [
        CommonModule,
        MasterRoutingModule,
        NgbModule,
        NgbTooltipModule,
        NgbModalModule,
        NgSelectModule,
        FormsModule,
        DataTablesModule
    ]
})
export class MasterModule { }