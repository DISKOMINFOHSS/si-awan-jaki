<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'super admin']);
        $sa = User::create([
            'name' => 'Super Admin',
            'username' => 'sa',
            'password' => Hash::make('password'),
        ]);
        $sa->assignRole('super admin');

        Role::create(['name' => 'admin']);
        $admin = User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'password' => Hash::make('password'),
        ]);
        $admin->assignRole('admin');
    }
}
