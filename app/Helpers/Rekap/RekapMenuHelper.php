<?php

namespace App\Helpers\Rekap;

use App\Models\Rekap\RekapMenuModel;
use App\Repository\RekapInterface;

/**
 * Helper untuk manajemen item / menu / produk
 * Mengambil data, menambah, mengubah, & menghapus ke tabel m_item
 *
 * @author Wahyu Agung <wahyuagung26@gmail.com>
 */
class RekapMenuHelper implements RekapInterface
{
    protected $rekapMenuModel;

    public function __construct()
    {
        $this->rekapMenuModel = new RekapMenuModel();
    }

    public function queryLaporan($month, $year, $cust, $menu)
    {
        return $this->rekapMenuModel->queryLaporan($month, $year, $cust, $menu);
    }

    public function queryLaporanCustomer($month, $year, $cust)
    {
        return $this->rekapMenuModel->queryLaporanCustomer($month, $year, $cust);
    }

    public function queryLaporanMenu($month, $year)
    {
        return $this->rekapMenuModel->queryLaporanMenu($month, $year);
    }

    public function queryLaporanBulanan($year)
    {
        return $this->rekapMenuModel->queryLaporanBulanan($year);
    }

    public function queryLaporanPerHariIni()
    {
        return $this->rekapMenuModel->queryLaporanPerHariIni();
    }

    /**
     * Mengambil data item dari tabel m_item
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
        return $this->rekapMenuModel->getAll($filter, $itemPerPage, $sort);
    }

    /**
     * Mengambil 1 data item dari tabel m_item
     *
     * @param  integer $id id dari tabel m_item
     * @return object
     */
    public function getById(int $id): object
    {
        return $this->rekapMenuModel->getById(($id));
    }

    /**
     * method untuk menginput data baru ke tabel m_item
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     *
     * @param array $payload
     * $payload['nama'] = string
     * $payload['email] = string
     * $payload['is_verified] = string
     *
     * @return void
     */
    
}
