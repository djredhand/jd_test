<?php

/**
 * @file
 * Rangy type editing UI.
 */


/**
 * Generates the Rangy type editing form.
 * @todo add options : select view modes, choose image, its position (above/under, begining/end of range) and size,
 */
function rangy_type_form($form, &$form_state, $rangy_type, $op = 'edit') {

  if ($op == 'clone') {
    $rangy_type->label .= ' (cloned)';
    $rangy_type->type = '';
  }

  $form['label'] = array(
    '#title' => t('Label'),
    '#type' => 'textfield',
    '#default_value' => $rangy_type->label,
    '#description' => t('The human-readable name of this Rangy type.'),
    '#required' => TRUE,
    '#size' => 30,
  );
  // Machine-readable type name.
  $form['type'] = array(
    '#type' => 'machine_name',
    '#default_value' => isset($rangy_type->type) ? $rangy_type->type : '',
    '#maxlength' => 32,
    '#machine_name' => array(
      'exists' => 'rangy_get_types',
      'source' => array('label'),
    ),
    '#description' => t('A unique machine-readable name for this Rangy type. It must only contain lowercase letters, numbers, and underscores.'),
  );

  $form['settings']['#tree'] = TRUE;
  
  // Get reactions
  $reactions = module_invoke_all('rangy_reaction_info');

  $options = array();
  $options['none'] = '-- Choose a reaction --';
  foreach ($reactions as $reaction => $keys) {
    $options[$reaction] = $keys['label'];
  }

  $form['settings']['reaction'] = array(
    '#type' => 'select',
    '#title' => t('Reaction :'),
    '#options' => $options,
    '#default_value' => isset($rangy_type->settings['reaction']) ? $rangy_type->settings['reaction'] : 'none',
    '#description' => t('Select a reaction for this Rangy type. You can find a list of modules defining reactions 
      on the ') . l(t('Rangy project page'), 'http://drupal.org/project/rangy'),
  );
  
  
  $form['actions'] = array('#type' => 'actions');
  $form['actions']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save Rangy type'),
    '#weight' => 40,
  );

  return $form;
}

/**
 * Form API submit callback for the type form.
 */
function rangy_type_form_submit(&$form, &$form_state) {
  $rangy_type = entity_ui_form_submit_build_entity($form, $form_state);
  $rangy_type->save();
  $form_state['redirect'] = 'admin/structure/rangy_types';
}
