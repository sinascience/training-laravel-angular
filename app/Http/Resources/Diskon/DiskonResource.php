<?php

namespace App\Http\Resources\Diskon;

use Illuminate\Http\Resources\Json\JsonResource;

class DiskonResource extends JsonResource
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
            'user_auth_id' => $this->user_auth_id,
            'm_promo_id'=> $this->m_promo_id,
            'status' => $this->status
        ];
    }
}
