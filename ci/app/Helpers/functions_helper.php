<?php

/**
 *  @var $str
 */
function semAcento($str)
{
  $a   = [
    '/[ÂÀÁÄÃâãàáäª]/u' => 'a',
    '/[ÊÈÉËêèéëĕė]/u'  => 'e',
    '/[ÎÍÌÏîíìï]/u'    => 'i',
    '/[ÔÕÒÓÖôõòóöº]/u' => 'o',
    '/[ÛÙÚÜûúùüư]/u'   => 'u',
    '/[ỹÝýÿ]/u'        => 'y',
    '/[ş]/u'           => 's',
    '/[ḿ]/u'           => 'm',
    '/[ñÑ]/u'          => 'n',
    '/[çÇ]/u'          => 'c',
  ];
  $str = preg_replace(array_keys($a), array_values($a), $str);
  return mb_strtolower($str, 'utf-8');
}
