<?php
Route::group(['middleware' => 'auth:api'], function () {
    Route::prefix('facturas')->group( function(){
    ////     new routes
    Route::get('listarclientesFacturas', 'FacturasController@listar_clientes');
    Route::post('guardarFactura', 'FacturasController@guardar_factura');
    Route::post('buscarProductos', 'FacturasController@buscar_productos');// buscarProductosPorClave
    Route::post('buscarProductosPorClave', 'FacturasController@buscar_productos_por_clave');// 
});
});
