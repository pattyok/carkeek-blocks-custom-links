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
	TextareaControl,
	TextControl,
	CheckboxControl
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
        sortBy,
        order,
		dropdownLabel,
		showDescription,
		showPublishDate
    } = attributes;

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
            <PanelBody title={__("List Settings", "carkeek-blocks")}>
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
							{ label: __("Publish Date"), value: "date" },
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
			<TextControl
                label={__("Dropdown Label", "carkeek-blocks")}
                value={dropdownLabel}
                onChange={value => setAttributes({ dropdownLabel: value })}
            />

            </PanelBody>
			<PanelBody title={__("Layout Settings", "carkeek-blocks")}>
				<CheckboxControl
					label={__("Show link descriptions", "carkeek-blocks")}
					checked={showDescription}
					onChange={value => setAttributes({ showDescription: value })}
				/>
			</PanelBody>
        </InspectorControls>
		</>
    );

    const blockProps = useBlockProps();

    if (!listSelected) {
        const noPostMessage = __("Select a List Type from the Block Settings");

        return (
            <div { ...blockProps } >
                {inspectorControls}

                <Placeholder icon={icons.linkList} label={ __("Link List Dropdown", "carkeek-blocks") }>
                    <Spinner /> { noPostMessage }
                </Placeholder>
            </div>
        );
    } else {

    return (
        <div { ...blockProps } >
            {inspectorControls}
			<div className="server-side-render">
			<div className="notes">List preview. To edit the content visit Custom Links in the admin dashboard.</div>

                <div className="server-side-render__overlay"></div>
            <ServerSideRender
                block={name}
                attributes={attributes}
            />

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
