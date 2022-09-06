<?php

namespace App\Http\Resources\Voucher;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class VoucherResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'jumlah' => $this->jumlah,
            'promo' => [
                'id' => $this->promo->id,
                'nama' => $this->promo->nama,
                'nominal' => $this->promo->nominal,
                'kadaluarsa' => Carbon::create($this->created_at)->addDays($this->promo->kadaluarsa)->locale('id')->diffForHumans(),
            ],
            'customer' => [
                'id' => $this->customer->id,
                'nama' => $this->customer->nama,
            ],
        ];
    }
}
