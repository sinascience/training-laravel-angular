<?php

namespace App\Models\Rekap;

use App\Http\Traits\RecordSignature;
use App\Repository\ModelRekapInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasRelationships;

class RekapMenuModel extends Model implements ModelRekapInterface
{
    use RecordSignature, HasRelationships, HasFactory;

    /**
    * Menentukan nama tabel yang terhubung dengan Class ini
    *
    * @var string
    */
    protected $table = 't_detail_order';

    /**
     * Menentukan primary key, jika nama kolom primary key adalah "id",
     * langkah deklarasi ini bisa dilewati
     *
     * @var string
     */
    protected $primaryKey = 'id_detail';

    /**
     * Akan mengisi kolom "created_at" dan "updated_at" secara otomatis,
     *
     * @var bool
     */
    public $timestamps = false;

    protected $attributes = [
        
    ];


    // /**
    //  * Relasi ke ItemModelDet / tabel m_item_det
    //  *
    //  * @return void
    //  */
    // public function itemDet()
    // {
    //     return $this->hasMany(ItemDetModel::class, 'm_item_id', 'id');
    // }

    public function queryLaporan($month, $year, $cust, $menu)
    {
        if (!empty($cust)) {
            $customer = "and m_customer.nama = '$cust'";
        } else {
            $customer = '';
        }

        if (!empty($year)) {
            $annual = "and YEAR(tanggal)= '" . (string) $year ."'";
        } else {
            $annual = '';
        }

        if (!empty($year)) {
            $monthly = "and MONTH(tanggal)= '" . (string) $month . "'";
        } else {
            $monthly = '';
        }

        if (!empty($menu)) {
            $menus = "and m_item.nama = '$menu'";
        } else {
            $menus = '';
        }
        
        $query = " SELECT t_order.no_struk, m_customer.nama as customer ,t_order.tanggal, 
                            GROUP_CONCAT(m_item.nama) as menu, 
                            GROUP_CONCAT(t_detail_order.jumlah) as jumlah,
                            GROUP_CONCAT(m_item.harga) as harga,  
                            GROUP_CONCAT(t_detail_order.total) as total, t_order.diskon, t_order.potongan, t_order.total_order, t_order.total_bayar
                            FROM t_detail_order
                            JOIN m_item on t_detail_order.id_item = m_item.id 
                            JOIN t_order on t_detail_order.id_order = t_order.id_order 
                            JOIN m_customer on t_order.id_user = m_customer.id 
                            where t_detail_order.is_deleted = 0 $customer $annual $monthly $menus
                            group by t_order.no_struk
                    ";
        return DB::select(DB::raw($query));
    }

