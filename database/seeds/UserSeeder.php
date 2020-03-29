<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'julio',
            'rol' => 1,
            'email' =>'julio@correo.com',
            'password' => Hash::make('123456'),
        ]);
    }
}
