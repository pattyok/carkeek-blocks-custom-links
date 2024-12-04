import icons from './icons';

import { withSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import {
    RangeControl,
    PanelBody,
    ToggleControl,
    RadioControl,
    Spinner,
    Placeholder,
    SelectControl,
    __experimentalText as Text,
	TextareaControl
} from "@wordpress/components";
import { InspectorControls, RichText, useBlockProps, InspectorAdvancedControls } from "@wordpress/block-editor";
import ServerSideRender from "@wordpress/server-side-render";

function CustomListArchiveEdit( props ) {

    const {
        lists,
        attributes,
        setAttributes,
        name,
    } = props;
    const {
        listSelected,
        headline,
        headlineLevel,
        sortBy,
        order,
        makeCollapsible,
        makeTitlesCollapsible,
        primaryContent,
		showBullets,
		useWithFilter,
		noLinkMessage
    } = attributes;
    const headlineStyle = 'h' + headlineLevel;

    let options = [];
    if (lists) {
        options = lists.map(type => ({
            value: type.id,
            label: type.name
        }));
		const anyList = { value: '0', label: 'Show All'};
		options.unshift(anyList);
    }
    if (!listSelected) {
        const selectAnItem = { value: null, label: 'Select a List'};
        options.unshift(selectAnItem);
    }
    const listSelect = (
        <>
            <SelectControl
                label={__("Select List", "carkeek-blocks")}
                onChange={ ( listSelected ) => setAttributes( { listSelected } ) }
                options={ options }
                value={listSelected}
            />
        </>
    );
    const inspectorControls = (
		<>
        <InspectorControls>
            <PanelBody title={__("List Settings Settings", "carkeek-blocks")}>
                {listSelect}
                <SelectControl
                        label={__("Sort Links By", "carkeek-blocks")}
                        onChange={value =>
                            setAttributes({
                                sortBy: value
                            })
                        }
                        options={[
                            { label: __("Title (alpha)"), value: "title"},
                            { label: __("Menu Order"), value: "menu_order"},
                        ]}
                        value={sortBy}
                    />
                <RadioControl
                label={__("Order")}
                selected={order}
                options={[
                    { label: __("ASC"), value: "ASC"},
                    { label: __("DESC"), value: "DESC"},

                ]}
                onChange={value =>
                    setAttributes({
                        order: value
                    })
                }
            />

            </PanelBody>
            <PanelBody title={__("Layout", "carkeek-blocks")}>

                <RangeControl
                    label={__("Heading Size", "carkeek-blocks")}
                    value={headlineLevel}
                    onChange={value =>
                        setAttributes({ headlineLevel: value })
                    }
                    min={2}
                    max={6}
                />
				<ToggleControl
                    label={__("Display items in a bulleted list", "carkeek-blocks")}
                    checked={showBullets}
                    onChange={value =>
                        setAttributes({ showBullets: value })
                    }
                />
                <RadioControl
                label={__("Primary Content")}
                selected={primaryContent}
                help="Content lists add a little more space between each item."
                options={[
                    { label: __("Links"), value: "links"},
                    { label: __("List Content"), value: "content"},

                ]}
                onChange={value =>
                    setAttributes({
                        primaryContent: value
                    })
                }
            />
                <Text variant="label">Expand and Collapse</Text>
                <ToggleControl
                    label={__("Make sub-topics expand and collapse", "carkeek-blocks")}
                    checked={makeCollapsible}
                    onChange={value =>
                        setAttributes({ makeCollapsible: value })
                    }
                />
                <ToggleControl
                    label={__("Make item titles expand and collapse", "carkeek-blocks")}
                    help={__("Can be used with content lists, will only be applied if the item is not linked to anything", "carkeek-blocks")}
                    checked={makeTitlesCollapsible}
                    onChange={value =>
                        setAttributes({ makeTitlesCollapsible: value })
                    }
                />
            </PanelBody>
        </InspectorControls>
		<InspectorAdvancedControls>
			<TextareaControl
				label={__("No Results Message")}
				value={noLinkMessage}
				help="Message to display when no results are found. Primarily used with FacetWP filters."
				onChange={value =>
					setAttributes({ noLinkMessage: value })
				}
			>
			</TextareaControl>
			<RadioControl
			label={__("Use with Filter")}
			selected={useWithFilter}
			options={[
				{ label: 'None', value: '' },
				{ label: 'FacetWP', value: 'facetwp' },
			]}
			onChange={value =>
				setAttributes({ useWithFilter: value })
			}
			/>
		</InspectorAdvancedControls>
		</>
    );

    const blockProps = useBlockProps();

    if (!listSelected) {
        const noPostMessage = __("Select a List Type from the Block Settings");

        return (
            <div { ...blockProps } >
                {inspectorControls}
                <RichText
                    tagName={ headlineStyle }
                    value={ headline }
                    onChange={ ( headline ) => setAttributes( { headline } ) }
                    placeholder={ __('Heading...')}
                    formattingControls={ [ ] }
                />

                <Placeholder icon={icons.linkList} label={ headline ? headline : __("Link List")}>
                    <Spinner /> { noPostMessage }
                </Placeholder>
            </div>
        );
    } else {

    return (
        <div { ...blockProps } >
            {inspectorControls}
            <RichText
                tagName={ headlineStyle }
                className={ 'cll-headline-edit' }
                value={ headline }
                onChange={ ( headline ) => setAttributes( { headline } ) }
                placeholder={ __('Heading...')}
                formattingControls={ [ ] }
            />
            <div className="server-side-render">
                <div className="server-side-render__overlay"></div>
            <ServerSideRender
                block={name}
                attributes={attributes}
            />
            <div className="notes">List preview. To edit the content visit Custom Links in the admin dashboard.</div>
            </div>
        </div>
    );
            }
}


export default withSelect((select, props) => {
    const postType = 'custom_link';
    const listTax = 'link_list';
    const { attributes } = props;
    const { getEntityRecords } = select("core");
    const { listSelected, order, sortBy } = attributes;
    const lists = getEntityRecords('taxonomy', listTax, { per_page: -1, parent: 0, orderby: 'name', order: 'asc' } );
    let query = { per_page: -1, order: order.toLowerCase() , orderby: sortBy };
    let latestPosts = '';
    if (listSelected ) {
        query[listTax] = listSelected;
        latestPosts = getEntityRecords("postType", postType, query);
    }


    return {
        lists: lists,
        listSelected:  Array.isArray(lists) && lists.length == 1 ? lists[0] : listSelected,
        posts: !Array.isArray(latestPosts)
            ? latestPosts
            : latestPosts.map(post => {
                  return post;
              })
    };
})(CustomListArchiveEdit);
