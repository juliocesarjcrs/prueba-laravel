<?php

namespace App\Http\Controllers;

use App\User;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;

class UsuariosController extends Controller
{
    public function listar_usuarios(Request $request)
    {
        try {

            $usuarios = User::paginate(10);
            return [
                'pagination' => [
                    'total' => $usuarios->total(),
                    'current_page' => $usuarios->currentPage(),
                    'per_page' => $usuarios->perPage(),
                    'last_page' => $usuarios->lastPage(),
                    'from' => $usuarios->firstItem(),
                    'to' => $usuarios->firstItem(),
                ],
                "usuarios" => $usuarios,
            ];

        } catch (\Exception $e) {
            return $this->handleError($e, 'Error listar registros');

        }
    }
    public function guardar_usuario(Request $request)
    {
        try {
            return DB::transaction(function () use ($request) {
                if(isset($request->id)){
                    $user = User::find($request->id);
                }else{
                    $data2 = $request->all();
                    $v = Validator::make($data2, [
                        "password" => "required|string|min:6",
                        "rol" => "required",
                        "email" => 'unique:users,email',
                        "name" => "required|string|max:255",
                    ]);
                    if ($v->fails()) {
                        return ['error' => $v->errors()->first()];
                    }
                    $user = new User;
                    // dd($request->password);
                    $user->password = bcrypt($request->password);
                }

                $user->name = $request->name;
                $user->rol = $request->rol;
                $user->email = $request->email;
                $user->save();
                return ["user" => $user];

            }, 5);
        } catch (Exception $e) {
            return $this->handleError($e, 'Error guardando registro');
        }
    }
    public function eliminar_usuario($id)
    {
        try {
            return DB::transaction(function () use ($id) {
                $data["id"] = $id;
                $v = Validator::make($data, [
                    "id" => "required|exists:users,id",
                ]);
                if ($v->fails()) {
                    return ['error' => $v->errors()->first()];
                }

                $user = User::find($id)->delete();
                return ["Mensaje" => "usuario eliminado"];

            }, 5);

        } catch (\Exception $e) {
            return $this->handleError($e, 'Error en eliminar usuario ');
        }
    }
}
