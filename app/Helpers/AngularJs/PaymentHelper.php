<?php

namespace App\Helpers\AngularJs;

use App\Models\AngularJs\PaymentModel;
use App\Repository\CrudInterface;

/**
 * Helper untuk manajemen customer
 * Mengambil data, menambah, mengubah, & menghapus ke tabel m_customer
 *
 * @author Wahyu Agung <wahyuagung26@gmail.com>
 */
class PaymentHelper implements CrudInterface
{
    private $paymentModel;

    public function __construct()
    {
        $this->paymentModel = new PaymentModel();
    }

    /**
     * Mengambil data customer dari tabel m_customer
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
        return $this->paymentModel->getAll($filter, $itemPerPage, $sort);
    }

    /**
     * Mengambil 1 data customer dari tabel m_customer
     *
     * @param  integer $id id dari tabel m_customer
     *
     * @return void
     */
    public function getById(int $id): object
    {
        return $this->paymentModel->getById($id);
    }

    /**
     * method untuk menginput data baru ke tabel m_customer
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     *
     * @param array $payload
     * $payload['nama'] = string
     * $payload['email] = string
     * $payload['is_verified] = string
     *
     * @return array
     */
    public function create(array $payload): array
    {
        try {
            $payment = $this->paymentModel->store($payload);

            return [
                'status' => true,
                'data' => $payment
            ];
        } catch (\Throwable $th) {
            return [
                'status' => false,
                'error' => $th->getMessage()
            ];
        }
    }

    /**
     * method untuk mengubah customer pada tabel m_customer
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     *
     * @param array $payload
     * $payload['nama'] = string
     * $payload['email] = string
     * $payload['is_verified] = boolean
     *
     * @return void
     */
    public function update(array $payload, int $id): array
    {
        try {
            $this->paymentModel->edit($payload, $id);

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
     * Menghapus data customer dengan sistem "Soft Delete"
     * yaitu mengisi kolom deleted_at agar data tsb tidak
     * keselect waktu menggunakan Query
     *
     * @param  integer $id id dari tabel m_customer
     * @return bool
     */
    public function delete(int $id): bool
    {
        try {
            $this->paymentModel->drop($id);
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }
}
