<?php

namespace App\Models;

use CodeIgniter\Model;

class MY_Model extends Model
{

  function toSelect($args)
  {
    // prepare name to sql table name
    $tableName = str_replace(' ', '_', semAcento($args['table']));
    // exec query
    $this->from($tableName, true);
    $this->select(implode(', ', $args['fields']));
    // where
    if (isset($args['where'])) {
      $this->where($args['where']);
    }
    // group
    if (isset($args['group'])) {
      $this->groupBy($args['group']);
    }

    // order by last field in fields
    $alias = explode(' ', end($args['fields']));

    $this->orderBy($args['order_by'] ?? end($alias), ($args['order'] ?? 'asc'));

    $result = $this->get()->getResult();

    // if query has any result
    if (sizeof($result)) {
      // for each result
      foreach ($result as $v) {
        // put value as index and text as value
        $return[$v->{$args['fields'][0]}] = $v->{end($alias)};

        // se o número de fields for maior que 2
        if (!empty($v->{end($alias)}) && sizeof($args['fields']) > 2) {
          // adiciona o field do meio
          $return[$v->{$args['fields'][0]}] .= ' - ' . $v->{$args['fields'][1]};
        }
      }

      return $return;
    } elseif (isset($args['return'])) {
      return $args['return'];
    }
  }
}
