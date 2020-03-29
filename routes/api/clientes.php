<?php
Route::group(['middleware' => 'auth:api'], function () {
    Route::prefix('clientes')->group( function(){
    Route::get('listarclientes', 'ClientesController@listar_clientes');
    Route::post('guardarclientes', 'ClientesController@guardar_clientes');
    Route::delete('{id}/eliminarCliente', 'ClientesController@eliminar_cliente');
});
});