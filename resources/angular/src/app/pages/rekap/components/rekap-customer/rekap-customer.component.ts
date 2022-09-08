import { Component, OnInit , ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { LandaService } from 'src/app/core/services/landa.service';
import { RekapService } from '../../services/rekap.service';

@Component({
    selector: 'rekap-customer',
    templateUrl: './rekap-customer.component.html',
    styleUrls: ['./rekap-customer.component.scss']
})
export class RekapCustomerComponent implements OnInit {


    listCustomer: any;
    lisrNamaCustomer: any;
    namaCustomer: any;

    totalCustomer: any;

    filter: any;
    month: any;

    grandTotal: any;

    date: any;
    data: boolean;

    constructor(
        private rekapService: RekapService,
        private landaService: LandaService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.date = [];
        this.grandTotal = [];
        for (let i = 1; i <= 31; i++) {
            this.date.push(i)
          }
        this.data = false;
    }

    trackByIndex(index: number): any {
        return index;
    }

    getItem() {
        const params = {
            filter: JSON.stringify({}),
            month: this.month.substring(5, 7),
            year: this.month.substring(0, 4)
        };
        
        this.rekapService.getRekapCustomer(params).subscribe((res: any) => {
            this.listCustomer = res.data;
            this.totalCustomer = 0;
            this.namaCustomer = [];
            for(let customer of this.listCustomer) {
                this.namaCustomer.push(customer.nama)
                this.grandTotals()
                for(let i of this.date) {
                    this.grandTotal[i] += parseInt(customer.tanggal[i-1])
                }
                this.totalCustomer += parseInt(customer.total);
            };
            
            if(res.data.length == 0) {
            this.data = false;
            } else {
            this.data = true;
            }
        }, (err: any) => {
            console.log(err);
        });

    }

    getItemCust(cust) {
        const params = {
            filter: JSON.stringify({}),
            month: this.month.substring(5, 7),
            year: this.month.substring(0, 4),
            customer: cust
        };
        
        this.rekapService.getRekapCustomer(params).subscribe((res: any) => {
            this.listCustomer = res.data;
            this.totalCustomer = 0;
            for(let customer of this.listCustomer) {
                this.grandTotals()
                for(let i of this.date) {
                    this.grandTotal[i] += parseInt(customer.tanggal[i-1])
                }
                this.totalCustomer += parseInt(customer.total);
            };
            
            if(res.data.length == 0) {
            this.data = false;
            } else {
            this.data = true;
            }
        }, (err: any) => {
            console.log(err);
        });

    }

    consol(log) {
        console.log(log)
    }

    grandTotals() {
        for(let i of this.date) {
            this.grandTotal[i] = 0;
        } 
    }

}
