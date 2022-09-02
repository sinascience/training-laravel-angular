<?php

namespace App\Models\Master;

use App\Http\Traits\RecordSignature;
use App\Repository\ModelInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasRelationships;

class PromoModel extends Model implements ModelInterface
{
    use SoftDeletes, RecordSignature, HasRelationships, HasFactory;

    /**
    * Menentukan nama tabel yang terhubung dengan Class ini
    *
    * @var string
    */
    protected $table = 'm_promo';

    /**
     * Menentukan primary key, jika nama kolom primary key adalah "id",
     * langkah deklarasi ini bisa dilewati
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Akan mengisi kolom "created_at" dan "updated_at" secara otomatis,
     *
     * @var bool
     */
    public $timestamps = true;

    protected $attributes = [
        
    ];

    protected $fillable = [
        'nama',
        'type',
        'diskon',
        'nominal',
        'syarat_ketentuan',
        'foto',
        'kadaluarsa',
    ];

    // /**
    //  * Relasi ke ItemModelDet / tabel m_promo_det
    //  *
    //  * @return void
    //  */
    // public function itemDet()
    // {
    //     return $this->hasMany(ItemDetModel::class, 'm_promo_id', 'id');
    // }

    /**
     * Menampilkan foto user dalam bentuk URL
     *
     * @return string
     */
    public function fotoUrl() {
        if(empty($this->foto)) {
            return asset('assets/img/no-image.png');
        } 

        return asset('storage/' . $this->foto);
    }
    
    public function getAll(array $filter, int $itemPerPage = 0, string $sort = ''): object
    {
        $dataPromo = $this->query();

        if (!empty($filter['nama'])) {
            $dataPromo->where('nama', 'LIKE', '%'.$filter['nama'].'%');
        }


        $sort = $sort ?: 'id DESC';
        $dataPromo->orderByRaw($sort);
        $itemPerPage = $itemPerPage > 0 ? $itemPerPage : false;

        return $dataPromo->paginate($itemPerPage)->appends('sort', $sort);
    }

    public function getById(int $id): object
    {
        return $this->find($id);
    }

    public function store(array $payload)
    {
        return $this->create($payload);
    }

    public function edit(array $payload, int $id)
    {
        return $this->find($id)->update($payload);
    }

    public function drop(int $id)
    {
        return $this->find($id)->delete();
    }
}
