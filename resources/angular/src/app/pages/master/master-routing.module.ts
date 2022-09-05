import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DaftarCustomerComponent } from './customers/components/daftar-customer/daftar-customer.component';
import { DaftarItemComponent } from './items/components/daftar-item/daftar-item.component';
import { DaftarRolesComponent } from './roles/components/daftar-roles/daftar-roles.component';
import { DaftarUserComponent } from './users/components/daftar-user/daftar-user.component';
import { DaftarPromoComponent } from './promo/components/daftar-promo/daftar-promo.component';
import { DaftarDiskonComponent } from './diskon/components/daftar-diskon/daftar-diskon.component';
import { UserProfileComponent } from './profile/components/user-profile/user-profile.component';

const routes: Routes = [
    { path: 'users', component: DaftarUserComponent },
    { path: 'roles', component: DaftarRolesComponent },
    { path: 'customers', component: DaftarCustomerComponent },
    { path: 'items', component: DaftarItemComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'promo', component: DaftarPromoComponent },
    { path: 'diskon', component: DaftarDiskonComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }