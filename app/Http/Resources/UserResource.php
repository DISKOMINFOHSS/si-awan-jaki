<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'nama'      => $this->nama,
            'nip'       => $this->whenNotNull($this->nip),
            'jabatan'   => $this->whenNotNull($this->jabatan),
            'username'  => $this->username,
            'role'      => $this->whenLoaded('roles')[0]->name,
        ];
    }
}
