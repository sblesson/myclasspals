(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[10],{585:function(e,t,a){"use strict";a.d(t,"d",(function(){return i})),a.d(t,"j",(function(){return m})),a.d(t,"i",(function(){return p})),a.d(t,"k",(function(){return d})),a.d(t,"h",(function(){return f})),a.d(t,"c",(function(){return b})),a.d(t,"a",(function(){return v})),a.d(t,"b",(function(){return g})),a.d(t,"g",(function(){return h})),a.d(t,"f",(function(){return E})),a.d(t,"e",(function(){return y}));var n=a(5),r=a.n(n),c=a(13),s=a(8),o=a.n(s),l=a(6),u=a(3),i=(a(52),function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,s;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},a.prev=1,a.next=4,o.a.post("/post/createpost",e,c);case 4:s=a.sent,n({type:u.h,payload:s.data}),n(Object(l.c)("Post created","success")),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(1),Object(l.a)(a.t0,"ADD_POST_ERROR");case 12:t();case 13:case"end":return a.stop()}}),a,null,[[1,9]])})));return function(e){return a.apply(this,arguments)}}()}),m=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,s,i;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return s={headers:{"Content-Type":"application/json"}},a.prev=1,a.next=4,o.a.post("/post/searchpost",e,s,{cancelToken:new o.a.CancelToken((function(e){return c=e}))});case 4:i=a.sent,n({type:u.jb,payload:i.data}),t(i.data.post,c),a.next=14;break;case 9:if(a.prev=9,a.t0=a.catch(1),!o.a.isCancel(a.t0)){a.next=13;break}return a.abrupt("return");case 13:Object(l.a)(a.t0,"SEARCH_POST_ERROR");case 14:case"end":return a.stop()}}),a,null,[[1,9]])})));return function(e){return a.apply(this,arguments)}}()},p=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,s,i;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c=o.a.CancelToken.source(),s={headers:{"Content-Type":"application/json"}},a.prev=2,a.next=5,o.a.post("/post/searchpost",e,s,{cancelToken:c.token});case 5:i=a.sent,n({type:u.L,payload:i.data.post}),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(2),Object(l.a)(a.t0,"CREATE_PRIVATE_POST_ERROR");case 12:t(c);case 13:case"end":return a.stop()}}),a,null,[[2,9]])})));return function(e){return a.apply(this,arguments)}}()},d=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,s;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},a.prev=1,a.next=4,o.a.post("/post/createpost",e,c);case 4:s=a.sent,n({type:u.lb,payload:s.data}),n(Object(l.c)("New Message Created","success")),t(s.data),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(1),Object(l.a)(a.t0,"CREATE_POST_ERROR");case 13:case"end":return a.stop()}}),a,null,[[1,10]])})));return function(e){return a.apply(this,arguments)}}()},f=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(a){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.a.get("/post/getpost?id=".concat(e));case 3:n=t.sent,a({type:u.I,payload:n.data.post}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),Object(l.a)(t.t0,"GET_POST_ERROR");case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},b=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,s;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},a.prev=1,a.next=4,o.a.post("/post/".concat(e,"/addcomment"),t,c);case 4:s=a.sent,n({type:u.g,payload:{postId:e,comments:s.data.post.comments}}),n(Object(l.c)("Comment Added","success")),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(1),Object(l.a)(a.t0,"ADD_MESSAGE_REPLY_ERROR");case 12:case"end":return a.stop()}}),a,null,[[1,9]])})));return function(e){return a.apply(this,arguments)}}()},v=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,s;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},a.prev=1,a.next=4,o.a.post("/post/".concat(e,"/addcomment"),t,c);case 4:s=a.sent,n({type:u.d,payload:{postId:e,comments:s.data.post.comments}}),n(Object(l.c)("Comment Added","success")),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(1),Object(l.a)(a.t0,"ADD_COMMENT_ERROR");case 12:case"end":return a.stop()}}),a,null,[[1,9]])})));return function(e){return a.apply(this,arguments)}}()},g=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,s;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},a.prev=1,a.next=4,o.a.post("/post/".concat(e,"/addcomment"),t,c);case 4:s=a.sent,n({type:u.e,payload:{postId:e,comments:s.data.post.comments}}),n(Object(l.c)("Comment Added","success")),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(1),Object(l.a)(a.t0,"ADD_COMMENT_SINGLE_POST_ERROR");case 12:case"end":return a.stop()}}),a,null,[[1,9]])})));return function(e){return a.apply(this,arguments)}}()},h=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(a){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.a.delete("/post/deletepost/".concat(e));case 3:t.sent,a({type:u.u,payload:e}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),Object(l.a)(t.t0,"DELETE_POST_ERROR");case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},E=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,o.a.delete("/post/deletepost/".concat(e));case 3:a.sent,n({type:"DELETE_MESSAGE",payload:e}),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(0),Object(l.a)(a.t0,"DELETE_POST_ERROR");case 10:t();case 11:case"end":return a.stop()}}),a,null,[[0,7]])})));return function(e){return a.apply(this,arguments)}}()},y=function(e,t,a){return function(){var n=Object(c.a)(r.a.mark((function n(c){var s;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,o.a.delete("/post/deletepost/".concat(t));case 3:s=n.sent,c(a?{type:u.db,payload:{postId:e,commentId:t,comments:s.data}}:{type:u.bb,payload:{postId:e,commentId:t,comments:s.data}}),c(Object(l.c)("Comment Removed","success")),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0),Object(l.a)(n.t0,"DELETE_POST_ERROR");case 11:case"end":return n.stop()}}),n,null,[[0,8]])})));return function(e){return n.apply(this,arguments)}}()}},596:function(e,t,a){"use strict";var n=a(21),r=a(0),c=a.n(r),s=a(55),o=a(579),l=a(570),u={name:"star",theme:"outlined",icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"}}]}},i=a(101),m=function(e,t){return c.a.createElement(i.a,Object.assign({},e,{ref:t,icon:u}))};m.displayName="StarOutlined";c.a.forwardRef(m);var p={name:"form",theme:"outlined",icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z"}},{tag:"path",attrs:{d:"M355.9 534.9L354 653.8c-.1 8.9 7.1 16.2 16 16.2h.4l118-2.9c2-.1 4-.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-415.8 415a8.3 8.3 0 00-2.3 5.6zm63.5 23.6L779.7 199l45.2 45.1-360.5 359.7-45.7 1.1.7-46.4z"}}]}},d=function(e,t){return c.a.createElement(i.a,Object.assign({},e,{ref:t,icon:p}))};d.displayName="FormOutlined";var f=c.a.forwardRef(d),b=a(19),v=a(22),g=a(575),h=a(239),E=a(335),y=a(576),O=a(20),j=a(585),x=a(190),w=a(609),S=a(584),k=a.n(S),C=a(34),R=Object(O.b)((function(e){return{auth:e.auth}}),{searchUser:C.g,clearAutoCompleteUserSearchResult:C.a})((function(e){var t=e.searchUser,a=(e.clearAutoCompleteUserSearchResult,e.auth),n=e.onChangeUserSelect;console.log("inside Message AutoCompleteUserSearch");var s=x.a.Option;Object(r.useEffect)((function(){}),[]);var o=a&&a.searchUserResult&&a.searchUserResult.length>0&&a.searchUserResult.map((function(e,t){return c.a.createElement(s,{key:t,value:e.email},c.a.createElement("span",{style:{fontWeigth:"bolder"}}," ",e.email))}));return c.a.createElement(w.a,{style:{width:"100%"},placeholder:"Type Name",onSelect:function(e){e&&(console.log(e),n(e))},onSearch:function(e){e&&k.a.debounce((function(){t(e)}),1e3)()}},o)})),P=(a(600),c.a.memo((function(e){var t=e.userId,a=e.sendPrivateMessage,u=e.toAddress,i=e.noMessagesFound,m=e.history,p=Object(r.useState)("small"),d=Object(n.a)(p,2),b=d[0],O=(d[1],Object(r.useState)(u||"")),j=Object(n.a)(O,2),x=j[0],w=j[1],S=Object(r.useState)(!1),k=Object(n.a)(S,2),C=k[0],P=k[1],_=Object(r.useState)("Send Private Message"),I=Object(n.a)(_,2),T=I[0],N=(I[1],function(){P(!0)}),M=function(){P(!1)},U={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},A=c.a.createElement(v.c,{initialValues:{userId:t,endUserId:x,subject:"",message:"",isPrivate:!0},onSubmit:function(e,t){e.endUserId=x,a(e,(function(e){e&&e.post&&e.post._id&&m.push("/messages/".concat(e.post._id))})),P(!1)},validator:function(){return{}},render:function(){return c.a.createElement("div",{style:{flex:1,padding:10}},c.a.createElement(g.a,Object.assign({className:"form-wrapper"},U,{layout:"vertical",initialValues:{size:b}}),u?"":c.a.createElement(h.a,{name:"endUserId",label:"Select your friends"},c.a.createElement(R,{onChangeUserSelect:function(e,t){w(e)}})),c.a.createElement(h.a,{name:"subject",label:"Subject"},c.a.createElement(E.a,{name:"subject",placeholder:"Subject"})),c.a.createElement(h.a,{name:"message",label:"Your Message",required:!1},c.a.createElement(E.a.TextArea,{className:"post-form-text-input post-form-textarea",name:"message",cols:"30",rows:"5",placeholder:"Enter your message ...",required:!1})),c.a.createElement(y.a,{className:"ant-btn btn-primary"}," Send")))}}),D=c.a.createElement("div",{className:"private-message-modal"},c.a.createElement("div",{as:"h4",className:"message-head-title"},"Inbox"),c.a.createElement("div",{as:"h4",className:"message-head-title message-head-link",onClick:N},c.a.createElement(f,{className:"message-head-icon"}),"Compose")),L=c.a.createElement("div",{className:"private-message-modal",onClick:N},c.a.createElement(s.a,{type:"primary",className:"btn-primary",style:{padding:"4px 10px",fontSize:"12px"}},"Message")),z=c.a.createElement("div",{className:"private-message-modal"},c.a.createElement(o.a,{status:"warning",subTitle:"No messages found!",extra:c.a.createElement("div",{as:"h4",className:"message-head-title message-head-link",onClick:N},c.a.createElement(f,{className:"message-head-icon"}),"Compose")}));return c.a.createElement("div",{className:"message-body__private-message-modal"},i&&z,!i&&!u&&D,u&&L,c.a.createElement(l.a,{title:T,centered:!0,visible:C,onOk:M,onCancel:M,destroyOnClose:!0,cancelButtonProps:{style:{display:"none"}},footer:null},A))}),(function(e,t){return!e.userId||e.userId===t.userId}))),_=function(e){return{hideModal:e.hideModal,currentGroup:e.group.currentGroup}};t.a=Object(O.b)(_,{sendPrivateMessage:j.k,mapDispatchToProps:_})(Object(b.h)(P))},600:function(e,t,a){},609:function(e,t,a){"use strict";var n=a(0),r=a(50),c=a(2),s=a.n(c),o=a(15),l=a(190),u=a(29),i=a(11);function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function p(e){return(p="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var d=l.a.Option,f=l.a;function b(e){return e&&e.type&&(e.type.isSelectOption||e.type.isSelectOptGroup)}var v=n.forwardRef((function(e,t){var a,c=e.prefixCls,v=e.className,g=e.children,h=e.dataSource,E=Object(r.a)(g),y=n.useRef();n.useImperativeHandle(t,(function(){return y.current})),1===E.length&&n.isValidElement(E[0])&&!b(E[0])&&(a=E[0]);var O,j=function(){return a};return O=E.length&&b(E[0])?g:h?h.map((function(e){if(n.isValidElement(e))return e;switch(p(e)){case"string":return n.createElement(d,{key:e,value:e},e);case"object":var t=e.value;return n.createElement(d,{key:t,value:t},e.text);default:throw new Error("AutoComplete[dataSource] only supports type `string[] | Object[]`.")}})):[],n.useEffect((function(){Object(i.a)(!("dataSource"in e),"AutoComplete","`dataSource` is deprecated, please use `options` instead."),Object(i.a)(!a||!("size"in e),"AutoComplete","You need to control style self instead of setting `size` when using customize input.")}),[]),n.createElement(u.a,null,(function(t){var a=(0,t.getPrefixCls)("select",c);return n.createElement(f,m({ref:y},Object(o.a)(e,["dataSource"]),{prefixCls:a,className:s()(v,"".concat(a,"-auto-complete")),mode:l.a.SECRET_COMBOBOX_MODE_DO_NOT_USE,getInputElement:j}),O)}))}));v.Option=d,t.a=v},610:function(e,t,a){},614:function(e,t,a){},621:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(20),s=a(86),o=a(650),l=a(693),u=a(699),i=a(122),m=a(702),p=a(586),d=a.n(p),f=(a(584),a(245)),b=a(1),v=a(21),g=a(627),h=a(585),E=a(596),y=a(243),O=a(692),j=a(691),x=a(687),w=a(643),S=a(337),k=a(55),C=(a(610),Object(c.b)((function(e){return{post:e.post}}),{getPrivateMessages:h.i,getPost:h.h,addMessageReply:h.c})((function(e){var t=e.post.currentPost,a=e.addMessageReply,c=Object(n.useState)({submitting:!1,value:""}),s=Object(v.a)(c,2),o=s[0],l=s[1],u=y.a.TextArea;return r.a.createElement(r.a.Fragment,null,t?r.a.createElement(O.a,{style:{width:"100%"}},r.a.createElement(j.a,null,r.a.createElement(j.a.Item,null,r.a.createElement(x.a,{avatar:r.a.createElement(w.a,{size:"small",className:"avatar-icon",gap:4},t.userId.charAt(0)),key:t._id,author:t.endUserId,content:t.message})),t.comments&&t.comments.length>0&&t.comments.map((function(e,t){return r.a.createElement(j.a.Item,{key:t},r.a.createElement(x.a,{key:e._id,author:e.userId,avatar:r.a.createElement(w.a,{className:"avatar-icon",size:"small",gap:4},e.userId.charAt(0)),content:e.message,datetime:e.datetime}))}))),r.a.createElement(g.a,{style:{margin:0}}),r.a.createElement(x.a,{style:{width:"100%"},content:r.a.createElement("div",null,r.a.createElement(S.a.Item,null,r.a.createElement(u,{name:"reply",className:"input-block-level form-control",onChange:function(e){return(t=e).preventDefault(),void l(Object(b.a)(Object(b.a)({},o),{},Object(f.a)({},"value",t.target.value)));var t},placeholder:"Type a message",value:o.value})),r.a.createElement(S.a.Item,null,r.a.createElement(k.a,{htmlType:"button",onClick:function(e){e.preventDefault(),e.stopPropagation();var n={message:o.value,endUserId:t.endUserId,subject:t.subject};l(Object(b.a)(Object(b.a)({},o),{},Object(f.a)({},"submitting",!0))),l(Object(b.a)(Object(b.a)({},o),{},Object(f.a)({},"value",""))),a(t._id,n)},type:"primary",style:{float:"right"},className:"btn-primary"},"Send")))})):r.a.createElement(E.a,{noMessagesFound:!0}))}))),R=a(570),P=Object(c.b)((function(e){return{post:e.post}}),{deleteMessage:h.f})((function(e){var t=e.deleteMessage,a=e.postType,c=e.post,s=Object(n.useState)("Please don't delete me!"),o=Object(v.a)(s,2),l=o[0],u=(o[1],Object(n.useState)(!1)),i=Object(v.a)(u,2),m=i[0],p=i[1],d=function(){p(!m)};return r.a.createElement("div",null,r.a.createElement("div",{className:"account-info-action-container",onClick:d},r.a.createElement("div",{className:"account-info-delete-button-right"},r.a.createElement("span",null,"Delete"))),r.a.createElement(R.a,Object(f.a)({title:l,centered:!0,visible:m,onOk:function(){c&&c.currentPost&&c.currentPost._id&&t(c.currentPost._id,(function(){window.location.pathname="/messages"})),p(!1)},okText:"Delete",onCancel:d,destroyOnClose:!0,cancelButtonProps:{style:{display:"none"}}},"destroyOnClose",!0),r.a.createElement("div",null,"Deleting this ",a," will removes it forever. Are you sure you want to delete?")))}));a(614),t.a=Object(c.b)((function(e){return{post:e.post}}),{})((function(e){var t=e.post.currentPost,a=e.isMobile,n=e.loading,c=e.userEmail;console.log(" MessageDetailsPage"),console.log(t);var p=r.a.createElement(s.a,null,r.a.createElement(s.a.Item,null," ",r.a.createElement(P,{postType:"message"})));return n?r.a.createElement(o.a,null):null!==t?r.a.createElement("div",{className:"wrapper"},r.a.createElement(l.a,{ghost:!1,onBack:!!a&&function(){return window.history.back()},title:r.a.createElement(d.a,{length:80,tooltip:!0},t.subject),subTitle:t.description,extra:r.a.createElement(u.a,{overlay:p,placement:"bottomCenter",className:"ant-dropdown-link"},r.a.createElement(m.a,null))},r.a.createElement(C,{userEmail:c}))):r.a.createElement(i.a,{description:"Message not exist"})}))},627:function(e,t,a){"use strict";var n=a(0),r=a(2),c=a.n(r),s=a(29);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var u=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a};t.a=function(e){return n.createElement(s.a,null,(function(t){var a,r=t.getPrefixCls,s=e.prefixCls,i=e.type,m=void 0===i?"horizontal":i,p=e.orientation,d=void 0===p?"center":p,f=e.className,b=e.children,v=e.dashed,g=u(e,["prefixCls","type","orientation","className","children","dashed"]),h=r("divider",s),E=d.length>0?"-".concat(d):d,y=c()(f,h,"".concat(h,"-").concat(m),(l(a={},"".concat(h,"-with-text").concat(E),b),l(a,"".concat(h,"-dashed"),!!v),a));return n.createElement("div",o({className:y},g,{role:"separator"}),b&&n.createElement("span",{className:"".concat(h,"-inner-text")},b))}))}},670:function(e,t,a){},696:function(e,t,a){"use strict";a.r(t);var n=a(245),r=a(0),c=a.n(r),s=a(20),o=a(248),l=a(650),u=a(122),i=a(585),m=a(596),p=a(691),d=a(643),f=a(10),b=a(586),v=a.n(b),g=(a(670),c.a.memo((function(e){var t,a=e.messages,n=e.messageUrl,r=e.userEmail;console.log("MessageList"+a);return c.a.createElement(p.a,{className:"message-list",pagination:{onChange:function(e){console.log(e)},pageSize:50,hideOnSinglePage:!0},itemLayout:"vertical",size:"small",dataSource:a,renderItem:function(e){return c.a.createElement(p.a.Item,{key:e._id,onClick:function(a){return function(e,a){console.log(a.target.classList),console.log(a),a.target.classList.add("selected"),t=e._id,console.log(t),console.log(e._id)}(e,a)},className:t===e._id?"selected":"spider"},c.a.createElement(f.b,{to:"".concat(n).concat(e._id)}," ",c.a.createElement(p.a.Item.Meta,{avatar:c.a.createElement(d.a,{size:"large",gap:4,className:"avatar-icon"},r===e.endUserId?e.userId.charAt(0):e.endUserId?e.endUserId.charAt(0):""),title:e.subject,description:c.a.createElement(v.a,{length:40,tooltip:!0},r===e.endUserId?e.userId:e.endUserId)})))}})}))),h=c.a.memo((function(e){var t=e.post,a=e.messageUrl,n=e.userEmail;return console.log(t.currentPost),c.a.createElement("div",{className:"sider"},t&&t.messages&&t.messages.length>0&&c.a.createElement(g,{messages:t.messages,messageUrl:a,userEmail:n}))}),(function(e,t){return e.messageUrl===t.messageUrl&&!(e.post&&e.post.currentPost&&t.post.currentPost&&e.post.currentPost._id!==t.post.currentPost._id)})),E=Object(s.b)((function(e){return{post:e.post}}),{})(h),y=a(621),O=(a(610),c.a.memo((function(e){var t,a=e.getPrivateMessages,s=e.getPost,i=e.post,p=i.messages,d=i.loading,f=e.auth,b=e.match,v=Object(o.useMediaQuery)({maxWidth:767}),g=Object(r.useRef)(!0);Object(r.useEffect)((function(){return g.current&&a({userId:f.user.email,isPrivate:!0},(function(e){e.cancel()})),function(){g.current=!1}}),[g]),Object(r.useEffect)((function(){return b&&b.params&&b.params.id&&(t=b.params.id,s(t,(function(e){e.cancel()}))),function(){}}),[s,b]);var h=function(){return d?c.a.createElement(l.a,null):p&&p.length>0?c.a.createElement("div",Object(n.a)({style:"message-body"},"style",{marginLeft:"2rem"}),c.a.createElement(m.a,null),c.a.createElement("div",{style:{display:"flex"}},c.a.createElement(E,{messageUrl:"/messages/",userEmail:f.user.email}),c.a.createElement(y.a,{loading:d,isMobile:v,userEmail:f.user.email}))):c.a.createElement(j,null)},O=function(){return p&&p.length>0?c.a.createElement(c.a.Fragment,null,c.a.createElement(m.a,null),c.a.createElement(E,{messageUrl:"/message/",userEmail:f.user.email})):c.a.createElement(j,null)},j=function(){return c.a.createElement(u.a,{image:"https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg",imageStyle:{height:60},className:"centered-content",description:c.a.createElement("span",null,"You have no messages in your inbox. Create new by clicking compose button.")},c.a.createElement(m.a,{userId:f.user._id}))};return c.a.createElement(c.a.Fragment,null,v?c.a.createElement(O,null):c.a.createElement(h,null))}),(function(e,t){return!e.match.params||e.match.params.id===t.match.params.id})));t.default=Object(s.b)((function(e){return{post:e.post,auth:e.auth}}),{getPrivateMessages:i.i,getPost:i.h})(O)}}]);
//# sourceMappingURL=10.53b6a251.chunk.js.map