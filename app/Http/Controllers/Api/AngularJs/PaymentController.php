<?php

namespace App\Http\Controllers\Api\AngularJs;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\AngularJs\PaymentHelper;
use App\Http\Requests\Payment\PaymentRequest;
use App\Http\Resources\Payment\PaymentResource;
use App\Http\Resources\Payment\PaymentCollection;

class PaymentController extends Controller
{
    private $payment;

    public function __construct()
    {
        $this->payment = new PaymentHelper();
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
        $listPayment = $this->payment->getAll($filter, 0, $request->sort ?? '');

        return response()->success(new PaymentCollection($listPayment));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PaymentRequest $request)
    {

        $dataInput = $request->only(['nama']);
        $dataCust = $this->payment->create($dataInput);

        if (!$dataCust['status']) {
            return response()->failed($dataCust['error'], 422);
        }

        return response()->success([], 'Data Payment berhasil disimpan');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dataCust = $this->payment->getById($id);

        if (empty($dataCust)) {
            return response()->failed(['Data Payment tidak ditemukan']);
        }

        return response()->success(new PaymentResource($dataCust));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(PaymentRequest $request)
    {

        $dataInput = $request->only(['nama', 'id']);
        $dataCust = $this->payment->update($dataInput, $dataInput['id']);

        if (!$dataCust['status']) {
            return response()->failed($dataCust['error']);
        }

        return response()->success(new PaymentResource($dataCust['data']), 'Data Payment berhasil disimpan');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dataCust = $this->payment->delete($id);

        if (!$dataCust) {
            return response()->failed(['Mohon maaf data Payment tidak ditemukan']);
        }

        return response()->success($dataCust);
    }
}
