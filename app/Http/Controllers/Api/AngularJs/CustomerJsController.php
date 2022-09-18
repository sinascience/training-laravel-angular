<?php

namespace App\Http\Controllers\Api\AngularJs;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\AngularJs\CustomerJsHelper;
use App\Http\Requests\CustomerJs\CustomerRequest;
use App\Http\Resources\CustomerJs\CustomerResource;
use App\Http\Resources\CustomerJs\CustomerCollection;

class CustomerJsController extends Controller
{
    private $customer;

    public function __construct()
    {
        $this->customer = new CustomerJsHelper();
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
        ];
        $listCustomer = $this->customer->getAll($filter, 0, $request->sort ?? '');

        return response()->success(new CustomerCollection($listCustomer));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CustomerRequest $request)
    {

        $dataInput = $request->only(['nama', 'company', 'nomor', 'birth_day']);
        $dataCust = $this->customer->create($dataInput);

        if (!$dataCust['status']) {
            return response()->failed($dataCust['error'], 422);
        }

        return response()->success([], 'Data customer berhasil disimpan');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dataCust = $this->customer->getById($id);

        if (empty($dataCust)) {
            return response()->failed(['Data customer tidak ditemukan']);
        }

        return response()->success(new CustomerResource($dataCust));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(CustomerRequest $request)
    {

        $dataInput = $request->only(['nama', 'company', 'nomor', 'birth_day', 'id']);
        $dataCust = $this->customer->update($dataInput, $dataInput['id']);

        if (!$dataCust['status']) {
            return response()->failed($dataCust['error']);
        }

        return response()->success(new CustomerResource($dataCust['data']), 'Data customer berhasil disimpan');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dataCust = $this->customer->delete($id);

        if (!$dataCust) {
            return response()->failed(['Mohon maaf data customer tidak ditemukan']);
        }

        return response()->success($dataCust);
    }
}
