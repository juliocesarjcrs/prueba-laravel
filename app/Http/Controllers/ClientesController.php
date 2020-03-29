<?php

namespace App\Http\Controllers;

use App\Models\Clientes;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientesController extends Controller
{
    public function listar_clientes()
    {
        try {
            $clientes = Clientes::get();
            return ['clientes' => $clientes];
        } catch (Exception $e) {
            return $this->handleError($e, 'Error en listar clientes');
        }
    }
    public function guardar_clientes(Request $request)
    {
        try {
            if (isset($request->id)) {
                $clientes = Clientes::find($request->id);
            } else {
                $data2 = $request->all();
                $v = Validator::make($data2, [
                    "nombre" => "required|string|max:100",
                    "tipoDocumento" => "required",
                    "numero_identificacion" => 'required',
                    "correo" => 'required|email',
                ]);
                if ($v->fails()) {
                    return ['error' => $v->errors()->first()];
                }
                $clientes = new Clientes;
            }
            $clientes->nombre = $request->nombre;
            $clientes->tipo_identificacion = $request->tipoDocumento;
            $clientes->numero_identificacion = $request->numero_identificacion;
            $clientes->direccion = $request->direccion;
            $clientes->correo = $request->correo;
            $clientes->save();
            if ($clientes->save()) {
                return ['mensaje' => 'Cliente actualizado'];
            } else {
                return ['error' => 'No guardó cliente'];

            }
        } catch (\Exception $e) {
            return $this->handleError($e, 'Error en crear clientes');
        }

    }
    public function eliminar_cliente($id)
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

                $user = Clientes::find($id)->delete();
                return ["Mensaje" => "cliente eliminado"];

            }, 5);

        } catch (\Exception $e) {
            return $this->handleError($e, 'Error en eliminar cliente ');
        }
    }
}
