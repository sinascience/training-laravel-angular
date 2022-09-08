import { Component, OnInit , ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { LandaService } from 'src/app/core/services/landa.service';
import { RekapService } from '../../services/rekap.service';

@Component({
    selector: 'rekap',
    templateUrl: './rekap.component.html',
    styleUrls: ['./rekap.component.scss']
})
export class RekapComponent implements OnInit {


    listRekap: any;
    lisrNamaCustomer: any;
    ListNamaMenu: any;
    namaCustomer: any;
    namaMenu: any;

    total: any;
    diskons: any;
    grandTotal: any

    menu: any;
    cust: any;

    totalCustomer: any;

    filter: any;
    month: any;


    date: any;
    data: boolean;

    constructor(
        private cdr: ChangeDetectorRef,
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
        this.getRekap()
    }

    ngAfterViewInit() {
    this.cdr.detectChanges();
  }

    trackByIndex(index: number): any {
        return index;
    }

    getRekap() {
        const params = {
            filter: JSON.stringify({}),
        };
        
        this.rekapService.getRekap(params).subscribe((res: any) => {
            this.listRekap = res.data;
            this.totalCustomer = 0;
            this.namaCustomer = [...new Set(res.data.map(item => item.customer))]
            this.namaMenu = []
            this.grandTotals()
            for(let rekap of this.listRekap) {
                for(let menu of rekap.menu) {
                    this.namaMenu.push(menu)
                }
                for(let menu of rekap.total) {
                    this.sumTotal(menu);
                }
                this.sumGrand(this.voucher(rekap.total_order, rekap.diskon))
                this.sumDiskon(this.diskon(rekap.total_order, rekap.diskon))
            };
            this.ListNamaMenu = [...new Set(this.namaMenu)]
            if(res.data.length == 0) {
            this.data = false;
            } else {
            this.data = true;
            }
        }, (err: any) => {
            console.log(err);
        });

    }

    getItem() {
        this.menu = '';
        this.cust = '';

        const params = {
            filter: JSON.stringify({}),
            month: this.month.substring(5, 7),
            year: this.month.substring(0, 4)
        };
        
        this.rekapService.getRekap(params).subscribe((res: any) => {
            this.listRekap = res.data;
            this.totalCustomer = 0;
            this.namaCustomer = [...new Set(res.data.map(item => item.customer))]
            this.namaMenu = []
            this.grandTotals()
            for(let rekap of this.listRekap) {
                for(let menu of rekap.menu) {
                    this.namaMenu.push(menu)
                }
                for(let menu of rekap.total) {
                    this.sumTotal(menu);
                }
                this.sumGrand(this.voucher(rekap.total_order, rekap.diskon))
                this.sumDiskon(this.diskon(rekap.total_order, rekap.diskon))
            };
            this.ListNamaMenu = [...new Set(this.namaMenu)]
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
        this.cust = cust
        let menu = ''
        if(this.menu) {
            menu = this.menu
        }

        let params: any;
        if(this.month) {
           params = {
            filter: JSON.stringify({}),
            month: this.month.substring(5, 7),
            year: this.month.substring(0, 4),
            customer: cust,
            menu: menu
        };
        } else {
            params = {
                filter: JSON.stringify({}),
                customer: cust,
                menu: menu
            };
        }
        
        this.rekapService.getRekap(params).subscribe((res: any) => {
            this.listRekap = res.data;
            this.totalCustomer = 0;
            this.grandTotals()
            for(let rekap of this.listRekap) {
                for(let menu of rekap.menu) {
                    this.namaMenu.push(menu)
                }
                for(let menu of rekap.total) {
                    this.sumTotal(menu);
                }
                this.sumGrand(this.voucher(rekap.total_order, rekap.diskon))
                this.sumDiskon(this.diskon(rekap.total_order, rekap.diskon))
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

    getItemMenu(cust) {
        this.menu = cust
        let customer = ''
        if(this.cust) {
            customer = this.cust
        }

        let params: any;
        if(this.month) {
           params = {
            filter: JSON.stringify({}),
            month: this.month.substring(5, 7),
            year: this.month.substring(0, 4),
            menu: cust,
            customer: customer
        };
        } else {
            params = {
                filter: JSON.stringify({}),
                menu: cust,
                customer: customer
            };
        }
        
        this.rekapService.getRekap(params).subscribe((res: any) => {
            this.listRekap = res.data;
            this.totalCustomer = 0;
            this.grandTotals()
            for(let rekap of this.listRekap) {
                for(let menu of rekap.menu) {
                    this.namaMenu.push(menu)
                }
                for(let menu of rekap.total) {
                    this.sumTotal(menu);
                }
                this.sumGrand(this.voucher(rekap.total_order, rekap.diskon))
                this.sumDiskon(this.diskon(rekap.total_order, rekap.diskon))
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
        this.total = 0
        this.diskons = 0;
        this.grandTotal = 0
    }

    diskon(value, diskon) {
        let hasil: number;
        hasil = value * diskon / 100;
        return hasil;
    }

    voucher(value, diskon) {
        let hasil: number;
        let total: number
        hasil = value * diskon / 100;
        total = value - hasil
        return total;
    }

    sumTotal(total) {
        this.total += parseInt(total)
        return parseInt(total)
    }

    sumDiskon(total) {
        this.diskons += parseInt(total)
        return parseInt(total)
    }
    
    sumGrand(total) {
        this.grandTotal += parseInt(total)
        return parseInt(total)
    }

}
