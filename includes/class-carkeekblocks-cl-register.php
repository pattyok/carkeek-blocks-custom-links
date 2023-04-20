<?php
/**
 * Load assets for our blocks.
 *
 * @package   CarkeekBlocks
 * @author    Patty O'Hara
 * @link      https://carkeekstudios.com
 * @license   http://opensource.org/licenses/gpl-2.0.php GNU Public License
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
class CarkeekBlocksCL_Block_Register {

	/**
	 * This plugin's instance.
	 *
	 * @var CarkeekBlocksCL_Block_Register
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CarkeekBlocksCL_Block_Register();
		}
	}

	/**
	 * The Plugin slug.
	 *
	 * @var string $slug
	 */
	private $slug;

	/**
	 * The Constructor.
	 */
	private function __construct() {
		$this->slug = 'carkeek-blocks';

		add_action( 'init', array( $this, 'create_block_carkeek_blocks_block_init' ), 9999 );
		add_action( 'enqueue_block_assets', array( $this, 'carkeek_blocks_enqueue_global_assets' ), 9999 );
	}

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	public function create_block_carkeek_blocks_block_init() {
		$dir = plugin_dir_path( dirname( __FILE__ ) );

		/** Dynamic Blocks */
		$block = register_block_type(
			"$dir/build/custom-links",
			array(
				'render_callback' => array( 'CarkeekBlocksCL_CustomPost', 'carkeek_blocks_render_custom_linklist' ),
			)
		);

	}

	/** Register Accordion Script for Custom Links */
	public function carkeek_blocks_enqueue_global_assets() {
		$dir    = plugin_dir_path( dirname( __FILE__ ) );
		$vendor = 'vendor/';
		// load shared assets for specific blocks only.
		if ( has_block( 'carkeek-blocks/custom-link-list' ) ) {
			wp_enqueue_script(
				'aria-accordion',
				plugins_url( $vendor . 'aria.accordion.min.js', dirname( __FILE__ ) ),
				array( 'jquery' ),
				filemtime( "$dir/$vendor/aria.accordion.min.js" ),
				true
			);
		}
	}

}

CarkeekBlocksCL_Block_Register::register();
