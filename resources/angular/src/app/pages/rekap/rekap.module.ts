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

import { RekapRoutingModule } from './rekap-routing.module';
import { RekapMenuComponent } from './components/rekap-menu/rekap-menu.component';
import { RekapCustomerComponent } from './components/rekap-customer/rekap-customer.component';
import { RekapComponent } from './components/rekap/rekap.component';




@NgModule({
    declarations: [ RekapMenuComponent, RekapCustomerComponent, RekapComponent ],
    imports: [
        CommonModule,
        RekapRoutingModule,
        NgbModule,
        NgbTooltipModule,
        NgbModalModule,
        NgSelectModule,
        FormsModule,
        DataTablesModule
    ]
})
export class RekapModule { }