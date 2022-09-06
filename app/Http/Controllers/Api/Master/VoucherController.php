<?php

namespace App\Http\Controllers\Api\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\Master\VoucherHelper;
use App\Http\Resources\Voucher\VoucherResource;
use App\Http\Resources\Voucher\VoucherCollection;
use App\Http\Requests\Voucher\CreateRequest;
use App\Http\Requests\Voucher\UpdateRequest;
use App\Http\Resources\Voucher\DetailResource;

class VoucherController extends Controller
{
    private $voucher;

    public function __construct()
    {
        $this->voucher = new VoucherHelper();
    }

    /**
     * Mengambil data user dilengkapi dengan pagination
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     */
    public function index(Request $request)
    {
        $filter = [
            'page' => $request->page ?? null,
            'limit' => $request->limit ?? null,
        ];
        $vouchers = $this->voucher->getAll($filter, $filter['limit'], $request->sort ?? '');

        return response()->success(new VoucherCollection($vouchers));
    }

    /**
     * Membuat data user baru & disimpan ke tabel user_auth
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     */
    public function store(CreateRequest $request)
    {
        /**
         * Menampilkan pesan error ketika validasi gagal
         * pengaturan validasi bisa dilihat pada class app/Http/request/User/CreateRequest
         */
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->failed($request->validator->errors());
        }

        $dataInput = $request->only(['promo', 'customer', 'status', 'jumlah']);
        $dataInput['m_promo_id'] = $dataInput['promo']['id'];
        $dataInput['id_customer'] = $dataInput['customer']['id'];
        $dataVoucher = $this->voucher->create($dataInput);

        if (!$dataVoucher['status']) {
            return response()->failed($dataVoucher['error']);
        }

        return response()->success(new VoucherResource($dataVoucher['data']), 'Data voucher berhasil disimpan');
    }

    /**
     * Menampilkan user secara spesifik dari tabel user_auth
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     */
    public function show($id)
    {
        $dataVoucher = $this->voucher->getById($id);

        if (empty($dataVoucher)) {
            return response()->failed(['Data voucher tidak ditemukan']);
        }

        return response()->success(new DetailResource($dataVoucher));
    }

    /**
     * Mengubah data user di tabel user_auth
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     */
    public function update(UpdateRequest $request)
    {
        /**
         * Menampilkan pesan error ketika validasi gagal
         * pengaturan validasi bisa dilihat pada class app/Http/request/User/UpdateRequest
         */
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->failed($request->validator->errors());
        }

        $dataInput = $request->only(['promo', 'customer', 'status', 'jumlah', 'id']);
        $dataInput['m_promo_id'] = $dataInput['promo']['id'];
        $dataInput['id_customer'] = $dataInput['customer']['id'];

        $dataVoucher = $this->voucher->update($dataInput, $dataInput['id']);

        if (!$dataVoucher['status']) {
            return response()->failed($dataVoucher['error']);
        }

        return response()->success(new VoucherResource($dataVoucher['data']), 'Data voucher berhasil disimpan');
    }

    /**
     * Soft delete data user
     *
     * @author Wahyu Agung <wahyuagung26@email.com>
     */
    public function destroy($id)
    {
        $dataVoucher = $this->voucher->delete($id);

        if (!$dataVoucher) {
            return response()->failed(['Mohon maaf data voucher tidak ditemukan']);
        }

        return response()->success($dataVoucher, 'Data voucher telah dihapus');
    }
}
