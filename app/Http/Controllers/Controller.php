<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
  use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
  public function handleError($e, $customMessage = null)
  {
    return [
      'error'=>is_null($customMessage)? 'Error found': $customMessage,
      'message'=> "{$e->getMessage()} - en la línea: {$e->getLine()}",
      'line'=> "{$e->getFile()} - en la línea: {$e->getLine()}",
      'trace'=> $e->getTrace(),
      // 'error5'=>"Reportado en {$errores->id}",
    ];
  }
}
