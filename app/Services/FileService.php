<?php

namespace App\Services;

use App\Models\File;

class FileService
{
    public function addFile(array $data): int
    {
        $file = new File;
        $file->name = $data['file']->getClientOriginalName();
        $file->path = $data['file']->storeAs($data['path'], $data['file']->hashName());
        $file->created_by = $data['created_by'];

        $file->save();

        return $file->id;
    }

    public function deleteFile(string $id)
    {
        $file = File::findOrFail($id);
        $file->delete();
    }
}
