<?php

/**
 * @file
 * Rangy editing UI.
 */

/**
 * UI controller.
 */
class RangyUIController extends EntityDefaultUIController {

  /**
   * Overrides hook_menu() defaults.
   * @todo customize overview form
   * @todo rangy_add_list()?
   * @todo why is the title of local tasks "Home"???
   * @todo redirection after deleting.
   */

  public function hook_menu() {

    $items = array();
    $id_count = count(explode('/', $this->path));
    $wildcard = isset($this->entityInfo['admin ui']['menu wildcard']) ? $this->entityInfo['admin ui']['menu wildcard'] : '%entity_object';
    $plural_label = isset($this->entityInfo['plural label']) ? $this->entityInfo['plural label'] : $this->entityInfo['label'] . 's';
    
    // Rangy overview page
    $items['admin/content/rangy'] = array(
      'title' => $plural_label,
      'page callback' => 'drupal_get_form',
      'page arguments' => array($this->entityType . '_overview_form', $this->entityType),
      'description' => 'Manage ' . $plural_label . '.',
      'access arguments' => array('administer the rangy module'),
      'file' => 'includes/entity.ui.inc',
      'file path' => drupal_get_path('module', 'entity'),
      'type' => MENU_LOCAL_TASK,
    );
    // List all Rangy types the logged in user can create
//    $items[$this->path . '/add'] = array(
//      'title callback' => 'entity_ui_get_action_title',
//      'title arguments' => array('add', $this->entityType),
//      'page callback' => 'rangy_add_list',
//      'page arguments' => array('rangy_create_edit_form', rangy_create(array('type' => $this->entityType))),
//      'access callback' => 'entity_access',
//      'access arguments' => array('create', $this->entityType),
//      'type' => MENU_CALLBACK,
//      'file' => 'rangy_entities/rangy_entities.admin.inc',
//      'file path' => drupal_get_path('module', $this->entityInfo['module']),
//    );
    // Menu items to add each Rangy type
    foreach (rangy_get_types() as $type) {
      $items[$this->path . '/add/' . $type->type ] = array(
        'title' => 'Create ' . $type->type,
        'page callback' => 'drupal_get_form',
        'page arguments' => array('rangy_create_edit_form', rangy_create(array('type' => $type->type))),
        'access callback' => 'rangy_type_access',
        'type' => MENU_CALLBACK,
        'file' => 'rangy_entities.admin.inc',
        'file path' => drupal_get_path('module', $this->entityInfo['module']),
      );
    }
    // Parent menu item
    $items[$this->path . '/' . $wildcard] = array(
      'title callback' => 'entity_label',
      'title arguments' => array($this->entityType, $id_count),
      'page callback' => 'rangy_page_view',
      'page arguments' => array($id_count),
      'access callback' => 'rangy_access',
      'access arguments' => array('view', $id_count),
      'type' => MENU_CALLBACK,
      'weight' => 30,
      'file' => 'rangy_entities.admin.inc',
      'file path' => drupal_get_path('module', $this->entityInfo['module']),
    );
    // Menu item for viewing Rangy entities
    $items[$this->path . '/' . $wildcard . '/view'] = array(
      'title' => 'View',
      'type' => MENU_DEFAULT_LOCAL_TASK,
      'weight' => 1,
    );
    // Menu item for editing Rangy entities
    $items[$this->path . '/' . $wildcard . '/edit'] = array(
      'title' => 'Edit',
      'page callback' => 'drupal_get_form',
      'page arguments' => array('rangy_create_edit_form', $id_count),
      'access callback' => 'rangy_access',
      'access arguments' => array('edit', $id_count),
      'type' => MENU_LOCAL_TASK,
      'weight' => 2,
      'file' => 'rangy_entities.admin.inc',
      'file path' => drupal_get_path('module', $this->entityInfo['module']),
    );
    // Menu item to delete an Rangy entity.
    $items[$this->path . '/' . $wildcard . '/delete'] = array(
      'page callback' => 'drupal_get_form',
      'page arguments' => array($this->entityType . '_operation_form', $this->entityType, $id_count, $id_count + 1),
      'load arguments' => array($this->entityType),
      'access callback' => 'rangy_access',
      'access arguments' => array('delete', $id_count),
      'file' => 'includes/entity.ui.inc',
      'file path' => drupal_get_path('module', 'entity'),
    );
    
    return $items;
  }
}

/**
 * The rangy creation / editing form.
 */
function rangy_create_edit_form($form, &$form_state, $rangy, $entity_type = FALSE, $entity_id = FALSE) {

  $form['title'] = array(
    '#type' => 'textfield',
    '#title' => t('Title'),
    '#default_value' => isset($rangy->title) ? $rangy->title : '',
    '#maxlength' => 255,
    '#required' => TRUE,
    '#weight' => -5,
  );

  // Add propeties to the Rangy object and store it in $form_state
  $rangy->entity_type = $entity_type ? $entity_type : $rangy->entity_type;
  $rangy->entity_id = $entity_id ? $entity_id : $rangy->entity_id;
  $rangy->uid = $GLOBALS['user']->uid;
  $form_state['rangy'] = $rangy;
  
  // Add the field related form elements.
  field_attach_form('rangy', $rangy, $form, $form_state);
  
  $form['actions'] = array(
    '#type' => 'container',
    '#attributes' => array('class' => array('form-actions')),
    '#weight' => 400,
  );
  
  $form['actions']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save ' . $rangy->type),
  );

  return $form;

}

function rangy_create_edit_form_submit($form, &$form_state) {
  $rangy = $form_state['rangy'];
  entity_form_submit_build_entity('rangy', $rangy, $form, $form_state);
  $rangy->save();
  
  $entity = reset(entity_load($rangy->entity_type, array($rangy->entity_id)));
  
  $form_state['redirect'] = entity_uri($rangy->entity_type, $entity);
  module_invoke_all('rangy_entity_created', $rangy, $entity);
  
}

/**
 * Sets up content to show an individual Rangy entity.
 */
function rangy_page_view($rangy, $view_mode = 'full') {

  $controller = entity_get_controller('rangy');
  $content = $controller->view(array($rangy->rid => $rangy));
  return $content;
}
