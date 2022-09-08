import { Component, OnInit , ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { LandaService } from 'src/app/core/services/landa.service';
import { RekapService } from '../../services/rekap.service';

@Component({
    selector: 'rekap-menu',
    templateUrl: './rekap-menu.component.html',
    styleUrls: ['./rekap-menu.component.scss']
})
export class RekapMenuComponent implements OnInit {


    listFood: any;
    listSnack: any;
    listDrink: any;

    totalFood: any;
    totalSnack: any;
    totalDrink: any;

    filter: any;
    month: any;
    
    grandTotal: any;

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
        this.grandTotal = [];
        this.grandTotal.food = [];
        this.grandTotal.drink = [];
        this.grandTotal.snack = [];
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
            this.grandTotals();
            this.listFood = [];
            this.listSnack = [];
            this.listDrink = [];
            this.totalFood = 0;
            this.totalSnack = 0;
            this.totalDrink = 0;
            for(let cats of res.data) {
                for(let i of this.date) {
                    this.grandTotal[i] += parseInt(cats.tanggal[i-1])
                }
                if(cats.kategori == 'food') {
                    for(let i of this.date) {
                        this.grandTotal.food[i] += parseInt(cats.tanggal[i-1])
                    }
                    this.listFood.push(cats)
                    this.totalFood += parseInt(cats.total);
                } else if(cats.kategori == 'drink') {
                    for(let i of this.date) {
                        this.grandTotal.drink[i] += parseInt(cats.tanggal[i-1])
                    }
                    this.listDrink.push(cats)
                    this.totalDrink += parseInt(cats.total);
                } else if(cats.kategori == 'snack'){
                    for(let i of this.date) {
                        this.grandTotal.snack[i] += parseInt(cats.tanggal[i-1])
                    }
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

    grandTotals() {
        for(let i of this.date) {
            this.grandTotal[i] = 0;
            this.grandTotal.food[i] = 0;
            this.grandTotal.drink[i] = 0;
            this.grandTotal.snack[i] = 0;
        }
    }

    sum(array: any) {
        let sum = array.reduce((partialSum, a) => partialSum + a, 0);
        return sum;
    }

}
