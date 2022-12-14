<?php

namespace App\Models\Master;

use App\Http\Traits\RecordSignature;
use App\Repository\ModelInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasRelationships;

class DiskonModel extends Model implements ModelInterface
{
    use SoftDeletes, RecordSignature, HasRelationships, HasFactory;

    /**
    * Menentukan nama tabel yang terhubung dengan Class ini
    *
    * @var string
    */
    protected $table = 'm_diskon';

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
        'user_auth_id',
        'm_promo_id',
        'status',
    ];

    /**
     * Relasi ke UserModel / tabel user_auth
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(UserModel::class, 'user_auth_id', 'id');
    }

    /**
     * Relasi ke PromoModel / tabel m_promo
     *
     * @return void
     */
    public function promo()
    {
        return $this->belongsTo(PromoModel::class, 'm_promo_id', 'id');
    }

    
    public function getAll(array $filter, int $itemPerPage = 0, string $sort = ''): object
    {
        $dataItem = $this->query();

        if (!empty($filter['user_auth_id'])) {
            $dataItem->where('user_auth_id', $filter['user_auth_id']);
        }

        if (!empty($filter['m_promo_id'])) {
            $dataItem->where('m_promo_id', $filter['m_promo_id']);
        }

        $sort = $sort ?: 'id DESC';
        $dataItem->orderByRaw($sort);
        $itemPerPage = $itemPerPage > 0 ? $itemPerPage : false;

        return $dataItem->paginate($itemPerPage)->appends('sort', $sort);
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
