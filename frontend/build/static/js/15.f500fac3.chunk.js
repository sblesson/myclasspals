(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[15],{510:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(15),s=a(479),l=a(5),i=a.n(l),o=a(9),u=a(7),m=a.n(u),p=a(6),d=a(2);t.a=Object(c.b)((function(e){return{address:e.address}}),{getCityData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return function(){var t=Object(o.a)(i.a.mark((function t(a){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m.a.get("/postaladdress/searchbycity?searchkey=".concat(e));case 3:n=t.sent,a({type:d.C,payload:n.data}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),Object(p.a)(t.t0,"Error occured when fetching city");case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()}})((function(e){var t=e.getCityData,a=e.address,n=s.a.Option,c=a&&a.results&&a.results.length>0&&a.results.map((function(e,t){var a=JSON.stringify(e);return r.a.createElement(n,{key:t,value:a},e.city,", ",e.statecode," ",e.postalcode)}));return r.a.createElement(s.a,{name:"citySelect",showSearch:!0,placeholder:"Select City",onSearch:function(e){setTimeout((function(){t(e)}),1e3*Math.random())},onChange:function(e,t){a&&a.results&&a.results.length>0&&(a.selectedAddress=a.results[t.key])}},c)}))},532:function(e,t,a){},566:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(15),s=a(476),l=a(65),i=a(12),o=a(72),u=(a(143),a(24)),m=a(483),p=a(18),d=a(480),f=a(244),E=a(481),v=a(482),h=a(510),y=Object(c.b)((function(e){return{auth:e.auth}}),{updateUser:u.h})(Object(o.f)((function(e){var t,a=e.auth,c=e.updateUser,s=Object(n.useState)(!1),o=Object(i.a)(s,2),u=o[0],y=o[1],b=function(){y(!u)},N=Object(n.useState)("small"),O=Object(i.a)(N,2),g=O[0],j=(O[1],{labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}}),k=r.a.createElement(p.c,{initialValues:{email:a.user.email,name:"",city:"",state:"",zipcode:""},onSubmit:function(e){var t=JSON.parse(e.citySelect);c({email:a.user.email,name:e.userName,city:t.city,state:t.state,zipcode:t.postalcode},!0),y(!1)},validator:function(){return{}},render:function(){return r.a.createElement("div",{style:{flex:1,padding:10}},r.a.createElement(d.a,Object.assign({className:"form-wrapper"},j,{layout:"vertical",initialValues:{size:g}}),null!==a&&a.user?r.a.createElement(f.a,{name:"userName"},r.a.createElement(E.a,{name:"userName",placeholder:a.user.name})):"",r.a.createElement(f.a,{name:"city"},r.a.createElement(h.a,null)),r.a.createElement(v.a,{className:"ant-btn btn-primary"}," Update")))}});return r.a.createElement(n.Fragment,null," ",r.a.createElement("div",{className:"account-info-action-container",onClick:b},r.a.createElement("div",{style:{float:"right",fontSize:"12px",cursor:"pointer",marginTop:"12px",marginRight:"10px"}},r.a.createElement("span",null,"Edit"))),r.a.createElement(m.a,(t={title:"Edit My Account",centered:!0,visible:u,onOk:function(){y(!1)},okText:"Post",onCancel:b,destroyOnClose:!0,cancelButtonProps:{style:{display:"none"}}},Object(l.a)(t,"destroyOnClose",!0),Object(l.a)(t,"footer",null),t),k))})));a(532),t.default=Object(c.b)((function(e){return{auth:e.auth}}),{})((function(e){var t=e.auth,a=s.a.Content,n=r.a.createElement("div",{className:"profile-content-details",key:t.user._id},r.a.createElement(y,null),r.a.createElement("div",{className:"user-info-item"},r.a.createElement("div",{className:"user-info-content"},t.user.name," ")),t.user.phone&&r.a.createElement("div",{className:"user-info-item"},r.a.createElement("i",{className:"fas fa-mobile"}),r.a.createElement("div",{className:"user-info-content"},t.user.phone," ")),r.a.createElement("div",{className:"user-info-item"},r.a.createElement("i",{className:"fas fa-at"}),r.a.createElement("div",{className:"user-info-content"},t.user.email," ")),t.user.city?r.a.createElement("div",{className:"user-info-item"},r.a.createElement("i",{className:"fas fa-map-marker big"}),r.a.createElement("div",{className:"user-info-content"},t.user.city,", ",t.user.state," ",t.user.zipcode)):"");return r.a.createElement(a,null,r.a.createElement("div",{className:"wrapper"},t&&t.user&&r.a.createElement("div",{className:"profile-component-container"},r.a.createElement("div",{className:"profile-component-header"},r.a.createElement("h4",{className:"profile-component-title"},"My Account")),r.a.createElement("div",{className:"profile-component-content"}," ",n))))}))}}]);
//# sourceMappingURL=15.f500fac3.chunk.js.map