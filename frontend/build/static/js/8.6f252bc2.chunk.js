(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[8,9],{494:function(e,t,r){},495:function(e,t,r){"use strict";var n=r(12),a=r(0),o=r.n(a),c=r(15),l=r(10),i=r(568),s=r(22),u=r(561),p=r(43),m=r(514),f=r(143),d=r.n(f),h=r(66),b=r(83),y=r(485),g=Object(c.b)((function(e){return{group:e.group}}),{deleteGroup:b.g})((function(e){var t=e.deleteGroup,r=e.groupId,c=Object(a.useState)("Please don't delete me!"),l=Object(n.a)(c,2),i=l[0],s=(l[1],Object(a.useState)(!1)),u=Object(n.a)(s,2),p=u[0],m=u[1],f=function(){m(!p)};return o.a.createElement("div",null,o.a.createElement("div",{className:"account-info-action-container",onClick:f},o.a.createElement("div",{className:"account-info-delete-button-right"},o.a.createElement("span",null,"Delete"))),o.a.createElement(y.a,Object(h.a)({title:i,centered:!0,visible:p,onOk:function(){t(r),m(!1)},okText:"Delete",onCancel:f,destroyOnClose:!0,cancelButtonProps:{style:{display:"none"}}},"destroyOnClose",!0),o.a.createElement("div",null,"Deleting this grouop will removes it forever. Are you sure you want to delete?")))})),v=r(562);r(494),t.a=Object(c.b)((function(e,t){return{auth:e.auth,group:e.group}}),{acceptUserGroupInvitation:b.a,requestToJoinUserGroup:b.l})((function(e){var t=e.currentGroup,r=e.index,c=e.type,f=e.auth,h=(e.group,e.acceptUserGroupInvitation),b=e.requestToJoinUserGroup,y=(e.deleteGroup,i.a.Meta),E=Object(a.useState)(!1),O=Object(n.a)(E,2),C=(O[0],O[1],function(e){b({groupId:e.id,role:"member",requestorUserId:f.user.email},e,(function(e){console.log(e)}))}),j=o.a.createElement(s.a,{onClick:function(e){"deletegroup"===e&&console.log("deletegroup")}},o.a.createElement(s.a.Item,{key:"deletegroup"}," ",o.a.createElement(g,{groupId:t.id}))),S=function(e){h({groupId:e.id,role:"member",invitedUserId:f.user.email})},k=(u.a,v.a,function(e){if(e){var t=e.toLowerCase();return t=d.a.startCase(t),"PRIVATE"===e?o.a.createElement("span",null,o.a.createElement("i",{className:"fa fa-lock",title:"private group"}),"\xa0",t):o.a.createElement("span",null,o.a.createElement("i",{className:"fa fa-globe",title:"public group"}),"\xa0",t)}});return o.a.createElement(i.a,{key:r,className:"discover-group-card"},o.a.createElement(l.b,{to:"/group/".concat(t.id)},o.a.createElement(y,{avatar:"no"===t.isSchoolGroup?o.a.createElement("i",{className:"fas fa-users icon-group no-padding",style:{paddingRight:0}}):o.a.createElement("i",{className:"fas fa-school icon-group no-padding",title:"school group"}),title:t.groupName})),o.a.createElement(y,{className:"group-card-meta-privacy no-padding",description:function(e){if(e&&e.userGroupMembers&&e.userGroupMembers.length>0)return 1===e.userGroupMembers.length?o.a.createElement("div",null,k(e.privacy)):o.a.createElement("div",null,k())}(t)}),o.a.createElement(y,{className:"group-card-meta-count no-padding",description:function(e){if(e&&e.userGroupMembers){if(e.userGroupMembers.length<=1)return"".concat(e.userGroupMembers.length," member");if(e.userGroupMembers.length>1)return"".concat(e.userGroupMembers.length," members")}}(t)}),o.a.createElement(y,{className:"group-card-meta-role no-padding",description:function(e){return"admin"===e.role?o.a.createElement(m.a,{color:"blue"},e.role):"member"===e.role?o.a.createElement(m.a,{color:"geekblue"},e.role):"y      hb youhkujhjmhjhkhvitation"===e.role?o.a.createElement(m.a,{color:"green"},e.role):void 0}(t)}),o.a.createElement(y,{className:"group-card-meta-action group-action no-padding",description:function(e,t){if(e)switch(t){case"mygroup":case"discover":if(null===e.role)return"PUBLIC"===e.privacy?o.a.createElement(p.a,{key:"".concat(e.id,"_join_btn"),className:"btn-primary",onClick:function(){return C(e)}},"Join"):o.a.createElement(p.a,{className:"btn-primary",key:"".concat(e.id,"_request_btn"),onClick:function(){return C(e)}},"Request");if("admin"===e.role)return o.a.createElement(u.a,{overlay:j,placement:"bottomCenter",style:{float:"right"}},o.a.createElement("a",{className:"ant-dropdown-link",onClick:function(e){return e.preventDefault()}},o.a.createElement(v.a,null)));if("member"===e.role)return null;if("Pending Invitation"===e.role||"Pending Requests"===e.role)return o.a.createElement(m.a,{color:"green"},e.role);case"pendingInvitedUserGroups":return"discover"===t&&"PRIVATE"===e.privacy?o.a.createElement(p.a,{key:"".concat(e.id,"_pending_join_btn"),className:"btn-primary",onClick:function(){return S(e)}},"Request"):o.a.createElement(p.a,{key:"".concat(e.id,"_pending_join_btn"),className:"btn-primary",onClick:function(){return S(e)}},"Join");default:return null}}(t,c)}),t.schoolName?o.a.createElement(y,{className:"group-card-meta-desc no-padding",description:t.schoolName?"School Name: ".concat(t.schoolName):""}):"",t.isGroupStatusUpdated?o.a.createElement(y,{className:"group-card-update-status-link no-padding",description:o.a.createElement(l.b,{to:"/group/".concat(t.id)},"Peek inside")}):"")}))},498:function(e,t,r){},500:function(e,t,r){},501:function(e,t,r){},505:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(15),c=r(144),l=r(184),i=r(568),s=r(567),u=r(100),p=r(12),m=r(83),f=r(496),d=r.n(f),h=(r(498),Object(o.b)((function(e){return{group:e.group}}),{searchGroup:m.m})((function(e){e.group;var t=e.searchGroup,r=Object(n.useState)(!1),o=Object(p.a)(r,2),c=o[0],l=o[1],i=Object(n.useState)(null),u=Object(p.a)(i,2),m=u[0],f=u[1],h=Object(n.useState)(null),b=Object(p.a)(h,2),y=b[0],g=b[1],v=Object(n.useState)(null),E=Object(p.a)(v,2),O=E[0],C=E[1],j=["City","Zipcode","School Name"],S=function(e,r){f(e);var n=function(e){var t=d()().utc().format();switch(e){case"Last hour":return{dateFilterGreaterThan:d()().utc().startOf("hour").format(),dateFilterLessThan:t};case"Today":return{dateFilterGreaterThan:d()().utc().startOf("day").format(),dateFilterLessThan:t};case"This week":return{dateFilterGreaterThan:d()().utc().startOf("week").format(),dateFilterLessThan:t};case"This month":return{dateFilterGreaterThan:d()().utc().startOf("month").format(),dateFilterLessThan:t};case"This year":return{dateFilterGreaterThan:d()().utc().startOf("year").format(),dateFilterLessThan:t}}}(e);O&&O.dateFilterLessThan?(O.dateFilterLessThan=n.dateFilterLessThan,O&&O.dateFilterGreaterThan&&(O.dateFilterGreaterThan=n.dateFilterGreaterThan)):(O=Object.assign(O,n),C(O)),t(O)};return a.a.createElement("div",{className:"post-filters"},a.a.createElement("div",{className:"filter-actions",onClick:function(){return l(!c)}},a.a.createElement("i",{className:"fas fa-filter filter-icon"}),a.a.createElement("span",{className:"filter-label"}," FILTER")),c&&a.a.createElement("div",{className:"filter-panel"},a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"col-xs-1 col-sm-1 col-md-6 col-lg-6"},a.a.createElement(s.a,{size:"small",header:a.a.createElement("div",null,"DATE"),bordered:!0,dataSource:["Last hour","Today","This week","This month","This year"],renderItem:function(e){return a.a.createElement(s.a.Item,{onClick:function(t){return S(e)},className:m===e?" selected":""},e,m===e&&a.a.createElement("svg",{className:"svg-icon",viewBox:"0 0 20 20",onClick:function(e){return function(e,r){r.stopPropagation(),O.dateFilterGreaterThan&&delete O.dateFilterGreaterThan,O.dateFilterLessThan&&delete O.dateFilterLessThan,f(null),C(O),t(O)}(0,e)}},a.a.createElement("path",{fill:"none",d:"M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"})))}})),j&&j.length>0&&a.a.createElement("div",{className:"col-xs-1 col-sm-1 col-md-6 col-lg-6"},a.a.createElement(s.a,{size:"small",header:a.a.createElement("div",null,"TYPE"),bordered:!0,dataSource:j,renderItem:function(e){return a.a.createElement(s.a.Item,{onClick:function(r){return function(e,r){g(e),O?O.catagoryId?O.catagoryId=e:O=Object.assign(O,{catagoryId:e}):C({}),t(O)}(e)},className:y===e?" selected":""},e,y===e&&a.a.createElement("svg",{className:"svg-icon",viewBox:"0 0 20 20",onClick:function(e){return function(e,r){r.stopPropagation(),O.catagoryId&&delete O.catagoryId,g(null),C(O),t(O)}(0,e)}},a.a.createElement("path",{fill:"none",d:"M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"})))}})))))})),r(146)),b=r(45),y=r(4),g=r.n(y),v=r(19),E=r(33),O=r(14);function C(){return(C=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function j(e){return(j="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var S=h.a.Option,k=h.a;function w(e){return e&&e.type&&(e.type.isSelectOption||e.type.isSelectOptGroup)}var N=n.forwardRef((function(e,t){var r,a=e.prefixCls,o=e.className,c=e.children,l=e.dataSource,i=Object(b.a)(c),s=n.useRef();n.useImperativeHandle(t,(function(){return s.current})),1===i.length&&n.isValidElement(i[0])&&!w(i[0])&&(r=i[0]);var u,p=function(){return r};return u=i.length&&w(i[0])?c:l?l.map((function(e){if(n.isValidElement(e))return e;switch(j(e)){case"string":return n.createElement(S,{key:e,value:e},e);case"object":var t=e.value;return n.createElement(S,{key:t,value:t},e.text);default:throw new Error("AutoComplete[dataSource] only supports type `string[] | Object[]`.")}})):[],n.useEffect((function(){Object(O.a)(!("dataSource"in e),"AutoComplete","`dataSource` is deprecated, please use `options` instead."),Object(O.a)(!r||!("size"in e),"AutoComplete","You need to control style self instead of setting `size` when using customize input.")}),[]),n.createElement(E.a,null,(function(t){var r=(0,t.getPrefixCls)("select",a);return n.createElement(k,C({ref:s},Object(v.a)(e,["dataSource"]),{prefixCls:r,className:g()(o,"".concat(r,"-auto-complete")),mode:h.a.SECRET_COMBOBOX_MODE_DO_NOT_USE,getInputElement:p}),u)}))}));N.Option=S;var T=N,G=(r(143),{name:"search",theme:"outlined",icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"}}]}}),P=r(39),I=function(e,t){return a.a.createElement(P.a,Object.assign({},e,{ref:t,icon:G}))};I.displayName="SearchOutlined";var _=a.a.forwardRef(I),x=(r(500),Object(o.b)((function(e){return{group:e.group}}),{searchGroupWithFilters:m.n,getGroupAutoComplete:m.i,clearAutoCompleteGroupSearchResult:m.d})((function(e){var t=e.getGroupAutoComplete,r=e.clearAutoCompleteGroupSearchResult,o=e.searchGroupWithFilters,c=e.group,l=h.a.Option,i=h.a.OptGroup;Object(n.useEffect)((function(){r(),Object(m.e)()}),[]);var s=c&&c.autoCompleteSearchResult&&c.autoCompleteSearchResult.length>0&&c.autoCompleteSearchResult.map((function(e){return a.a.createElement(i,{label:e.label,key:e.label},e.options&&e.options.length>0&&e.options.map((function(e){if(e)return a.a.createElement(l,{key:e,value:e},a.a.createElement("div",null," ",a.a.createElement(_,{twoToneColor:"#52c41a",style:{fontSize:".8rem"}}),a.a.createElement("span",{style:{marginLeft:".5rem",paddingTop:".3rem",fontSize:".8rem",display:"inline-block"}},e)))})))}));return a.a.createElement(T,{style:{width:"100%"},placeholder:"Type school name or group name",onSelect:function(e){if(e){var t=e.split(",")[0];o({groupKeyword:t,schoolName:t})}},onSearch:function(e){e&&t(e)}},s)}))),F=r(495);r(501),t.default=Object(o.b)((function(e){return{group:e.group}}),{searchGroup:m.m,searchGroupWithFilters:m.n})((function(e){var t=e.group,r=e.newRegistration;return a.a.createElement(n.Fragment,null,t?a.a.createElement("div",{className:"".concat(r?"":"wrapper group-page")}," ",a.a.createElement("div",{className:"create-btn-wrapper"},a.a.createElement(l.a,null)),a.a.createElement(i.a,{style:{marginBottom:10},bordered:!1},a.a.createElement(x,null)),null!==t&&t.searchResult&&t.searchResult.length>0?a.a.createElement(s.a,{itemLayout:"vertical",size:"small",header:t.searchTerm?"Groups based on your search":"Groups near you",pagination:{onChange:function(e){console.log(e)},total:t.searchResult.length,pageSize:50,hideOnSinglePage:!0},dataSource:t.searchResult,renderItem:function(e){return a.a.createElement(i.a,{key:"".concat(e.id,"-card"),hoverable:!0,bordered:!1},a.a.createElement(F.a,{currentGroup:e,type:"discover"}))}}):a.a.createElement(u.a,{description:t.searchTerm?"No results found. Check the spelling or try again with another keyword.":"No groups found in your city or school"})):a.a.createElement(c.a,null))}))},514:function(e,t,r){"use strict";var n=r(0),a=r(4),o=r.n(a),c=r(19),l=r(51),i=r.n(l),s=r(33);function u(e){return(u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function h(e,t){return!t||"object"!==u(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var g=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r},v=function(e){function t(){var e;return f(this,t),(e=h(this,b(t).apply(this,arguments))).handleClick=function(){var t=e.props,r=t.checked,n=t.onChange;n&&n(!r)},e.renderCheckableTag=function(t){var r,a=t.getPrefixCls,c=e.props,l=c.prefixCls,i=c.className,s=c.checked,u=g(c,["prefixCls","className","checked"]),f=a("tag",l),d=o()(f,(m(r={},"".concat(f,"-checkable"),!0),m(r,"".concat(f,"-checkable-checked"),s),r),i);return delete u.onChange,n.createElement("span",p({},u,{className:d,onClick:e.handleClick}))},e}var r,a,c;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(t,e),r=t,(a=[{key:"render",value:function(){return n.createElement(s.a,null,this.renderCheckableTag)}}])&&d(r.prototype,a),c&&d(r,c),t}(n.Component),E=r(29),O=Object(E.a)("success","processing","error","default","warning"),C=Object(E.a)("pink","red","yellow","orange","cyan","green","blue","purple","geekblue","magenta","volcano","gold","lime"),j=r(185);function S(e){return(S="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function w(){return(w=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function N(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function T(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function G(e,t){return!t||"object"!==S(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function I(e,t){return(I=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var _=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r},x=new RegExp("^(".concat(C.join("|"),")(-inverse)?$")),F=new RegExp("^(".concat(O.join("|"),")$")),R=function(e){function t(){var e;return N(this,t),(e=G(this,P(t).apply(this,arguments))).state={visible:!0},e.handleIconClick=function(t){t.stopPropagation(),e.setVisible(!1,t)},e.renderTag=function(t){var r=e.props,a=r.children,o=_(r,["children"]),l="onClick"in o||a&&"a"===a.type,i=Object(c.a)(o,["onClose","color","visible","closable","prefixCls"]);return l?n.createElement(j.a,null,n.createElement("span",w({},i,{className:e.getTagClassName(t),style:e.getTagStyle()}),a,e.renderCloseIcon())):n.createElement("span",w({},i,{className:e.getTagClassName(t),style:e.getTagStyle()}),a,e.renderCloseIcon())},e}var r,a,l;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&I(e,t)}(t,e),r=t,l=[{key:"getDerivedStateFromProps",value:function(e){return"visible"in e?{visible:e.visible}:null}}],(a=[{key:"getTagStyle",value:function(){var e=this.props,t=e.color,r=e.style,n=this.isPresetColor();return w({backgroundColor:t&&!n?t:void 0},r)}},{key:"getTagClassName",value:function(e){var t,r=e.getPrefixCls,n=e.direction,a=this.props,c=a.prefixCls,l=a.className,i=a.color,s=this.state.visible,u=this.isPresetColor(),p=r("tag",c);return o()(p,(k(t={},"".concat(p,"-").concat(i),u),k(t,"".concat(p,"-has-color"),i&&!u),k(t,"".concat(p,"-hidden"),!s),k(t,"".concat(p,"-rtl"),"rtl"===n),t),l)}},{key:"setVisible",value:function(e,t){var r=this.props.onClose;r&&r(t),t.defaultPrevented||"visible"in this.props||this.setState({visible:e})}},{key:"isPresetColor",value:function(){var e=this.props.color;return!!e&&(x.test(e)||F.test(e))}},{key:"renderCloseIcon",value:function(){return this.props.closable?n.createElement(i.a,{onClick:this.handleIconClick}):null}},{key:"render",value:function(){return n.createElement(s.a,null,this.renderTag)}}])&&T(r.prototype,a),l&&T(r,l),t}(n.Component);R.CheckableTag=v,R.defaultProps={closable:!1};t.a=R},515:function(e,t,r){"use strict";var n=r(0),a=r.n(n),o=r(15),c=r(481),l=r(5),i=r.n(l),s=r(9),u=r(7),p=r.n(u),m=r(6),f=r(2);t.a=Object(o.b)((function(e){return{address:e.address}}),{getCityData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return function(){var t=Object(s.a)(i.a.mark((function t(r){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p.a.get("/postaladdress/searchbycity?searchkey=".concat(e));case 3:n=t.sent,r({type:f.C,payload:n.data}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),Object(m.a)(t.t0,"Error occured when fetching city");case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()}})((function(e){var t=e.getCityData,r=e.address,n=c.a.Option,o=r&&r.results&&r.results.length>0&&r.results.map((function(e,t){var r=JSON.stringify(e);return a.a.createElement(n,{key:t,value:r},e.city,", ",e.statecode," ",e.postalcode)}));return a.a.createElement(c.a,{name:"citySelect",showSearch:!0,placeholder:"Select City",onSearch:function(e){setTimeout((function(){t(e)}),1e3*Math.random())},onChange:function(e,t){r&&r.results&&r.results.length>0&&(r.selectedAddress=r.results[t.key])}},o)}))},516:function(e,t,r){},570:function(e,t,r){"use strict";r.r(t);var n=r(12),a=r(0),o=r.n(a),c=r(73),l=r(15),i=(r(143),r(488)),s=r(24),u=r(83),p=r(18),m=r(482),f=r(244),d=r(483),h=r(484),b=r(515),y=r(227),g=(r(516),Object(l.b)((function(e){return{auth:e.auth}}),{updateUser:s.h,searchGroupWithFilters:u.n})(Object(c.f)((function(e){var t=e.auth,r=e.updateUser,c=e.searchGroupWithFilters,l=e.current,i=e.onStepChange,s=e.history;Object(a.useEffect)((function(){if(t&&t.user){var e=t.user;if(e.userGroup&&e.userGroup.length>0){var r=e.userGroup[0].id;s?s.push("/dashboard/".concat(r)):window.location.pathname="/dashboard/".concat(r)}else e.requestedUserGroup&&e.requestedUserGroup.length>0?s?s.push("/groups"):window.location.pathname="/groups":t.user.city&&i(l)}}),[t]);var u=Object(a.useState)("small"),g=Object(n.a)(u,2),v=g[0],E=(g[1],{labelCol:{xs:{span:16},sm:{span:16},md:{span:16}},wrapperCol:{xs:{span:16},sm:{span:16},md:{span:16}}}),O=o.a.createElement(p.c,{initialValues:{email:t.user.email,name:"",city:"",state:"",zipcode:""},onSubmit:function(e){var n=e&&e.citySelect?JSON.parse(e.citySelect):null;if(null!==n)if(e.schoolSelect){var a=e.schoolSelect.split(",");r({email:t.user.email,name:e.userName,city:n.city,state:n.state,zipcode:n.postalcode,schoolName:a[0]}),c({schoolName:a[0],zipcode:a[3],city:a[1]})}else r({email:t.user.email,name:e.userName,city:n.city,state:n.state,zipcode:n.postalcode}),c({zipcode:n.postalcode,city:n.city});i(l)},validator:function(){return{}},render:function(){return o.a.createElement("div",{className:"profile-form-wrapper"},o.a.createElement(m.a,Object.assign({className:"form-wrapper"},E,{layout:"vertical",initialValues:{size:v}}),null!==t&&t.user&&null===t.user.name?o.a.createElement(f.a,{name:"userName",label:"Name",required:!1},o.a.createElement(d.a,{name:"userName",placeholder:"What should we call you?"})):"",o.a.createElement(f.a,{name:"city",label:"City",required:!0},o.a.createElement(b.a,null)),o.a.createElement(f.a,{name:"schoolName",label:"School group you want to discover",required:!1},o.a.createElement(y.a,null)),o.a.createElement(f.a,{name:"submit"},o.a.createElement(h.a,{className:"ant-btn btn-primary",style:{float:"right"}}," ","Proceed"," "))))}});return o.a.createElement(a.Fragment,null,O)})))),v=r(505);t.default=Object(l.b)((function(e){return{profile:e.profile}}),{})(Object(c.f)((function(e){var t=e.auth,r=e.history;Object(a.useEffect)((function(){if(t&&t.user){var e=t.user;e.userGroup&&e.userGroup.length>0?r.push("/dashboard"):e.requestedUserGroup&&e.requestedUserGroup.length>0?r.push("/groups"):e.city&&f(p)}}),[t]);var l=i.a.Step,s=Object(a.useState)(0),u=Object(n.a)(s,2),p=u[0],m=u[1],f=function(e){m(e+=1)},d=[{title:"Enter your profile",subTitle:"(step 1 of 2)",content:o.a.createElement(g,{onStepChange:f,current:p})},{title:"Manage your group",subTitle:"(step 2 of 2)",content:o.a.createElement(v.default,{newRegistration:!0})}];return t&&t.user.userGroup&&t.user.userGroup.length>0?o.a.createElement(c.a,{to:"/dashboard"}):o.a.createElement(a.Fragment,null,o.a.createElement("div",{className:"create-profile-wrapper"},o.a.createElement(i.a,{current:p,size:"small",className:"profile-step"},d.map((function(e){return o.a.createElement(l,{key:e.title,title:e.title,subTitle:e.subTitle})}))),o.a.createElement("div",{className:"steps-content"},d[p].content)))})))}}]);
//# sourceMappingURL=8.6f252bc2.chunk.js.map