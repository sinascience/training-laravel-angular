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
        return [
            'id' => $this->id,
            'fotoUrl' => $this->fotoUrl(),
            'nama' => $this->nama,
            'deskripsi' => $this->deskripsi,
            'kategori' => $this->kategori,
            'harga' => $this->harga,
            'is_available' => $this->is_available
        ];
    }
}
