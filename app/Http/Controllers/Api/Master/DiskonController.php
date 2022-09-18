<?php

namespace App\Http\Controllers\Api\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\Master\DiskonHelper;
use App\Http\Resources\Diskon\DiskonResource;
use App\Http\Resources\Diskon\DiskonCollection;
use App\Http\Requests\Diskon\CreateRequest;
use App\Http\Requests\Diskon\UpdateRequest;

class DiskonController extends Controller
{
    protected $diskon;

    public function __construct()
    {
        $this->diskon = new DiskonHelper;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = [
        'user_auth_id' => $request->user_auth_id ?? null,
        'm_promo_id' => $request->m_promo_id ?? null];
        $items = $this->diskon->getAll($filter, 100, $request->sort ?? '');

        return response()->success(new DiskonCollection($items));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateRequest $request)
    {

        $dataInput = $request->only([
            'user_auth_id',
            'm_promo_id',
            'status'
        ]);
        $dataDiskon = $this->diskon->create($dataInput);

        if (!$dataDiskon['status']) {
            return response()->failed($dataDiskon['error'], 422);
        }

        return response()->success(new DiskonResource($dataDiskon['data']), 'Data item berhasil disimpan');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dataDiskon = $this->diskon->getById($id);

        if (empty($dataDiskon)) {
            return response()->failed(['Data item tidak ditemukan']);
        }

        return response()->success(new DiskonResource($dataDiskon));
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

        $dataInput = $request->only([
            'user_auth_id',
            'm_promo_id',
            'status',
            'id'
        ]);
        $dataDiskon = $this->diskon->update($dataInput, $dataInput['id']);

        if (!$dataDiskon['status']) {
            return response()->failed($dataDiskon['error']);
        }

        return response()->success(new DiskonResource($dataDiskon['data']), 'Data item berhasil disimpan');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dataDiskon = $this->diskon->delete($id);

        if (!$dataDiskon) {
            return response()->failed(['Mohon maaf data item tidak ditemukan']);
        }

        return response()->success($dataDiskon);
    }
}
