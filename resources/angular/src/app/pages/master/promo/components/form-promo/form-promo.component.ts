import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { LandaService } from 'src/app/core/services/landa.service';
import {PromoService } from '../../services/promo.service';

@Component({
    selector: 'promo-form',
    templateUrl: './form-promo.component.html',
    styleUrls: ['./form-promo.component.scss']
})
export class FormPromoComponent implements OnInit {
    @Input() promoId: number;
    @Output() afterSave  = new EventEmitter<boolean>();
    mode: string;
    isDiskon: boolean = true;
    isVoucher: boolean = false;
    required: boolean = false;

    formModel : {
        id_promo: number,
        nama: string,
        type: string,
        diskon: number,
        foto: string,
        fotoUrl: string,
        nominal: number,
        syarat_ketentuan: string,
        kadaluarsa: number,
    }

    constructor(
        @Inject(DOCUMENT) document: Document,
        private promoService:PromoService,
        private landaService: LandaService
    ) {}

    ngOnInit(): void {
        this.emptyForm();
    }
    
    ngOnChanges(changes: SimpleChange) {

    }

    valueType(value) {
        if(value === 'diskon') {
            this.isDiskon = true;
            this.isVoucher = false;
            this.required = false;
        } else if(value === 'voucher') {
            this.isDiskon = false;
            this.isVoucher = true;
            this.required = true;
        }
    }

    emptyForm() {
        this.mode = 'add';
        this.formModel = {
            id_promo: 0,
            nama: '',
            type: 'diskon',
            diskon: 0,
            foto: '',
            fotoUrl: '',
            nominal: 0,
            syarat_ketentuan: '',
            kadaluarsa: 0,
        }

    }

    save() {
        if(this.mode == 'add') {
            this.promoService.createPromo(this.formModel).subscribe((res : any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit();
            }, err => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
            });
        } else {
            this.promoService.updatePromo(this.formModel).subscribe((res : any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.afterSave.emit();
            }, err => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
            });
        }
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
