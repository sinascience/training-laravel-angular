import { Component, Input, OnInit, Output, SimpleChange} from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';
import {DiskonService } from '../../services/diskon.service';

@Component({
    selector: 'diskon-form',
    templateUrl: './form-diskon.component.html',
    styleUrls: ['./form-diskon.component.scss']
})
export class FormDiskonComponent implements OnInit {
    @Input() user: number;
    @Input() promo: number;

    mode: string;

    formModel : {
        id: number,
        user_auth_id: number,
        m_promo_id: number,
        status: number
    }
    checked: boolean;

    constructor(
        private diskonService:DiskonService,
        private landaService: LandaService
    ) {}

    ngOnInit(): void {
        this.checkedFunc(this.user, this.promo)
    }
    
    ngOnChanges(changes: SimpleChange) {
    }

    save() {
        if(this.mode == 'add') {
            this.diskonService.createDiskon(this.formModel).subscribe((res : any) => {
            }, err => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
            });
        } else {
            this.diskonService.updateDiskon(this.formModel).subscribe((res : any) => {
            }, err => {
                this.landaService.alertError('Mohon Maaf', err.error.errors);
            });
        }
    }

    checkedFunc(val, col) {

        const parameters = {
            filter: JSON.stringify({}),
            user_auth_id: val,
            m_promo_id: col
        };
    
        this.diskonService.getDiskons(parameters).subscribe((res: any) => {
            let checker = res.data.list.length
            if(checker !== 0) {
                if(res.data.list[0].status == 1) {
                    this.checked = true;
                } else {
                    this.checked = false;
                }
            } else {
                this.checked = false;
            }
        
    
        }, (err: any) => {
            console.log(err);
        });

        
    }

    checkCheckBoxvalue(event, value, columns){

    let trueFalse: number;

    if(event.target.checked) {
        trueFalse = 1
    } else {
        trueFalse = 0
    }

    const parameters = {
        filter: JSON.stringify({}),
        user_auth_id: value,
        m_promo_id: columns
    };

    this.diskonService.getDiskons(parameters).subscribe((res: any) => {
        let checker = res.data.list.length
        let diskonId = res.data.list
        if(checker !== 0) {
            this.mode = 'edit';
            this.formModel = {
                id: res.data.list[0].id,
                user_auth_id: value,
                m_promo_id: columns,
                status: trueFalse
            }
            this.save()

        } else {
                
            this.mode = 'add';
            this.formModel = {
                id: 0,
                user_auth_id: value,
                m_promo_id: columns,
                status: trueFalse

            }
            this.save()
        }
    
    
        

    }, (err: any) => {
        console.log(err);
    });
    }

    
}
