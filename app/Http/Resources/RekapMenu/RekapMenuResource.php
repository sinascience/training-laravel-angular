<?php

namespace App\Http\Resources\RekapMenu;

use Illuminate\Http\Resources\Json\JsonResource;

class RekapMenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $hello = [];
        $index = 0;
        foreach ($request as $rekap) {
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
        return $hello;
    }
}
