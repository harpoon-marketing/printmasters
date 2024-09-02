<?php

class ThemeSetup
{
    public function __construct()
    {
        // add_action('after_setup_theme', [$this, 'wagada_press_theme_support'], 20);
        add_action('wp_enqueue_scripts', [$this, 'wagada_press_register_app_styles']);
        add_action('wp_enqueue_scripts', [$this, 'wagada_press_register_app_scripts']);
        add_action('enqueue_block_assets', [$this, 'wagada_press_register_theme_editor_styles']);
        add_action('init', [$this, 'wagada_press_register_pattern_categories']);
    }

    /**
     * Register the initial theme setup.
     * Adds and removes theme support for specific WordPress features.
     * This function adds support for the 'wp-block-styles' feature and removes
     * support for the 'core-block-patterns' feature.
     *
     * @return void
     */
    public function wagada_press_theme_support(): void
    {
        add_theme_support('wp-block-styles');
        add_theme_support('responsive-embeds');
        remove_theme_support('core-block-patterns');
    }

    /**
     * Registers and enqueues the WagadaPress Theme styles.
     *
     * @return void
     */
    public function wagada_press_register_app_styles(): void
    {
        $theme_version = wp_get_theme()->get('Version');

        $app_path     = '/resources/styles/app.css';
        $app_dir_path = get_template_directory() . $app_path;
        $app_dir_uri  = get_template_directory_uri() . $app_path;

        if (file_exists($app_dir_path)) {
            wp_register_style(
                'wagada-press-app',
                $app_dir_uri,
                [],
                $theme_version
            );
        }

        wp_enqueue_style('wagada-press-app');
    }

    /**
     * Registers and enqueues the WagadaPress Theme scripts.
     *
     * @return void
     */
    public function wagada_press_register_app_scripts(): void
    {
        $app_path     = '/resources/scripts/index.js';
        $app_dir_path = get_template_directory() . $app_path;
        $app_dir_uri  = get_stylesheet_directory_uri() . $app_path;

        if (file_exists($app_dir_path)) {
            wp_enqueue_script('wagada-press-app', $app_dir_uri, [], false, true);
        }
    }

    /**
     * Registers the editor styles for WagadaPress Theme.
     *
     * This function checks if the editor styles file exists, and if it does not,
     * enqueues the styles for the editor. This ensures that the editor styles are
     * properly loaded and applied.
     *
     * @return void
     */
    public function wagada_press_register_theme_editor_styles(): void
    {
        $editor_path = '/resources/styles/editor.css';
        $dir_path    = get_template_directory_uri() . $editor_path;
        $dir_uri     = get_template_directory_uri() . $editor_path;

        if (!file_exists($dir_path)) {
            wp_enqueue_style(
                'wagada-press-theme-editor-styles',
                $dir_uri,
                array(),
                null
            );
        }
    }

    /**
     * Registers pattern categories for the WagadaPress Theme.
     *
     * @return void
     */
    public function wagada_press_register_pattern_categories(): void
    {
        register_block_pattern_category('wagada-press', array(
            'label' => __('Wagada Press', 'wagada-press')
        ));
    }
}
