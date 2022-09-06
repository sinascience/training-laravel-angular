import { Component, OnInit, ViewChild, Input, Output, SimpleChange, EventEmitter} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { DiskonService } from '../../services/diskon.service';

@Component({
    selector: 'diskon-daftar',
    templateUrl: './daftar-diskon.component.html',
    styleUrls: ['./daftar-diskon.component.scss']
})
export class DaftarDiskonComponent implements OnInit {

    @Input() promoId: number;
    @Output() afterSave  = new EventEmitter<boolean>();
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    dtOptions: any;

    mode: string;

    formModel : {
        id: number,
        user_auth_id: number,
        m_promo_id: number,
        status: number
    }

    listDiskon: any;
    listUser: any;
    listPromo: any;
    listTotal: any;
    titleCard: string;
    titleModal: string;
    modelId: number;
    columns: any;
    isCome: boolean;
    isCome2: boolean;
    checked: boolean;
    offset: number;
    footerTotal: any

    

    offsetParams: any;
    limitParams: any;
    pageParams: any;

    constructor(
        private diskonService: DiskonService,
        private landaService: LandaService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.isCome = false;
        this.isCome2 = false;


        this.diskonService.getDiskons({}).subscribe((res: any) => {
            this.listDiskon = res.data.list;
            
        
        }, (err: any) => {
            console.log(err);
        });

        this.columns = [{
            title: 'No',
          }, {
            title: 'Karyawan',
            data: 'firstName'
          }]
        

        this.getDiskon();

    }

    ngOnChanges(changes: SimpleChange) {
    }

    trackByIndex(index: number): any {
        return index;
    }

    reloadDataTable(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    check(val, col) {

        let bool: boolean;

        let getDiskon: any;
        getDiskon = this.listDiskon.find(diskon => diskon.user_auth_id == val && diskon.m_promo_id == col);

        if(getDiskon === undefined) {
            bool = false
        } else {
            if(getDiskon.status == 1) {
                bool = true
            } else {
                bool = false
            }
        }

        return bool;
    }

    log(log) {
        console.log(log)
    }

    getDiskon() {
        

        this.diskonService.getPromos({type: 'diskon'}).subscribe((res: any) => {
            this.listPromo = res.data.list;
            
            this.isCome = true;

        }, (err: any) => {
            console.log(err);
        });

        this.dtOptions = {
            serverSide: true,
            processing: true,
            ordering: false,
            searching: false,
            pageLength: 3,
            pagingType: "full_numbers",
            ajax: (dataTablesParameters: any, callback) => {
                

                const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
                const params = {
                    filter: JSON.stringify({}),
                    offset: dataTablesParameters.start,
                    limit: dataTablesParameters.length,
                    page: page,
                };
                
                this.offsetParams = params['offset'];
                this.limitParams = params['limit'];
                this.pageParams = params['page'];
                this.offset =  params['offset'];

                this.diskonService.getUsers(params).subscribe((res: any) => {
                    this.listUser = res.data.list;
                    this.footerTotal = []
                    for(let promo of this.listPromo) {
                        this.footerTotal[promo.id] = 0
                        for(let diskon of this.listDiskon) {
                            for(let user of this.listUser) {
                            if(promo.id == diskon.m_promo_id && user.id == diskon.user_auth_id && diskon.status == 1) {
                                this.footerTotal[promo.id]++
                            }
                        }}
                    }


                    callback({
                        recordsTotal: res.data.meta.total,
                        recordsFiltered: res.data.meta.total,
                        data: [],
                    });
                }, (err: any) => {
                    console.log(err);
                });

                
            },
        };
    }   

    getDiskonBySearch(e) {
        let filter = e.target.value;
        const params = {
            filter: JSON.stringify({}),
            offset: this.offsetParams,
            limit: this.limitParams,
            page: this.pageParams,
            nama: filter,
        };
        this.diskonService.getDiskons(params).subscribe((res: any) => {
            this.listDiskon = res.data.list;
        }, (err: any) => {
            console.log(err);
        });
    }

    pencarian(cari) {
        this.titleModal = 'Cari User'
        this.modalService.open(cari)
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

    getPromo(promoId) {
        this.diskonService.getPromoById(promoId).subscribe((res: any) => {
            this.formModel = res.data;
        }, err => {
            console.log(err);
        });
    }

    getDiskonId(promoId) {
        this.diskonService.getDiskonById(promoId).subscribe((res: any) => {
            this.formModel = res.data;
        }, err => {
            console.log(err);
        });
    }

    back() {
        this.afterSave.emit();
    }

    checkedFunc(val, col) {



        const parameters = {
            filter: JSON.stringify({}),
            user_auth_id: val,
            m_promo_id: col
        };
    
        this.diskonService.getDiskons(parameters).subscribe((res: any) => {
            let checker = res.data.list.length
            let diskonId = res.data.list
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

        return this.checked
    }

    checkCheckBoxvalue(event, value, columns){

    let trueFalse: number;

    if(event.target.checked) {
        trueFalse = 1
        this.footerTotal[columns]++
    } else {
        trueFalse = 0
        this.footerTotal[columns]--
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
