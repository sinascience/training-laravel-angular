<?php

namespace App\Http\Resources\Voucher;

use Illuminate\Http\Resources\Json\JsonResource;

class DetailResource extends JsonResource
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
            'id' => $this->resource->id,
            'status' => $this->resource->status,
            'jumlah' => $this->resource->jumlah,
            'promo' => [
                'id' => $this->promo->id,
                'nama' => $this->promo->nama,
            ],
            'customer' => [
                'id' => $this->customer->id,
                'nama' => $this->customer->nama,
            ],
        ];
    }
}
