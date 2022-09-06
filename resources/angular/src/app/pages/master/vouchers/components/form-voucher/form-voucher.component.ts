import { Component, Input, OnInit, Output, SimpleChange, EventEmitter } from '@angular/core';

import { LandaService } from 'src/app/core/services/landa.service';
import { VoucherService } from '../../services/voucher.service';
import { PromoService } from '../../../promo/services/promo.service';
import { CustomerService } from '../../../customers/services/customer.service';

@Component({
  selector: 'app-form-voucher',
  templateUrl: './form-voucher.component.html',
  styleUrls: ['./form-voucher.component.scss']
})
export class FormVoucherComponent implements OnInit {
    @Input() voucherId: number;
    @Output() afterSave  = new EventEmitter<boolean>();
    mode: string;
    listCustomer: [];
    listPromo: [];
    formModel : {
        id: number,
        status: boolean,
        jumlah: number,
        customer:{
            id: number,
            nama: string,
        },
        promo:{
            id: number,
            nama: string,
        },
    }

    constructor(
        private voucherService: VoucherService,
        private customerService: CustomerService,
        private promoService: PromoService,
        private landaService: LandaService
    ) {}

    ngOnInit(): void {
       this.getCustomer();
       this.getPromo();
    }

    ngOnChanges(changes: SimpleChange) {
        this.emptyForm();
    }

    changeStatus(status) {
        this.formModel.status = status;
    }

    emptyForm() {
        this.mode = 'add';
        this.formModel = {
            id: 0,
            status: true,
            jumlah: 0,
            customer:{
                id: 0,
                nama: '',
            },
            promo:{
                id: 0,
                nama: '',
            },
        }

        if (this.voucherId > 0) {
            this.mode = 'edit';
            this.getVoucher(this.voucherId);
        }
    }

    save() {
        if(this.mode == 'add') {
            this.voucherService.createVoucher(this.formModel).subscribe((res : any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit();
            }, err => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
            });
        } else {
            this.voucherService.updateVoucher(this.formModel).subscribe((res : any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit();
            }, err => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
            });
        }
    }

    getCustomer() {
        this.customerService.getCustomers([]).subscribe((res: any) => {
            this.listCustomer = res.data.list;
        }, err => {
            console.log(err);
        })
    }
    getPromo() {
        this.promoService.getPromos({type: 'voucher'}).subscribe((res: any) => {
            this.listPromo = res.data.list;
        }, err => {
            console.log(err);
        })
    }

    getVoucher(voucherId) {
        this.voucherService.getVoucherById(voucherId).subscribe((res: any) => {
            this.formModel = res.data;
        }, err => {
            console.log(err);
        });
    }

}
