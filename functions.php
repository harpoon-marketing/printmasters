<?php

// Define a constant 'WAGADA_PRESS_THEME_DIR' which holds the absolute path to the directory of the current file.
// The function get_template_directory() is used to get the absolute path to the directory.
// This constant can be used throughout the plugin to reference files and directories relative to the root directory of the plugin.
define('WAGADA_PRESS_THEME_DIR', get_template_directory());

require_once(WAGADA_PRESS_THEME_DIR . '/app/ThemeSetup.php');

new ThemeSetup();
