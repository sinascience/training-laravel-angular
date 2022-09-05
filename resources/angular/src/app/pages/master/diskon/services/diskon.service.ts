import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
    providedIn: 'root'
})
export class DiskonService {

    constructor(private landaService: LandaService) { }



    getDiskons(arrParameter) {
        return this.landaService.DataGet('/v1/diskon', arrParameter );
    }

    getDiskonById(diskonId) {
        return this.landaService.DataGet('/v1/diskon/' + diskonId);
    }

    createDiskon(payload) {
        return this.landaService.DataPost('/v1/diskon', payload);
    }

    updateDiskon(payload) {
        return this.landaService.DataPut('/v1/diskon', payload);
    }

    deleteDiskon(diskonId) {
        return this.landaService.DataDelete('/v1/diskon/' + diskonId);
    }
    

    getUsers(arrParameter) {
        return this.landaService.DataGet('/v1/users', arrParameter);
    }

    getUserById(userId) {
        return this.landaService.DataGet('/v1/users/' + userId);
    }
    
    getPromos(arrParameter) {
        return this.landaService.DataGet('/v1/promo', arrParameter );
    }

    getPromoById(promoId) {
        return this.landaService.DataGet('/v1/promo/' + promoId);
    }

}
