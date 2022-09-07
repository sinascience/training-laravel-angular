<?php

namespace App\Http\Controllers\Api\Rekap;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\Rekap\RekapMenuHelper;
use App\Http\Resources\RekapMenu\RekapMenuResource;
use App\Http\Resources\RekapMenu\RekapMenuCollection;

class RekapMenuController extends Controller
{
    protected $rekapMenu;

    public function __construct()
    {
        $this->rekapMenu = new RekapMenuHelper;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = [
        'year' => $request->year ?? 2022,
        'month' => $request->month ?? 1];
        $rekapmenus = $this->rekapMenu->queryLaporanMenu($filter['month'], $filter['year']);

        return response()->success($rekapmenus);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dataRekapMenu = $this->rekapMenu->getById($id);

        if (empty($dataRekapMenu)) {
            return response()->failed(['Data item tidak ditemukan']);
        }

        return response()->success($dataRekapMenu);
    }

}