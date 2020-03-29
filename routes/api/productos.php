<?php
Route::group(['middleware' => 'auth:api'], function () {
    Route::prefix('productos')->group( function(){
    ////     new routes
    Route::get('listCategoriesAndSub', 'ProductosController@listar_categories_subcategories');
    Route::get('listarProductos', 'ProductosController@listar_productos');
    Route::post('guardarProductos', 'ProductosController@guardar_productos');
});
});
