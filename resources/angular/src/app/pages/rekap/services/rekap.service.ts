import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
    providedIn: 'root'
})
export class RekapService {

    constructor(private landaService: LandaService) { }

    getRekapMenu(arrParameter) {
        return this.landaService.DataGet('/v1/rekap-menu', arrParameter);
    }

    getRekapCustomer(arrParameter) {
        return this.landaService.DataGet('/v1/rekap-customer', arrParameter);
    }

    getRekapBulanan(arrParameter) {
        return this.landaService.DataGet('/v1/rekap-bulanan', arrParameter);
    }

    getRekapPerHari() {
        return this.landaService.DataGet('/v1/rekap-hari-ini');
    }

    getRekap(arrParameter) {
        return this.landaService.DataGet('/v1/rekap', arrParameter);
    }
}
