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

    getItemById(itemId) {
        return this.landaService.DataGet('/v1/items/' + itemId);
    }

}
