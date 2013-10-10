<?php

/**
 * @file
 * Class for the Rangy type entity.
 */  

/**
 * The class for Rangy type entities.
 */
class RangyType extends Entity {
  
  public $type;
  public $label;
  public $data;
  
  
  public function __construct(array $values = array(), $entityType = NULL) {
    parent::__construct($values, 'rangy_type');
  }
}
