<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Genders extends Migration
{
  public function up()
  {
    $this->forge->addField([
      'id' => [
        'type'           => 'INT',
        'constraint'     => 5,
        'unsigned'       => true,
        'auto_increment' => true,
      ],
      'gender' => [
        'type'       => 'VARCHAR',
        'constraint' => '100',
        'unique'     => true,
      ],
      'created_at timestamp default current_timestamp'
    ]);
    $this->forge->addKey('id', true);
    $this->forge->createTable('genders');
  }

  public function down()
  {
    $this->forge->dropTable('genders', true);
  }
}
