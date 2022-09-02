<?php

namespace App\Http\Controllers\Api\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\Master\PromoHelper;
use App\Http\Resources\Promo\PromoResource;
use App\Http\Resources\Promo\PromoCollection;
use App\Http\Requests\Promo\CreateRequest;
use App\Http\Requests\Promo\UpdateRequest;

class PromoController extends Controller
{
    protected $item;

    public function __construct()
    {
        $this->item = new PromoHelper;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = [
        'nama' => $request->nama ?? '',
        'limit' => $request->limit ?? null];
        $items = $this->item->getAll($filter, $filter['limit'], $request->sort ?? '');

        return response()->success(new PromoCollection($items));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateRequest $request)
    {
        /**
        * Menampilkan pesan error ketika validasi gagal
        * pengaturan validasi bisa dilihat pada class app/Http/request/User/CreateRequest
        */
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->failed($request->validator->errors(), 422);
        }
        
        $dataInput = $request->only(['nama', 'type', 'diskon', 'foto', 'fotoUrl' ,'nominal', 'kadaluarsa', 'syarat_ketentuan']);
        $dataPromo = $this->item->create($dataInput);
        
        if (!$dataPromo['status']) {
            return response()->failed($dataPromo['error'], 422);
        }
        
        return response()->success(new PromoResource($dataPromo['data']), 'Data item berhasil disimpan');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dataPromo = $this->item->getById($id);

        if (empty($dataPromo)) {
            return response()->failed(['Data item tidak ditemukan']);
        }

        return response()->success(new PromoResource($dataPromo));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
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

        $dataInput = $request->only(['nama', 'type', 'diskon', 'foto', 'fotoUrl' ,'nominal', 'kadaluarsa', 'syarat_ketentuan', 'id_promo']);
        $dataPromo = $this->item->update($dataInput, $dataInput['id_promo']);
        
        if (!$dataPromo['status']) {
            return response()->failed($dataPromo['error']);
        }

        return response()->success(new PromoResource($dataPromo['data']), 'Data item berhasil disimpan');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dataPromo = $this->item->delete($id);

        if (!$dataPromo) {
            return response()->failed(['Mohon maaf data item tidak ditemukan']);
        }

        return response()->success($dataPromo);
    }
}