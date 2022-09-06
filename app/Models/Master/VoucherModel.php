<?php

namespace App\Models\Master;

use App\Http\Traits\RecordSignature;
use App\Models\Master\CustomerModel;
use App\Models\Master\PromoModel;
use App\Repository\ModelInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

/**
 * Class Model untuk tabel user_auth
 * Dokumentasi Lengkap : https://laravel.com/docs/8.x/eloquent
 *
 */
class VoucherModel extends Model implements ModelInterface
{
    use SoftDeletes, RecordSignature, HasRelationships;

    /**
     * Menentukan nama tabel yang terhubung dengan Class ini
     *
     * @var string
     */
    protected $table = 'm_voucher';

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

    protected $fillable = [
        'm_promo_id',
        'id_customer',
        'status',
        'jumlah'
    ];

    /**
     * Relasi ke RoleModel / tabel user_roles
     *
     * @return void
     */
    public function promo()
    {
        return $this->belongsTo(PromoModel::class, 'm_promo_id', 'id');
    }
    public function customer()
    {
        return $this->belongsTo(CustomerModel::class, 'id_customer', 'id');
    }

    public function getAll(array $filter, int $itemPerPage = 0, string $sort = ''): object
    {
        $voucher = $this->query()->with('customer')->with('promo');

        if (!empty($filter['nama'])) {
            $voucher->where('nama', 'LIKE', '%' . $filter['nama'] . '%');
        }

        if (!empty($filter['email'])) {
            $voucher->where('email', 'LIKE', '%' . $filter['email'] . '%');
        }

        $sort = $sort ?: 'id DESC';
        $voucher->orderByRaw($sort);
        $itemPerPage = ($itemPerPage > 0) ? $itemPerPage : false;

        return $voucher->paginate($itemPerPage)->appends('sort', $sort);
    }

    public function getById(int $id): object
    {
        return $this->query()->with('promo')->with('customer')->find($id);
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
