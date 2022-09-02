import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { PromoService } from '../../services/promo.service';

@Component({
    selector: 'promo-daftar',
    templateUrl: './daftar-promo.component.html',
    styleUrls: ['./daftar-promo.component.scss']
})
export class DaftarPromoComponent implements OnInit {

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    dtOptions: any;

    listPromo: [];
    titleModal: string;
    modelId: number;
    isOpenForm: boolean = false;

    offsetParams: any;
    limitParams: any;
    pageParams: any;

    constructor(
        private promoService: PromoService,
        private landaService: LandaService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.createItem()
    }

    createItem() {
        this.modelId = 0;
        this.showForm(true);
    }

    showForm(show) {
        this.isOpenForm = show;
    }

    trackByIndex(index: number): any {
        return index;
    }

    reloadDataTable(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    getPromo() {
        this.dtOptions = {
            serverSide: true,
            processing: true,
            ordering: false,
            searching: false,
            pageLength: 5,
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

                this.promoService.getPromos(params).subscribe((res: any) => {
                    this.listPromo = res.data.list;

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

    getPromoBySearch(e) {
        let filter = e.target.value;
        const params = {
            filter: JSON.stringify({}),
            offset: this.offsetParams,
            limit: this.limitParams,
            page: this.pageParams,
            nama: filter,
        };
        this.promoService.getPromos(params).subscribe((res: any) => {
            this.listPromo = res.data.list;
        }, (err: any) => {
            console.log(err);
        });
    }

    pencarian(cari) {
        this.titleModal = 'Cari User'
        this.modalService.open(cari)
    }

    createPromo(modal) {
        this.titleModal = 'Tambah Promo';
        this.modelId = 0;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    updatePromo(modal, promoModel) {
        this.titleModal = 'Edit Promo: ' + promoModel.nama;
        this.modelId = promoModel.id;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    deletePromo(userId) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            text: 'Promo tidak dapat melakukan pesanan setelah kamu menghapus datanya',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (result.value) {
                this.promoService.deletePromo(userId).subscribe((res: any) => {
                    this.landaService.alertSuccess('Berhasil', res.message);
                    this.getPromo();
                }, err => {
                    console.log(err);
                });
            }
        });
    }
}
