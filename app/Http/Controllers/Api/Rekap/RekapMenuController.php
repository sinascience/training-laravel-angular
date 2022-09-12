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
    public function indexMenu(Request $request)
    {
        $filter = [
        'year' => $request->year ?? 2022,
        'month' => $request->month ?? 1];
        $rekapmenus = $this->rekapMenu->queryLaporanMenu($filter['month'], $filter['year']);

        $hello = [];
        $index = 0;
        foreach ($rekapmenus as $rekap) {
            $hello[$index] = [
                'nama' => $rekap->nama,
                'total' => $rekap->total,
                'kategori' => $rekap->kategori,
                'tanggal' => [
                    $rekap->tgl1,
                    $rekap->tgl2,
                    $rekap->tgl3,
                    $rekap->tgl4,
                    $rekap->tgl5,
                    $rekap->tgl6,
                    $rekap->tgl7,
                    $rekap->tgl8,
                    $rekap->tgl9,
                    $rekap->tgl10,
                    $rekap->tgl11,
                    $rekap->tgl12,
                    $rekap->tgl13,
                    $rekap->tgl14,
                    $rekap->tgl15,
                    $rekap->tgl16,
                    $rekap->tgl17,
                    $rekap->tgl18,
                    $rekap->tgl19,
                    $rekap->tgl20,
                    $rekap->tgl21,
                    $rekap->tgl22,
                    $rekap->tgl23,
                    $rekap->tgl24,
                    $rekap->tgl25,
                    $rekap->tgl26,
                    $rekap->tgl27,
                    $rekap->tgl28,
                    $rekap->tgl29,
                    $rekap->tgl30,
                    $rekap->tgl31
                ],
            ];
            $index++;
        }
        return response()->success($hello);
    }

    public function indexCustomer(Request $request)
    {
        $filter = [
        'year' => $request->year ?? 2022,
        'month' => $request->month ?? 1,
        'customer' => $request->customer ?? ''
    ];
        $rekapmenus = $this->rekapMenu->queryLaporanCustomer($filter['month'], $filter['year'], $filter['customer']);

        $hello = [];
        $index = 0;
        foreach ($rekapmenus as $rekap) {
            $hello[$index] = [
                'nama' => $rekap->nama,
                'total' => $rekap->total,
                'tanggal' => [
                    $rekap->tgl1,
                    $rekap->tgl2,
                    $rekap->tgl3,
                    $rekap->tgl4,
                    $rekap->tgl5,
                    $rekap->tgl6,
                    $rekap->tgl7,
                    $rekap->tgl8,
                    $rekap->tgl9,
                    $rekap->tgl10,
                    $rekap->tgl11,
                    $rekap->tgl12,
                    $rekap->tgl13,
                    $rekap->tgl14,
                    $rekap->tgl15,
                    $rekap->tgl16,
                    $rekap->tgl17,
                    $rekap->tgl18,
                    $rekap->tgl19,
                    $rekap->tgl20,
                    $rekap->tgl21,
                    $rekap->tgl22,
                    $rekap->tgl23,
                    $rekap->tgl24,
                    $rekap->tgl25,
                    $rekap->tgl26,
                    $rekap->tgl27,
                    $rekap->tgl28,
                    $rekap->tgl29,
                    $rekap->tgl30,
                    $rekap->tgl31
                ],
            ];
            $index++;
        }
        return response()->success($hello);
    }

    public function index(Request $request)
    {
        $filter = [
        'year' => $request->year ?? '',
        'month' => $request->month ?? '',
        'customer' => $request->customer ?? '',
        'menu' => $request->menu ?? ''
    ];
        $rekapmenus = $this->rekapMenu->queryLaporan($filter['month'], $filter['year'], $filter['customer'], $filter['menu']);

        $hello = [];
        $index = 0;
        foreach ($rekapmenus as $rekap) {
            $hello[$index] = [
                'no_struk' => $rekap->no_struk,
                'customer' => $rekap->customer,
                'tanggal' => $rekap->tanggal,
                'menu' => explode(",", $rekap->menu),
                'jumlah' => explode(",", $rekap->jumlah),
                'harga' => explode(",", $rekap->harga),
                'total' => explode(",", $rekap->total),
                'diskon' => $rekap->diskon,
                'potongan' => $rekap->potongan,
                'total_order' => $rekap->total_order,
                'total_bayar' => $rekap->total_bayar,
            ];
            $index++;
        }
        return response()->success($hello);
    }
    
    public function indexBulanan(Request $request)
    {
        $filter = [
        'year' => $request->year ?? 2022 ];
        $rekapmenus = $this->rekapMenu->queryLaporanBulanan($filter['year']);
        return response()->success($rekapmenus);
    }

    public function indexPerHariIni()
    {
        $rekapmenus = $this->rekapMenu->queryLaporanPerHariIni();
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