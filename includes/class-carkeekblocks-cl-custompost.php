<?php
/**
 * Load assets for our blocks.
 *
 * @package CarkeekSiteBlocks
 * @author  Patty O'Hara
 * @link    https://carkeekstudios.com
 * @license http://opensource.org/licenses/gpl-2.0.php GNU Public License
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load general assets for our blocks.
 *
 * @since 1.0.0
 */
class CarkeekBlocksCL_CustomPost {


	/**
	 * This plugin's instance.
	 *
	 * @var CarkeekBlocksCL_CustomPost
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CarkeekBlocksCL_CustomPost();
		}
	}

	/**
	 * The Plugin slug.
	 *
	 * @var string $slug
	 */
	private $slug;

	/**
	 * The base URL path (without trailing slash).
	 *
	 * @var string $url
	 */
	private $url;

	/**
	 * The Plugin version.
	 *
	 * @var string $version
	 */
	private $version;

	/**
	 * The Constructor.
	 */

	/**
	 * The Constructor.
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'carkeek_blocks_register_customlinks' ) );
		add_filter( 'acf/settings/load_json', array( $this, 'json_load_point' ) );
	}
	/**
	 * Register post type - TODO Admin Screen whether to activate or not
	 */
	public function carkeek_blocks_register_customlinks() {
		if ( ! post_type_exists( 'custom_link' ) ) {
			$labels = array(
				'name'                  => _x( 'Custom Links', 'Post Type General Name', 'text_domain' ),
				'singular_name'         => _x( 'Custom Link', 'Post Type Singular Name', 'text_domain' ),
				'menu_name'             => __( 'Custom Link', 'text_domain' ),
				'name_admin_bar'        => __( 'Custom Link', 'text_domain' ),
				'archives'              => __( 'Link Archives', 'text_domain' ),
				'attributes'            => __( 'Link Attributes', 'text_domain' ),
				'parent_item_colon'     => __( 'Parent Link:', 'text_domain' ),
				'all_items'             => __( 'All Links', 'text_domain' ),
				'add_new_item'          => __( 'Add New Link', 'text_domain' ),
				'add_new'               => __( 'Add New', 'text_domain' ),
				'new_item'              => __( 'New Link', 'text_domain' ),
				'edit_item'             => __( 'Edit Link', 'text_domain' ),
				'update_item'           => __( 'Update Link', 'text_domain' ),
				'view_item'             => __( 'View Link', 'text_domain' ),
				'view_items'            => __( 'View Links', 'text_domain' ),
				'search_items'          => __( 'Search Link', 'text_domain' ),
				'not_found'             => __( 'Not found', 'text_domain' ),
				'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
				'featured_image'        => __( 'Featured Image', 'text_domain' ),
				'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
				'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
				'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
				'insert_into_item'      => __( 'Insert into item', 'text_domain' ),
				'uploaded_to_this_item' => __( 'Uploaded to this item', 'text_domain' ),
				'items_list'            => __( 'Links list', 'text_domain' ),
				'items_list_navigation' => __( 'Links list navigation', 'text_domain' ),
				'filter_items_list'     => __( 'Filter items list', 'text_domain' ),
			);

			$args      = array(
				'label'               => __( 'Custom Link', 'wp-rig' ),
				'description'         => __( 'Add Custom Links to create dynamic lists of links', 'wp-rig' ),
				'labels'              => $labels,
				'supports'            => array( 'title', 'page-attributes' ),
				'hierarchical'        => false,
				'public'              => true,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'menu_position'       => 10,
				'menu_icon'           => 'dashicons-admin-links',
				'show_in_admin_bar'   => false,
				'show_in_nav_menus'   => false,
				'can_export'          => true,
				'has_archive'         => false,
				'exclude_from_search' => true,
				'publicly_queryable'  => false,
				'show_in_rest'        => true,
				'rest_base'           => 'custom-links',
			);
			$post_type = register_post_type( 'custom_link', $args );
		}

		$labels = array(
			'name'          => _x( 'Link List Categories', 'Taxonomy General Name', 'wp-rig' ),
			'singular_name' => _x( 'Link List Category', 'Taxonomy Singular Name', 'wp-rig' ),
			'menu_name'     => __( 'Link List Categories', 'wp-rig' ),
		);
		$args   = array(
			'labels'            => $labels,
			'hierarchical'      => true,
			'public'            => true,
			'show_ui'           => true,
			'show_admin_column' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud'     => true,
			'show_in_rest'      => true,
		);
		register_taxonomy( 'link_list', array( 'custom_link' ), $args );

	}


