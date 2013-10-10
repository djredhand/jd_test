<?php

/**
 * @file
 * The class for Rangy entities.
 */

class Rangy extends Entity {

  public $type;
  public $title;

 
  public function __construct(array $values = array(), $entityType = NULL) {
      parent::__construct($values, 'rangy');
    }
  
  public function save() {
    $this->changed = REQUEST_TIME;
    if (!empty($this->is_new) && empty($this->created)) {
      $this->created = REQUEST_TIME;
    }
    
    parent::save();
  }

  protected function defaultLabel() {
    return $this->title;
  }

  protected function defaultUri() {
    return array('path' => 'rangy/' . $this->rid);
  }
}
