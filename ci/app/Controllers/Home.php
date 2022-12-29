<?php

namespace App\Controllers;

use App\Models\GendersModel;

class Home extends BaseController
{
  protected $data;

  public function __construct()
  {
    // model fica disponível para todos os methods
    $this->model = new GendersModel();

    // inicia variável para guardar os genders
    $this->data = ['fData' => (object)[]];
  }

  public function index()
  {

    $selects = [
      [
        'table'  => 'genders',
        'fields' => ['id', 'gender'],
        'order'  => 'asc',
      ],
    ];

    foreach ($selects as $select) {

      $varName = isset($select['alias']) ? $select['alias'] : $select['table'];

      // gera uma variável com os dados do database
      $this->data['fData']->$varName = $this->model->toSelect($select);
    }

    return view('welcome_message', $this->data);
  }
}
