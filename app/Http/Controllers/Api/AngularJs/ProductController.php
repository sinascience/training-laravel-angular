<?php

namespace App\Http\Controllers\Api\AngularJs;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\AngularJs\ProductHelper;
use App\Http\Requests\Product\ProductRequest;
use App\Http\Resources\Product\ProductResource;
use App\Http\Resources\Product\ProductCollection;

class ProductController extends Controller
{
    private $product;

    public function __construct()
    {
        $this->product = new ProductHelper();
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
        $listProduct = $this->product->getAll($filter, 0, $request->sort ?? '');

        return response()->success(new ProductCollection($listProduct));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {

        $dataInput = $request->only(['nama', 'deskripsi', 'harga']);
        $dataCust = $this->product->create($dataInput);

        if (!$dataCust['status']) {
            return response()->failed($dataCust['error'], 422);
        }

        return response()->success([], 'Data Product berhasil disimpan');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dataCust = $this->product->getById($id);

        if (empty($dataCust)) {
            return response()->failed(['Data Product tidak ditemukan']);
        }

        return response()->success(new ProductResource($dataCust));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request)
    {

        $dataInput = $request->only(['nama', 'deskripsi', 'harga', 'id_product']);
        $dataCust = $this->product->update($dataInput, $dataInput['id_product']);

        if (!$dataCust['status']) {
            return response()->failed($dataCust['error']);
        }

        return response()->success(new ProductResource($dataCust['data']), 'Data Product berhasil disimpan');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dataCust = $this->product->delete($id);

        if (!$dataCust) {
            return response()->failed(['Mohon maaf data Product tidak ditemukan']);
        }

        return response()->success($dataCust);
    }
}
