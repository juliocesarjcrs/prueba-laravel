<?php
Route::group(['middleware' => 'auth:api'], function () {
    Route::prefix('usuarios')->group( function(){
    Route::get('listarUsuarios', 'UsuariosController@listar_usuarios');
    Route::post('guardarUsuario', 'UsuariosController@guardar_usuario');
    Route::delete('{id}/eliminarUsuario', 'UsuariosController@eliminar_usuario');

    
});
});