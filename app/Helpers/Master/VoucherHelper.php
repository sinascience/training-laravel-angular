<?php

namespace App\Helpers\Master;

use App\Models\Master\VoucherModel;
use App\Repository\CrudInterface;

/**
 * Helper untuk manajemen user
 * Mengambil data, menambah, mengubah, & menghapus ke tabel user_auth
 *
 * @author Wahyu Agung <wahyuagung26@gmail.com>
 */
class VoucherHelper implements CrudInterface
{
    private $voucherModel;

    public function __construct()
    {
        $this->voucherModel = new VoucherModel();
    }

    /**
     * Mengambil data user dari tabel user_auth
     *
     * @author Wahyu Agung <wahyuagung26@gmail.com>
     *
     * @param  array $filter
     * $filter['nama'] = string
     * $filter['email'] = string
     * @param integer $itemPerPage jumlah data yang tampil dalam 1 halaman, kosongi jika ingin menampilkan semua data
     * @param string $sort nama kolom untuk melakukan sorting mysql beserta tipenya DESC / ASC
     *
     * @return object
     */
    public function getAll(array $filter, int $itemPerPage = 0, string $sort = ''): object
    {
        return $this->voucherModel->getAll($filter, $itemPerPage, $sort);
    }

    /**
     * Mengambil 1 data user dari tabel user_auth
     *
     * @param  integer $id id dari tabel user_auth
     *
     * @return object
     */
    public function getById(int $id): object
    {
        return $this->voucherModel->getById($id);
    }

    /**
     * method untuk menginput data baru ke tabel user_auth
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     *
     * @param array $payload
     * $payload['nama'] = string
     * $payload['email] = string
     * $payload['password] = string
     *
     * @return array
     */
    public function create(array $payload): array
    {
        try {
            $voucher = $this->voucherModel->store($payload);
            return [
                'status' => true,
                'data' => $voucher
            ];
        } catch (\Throwable $th) {
            return [
                'status' => false,
                'error' => $th->getMessage()
            ];
        }
    }

    /**
     * method untuk mengubah user pada tabel user_auth
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     *
     * @param array $payload
     * $payload['nama'] = string
     * $payload['email] = string
     * $payload['password] = string
     *
     * @return array
     */
    public function update(array $payload, int $id): array
    {
        try {
            $this->voucherModel->edit($payload, $id);
            return [
                'status' => true,
                'data' => $this->getById($id)
            ];
        } catch (\Throwable $th) {
            return [
                'status' => false,
                'error' => $th->getMessage()
            ];
        }
    }

    /**
     * Menghapus data user dengan sistem "Soft Delete"
     * yaitu mengisi kolom deleted_at agar data tsb tidak
     * keselect waktu menggunakan Query
     *
     * @param  integer $id id dari tabel user_auth
     *
     * @return bool
     */
    public function delete(int $id): bool
    {
        try {
            $this->voucherModel->drop($id);
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }
}
