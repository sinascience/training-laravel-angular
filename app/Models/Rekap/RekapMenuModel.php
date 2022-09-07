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

    public function queryLaporanMenu($month, $year)
    {
        $query = " SELECT m_item.nama, m_item.kategori,
        sum(t_detail_order.total) AS total,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=1 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl1,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=2 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl2,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=3 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl3,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=4 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl4,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=5 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl5,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=6 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl6,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=7 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl7,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=8 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl8,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=9 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl9,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=10 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl10,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=11 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl11,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=12 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl12,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=13 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl13,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=14 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl14,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=15 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl15,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=16 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl16,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=17 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl17,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=18 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl18,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=19 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl19,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=20 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl20,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=21 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl21,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=22 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl22,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=23 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl23,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=24 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl24,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=25 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl25,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=26 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl26,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=27 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl27,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=28 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl28,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=29 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl29,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=30 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl30,
        FORMAT(SUM(CASE WHEN DAY(tanggal)=31 THEN t_detail_order.total ELSE 0 END), 'C', 'id-ID') as tgl31
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
