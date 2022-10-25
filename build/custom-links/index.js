!function(){"use strict";var e,t={926:function(e,t,l){var n=window.wp.blocks,a=window.wp.element;const r={};r.linkList=(0,a.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100",height:"100",x:"0",y:"0",enableBackground:"new 0 0 60 60",viewBox:"0 0 60 60"},(0,a.createElement)("path",{d:"M23.429 17H47a1 1 0 100-2H23.429a1 1 0 100 2zM23.429 32H47a1 1 0 100-2H23.429a1 1 0 100 2zM23.429 47H47a1 1 0 100-2H23.429a1 1 0 100 2z"}),(0,a.createElement)("path",{d:"M59 0H1a1 1 0 00-1 1v58a1 1 0 001 1h58a1 1 0 001-1V1a1 1 0 00-1-1zm-1 58H2V2h56v56z"}),(0,a.createElement)("path",{d:"M12.501 18.474L14.929 17.197 17.357 18.474 16.894 15.77 18.858 13.854 16.143 13.46 14.929 11 13.715 13.46 11 13.854 12.965 15.77z"}),(0,a.createElement)("path",{d:"M12.501 33.557L14.929 32.28 17.357 33.557 16.894 30.853 18.858 28.938 16.143 28.543 14.929 26.083 13.715 28.543 11 28.938 12.965 30.853z"}),(0,a.createElement)("path",{d:"M12.501 49L14.929 47.723 17.357 49 16.894 46.296 18.858 44.381 16.143 43.986 14.929 41.526 13.715 43.986 11 44.381 12.965 46.296z"}));var o=r,i=window.wp.data,s=window.wp.i18n,c=window.wp.components,d=window.wp.blockEditor,p=window.wp.serverSideRender,u=l.n(p),m=(0,i.withSelect)(((e,t)=>{const l="link_list",{attributes:n}=t,{getEntityRecords:a}=e("core"),{listSelected:r,order:o,sortBy:i}=n,s=a("taxonomy",l,{per_page:-1,parent:0,orderby:"name",order:"asc"});let c={per_page:-1,order:o.toLowerCase(),orderby:i},d="";return r&&(c[l]=r,d=a("postType","custom_link",c)),{lists:s,listSelected:Array.isArray(s)&&1==s.length?s[0]:r,posts:Array.isArray(d)?d.map((e=>e)):d}}))((function(e){const{lists:t,attributes:l,setAttributes:n,name:r}=e,{listSelected:i,headline:p,headlineLevel:m,sortBy:k,order:h,makeCollapsible:b,makeTitlesCollapsible:v,primaryContent:f}=l,y="h"+m;let _=[];if(t&&(_=t.map((e=>({value:e.id,label:e.name})))),!i){const e={value:null,label:"Select a List"};_.unshift(e)}const g=(0,a.createElement)(a.Fragment,null,(0,a.createElement)(c.SelectControl,{label:(0,s.__)("Select List","carkeek-blocks"),onChange:e=>n({listSelected:e}),options:_,value:i})),C=(0,a.createElement)(d.InspectorControls,null,(0,a.createElement)(c.PanelBody,{title:(0,s.__)("List Settings Settings","carkeek-blocks")},g,(0,a.createElement)(c.SelectControl,{label:(0,s.__)("Sort Links By","carkeek-blocks"),onChange:e=>n({sortBy:e}),options:[{label:(0,s.__)("Title (alpha)"),value:"title"},{label:(0,s.__)("Menu Order"),value:"menu_order"}],value:k}),(0,a.createElement)(c.RadioControl,{label:(0,s.__)("Order"),selected:h,options:[{label:(0,s.__)("ASC"),value:"ASC"},{label:(0,s.__)("DESC"),value:"DESC"}],onChange:e=>n({order:e})})),(0,a.createElement)(c.PanelBody,{title:(0,s.__)("Layout","carkeek-blocks")},(0,a.createElement)(c.RangeControl,{label:(0,s.__)("Heading Size","carkeek-blocks"),value:m,onChange:e=>n({headlineLevel:e}),min:2,max:6}),(0,a.createElement)(c.RadioControl,{label:(0,s.__)("Primary Content"),selected:f,help:"Content lists add a little more space between each item.",options:[{label:(0,s.__)("Links"),value:"links"},{label:(0,s.__)("List Content"),value:"content"}],onChange:e=>n({primaryContent:e})}),(0,a.createElement)(c.__experimentalText,{variant:"label"},"Expand and Collapse"),(0,a.createElement)(c.ToggleControl,{label:(0,s.__)("Make sub-topics expand and collapse","carkeek-blocks"),checked:b,onChange:e=>n({makeCollapsible:e})}),(0,a.createElement)(c.ToggleControl,{label:(0,s.__)("Make item titles expand and collapse","carkeek-blocks"),help:(0,s.__)("Can be used with content lists, will only be applied if the item is not linked to anything","carkeek-blocks"),checked:v,onChange:e=>n({makeTitlesCollapsible:e})}))),w=(0,d.useBlockProps)();if(i)return(0,a.createElement)("div",w,C,(0,a.createElement)(d.RichText,{tagName:y,className:"cll-headline-edit",value:p,onChange:e=>n({headline:e}),placeholder:(0,s.__)("Heading..."),formattingControls:[]}),(0,a.createElement)("div",{className:"server-side-render"},(0,a.createElement)("div",{className:"server-side-render__overlay"}),(0,a.createElement)(u(),{block:r,attributes:{sortBy:k,listSelected:i,headline:p,order:h,makeCollapsible:b,headlineLevel:m}}),(0,a.createElement)("div",{className:"notes"},"List preview. To edit the content visit Custom Links in the admin dashboard.")));{const e=(0,s.__)("Select a List Type from the Block Settings");return(0,a.createElement)("div",w,C,(0,a.createElement)(d.RichText,{tagName:y,value:p,onChange:e=>n({headline:e}),placeholder:(0,s.__)("Heading..."),formattingControls:[]}),(0,a.createElement)(c.Placeholder,{icon:o.linkList,label:p||(0,s.__)("Link List")},(0,a.createElement)(c.Spinner,null)," ",e))}})),k=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"carkeek-blocks/custom-link-list","version":"0.1.0","title":"Custom Link List","category":"widgets","icon":"smiley","description":"Example block scaffolded with Create Block tool.","supports":{"html":false,"anchor":true},"keywords":["link","list","accordion"],"textdomain":"carkeek-blocks","editorScript":"file:./index.js","style":"file:./style-index.css","attributes":{"sortBy":{"type":"string","default":"title"},"order":{"type":"string","default":"ASC"},"groupByChild":{"type":"boolean","default":true},"makeCollapsible":{"type":"boolean","default":true},"makeTitlesCollapsible":{"type":"boolean","default":false},"listSelected":{"type":"string"},"hideIfEmpty":{"type":"boolean","default":true},"emptyMessage":{"type":"string"},"headline":{"type":"string"},"headlineLevel":{"type":"number","default":2},"primaryContent":{"type":"string","default":"links"}}}');(0,n.registerBlockType)(k,{icon:{src:o.linkList},edit:m})}},l={};function n(e){var a=l[e];if(void 0!==a)return a.exports;var r=l[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=function(t,l,a,r){if(!l){var o=1/0;for(d=0;d<e.length;d++){l=e[d][0],a=e[d][1],r=e[d][2];for(var i=!0,s=0;s<l.length;s++)(!1&r||o>=r)&&Object.keys(n.O).every((function(e){return n.O[e](l[s])}))?l.splice(s--,1):(i=!1,r<o&&(o=r));if(i){e.splice(d--,1);var c=a();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[l,a,r]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={662:0,842:0};n.O.j=function(t){return 0===e[t]};var t=function(t,l){var a,r,o=l[0],i=l[1],s=l[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(s)var d=s(n)}for(t&&t(l);c<o.length;c++)r=o[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(d)},l=self.webpackChunkexample_dynamic=self.webpackChunkexample_dynamic||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var a=n.O(void 0,[842],(function(){return n(926)}));a=n.O(a)}();