import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

import { LandaService } from 'src/app/core/services/landa.service';
import { VoucherService } from '../../services/voucher.service';

@Component({
  selector: 'app-daftar-voucher',
  templateUrl: './daftar-voucher.component.html',
  styleUrls: ['./daftar-voucher.component.scss']
})
export class DaftarVoucherComponent implements OnInit {
// Datatable
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    dtOptions: any;

    listVoucher: any;
    titleModal: string;
    modelId: number;

    offsetParams: any;
    limitParams: any;
    pageParams: any;

    constructor(
        private voucherService: VoucherService,
        private landaService: LandaService,
        private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.getVoucher();
    }

    reloadDataTable(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    getVoucher() {
        this.dtOptions = {
            serverSide: true,
            processing: true,
            ordering: false,
            searching: false,
            pagingType: "full_numbers",
            pageLength: 5,
            ajax: (dataTablesParameters: any, callback) => {
                const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
                const params = {
                    filter: JSON.stringify({}),
                    offset: dataTablesParameters.start,
                    limit: dataTablesParameters.length,
                    page: page,
                };
                this.voucherService.getVouchers(params).subscribe((res: any) => {
                    this.listVoucher = res.data.list;

                    this.offsetParams = params['offset'];
                    this.limitParams = params['limit'];
                    this.pageParams = params['page'];

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
        // this.userService.getUsers([]).subscribe((res: any) => {
        //     this.listUser = res.data.list;
        // }, (err: any) => {
        //     console.log(err);
        // });
    }

    getVoucherBySearch(e) {

        
        let getDiskon: any;
        getDiskon = this.listVoucher.filter(diskon => diskon.customer.nama.includes(e.target.value) || diskon.promo.nama.includes(e.target.value));

        this.listVoucher = getDiskon
    }

    cariVoucher(cari){
        this.modalService.open(cari, { size: 'md' });
    }

    createVoucher(modal) {
        this.titleModal = 'Tambah Voucher';
        this.modelId = 0;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    updateVoucher(modal, voucherModel) {
        this.titleModal = 'Edit Voucher: ' + voucherModel.nama;
        this.modelId = voucherModel.id;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    deleteVoucher(voucherId) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            text: 'Voucher ini tidak dapat digunakan setelah kamu menghapus datanya',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (result.value) {
                this.voucherService.deleteVoucher(voucherId).subscribe((res: any) => {
                    this.landaService.alertSuccess('Berhasil', res.message);
                    this.reloadDataTable();
                    this.getVoucher();
                }, err => {
                    console.log(err);
                });
            }
        });
    }

}
