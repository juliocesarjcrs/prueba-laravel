<?php
Route::group(['middleware' => 'auth:api'], function () {
    Route::prefix('registros')->group( function(){
        $controlador = "RegistrosController";
        Route::get('listarRegistros', "$controlador@listar_registros");
        Route::post('guardarRegistro', "$controlador@guardar_registro");
        Route::post('consultar-tiempo', "$controlador@consultar_tiempo_placa");
        Route::post('consultar-tiempo-registro', "$controlador@consultar_tiempo_registro");
        Route::get('buscador-placa/{query}', "$controlador@buscador_placa");
        Route::get('buscador-cedula/{query}', "$controlador@buscador_cedula");
        Route::post('confirmar-pago', "$controlador@confirmar_pago");

        Route::post('guardarMensualidad', "$controlador@guardar_mensualidad");
        Route::get('listarMensualidades', "$controlador@listar_mensualidades");
        Route::get('mensualidad-sugerida/{tipo}', "$controlador@mensualidad_sugerida");




    });
});
