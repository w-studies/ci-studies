<?php

/**
 * @param $args
 * @return string
 * @param $args[
 * 'label' => 'Texto que vai aparecer no label',
 * 'name' => 'atributo name do select',
 * 'options' => array [id => value]
 * 'selected' => 'valor da option que será selecionada'
 * ]
 */
function formSelect($args)
{

  // select default values
  $select_args = array_merge([
    'name' => null,
    'props' => []
  ], $args['select']);

  // funde/cria class
  $select_args['props']['class'] = trim('form-select ' . ($select_args['props']['class'] ?? null));

  $labelClass = $args['label'] == '&nbsp;' ? ['class' => 'd-down-none'] : [];

  return form_label($args['label'], $select_args['props']['id'] ?? '', $labelClass)
    . form_dropdown($select_args['name'], $select_args['options'], ($select_args['selected'] ?? null), $select_args['props']);
}
