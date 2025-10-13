
<?php
// Get the list of custom links and display them in a dropdown.

if ( empty( $attributes['listSelected'] ) ) {
	return;
}
$args      = array(
	'numberposts' => -1,
	'post_type'   => 'custom_link',
	'order'       => $attributes['order'],
	'post_status' => 'publish',
	'orderby'     => $attributes['sortBy'],
);

$args['tax_query'] = array(
	array(
		'taxonomy' => 'link_list',
		'field'    => 'term_id',
		'terms'    => explode( ',', $attributes['listSelected'] ),
	)
);

$links      = get_posts( $args );
$blockId = $block->clientId;
if ( empty( $links ) ) {
	return;
}

?>
<div  <?php echo get_block_wrapper_attributes(); ?>>
	<div class="cll-dropdown-links">
	<button type="button"
          id="menubutton<?php echo esc_attr( $blockId ); ?>"
          aria-haspopup="true"
          aria-expanded="false"
          aria-controls="menu<?php echo esc_attr( $blockId ); ?>">
    <span class="cll-button-label"><?php echo esc_html( $attributes['dropdownLabel'] ); ?></span>
	<svg xmlns="http://www.w3.org/2000/svg" width="19" height="12" viewBox="0 0 19 12" fill="none" class="cll-button-icon">
		<path d="M16.4984 0L18.8555 2.35703L9.42739 11.7851L-0.000612259 2.35707L2.35639 5.00679e-05L9.42739 7.07108L16.4984 0Z" fill="#7D7D7D"/>
	</svg>
  </button>
  <ul id="menu<?php echo esc_attr( $blockId ); ?>"
      role="menu"
      tabindex="-1"
      aria-labelledby="menubutton<?php echo esc_attr( $blockId ); ?>"
      aria-activedescendant="mi1">
      <?php foreach ( $links as $index => $link ) : ?>


        <li id="mi<?php echo $index; ?>" role="none">
          <?php
		  $link_item = CarkeekBlocksCL_CustomPost::get_link_list_item( $link );
		  if ( empty( $link_item['href'] ) ) : ?>
			<div class="ck-custom-list-title" role="menuitem"><?php echo esc_html( $link->post_title ); ?></div>
		  <?php else : ?>
			<a class="ck-custom-list-title"
			   role="menuitem"
			   href="<?php echo esc_url( $link_item['href'] ); ?>"
			   <?php echo ( 'external' === $link_item['type'] || 'pdf' === $link_item['type'] ) ? 'target="_blank"' : ''; ?>>
			  <?php echo '<span class="cll-link-label">' . esc_html( $link->post_title ) . '</span>'; ?>
			  <?php if ( $attributes['showDescription'] && ! empty( $link_item['notes'] ) ) : ?>
				  <span class="cll-link-description"><?php echo esc_html( $link_item['notes'] ); ?></span>
			  <?php endif; ?>
			</a>
		  <?php endif;

		  ?>
        </li>
      <?php endforeach; ?>
  </ul>
  </div>
</div>