	/** load our acf-json for the custom links */
	function json_load_point( $paths ) {

		// append path
		$paths[] = plugin_dir_path( __DIR__ ) . 'acf-json';
		// return
		return $paths;

	}


	/**
	 * Make accordion panel
	 *
	 * @param string $header header content for the panel.
	 * @param string $content main content for the panel.
	 */
	public static function make_accordion_panel( $header, $content ) {

		$panel = '<div data-aria-accordion data-transition data-multi><div class="ck-custom-list-label" data-aria-accordion-heading>' . $header . '</div>
			<div class="ck-custom-list-notes" data-aria-accordion-panel>' . $content . '</div></div>';
		return $panel;
	}

	/** get the link out of the link list item */
	public static function get_link_list_item( $link ) {
		$link_item = array(
			'type' => '',
			'href' => '',
			'notes' => get_field( 'cl_notes', $link->ID ),
		);
		$href  = get_field( 'cl_external_link', $link->ID );
		if ( ! empty( $href ) ) {
			$link_item['type'] = 'external';
			$link_item['href'] = $href;
		} else {
			$href = get_field( 'cl_pdf_link', $link->ID );
			if ( ! empty( $href ) ) {
				$link_item['type'] = 'pdf';
				$link_item['href'] = $href;
			} else {
				$link_item['href'] = get_field( 'cl_page_link', $link->ID );
				$link_item['type'] = 'page';
			}
		}
		return $link_item;
	}

	/**
	 * Buildt the custom link
	 *
	 * @param object  $link link post type object.
	 * @param boolean $collapse_title whether the title is collapsible.
	 */
	public static function make_custom_link( $link, $collapse_title = false ) {
		$link_item = self::get_link_list_item( $link );
		$notes = apply_filters( 'ck_custom_link_notes', $link_item['notes'], $link );

		$target = ( 'external' === $link_item['type'] || 'pdf' === $link_item['type'] ) ? 'target="_blank"' : '';
		if ( empty( $link_item['href'] ) && true == $collapse_title ) {
			$item = self::make_accordion_panel( $link->post_title, $notes );
		} else {
			$href = $link_item['href'];
			if ( empty( $href ) ) {
				$item = '<div class="ck-custom-list-title">' . $link->post_title . '</div>';
			} else {
				$item = '<a class="ck-custom-list-title" href="' . esc_url( $href ) . '" ' . esc_attr( $target ) . '>' . $link->post_title . '</a>';
			}
			if ( ! empty( $notes ) ) {
				$item .= '<div class="ck-custom-list-notes">' . $notes . '</div>';
			}
		}
		$item = apply_filters( 'ck_custom_link_item', $item, $link );
		return $item;

	}

