import { Component, OnInit , ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

import { LandaService } from 'src/app/core/services/landa.service';
import { ItemService } from '../../services/item.service';

@Component({
    selector: 'item-daftar',
    templateUrl: './daftar-item.component.html',
    styleUrls: ['./daftar-item.component.scss']
})
export class DaftarItemComponent implements OnInit {

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    dtOptions: any;

    listItems: [];
    titleCard: string;
    titleModal: string;
    modelId: number;
    isOpenForm: boolean = false;

    offsetParams: any;
    limitParams: any;
    pageParams: any;

    constructor(
        private itemService: ItemService,
        private landaService: LandaService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.getItem();
    }

    trackByIndex(index: number): any {
        return index;
    }

    getItem() {
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
                
                this.itemService.getItems(params).subscribe((res: any) => {
                    this.listItems = res.data.list;

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

    showForm(show) {
        this.isOpenForm = show;
    }

    getItemBySearch(e) {
        let filter = e.target.value;
        const params = {
            filter: JSON.stringify({}),
            offset: this.offsetParams,
            limit: this.limitParams,
            page: this.pageParams,
            nama: filter,
        };
        this.itemService.getItems(params).subscribe((res: any) => {
            this.listItems = res.data.list;
        }, (err: any) => {
            console.log(err);
        });
    }

    createItem() {
        this.titleCard = 'Tambah Item';
        this.modelId = 0;
        this.showForm(true);
    }

    updateItem(itemModel) {
        this.titleCard = 'Edit Item: ' + itemModel.nama;
        this.modelId = itemModel.id;
        this.showForm(true);
    }

    pencarian(cari) {
        this.titleModal = 'Cari User'
        this.modalService.open(cari)
    }

    deleteItem(userId) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            text: 'Item tidak dapat melakukan pesanan setelah kamu menghapus datanya',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (result.value) {
                this.itemService.deleteItem(userId).subscribe((res: any) => {
                    this.landaService.alertSuccess('Berhasil', res.message);
                    this.getItem();
                }, err => {
                    console.log(err);
                });
            }
        });
    }

}
