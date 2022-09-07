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


    listFood: any;
    listSnack: any;
    listDrink: any;

    totalFood: any;
    totalSnack: any;
    totalDrink: any;

    filter: any;
    month: any;
    

    offsetParams: any;
    limitParams: any;
    pageParams: any;
    mode: any;

    date: any;
    data: boolean;

    constructor(
        private rekapService: RekapService,
        private landaService: LandaService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.mode = 'all';
        this.date = [];
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

        this.offsetParams = params['offset'];
        this.limitParams = params['limit'];
        this.pageParams = params['page'];
        
        this.rekapService.getRekapMenu(params).subscribe((res: any) => {
            this.listFood = [];
            this.listSnack = [];
            this.listDrink = [];
            this.totalFood = 0;
            this.totalSnack = 0;
            this.totalDrink = 0;
            for(let cats of res.data) {
                if(cats.kategori == 'food') {
                    this.listFood.push(cats)
                    this.totalFood += parseInt(cats.total);
                } else if(cats.kategori == 'drink') {
                    this.listDrink.push(cats)
                    this.totalDrink += parseInt(cats.total);
                } else {
                    this.listSnack.push(cats)
                    this.totalSnack += parseInt(cats.total);
                }
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

}