	/**
	 * Render Custom Link Lists
	 *
	 * @param array $attributes Attributes passed from the block.
	 */
	public static function carkeek_blocks_render_custom_linklist( $attributes ) {
		if ( empty( $attributes['listSelected'] ) ) {
			$attributes['listSelected'] = 0;
		}
		$args      = array(
			'numberposts' => -1,
			'post_type'   => 'custom_link',
			'order'       => $attributes['order'],
			'post_status' => 'publish',
			'orderby'     => $attributes['sortBy'],
		);
		/** Customize query to work with Filtering Tools
		 * Currently works with facetwp, value is 'facetwp', syntax for args is facetwp = true;
		 * Also working with the Carkeek block filter
		*/

		if ( !empty( $attributes['useWithFilter'])) {
			$args[$attributes['useWithFilter']] = true;
		}

		$post_args = $args;
		$subcats   = array();
		// first get all posts with no sub cat selected.
		// if no list selected, get all otherwise get the selected list
		if ( $attributes['listSelected'] !== 0 ) {
			$subcats           = get_term_children( $attributes['listSelected'], 'link_list' );
			$args['tax_query'] = array(
				'relation' => 'AND',
				array(
					'taxonomy' => 'link_list',
					'field'    => 'term_id',
					'terms'    => explode( ',', $attributes['listSelected'] ),
				),
				array(
					'taxonomy' => 'link_list',
					'field'    => 'term_id',
					'terms'    => $subcats,
					'operator' => 'NOT IN',
				),
			);
		}

		$links      = get_posts( $args );
		$list_style = '';
		$data_atts  = array(
			'accordion' => '',
			'header'    => '',
			'panel'     => '',
		);
		if ( true == $attributes['makeCollapsible'] ) {
			$list_style .= ' carkeek-blocks-accordion mini';
			$data_atts   = array(
				'accordion' => 'data-aria-accordion data-transition data-multi',
				'header'    => 'data-aria-accordion-heading',
				'panel'     => 'data-aria-accordion-panel',
			);
		}

		if ( 'content' == $attributes['primaryContent'] ) {
			$list_style .= ' is-style-content';
		}

		$list_item_style = "";
		$main_list_item_style = "";
		if (false == $attributes['showBullets']) {
			$list_item_style .= " no-bullets";
		}
		$main_list_item_style = $list_item_style;
		if ( !empty( $subcats)) {
			$main_list_item_style .= " has-subcats";
		}

		if ( isset( $attributes['columns'] ) && $attributes['columns'] > 1 ) {
			$main_list_item_style .= ' ck-list-columns ck-list-columns-' . intval( $attributes['columns'] );
		}

		$block_content = '<div ' . get_block_wrapper_attributes( array( 'class' => $list_style ) ) . '">';

		if ( ! empty( $attributes['headline'] ) ) {
			$tag_name       = 'h' . $attributes['headlineLevel'];
			$block_content .= '<' . $tag_name . ' class="ck-custom-headline">' . $attributes['headline'] . '</' . $tag_name . '>';
		}


		$block_content .= '<ul class="ck-custom-list ' . esc_attr( $main_list_item_style ) . '">';
		if ( ! empty( $links ) ) {
			foreach ( $links as $link ) {
				$block_content .= '<li>' . self::make_custom_link( $link, $attributes['makeTitlesCollapsible'] ) . '</li>';
			}
		} else {
			if (!empty($attributes['noLinkMessage'])) {
				$block_content .= '<li>' . $attributes['noLinkMessage'] . '</li>';
			}
		}



		if ( ! empty( $subcats ) ) {
			foreach ( $subcats as $cat ) {
				$term                   = get_term( $cat, 'link_list' );
				$post_args['tax_query'] = array(
					array(
						'taxonomy' => 'link_list',
						'field'    => 'term_id',
						'terms'    => explode( ',', $cat ),
					),
				);
				$sub_links              = get_posts( $post_args );
				if ( ! empty( $sub_links ) ) {
					$list_style = '';
					if ( isset ( $attributes['sublabelStyle'] ) && ! empty( $attributes['sublabelStyle'] ) ) {
						switch ( $attributes['sublabelStyle'] ) {
							case 'h2':
							case 'h3':
							case 'h4':
							case 'h5':
							case 'h6':
								$label_el    = $attributes['sublabelStyle'];
								$label_class = 'ck-custom-headline ck-custom-sublist-label';
								break;
							case 'bold':
								$label_el    = 'div';
								$label_class = 'ck-custom-list-label ck-custom-sublist-label-bold';
								break;
							default:
								$label_el    = 'div';
								$label_class = 'ck-custom-list-label';
						}

					} else {
						$label_el = 'div';
						$label_class = 'ck-custom-list-label';
					}
					$block_content .= '<li ' . esc_attr( $data_atts['accordion'] ) . '><' . $label_el . ' class="' . esc_attr( $label_class ) . '" ' . esc_attr( $data_atts['header'] ) . '>' . $term->name . '</' . $label_el . '>';
					$block_content .= '<div class="ck-custom-list" ' . esc_attr( $data_atts['panel'] ) . '><ul class="' . esc_attr( $list_item_style ) . '">';
					foreach ( $sub_links as $sub ) {
						$block_content .= '<li>' . self::make_custom_link( $sub, $attributes['makeTitlesCollapsible'] ) . '</li>';
					}
					$block_content .= '</ul></div></li>';
				}
			}
		}
		$block_content .= '</ul>';

		$block_content .= '</div>';
		return $block_content;

	}



}

CarkeekBlocksCL_CustomPost::register();


