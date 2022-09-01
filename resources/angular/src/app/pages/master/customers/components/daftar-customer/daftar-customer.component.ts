import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { CustomerService } from '../../services/customer.service';

@Component({
    selector: 'customer-daftar',
    templateUrl: './daftar-customer.component.html',
    styleUrls: ['./daftar-customer.component.scss']
})
export class DaftarCustomerComponent implements OnInit {

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    dtOptions: any;

    listCustomer: [];
    titleModal: string;
    modelId: number;

    offsetParams: any;
    limitParams: any;
    pageParams: any;

    constructor(
        private customerService: CustomerService,
        private landaService: LandaService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.getCustomer();
    }

    trackByIndex(index: number): any {
        return index;
    }

    reloadDataTable(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    getCustomer() {
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

                this.customerService.getCustomers(params).subscribe((res: any) => {
                    this.listCustomer = res.data.list;

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

    getCustomerBySearch(e) {
        let filter = e.target.value;
        const params = {
            filter: JSON.stringify({}),
            offset: this.offsetParams,
            limit: this.limitParams,
            page: this.pageParams,
            nama: filter,
        };
        this.customerService.getCustomers(params).subscribe((res: any) => {
            this.listCustomer = res.data.list;
        }, (err: any) => {
            console.log(err);
        });
    }

    pencarian(cari) {
        this.titleModal = 'Cari User'
        this.modalService.open(cari)
    }

    createCustomer(modal) {
        this.titleModal = 'Tambah Customer';
        this.modelId = 0;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    updateCustomer(modal, customerModel) {
        this.titleModal = 'Edit Customer: ' + customerModel.nama;
        this.modelId = customerModel.id;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    deleteCustomer(userId) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            text: 'Customer tidak dapat melakukan pesanan setelah kamu menghapus datanya',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (result.value) {
                this.customerService.deleteCustomer(userId).subscribe((res: any) => {
                    this.landaService.alertSuccess('Berhasil', res.message);
                    this.getCustomer();
                }, err => {
                    console.log(err);
                });
            }
        });
    }
}
