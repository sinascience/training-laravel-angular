import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user-service.service';
import { empty } from 'rxjs';

@Component({
    selector: 'user-daftar',
    templateUrl: './daftar-user.component.html',
    styleUrls: ['./daftar-user.component.scss']
})
export class DaftarUserComponent implements OnInit {

    @ViewChild(DataTableDirective) dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    dtOptions: any;

    listUser: [];
    titleModal: string;
    modelId: number;
    nama: string;
    email: string;

    offsetParams: any;
    limitParams: any;
    pageParams: any;


    constructor(
        private userService: UserService,
        private landaService: LandaService,
        private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.getUser();
    }

    trackByIndex(index: number): any {
        return index;
    }

    reloadDataTable(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
    }

    getUser() {
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
                
                this.userService.getUsers(params).subscribe((res: any) => {
                    this.listUser = res.data.list;

                    callback({
                        recordsTotal: res.data.meta.total,
                        recordsFiltered: res.data.meta.total,
                        data: [],
                    });
                }, (err: any) => { 
                    console.log(err);
                });
            },

            columns: [{
                title: ''
              }, {
                title: 'Nama',
                data: 'nama'
              }, {
                title: 'Email',
                data: 'email'
              }, {
                title: 'Hak Akses',
                data: 'akses'
              }]
        };
    }

    getUserBySearch(e) {
        let filter = e.target.value;
        const params = {
            filter: JSON.stringify({}),
            offset: this.offsetParams,
            limit: this.limitParams,
            page: this.pageParams,
            nama: filter,
        };
        this.userService.getUsers(params).subscribe((res: any) => {
            this.listUser = res.data.list;
        }, (err: any) => {
            console.log(err);
        });
    }

    createUser(modal) {
        this.titleModal = 'Tambah User';
        this.modelId = 0;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    updateUser(modal, userModel) {
        this.titleModal = 'Edit User: ' + userModel.nama;
        this.modelId = userModel.id;
        this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    }

    pencarian(cari) {
        this.titleModal = 'Cari User'
        this.modalService.open(cari)
    }

    deleteUser(userId) {
        Swal.fire({
            title: 'Apakah kamu yakin ?',
            text: 'User ini tidak dapat login setelah kamu menghapus datanya',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, Hapus data ini !',
        }).then((result) => {
            if (result.value) {
                this.userService.deleteUser(userId).subscribe((res: any) => {
                    this.landaService.alertSuccess('Berhasil', res.message);
                    this.getUser();
                }, err => {
                    console.log(err);
                });
            }
        });
    }
}