    public function queryLaporanCustomer($month, $year, $cust)
    {
        if (!empty($cust)) {
            $customer = "and m_customer.nama = '$cust'";
        } else {
            $customer = '';
        }
        $query = " SELECT m_customer.nama,
                    sum(t_order.total_order) AS total,
    				SUM(CASE WHEN DAY(tanggal)=1 THEN t_order.total_order ELSE 0 END) as tgl1,
                    SUM(CASE WHEN DAY(tanggal)=2 THEN t_order.total_order ELSE 0 END) as tgl2,
                    SUM(CASE WHEN DAY(tanggal)=3 THEN t_order.total_order ELSE 0 END) as tgl3,
                    SUM(CASE WHEN DAY(tanggal)=4 THEN t_order.total_order ELSE 0 END) as tgl4,
                    SUM(CASE WHEN DAY(tanggal)=5 THEN t_order.total_order ELSE 0 END) as tgl5,
                    SUM(CASE WHEN DAY(tanggal)=6 THEN t_order.total_order ELSE 0 END) as tgl6,
                    SUM(CASE WHEN DAY(tanggal)=7 THEN t_order.total_order ELSE 0 END) as tgl7,
                    SUM(CASE WHEN DAY(tanggal)=8 THEN t_order.total_order ELSE 0 END) as tgl8,
                    SUM(CASE WHEN DAY(tanggal)=9 THEN t_order.total_order ELSE 0 END) as tgl9,
                    SUM(CASE WHEN DAY(tanggal)=10 THEN t_order.total_order ELSE 0 END) as tgl10,
                    SUM(CASE WHEN DAY(tanggal)=11 THEN t_order.total_order ELSE 0 END) as tgl11,
                    SUM(CASE WHEN DAY(tanggal)=12 THEN t_order.total_order ELSE 0 END) as tgl12,
                    SUM(CASE WHEN DAY(tanggal)=13 THEN t_order.total_order ELSE 0 END) as tgl13,
                    SUM(CASE WHEN DAY(tanggal)=14 THEN t_order.total_order ELSE 0 END) as tgl14,
                    SUM(CASE WHEN DAY(tanggal)=15 THEN t_order.total_order ELSE 0 END) as tgl15,
                    SUM(CASE WHEN DAY(tanggal)=16 THEN t_order.total_order ELSE 0 END) as tgl16,
                    SUM(CASE WHEN DAY(tanggal)=17 THEN t_order.total_order ELSE 0 END) as tgl17,
                    SUM(CASE WHEN DAY(tanggal)=18 THEN t_order.total_order ELSE 0 END) as tgl18,
                    SUM(CASE WHEN DAY(tanggal)=19 THEN t_order.total_order ELSE 0 END) as tgl19,
                    SUM(CASE WHEN DAY(tanggal)=20 THEN t_order.total_order ELSE 0 END) as tgl20,
                    SUM(CASE WHEN DAY(tanggal)=21 THEN t_order.total_order ELSE 0 END) as tgl21,
                    SUM(CASE WHEN DAY(tanggal)=22 THEN t_order.total_order ELSE 0 END) as tgl22,
                    SUM(CASE WHEN DAY(tanggal)=23 THEN t_order.total_order ELSE 0 END) as tgl23,
                    SUM(CASE WHEN DAY(tanggal)=24 THEN t_order.total_order ELSE 0 END) as tgl24,
                    SUM(CASE WHEN DAY(tanggal)=25 THEN t_order.total_order ELSE 0 END) as tgl25,
                    SUM(CASE WHEN DAY(tanggal)=26 THEN t_order.total_order ELSE 0 END) as tgl26,
                    SUM(CASE WHEN DAY(tanggal)=27 THEN t_order.total_order ELSE 0 END) as tgl27,
                    SUM(CASE WHEN DAY(tanggal)=28 THEN t_order.total_order ELSE 0 END) as tgl28,
                    SUM(CASE WHEN DAY(tanggal)=29 THEN t_order.total_order ELSE 0 END) as tgl29,
                    SUM(CASE WHEN DAY(tanggal)=30 THEN t_order.total_order ELSE 0 END) as tgl30,
                    SUM(CASE WHEN DAY(tanggal)=31 THEN t_order.total_order ELSE 0 END) as tgl31
    				FROM t_order
    				JOIN m_customer on t_order.id_user = m_customer.id
                    where MONTH(tanggal)= '" . (string) $month . "' and YEAR(tanggal)= '" . (string) $year ."' ". $customer ." group by m_customer.nama;
                    ";
        return DB::select(DB::raw($query));
    }
    
