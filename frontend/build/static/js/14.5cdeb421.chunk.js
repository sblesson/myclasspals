(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[14],{585:function(e,t,a){"use strict";a.d(t,"d",(function(){return i})),a.d(t,"j",(function(){return p})),a.d(t,"i",(function(){return m})),a.d(t,"k",(function(){return d})),a.d(t,"h",(function(){return f})),a.d(t,"c",(function(){return E})),a.d(t,"a",(function(){return b})),a.d(t,"b",(function(){return v})),a.d(t,"g",(function(){return h})),a.d(t,"f",(function(){return y})),a.d(t,"e",(function(){return O}));var n=a(5),r=a.n(n),c=a(13),o=a(8),s=a.n(o),u=a(6),l=a(3),i=(a(52),function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,o;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},a.prev=1,a.next=4,s.a.post("/post/createpost",e,c);case 4:o=a.sent,n({type:l.h,payload:o.data}),n(Object(u.c)("Post created","success")),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(1),Object(u.a)(a.t0,"ADD_POST_ERROR");case 12:t();case 13:case"end":return a.stop()}}),a,null,[[1,9]])})));return function(e){return a.apply(this,arguments)}}()}),p=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,o,i;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return o={headers:{"Content-Type":"application/json"}},a.prev=1,a.next=4,s.a.post("/post/searchpost",e,o,{cancelToken:new s.a.CancelToken((function(e){return c=e}))});case 4:i=a.sent,n({type:l.jb,payload:i.data}),t(i.data.post,c),a.next=14;break;case 9:if(a.prev=9,a.t0=a.catch(1),!s.a.isCancel(a.t0)){a.next=13;break}return a.abrupt("return");case 13:Object(u.a)(a.t0,"SEARCH_POST_ERROR");case 14:case"end":return a.stop()}}),a,null,[[1,9]])})));return function(e){return a.apply(this,arguments)}}()},m=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,o,i;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c=s.a.CancelToken.source(),o={headers:{"Content-Type":"application/json"}},a.prev=2,a.next=5,s.a.post("/post/searchpost",e,o,{cancelToken:c.token});case 5:i=a.sent,n({type:l.L,payload:i.data.post}),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(2),Object(u.a)(a.t0,"CREATE_PRIVATE_POST_ERROR");case 12:t(c);case 13:case"end":return a.stop()}}),a,null,[[2,9]])})));return function(e){return a.apply(this,arguments)}}()},d=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,o;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},a.prev=1,a.next=4,s.a.post("/post/createpost",e,c);case 4:o=a.sent,n({type:l.lb,payload:o.data}),n(Object(u.c)("New Message Created","success")),t(o.data),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(1),Object(u.a)(a.t0,"CREATE_POST_ERROR");case 13:case"end":return a.stop()}}),a,null,[[1,10]])})));return function(e){return a.apply(this,arguments)}}()},f=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(a){var n;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.get("/post/getpost?id=".concat(e));case 3:n=t.sent,a({type:l.I,payload:n.data.post}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),Object(u.a)(t.t0,"GET_POST_ERROR");case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},E=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,o;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},a.prev=1,a.next=4,s.a.post("/post/".concat(e,"/addcomment"),t,c);case 4:o=a.sent,n({type:l.g,payload:{postId:e,comments:o.data.post.comments}}),n(Object(u.c)("Comment Added","success")),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(1),Object(u.a)(a.t0,"ADD_MESSAGE_REPLY_ERROR");case 12:case"end":return a.stop()}}),a,null,[[1,9]])})));return function(e){return a.apply(this,arguments)}}()},b=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,o;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},a.prev=1,a.next=4,s.a.post("/post/".concat(e,"/addcomment"),t,c);case 4:o=a.sent,n({type:l.d,payload:{postId:e,comments:o.data.post.comments}}),n(Object(u.c)("Comment Added","success")),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(1),Object(u.a)(a.t0,"ADD_COMMENT_ERROR");case 12:case"end":return a.stop()}}),a,null,[[1,9]])})));return function(e){return a.apply(this,arguments)}}()},v=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){var c,o;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={headers:{"Content-Type":"application/json"}},a.prev=1,a.next=4,s.a.post("/post/".concat(e,"/addcomment"),t,c);case 4:o=a.sent,n({type:l.e,payload:{postId:e,comments:o.data.post.comments}}),n(Object(u.c)("Comment Added","success")),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(1),Object(u.a)(a.t0,"ADD_COMMENT_SINGLE_POST_ERROR");case 12:case"end":return a.stop()}}),a,null,[[1,9]])})));return function(e){return a.apply(this,arguments)}}()},h=function(e){return function(){var t=Object(c.a)(r.a.mark((function t(a){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.delete("/post/deletepost/".concat(e));case 3:t.sent,a({type:l.u,payload:e}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),Object(u.a)(t.t0,"DELETE_POST_ERROR");case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},y=function(e,t){return function(){var a=Object(c.a)(r.a.mark((function a(n){return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,s.a.delete("/post/deletepost/".concat(e));case 3:a.sent,n({type:"DELETE_MESSAGE",payload:e}),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(0),Object(u.a)(a.t0,"DELETE_POST_ERROR");case 10:t();case 11:case"end":return a.stop()}}),a,null,[[0,7]])})));return function(e){return a.apply(this,arguments)}}()},O=function(e,t,a){return function(){var n=Object(c.a)(r.a.mark((function n(c){var o;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,s.a.delete("/post/deletepost/".concat(t));case 3:o=n.sent,c(a?{type:l.db,payload:{postId:e,commentId:t,comments:o.data}}:{type:l.bb,payload:{postId:e,commentId:t,comments:o.data}}),c(Object(u.c)("Comment Removed","success")),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0),Object(u.a)(n.t0,"DELETE_POST_ERROR");case 11:case"end":return n.stop()}}),n,null,[[0,8]])})));return function(e){return n.apply(this,arguments)}}()}},590:function(e,t,a){},604:function(e,t,a){},605:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(10),o=a(589),s=a.n(o),u=a(20),l=a(245),i=a(1),p=a(21),m=a(585),d=a(55),f=(a(604),Object(u.b)(null,{addComment:m.a,addCommentToSinglePost:m.b})((function(e){var t=e.postId,a=e.groupId,c=e.userId,o=e.userName,s=e.isSinglePost,u=e.addComment,m=e.addCommentToSinglePost,f=Object(n.useState)({message:"",groupId:a,userId:c,userName:o}),E=Object(p.a)(f,2),b=E[0],v=E[1],h=Object(n.useState)(""),y=Object(p.a)(h,2),O=(y[0],y[1],function(e){e.preventDefault(),b.message&&(s?m(t,b):u(t,b),v(Object(i.a)(Object(i.a)({},b),{},Object(l.a)({},"message",""))))});return r.a.createElement("div",{className:"comment-form"},r.a.createElement("form",{onSubmit:function(e){O(e)}},r.a.createElement("textarea",{name:"message",className:"form-control comment-rounded-textarea ",rows:"2",placeholder:"Write a comment...",value:b.message,onChange:function(e){return v(Object(i.a)(Object(i.a)({},b),{},Object(l.a)({},e.target.name,e.target.value)))},onKeyDown:function(e){return v(Object(i.a)(Object(i.a)({},b),{},Object(l.a)({},e.target.name,e.target.value)))},required:!0}),r.a.createElement(d.a,{htmlType:"button",onClick:O,type:"primary",style:{float:"right",marginTop:5},className:"btn-primary reply-btn"},"Send")))}))),E=a(692),b=a(86),v=a(691),h=a(699),y=a(643),O=a(586),g=a.n(O),j=a(570),k=(a(584),Object(u.b)((function(e){return{post:e.post}}),{deletePost:m.g,deleteComment:m.e})((function(e){var t=e.deletePost,a=e.deleteComment,c=e.postId,o=e.postType,s=e.commentId,u=e.isSinglePost,i=e.post,m=Object(n.useState)("Please don't delete me!"),d=Object(p.a)(m,2),f=d[0],E=(d[1],Object(n.useState)(!1)),b=Object(p.a)(E,2),v=b[0],h=b[1],y=function(){h(!v)};return r.a.createElement("div",null,r.a.createElement("div",{className:"account-info-action-container",onClick:y},r.a.createElement("div",{className:"account-info-delete-button-right"},r.a.createElement("span",null,"Delete"))),r.a.createElement(j.a,Object(l.a)({title:f,centered:!0,visible:v,onOk:function(){"comment"===o?a(c,s,u):c?t(c):i&&i.currentPost&&i.currentPost._id&&t(i.currentPost._id),h(!1)},okText:"Delete",onCancel:y,destroyOnClose:!0,cancelButtonProps:{style:{display:"none"}}},"destroyOnClose",!0),r.a.createElement("div",null,"Deleting this ",o," will removes it forever. Are you sure you want to delete?")))}))),w=a(702),x=(a(590),function(e){var t=e.postId,a=e.comment,n=a._id,o=a.message,u=a.userName,l=a.userId,i=(a.avatar,a.postedDate),p=(a.subject,e.isSinglePost),m=E.a.Meta,d=r.a.createElement(b.a,null,r.a.createElement(b.a.Item,{key:"deletepost"}," ",r.a.createElement(k,{postId:t,commentId:n,postType:"comment",isSinglePost:p})));return r.a.createElement(v.a.Item,{className:"feed-comment",actions:[r.a.createElement(h.a,{overlay:d,placement:"bottomCenter"},r.a.createElement("a",{className:"ant-dropdown-link",onClick:function(e){return e.preventDefault()}},r.a.createElement(w.a,null)))]},r.a.createElement(m,{avatar:r.a.createElement(y.a,{className:"avatar-icon",size:"small"},l.charAt(0)),description:r.a.createElement("div",null,r.a.createElement(c.b,{to:"/profile/".concat(t,"/").concat(l)},r.a.createElement("span",{className:"feed-author-title"},u)),r.a.createElement("div",{className:"feed-author-time"},r.a.createElement(s.a,{fromNow:!0,ago:!0},i)," ago"),r.a.createElement(g.a,{length:200,tooltip:!0},o))}))}),C=a(577),I=a(630),R=function(e){e.style;var t=e.post,a=t._id,n=t.userId,o=t.subject,u=t.message,l=t.userName,i=(t.avatar,t.user,t.likes,t.thanks,t.groupId),p=t.comments,m=t.postedDate,d=e.showActions,O=e.showAllComments,j=e.isSinglePost,R=C.a.Paragraph,T=E.a.Meta,P=r.a.createElement(b.a,{onClick:function(e){}},r.a.createElement(b.a.Item,{key:"deletepost"}," ",r.a.createElement(k,{postId:a,postType:"post"})),r.a.createElement(b.a.Item,{key:"editpost"},"Edit")),S=null!==p&&p&&p.length>0&&r.a.createElement(v.a,{itemLayout:"horizontal",dataSource:p,style:{overflow:"hidden"},renderItem:function(e){return r.a.createElement(x,{key:e._id,comment:e,postId:a,groupId:i,isSinglePost:j})}}),_=function(e){var t=e.icon;e.text;return r.a.createElement(c.b,{to:"/posts/".concat(a,"/").concat(i)}," ",r.a.createElement(t)," ",r.a.createElement("span",{className:"comment-count-text"},p.length>1?"".concat(p.length," comments"):"".concat(p.length," comment")))},N=null!==p&&p&&p.length>0&&r.a.createElement(v.a,{itemLayout:"horizontal",dataSource:p.slice(-3),style:{overflow:"hidden"},renderItem:function(e){return r.a.createElement(x,{key:e._id,comment:e,postId:a,groupId:i,isSinglePost:j})}});return r.a.createElement("div",{className:"feed",style:{width:"100%"}},r.a.createElement(E.a,{className:j?"single-feed-card":"feed-card",title:r.a.createElement(c.b,{to:"/profile/".concat(i,"/").concat(n)},r.a.createElement(T,{avatar:r.a.createElement(y.a,{className:"avatar-icon",size:"large"},n.charAt(0)),title:r.a.createElement("span",{className:"feed-author-title"},n),description:r.a.createElement("div",{className:"feed-author-time"},r.a.createElement(s.a,{fromNow:!0,ago:!0},m))})),extra:r.a.createElement(h.a,{overlay:P,placement:"bottomCenter"},r.a.createElement("a",{className:"ant-dropdown-link",onClick:function(e){return e.preventDefault()}},r.a.createElement(w.a,null)))},r.a.createElement(c.b,{className:"feed-title",to:"/posts/".concat(a,"/").concat(i)},r.a.createElement(T,{title:r.a.createElement(g.a,{length:100,tooltip:!0},o)})),r.a.createElement(R,{ellipsis:{rows:2,expandable:!0,symbol:"more"}},u),p&&p.length>0?r.a.createElement(_,{icon:I.a,key:"list-vertical-message"}):"",d&&r.a.createElement("div",{style:{marginBottom:"2rem"}},O?S:N,r.a.createElement(f,{postId:a,groupId:i,userId:n,userName:l,isSinglePost:j})," ")))};R.defaultProps={showActions:!0,showAllComments:!1,isSinglePost:!1};t.a=Object(u.b)((function(e){return{auth:e.auth}}),{})(R)},689:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(10),o=a(20),s=a(246),u=a(605),l=a(585),i=a(684);t.default=Object(o.b)((function(e){return{post:e.post}}),{getPost:l.h})((function(e){var t=e.getPost,a=e.post,o=a.currentPost,l=a.loading,p=e.match;return Object(n.useEffect)((function(){t(p.params.id),p.params.groupId}),[t,p]),l||null===o?r.a.createElement(s.a,null):r.a.createElement(n.Fragment,null,r.a.createElement(c.b,{to:"/dashboard/".concat(p.params.groupId),style:{fontSize:"1rem",marginLeft:"1rem",marginTop:"1rem",cursor:"pointer",display:"inline-block"}},r.a.createElement(i.a,null)),r.a.createElement(u.a,{post:o,showActions:!0,showAllComments:!0,isSinglePost:!0}))}))}}]);
//# sourceMappingURL=14.5cdeb421.chunk.js.map