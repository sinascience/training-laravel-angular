import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RekapMenuComponent } from './components/rekap-menu/rekap-menu.component';
import { RekapCustomerComponent } from './components/rekap-customer/rekap-customer.component';
import { RekapComponent } from './components/rekap/rekap.component';


const routes: Routes = [
    { path: 'menu', component: RekapMenuComponent },
    { path: 'customer', component: RekapCustomerComponent },
    { path: '', component: RekapComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RekapRoutingModule { }