    public function queryLaporanMenu($month, $year)
    {
        $query = " SELECT m_item.nama, m_item.kategori,
        sum(t_detail_order.total) AS total,
        SUM(CASE WHEN DAY(tanggal)=1 THEN t_detail_order.total ELSE 0 END) as tgl1,
        SUM(CASE WHEN DAY(tanggal)=2 THEN t_detail_order.total ELSE 0 END) as tgl2,
        SUM(CASE WHEN DAY(tanggal)=3 THEN t_detail_order.total ELSE 0 END) as tgl3,
        SUM(CASE WHEN DAY(tanggal)=4 THEN t_detail_order.total ELSE 0 END) as tgl4,
        SUM(CASE WHEN DAY(tanggal)=5 THEN t_detail_order.total ELSE 0 END) as tgl5,
        SUM(CASE WHEN DAY(tanggal)=6 THEN t_detail_order.total ELSE 0 END) as tgl6,
        SUM(CASE WHEN DAY(tanggal)=7 THEN t_detail_order.total ELSE 0 END) as tgl7,
        SUM(CASE WHEN DAY(tanggal)=8 THEN t_detail_order.total ELSE 0 END) as tgl8,
        SUM(CASE WHEN DAY(tanggal)=9 THEN t_detail_order.total ELSE 0 END) as tgl9,
        SUM(CASE WHEN DAY(tanggal)=10 THEN t_detail_order.total ELSE 0 END) as tgl10,
        SUM(CASE WHEN DAY(tanggal)=11 THEN t_detail_order.total ELSE 0 END) as tgl11,
        SUM(CASE WHEN DAY(tanggal)=12 THEN t_detail_order.total ELSE 0 END) as tgl12,
        SUM(CASE WHEN DAY(tanggal)=13 THEN t_detail_order.total ELSE 0 END) as tgl13,
        SUM(CASE WHEN DAY(tanggal)=14 THEN t_detail_order.total ELSE 0 END) as tgl14,
        SUM(CASE WHEN DAY(tanggal)=15 THEN t_detail_order.total ELSE 0 END) as tgl15,
        SUM(CASE WHEN DAY(tanggal)=16 THEN t_detail_order.total ELSE 0 END) as tgl16,
        SUM(CASE WHEN DAY(tanggal)=17 THEN t_detail_order.total ELSE 0 END) as tgl17,
        SUM(CASE WHEN DAY(tanggal)=18 THEN t_detail_order.total ELSE 0 END) as tgl18,
        SUM(CASE WHEN DAY(tanggal)=19 THEN t_detail_order.total ELSE 0 END) as tgl19,
        SUM(CASE WHEN DAY(tanggal)=20 THEN t_detail_order.total ELSE 0 END) as tgl20,
        SUM(CASE WHEN DAY(tanggal)=21 THEN t_detail_order.total ELSE 0 END) as tgl21,
        SUM(CASE WHEN DAY(tanggal)=22 THEN t_detail_order.total ELSE 0 END) as tgl22,
        SUM(CASE WHEN DAY(tanggal)=23 THEN t_detail_order.total ELSE 0 END) as tgl23,
        SUM(CASE WHEN DAY(tanggal)=24 THEN t_detail_order.total ELSE 0 END) as tgl24,
        SUM(CASE WHEN DAY(tanggal)=25 THEN t_detail_order.total ELSE 0 END) as tgl25,
        SUM(CASE WHEN DAY(tanggal)=26 THEN t_detail_order.total ELSE 0 END) as tgl26,
        SUM(CASE WHEN DAY(tanggal)=27 THEN t_detail_order.total ELSE 0 END) as tgl27,
        SUM(CASE WHEN DAY(tanggal)=28 THEN t_detail_order.total ELSE 0 END) as tgl28,
        SUM(CASE WHEN DAY(tanggal)=29 THEN t_detail_order.total ELSE 0 END) as tgl29,
        SUM(CASE WHEN DAY(tanggal)=30 THEN t_detail_order.total ELSE 0 END) as tgl30,
        SUM(CASE WHEN DAY(tanggal)=31 THEN t_detail_order.total ELSE 0 END) as tgl31
        FROM t_detail_order
        JOIN m_item on t_detail_order.id_item = m_item.id JOIN t_order on t_detail_order.id_order = t_order.id_order
        where MONTH(tanggal)= '" . (string) $month . "' and YEAR(tanggal)= '" . (string) $year . "' group by m_item.kategori, m_item.nama;
                    ";
        
        return DB::select(DB::raw($query));
    }

    
    public function getAll(array $filter, int $itemPerPage = 0, string $sort = ''): object
    {
        $dataItem = $this->query();

        $sort = $sort ?: 'id DESC';
        $dataItem->orderByRaw($sort);
        $itemPerPage = $itemPerPage > 0 ? $itemPerPage : false;

        return $dataItem->paginate($itemPerPage)->appends('sort', $sort);
    }

    public function getById(int $id): object
    {
        return $this->query()->with('itemDet')->find($id);
    }

}
