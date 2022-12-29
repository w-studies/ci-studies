<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class Genders extends Seeder
{
  public function run()
  {
    $data = [
      ['gender' => 'Masculino'],
      ['gender' => 'Feminino'],
      ['gender' => 'Outro']
    ];

    // Using Query Builder
    $this->db->table('genders')->insertBatch($data);
  }
}
