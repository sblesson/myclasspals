/*! For license information please see 11.38479b81.chunk.js.LICENSE.txt */
(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[11],{497:function(e,t,n){"use strict";var a=n(66),r=n(12),o=n(0),i=n.n(o),l=n(15),s=n(260),u=n(485);n(143);t.a=Object(l.b)((function(e){return{post:e.post}}),{deletePost:s.f,deleteComment:s.e})((function(e){var t=e.deletePost,n=e.deleteComment,l=e.postId,s=e.postType,c=e.commentId,m=e.isSinglePost,f=e.post,p=Object(o.useState)("Please don't delete me!"),g=Object(r.a)(p,2),d=g[0],h=(g[1],Object(o.useState)(!1)),y=Object(r.a)(h,2),v=y[0],b=y[1],S=function(){b(!v)};return i.a.createElement("div",null,i.a.createElement("div",{className:"account-info-action-container",onClick:S},i.a.createElement("div",{className:"account-info-delete-button-right"},i.a.createElement("span",null,"Delete"))),i.a.createElement(u.a,Object(a.a)({title:d,centered:!0,visible:v,onOk:function(){"comment"===s?n(l,c,m):l?t(l):f&&f.currentPost&&f.currentPost._id&&t(f.currentPost._id),b(!1)},okText:"Delete",onCancel:S,destroyOnClose:!0,cancelButtonProps:{style:{display:"none"}}},"destroyOnClose",!0),i.a.createElement("div",null,"Deleting this ",s," will removes it forever. Are you sure you want to delete?")))}))},503:function(e,t,n){var a,r;e.exports=(a=n(496),r=n(0),function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){e.exports=n(3)()},function(e,t){e.exports=a},function(e,t){e.exports=r},function(e,t,n){"use strict";var a=n(4);function r(){}function o(){}o.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,o,i){if(i!==a){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:r};return n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){var a,r,o,i,l;i=this,l=function(e){var t=!1,n=!1,a="escape years months weeks days hours minutes seconds milliseconds general".split(" "),r=[{type:"seconds",targets:[{type:"minutes",value:60},{type:"hours",value:3600},{type:"days",value:86400},{type:"weeks",value:604800},{type:"months",value:2678400},{type:"years",value:31536e3}]},{type:"minutes",targets:[{type:"hours",value:60},{type:"days",value:1440},{type:"weeks",value:10080},{type:"months",value:44640},{type:"years",value:525600}]},{type:"hours",targets:[{type:"days",value:24},{type:"weeks",value:168},{type:"months",value:744},{type:"years",value:8760}]},{type:"days",targets:[{type:"weeks",value:7},{type:"months",value:31},{type:"years",value:365}]},{type:"months",targets:[{type:"years",value:12}]}];function o(e,t){return!(t.length>e.length)&&-1!==e.indexOf(t)}function i(e){for(var t="";e;)t+="0",e-=1;return t}function l(e,t,a){var r,o,s,u=t.useToLocaleString,c=t.useGrouping,m=c&&t.grouping.slice(),f=t.maximumSignificantDigits,p=t.minimumIntegerDigits||1,g=t.fractionDigits||0,d=t.groupingSeparator,h=t.decimalSeparator;if(u&&a){var y={minimumIntegerDigits:p,useGrouping:c};if(g&&(y.maximumFractionDigits=g,y.minimumFractionDigits=g),f&&e>0&&(y.maximumSignificantDigits=f),!n){var v=w({},t);v.useGrouping=!1,v.decimalSeparator=".",e=parseFloat(l(e,v),10)}return e.toLocaleString(a,y)}var b=(f?e.toPrecision(f+1):e.toFixed(g+1)).split("e");s=b[1]||"",o=(b=b[0].split("."))[1]||"";var S=(r=b[0]||"").length,O=o.length,E=S+O,T=r+o;(f&&E===f+1||!f&&O===g+1)&&((T=function(e){for(var t=e.split("").reverse(),n=0,a=!0;a&&n<t.length;)n?"9"===t[n]?t[n]="0":(t[n]=(parseInt(t[n],10)+1).toString(),a=!1):(parseInt(t[n],10)<5&&(a=!1),t[n]="0"),n+=1;return a&&t.push("1"),t.reverse().join("")}(T)).length===E+1&&(S+=1),O&&(T=T.slice(0,-1)),r=T.slice(0,S),o=T.slice(S)),f&&(o=o.replace(/0*$/,""));var j=parseInt(s,10);j>0?o.length<=j?(r+=o+=i(j-o.length),o=""):(r+=o.slice(0,j),o=o.slice(j)):j<0&&(o=i(Math.abs(j)-r.length)+r+o,r="0"),f||((o=o.slice(0,g)).length<g&&(o+=i(g-o.length)),r.length<p&&(r=i(p-r.length)+r));var x,_="";if(c)for(b=r;b.length;)m.length&&(x=m.shift()),_&&(_=d+_),_=b.slice(-x)+_,b=b.slice(0,-x);else _=r;return o&&(_=_+h+o),_}function s(e,t){return e.label.length>t.label.length?-1:e.label.length<t.label.length?1:0}var u,c={durationLabelsStandard:{S:"millisecond",SS:"milliseconds",s:"second",ss:"seconds",m:"minute",mm:"minutes",h:"hour",hh:"hours",d:"day",dd:"days",w:"week",ww:"weeks",M:"month",MM:"months",y:"year",yy:"years"},durationLabelsShort:{S:"msec",SS:"msecs",s:"sec",ss:"secs",m:"min",mm:"mins",h:"hr",hh:"hrs",d:"dy",dd:"dys",w:"wk",ww:"wks",M:"mo",MM:"mos",y:"yr",yy:"yrs"},durationTimeTemplates:{HMS:"h:mm:ss",HM:"h:mm",MS:"m:ss"},durationLabelTypes:[{type:"standard",string:"__"},{type:"short",string:"_"}],durationPluralKey:function(e,t,n){return 1===t&&null===n?e:e+e}};function m(e){return"[object Array]"===Object.prototype.toString.call(e)}function f(e){return"[object Object]"===Object.prototype.toString.call(e)}function p(e,t){var n,a=0,r=e&&e.length||0;for("function"!=typeof t&&(n=t,t=function(e){return e===n});a<r;){if(t(e[a]))return e[a];a+=1}}function g(e,t){var n=0,a=e.length;if(e&&a)for(;n<a;){if(!1===t(e[n],n))return;n+=1}}function d(e,t){var n=0,a=e.length,r=[];if(!e||!a)return r;for(;n<a;)r[n]=t(e[n],n),n+=1;return r}function h(e,t){return d(e,(function(e){return e[t]}))}function y(e){var t=[];return g(e,(function(e){e&&t.push(e)})),t}function v(e){var t=[];return g(e,(function(e){p(t,e)||t.push(e)})),t}function b(e,t){var n=[];return g(e,(function(e){g(t,(function(t){e===t&&n.push(e)}))})),v(n)}function S(e,t){var n=[];return g(e,(function(a,r){if(!t(a))return n=e.slice(r),!1})),n}function w(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function O(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t}function E(e,t){var n=0,a=e.length;if(!e||!a)return!1;for(;n<a;){if(!0===t(e[n],n))return!0;n+=1}return!1}function T(){var e,t=[].slice.call(arguments),n={};if(g(t,(function(t,a){if(!a){if(!m(t))throw"Expected array as the first argument to durationsFormat.";e=t}"string"!=typeof t&&"function"!=typeof t?"number"!=typeof t?f(t)&&w(n,t):n.precision=t:n.template=t})),!e||!e.length)return[];n.returnMomentTypes=!0;var r,o=d(e,(function(e){return e.format(n)})),i=b(a,v(h((r=[],g(o,(function(e){r=r.concat(e)})),r),"type"))),l=n.largest;return l&&(i=i.slice(0,l)),n.returnMomentTypes=!1,n.outputTypes=i,d(e,(function(e){return e.format(n)}))}function j(){var n=[].slice.call(arguments),i=w({},this.format.defaults),u=this.asMilliseconds(),T=this.asMonths();"function"==typeof this.isValid&&!1===this.isValid()&&(u=0,T=0);var j=u<0,x=e.duration(Math.abs(u),"milliseconds"),_=e.duration(Math.abs(T),"months");g(n,(function(e){"string"!=typeof e&&"function"!=typeof e?"number"!=typeof e?f(e)&&w(i,e):i.precision=e:i.template=e}));var P={years:"y",months:"M",weeks:"w",days:"d",hours:"h",minutes:"m",seconds:"s",milliseconds:"S"},k={escape:/\[(.+?)\]/,years:/\*?[Yy]+/,months:/\*?M+/,weeks:/\*?[Ww]+/,days:/\*?[Dd]+/,hours:/\*?[Hh]+/,minutes:/\*?m+/,seconds:/\*?s+/,milliseconds:/\*?S+/,general:/.+?/};i.types=a;var D=function(e){return p(a,(function(t){return k[t].test(e)}))},V=new RegExp(d(a,(function(e){return k[e].source})).join("|"),"g");i.duration=this;var I="function"==typeof i.template?i.template.apply(i):i.template,L=i.outputTypes,M=i.returnMomentTypes,N=i.largest,C=[];L||(m(i.stopTrim)&&(i.stopTrim=i.stopTrim.join("")),i.stopTrim&&g(i.stopTrim.match(V),(function(e){var t=D(e);"escape"!==t&&"general"!==t&&C.push(t)})));var F=e.localeData();F||(F={}),g(O(c),(function(e){"function"!=typeof c[e]?F["_"+e]||(F["_"+e]=c[e]):F[e]||(F[e]=c[e])})),g(O(F._durationTimeTemplates),(function(e){I=I.replace("_"+e+"_",F._durationTimeTemplates[e])}));var z=i.userLocale||e.locale(),A=i.useLeftUnits,W=i.usePlural,R=i.precision,G=i.forceLength,H=i.useGrouping,U=i.trunc,B=i.useSignificantDigits&&R>0,K=B?i.precision:0,$=K,q=i.minValue,J=!1,Y=i.maxValue,X=!1,Q=i.useToLocaleString,Z=i.groupingSeparator,ee=i.decimalSeparator,te=i.grouping;Q=Q&&t;var ne=i.trim;m(ne)&&(ne=ne.join(" ")),null===ne&&(N||Y||B)&&(ne="all"),null!==ne&&!0!==ne&&"left"!==ne&&"right"!==ne||(ne="large"),!1===ne&&(ne="");var ae=function(e){return e.test(ne)},re=/both/,oe=/^all|[^sm]all/,ie=N>0||E([/large/,re,oe],ae),le=E([/small/,re,oe],ae),se=E([/mid/,oe],ae),ue=E([/final/,oe],ae),ce=d(I.match(V),(function(e,t){var n=D(e);return"*"===e.slice(0,1)&&(e=e.slice(1),"escape"!==n&&"general"!==n&&C.push(n)),{index:t,length:e.length,text:"",token:"escape"===n?e.replace(k.escape,"$1"):e,type:"escape"===n||"general"===n?null:n}})),me={index:0,length:0,token:"",text:"",type:null},fe=[];A&&ce.reverse(),g(ce,(function(e){if(e.type)return(me.type||me.text)&&fe.push(me),void(me=e);A?me.text=e.token+me.text:me.text+=e.token})),(me.type||me.text)&&fe.push(me),A&&fe.reverse();var pe=b(a,v(y(h(fe,"type"))));if(!pe.length)return h(fe,"text").join("");pe=d(pe,(function(e,t){var n,a=t+1===pe.length,r=!t;n="years"===e||"months"===e?_.as(e):x.as(e);var o=Math.floor(n),l=n-o,s=p(fe,(function(t){return e===t.type}));return r&&Y&&n>Y&&(X=!0),a&&q&&Math.abs(i.duration.as(e))<q&&(J=!0),r&&null===G&&s.length>1&&(G=!0),x.subtract(o,e),_.subtract(o,e),{rawValue:n,wholeValue:o,decimalValue:a?l:0,isSmallest:a,isLargest:r,type:e,tokenLength:s.length}}));var ge,de=U?Math.floor:Math.round,he=function(e,t){var n=Math.pow(10,t);return de(e*n)/n},ye=!1,ve=!1,be=function(e,t){var n={useGrouping:H,groupingSeparator:Z,decimalSeparator:ee,grouping:te,useToLocaleString:Q};return B&&(K<=0?(e.rawValue=0,e.wholeValue=0,e.decimalValue=0):(n.maximumSignificantDigits=K,e.significantDigits=K)),X&&!ve&&(e.isLargest?(e.wholeValue=Y,e.decimalValue=0):(e.wholeValue=0,e.decimalValue=0)),J&&!ve&&(e.isSmallest?(e.wholeValue=q,e.decimalValue=0):(e.wholeValue=0,e.decimalValue=0)),e.isSmallest||e.significantDigits&&e.significantDigits-e.wholeValue.toString().length<=0?R<0?e.value=he(e.wholeValue,R):0===R?e.value=de(e.wholeValue+e.decimalValue):B?(e.value=U?he(e.rawValue,K-e.wholeValue.toString().length):e.rawValue,e.wholeValue&&(K-=e.wholeValue.toString().length)):(n.fractionDigits=R,e.value=U?e.wholeValue+he(e.decimalValue,R):e.wholeValue+e.decimalValue):B&&e.wholeValue?(e.value=Math.round(he(e.wholeValue,e.significantDigits-e.wholeValue.toString().length)),K-=e.wholeValue.toString().length):e.value=e.wholeValue,e.tokenLength>1&&(G||ye)&&(n.minimumIntegerDigits=e.tokenLength,ve&&n.maximumSignificantDigits<e.tokenLength&&delete n.maximumSignificantDigits),!ye&&(e.value>0||""===ne||p(C,e.type)||p(L,e.type))&&(ye=!0),e.formattedValue=l(e.value,n,z),n.useGrouping=!1,n.decimalSeparator=".",e.formattedValueEn=l(e.value,n,"en"),2===e.tokenLength&&"milliseconds"===e.type&&(e.formattedValueMS=l(e.value,{minimumIntegerDigits:3,useGrouping:!1},"en").slice(0,2)),e};if((pe=y(pe=d(pe,be))).length>1){var Se=function(e){return p(pe,(function(t){return t.type===e}))};g(r,(function(e){var t=Se(e.type);t&&g(e.targets,(function(e){var n=Se(e.type);n&&parseInt(t.formattedValueEn,10)===e.value&&(t.rawValue=0,t.wholeValue=0,t.decimalValue=0,n.rawValue+=1,n.wholeValue+=1,n.decimalValue=0,n.formattedValueEn=n.wholeValue.toString(),ve=!0)}))}))}return ve&&(ye=!1,K=$,pe=y(pe=d(pe,be))),!L||X&&!i.trim?(ie&&(pe=S(pe,(function(e){return!e.isSmallest&&!e.wholeValue&&!p(C,e.type)}))),N&&pe.length&&(pe=pe.slice(0,N)),le&&pe.length>1&&(ge=function(e){return!e.wholeValue&&!p(C,e.type)&&!e.isLargest},pe=S(pe.slice().reverse(),ge).reverse()),se&&(pe=y(pe=d(pe,(function(e,t){return t>0&&t<pe.length-1&&!e.wholeValue?null:e})))),!ue||1!==pe.length||pe[0].wholeValue||!U&&pe[0].isSmallest&&pe[0].rawValue<q||(pe=[])):pe=y(pe=d(pe,(function(e){return p(L,(function(t){return e.type===t}))?e:null}))),M?pe:(g(fe,(function(e){var t=P[e.type],n=p(pe,(function(t){return t.type===e.type}));if(t&&n){var a=n.formattedValueEn.split(".");a[0]=parseInt(a[0],10),a[1]?a[1]=parseFloat("0."+a[1],10):a[1]=null;var r=F.durationPluralKey(t,a[0],a[1]),i=function(e,t){var n=[];return g(O(t),(function(a){if("_durationLabels"===a.slice(0,15)){var r=a.slice(15).toLowerCase();g(O(t[a]),(function(o){o.slice(0,1)===e&&n.push({type:r,key:o,label:t[a][o]})}))}})),n}(t,F),l=!1,u={};g(F._durationLabelTypes,(function(t){var n=p(i,(function(e){return e.type===t.type&&e.key===r}));n&&(u[n.type]=n.label,o(e.text,t.string)&&(e.text=e.text.replace(t.string,n.label),l=!0))})),W&&!l&&(i.sort(s),g(i,(function(t){return u[t.type]===t.label?!o(e.text,t.label)&&void 0:o(e.text,t.label)?(e.text=e.text.replace(t.label,u[t.type]),!1):void 0})))}})),(fe=d(fe,(function(e){if(!e.type)return e.text;var t=p(pe,(function(t){return t.type===e.type}));if(!t)return"";var n="";return A&&(n+=e.text),(j&&X||!j&&J)&&(n+="< ",X=!1,J=!1),(j&&J||!j&&X)&&(n+="> ",X=!1,J=!1),j&&(t.value>0||""===ne||p(C,t.type)||p(L,t.type))&&(n+="-",j=!1),"milliseconds"===e.type&&t.formattedValueMS?n+=t.formattedValueMS:n+=t.formattedValue,A||(n+=e.text),n}))).join("").replace(/(,| |:|\.)*$/,"").replace(/^(,| |:|\.)*/,""))}function x(){var e=this.duration,t=function(t){return e._data[t]},n=p(this.types,t),a=function(e,t){for(var n=e.length;n-=1;)if(t(e[n]))return e[n]}(this.types,t);switch(n){case"milliseconds":return"S __";case"seconds":case"minutes":return"*_MS_";case"hours":return"_HMS_";case"days":if(n===a)return"d __";case"weeks":return n===a?"w __":(null===this.trim&&(this.trim="both"),"w __, d __, h __");case"months":if(n===a)return"M __";case"years":return n===a?"y __":(null===this.trim&&(this.trim="both"),"y __, M __, d __");default:return null===this.trim&&(this.trim="both"),"y __, d __, h __, m __, s __"}}function _(e){if(!e)throw"Moment Duration Format init cannot find moment instance.";e.duration.format=T,e.duration.fn.format=j,e.duration.fn.format.defaults={trim:null,stopTrim:null,largest:null,maxValue:null,minValue:null,precision:0,trunc:!1,forceLength:null,userLocale:null,usePlural:!0,useLeftUnits:!1,useGrouping:!0,useSignificantDigits:!1,template:x,useToLocaleString:!0,groupingSeparator:",",decimalSeparator:".",grouping:[3]},e.updateLocale("en",c)}return t=!!((u=(u=!0)&&function(){try{(0).toLocaleString("i")}catch(e){return"RangeError"===e.name}return!1}())&&(u=(u=(u=u&&"1"===1..toLocaleString("en",{minimumIntegerDigits:1}))&&"01"===1..toLocaleString("en",{minimumIntegerDigits:2}))&&"001"===1..toLocaleString("en",{minimumIntegerDigits:3}))&&(u=(u=(u=(u=u&&"100"===99.99.toLocaleString("en",{maximumFractionDigits:0,minimumFractionDigits:0}))&&"100.0"===99.99.toLocaleString("en",{maximumFractionDigits:1,minimumFractionDigits:1}))&&"99.99"===99.99.toLocaleString("en",{maximumFractionDigits:2,minimumFractionDigits:2}))&&"99.990"===99.99.toLocaleString("en",{maximumFractionDigits:3,minimumFractionDigits:3}))&&(u=(u=(u=(u=(u=u&&"100"===99.99.toLocaleString("en",{maximumSignificantDigits:1}))&&"100"===99.99.toLocaleString("en",{maximumSignificantDigits:2}))&&"100"===99.99.toLocaleString("en",{maximumSignificantDigits:3}))&&"99.99"===99.99.toLocaleString("en",{maximumSignificantDigits:4}))&&"99.99"===99.99.toLocaleString("en",{maximumSignificantDigits:5}))&&(u=(u=u&&"1,000"===1e3.toLocaleString("en",{useGrouping:!0}))&&"1000"===1e3.toLocaleString("en",{useGrouping:!1}))),n=t&&"3.6"===3.55.toLocaleString("en",{useGrouping:!1,minimumIntegerDigits:1,minimumFractionDigits:1,maximumFractionDigits:1}),_(e),_},r=[n(1)],void 0===(o="function"==typeof(a=l)?a.apply(t,r):a)||(e.exports=o),i&&(i.momentDurationFormatSetup=i.moment?l(i.moment):l)},function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),o=n(0),i=n.n(o),l=n(1),s=n.n(l);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function p(e,t,n){return t&&f(e.prototype,t),n&&f(e,n),e}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n(5),n.d(t,"default",(function(){return b}));var h=[i.a.string,i.a.number,i.a.array,i.a.object],y=[i.a.string,i.a.array],v=[i.a.object,i.a.bool],b=function(e){function t(e){var n,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=c(t).call(this,e),n=!a||"object"!==u(a)&&"function"!=typeof a?m(this):a,d(m(n),"setTimer",(function(){var e=n.props.interval;n.clearTimer(),t.pooledTimer||0===e||(n.timer=setInterval((function(){n.update(n.props)}),e))})),d(m(n),"clearTimer",(function(){!t.pooledTimer&&n.timer&&(clearInterval(n.timer),n.timer=null),t.pooledTimer&&!n.timer&&t.removePooledElement(m(n))})),d(m(n),"getTitle",(function(){var e=n.props.titleFormat,a=t.getDatetime(n.props),r=e||t.globalFormat;return a.format(r)})),t.globalMoment||(t.globalMoment=s.a),n.state={content:""},n.timer=null,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,r.a.Component),p(t,null,[{key:"startPooledTimer",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6e4;t.clearPooledTimer(),t.pooledTimer=setInterval((function(){t.pooledElements.forEach((function(e){0!==e.props.interval&&e.update()}))}),e)}},{key:"clearPooledTimer",value:function(){t.pooledTimer&&(clearInterval(t.pooledTimer),t.pooledTimer=null,t.pooledElements=[])}},{key:"pushPooledElement",value:function(e){e instanceof t?-1===t.pooledElements.indexOf(e)&&t.pooledElements.push(e):console.error("Element not an instance of Moment.")}},{key:"removePooledElement",value:function(e){var n=t.pooledElements.indexOf(e);-1!==n&&t.pooledElements.splice(n,1)}},{key:"getDatetime",value:function(e){var n=e.utc,a=e.unix,r=e.date,o=e.locale,i=e.parse,l=e.tz,s=e.local;r=r||e.children,i=i||t.globalParse,s=s||t.globalLocal,l=l||t.globalTimezone,o=t.globalLocale?t.globalLocale:o||t.globalMoment.locale();var u=null;return u=n?t.globalMoment.utc(r,i,o):a?t.globalMoment(1e3*r,i,o):t.globalMoment(r,i,o),l?u=u.tz(l):s&&(u=u.local()),u}}]),p(t,[{key:"componentWillMount",value:function(){this.update(this.props)}},{key:"componentDidMount",value:function(){this.setTimer(),t.pooledTimer&&t.pushPooledElement(this)}},{key:"componentWillReceiveProps",value:function(e){this.update(e)}},{key:"componentDidUpdate",value:function(e){var t=this.props.interval;e.interval!==t&&this.setTimer()}},{key:"componentWillUnmount",value:function(){this.clearTimer()}},{key:"update",value:function(e){var n=e=e||this.props,a=n.fromNow,r=n.fromNowDuring,o=n.from,i=n.add,l=n.subtract,u=n.toNow,c=n.to,m=n.ago,f=n.calendar,p=n.diff,g=n.duration,d=n.durationFromNow,h=n.unit,y=n.decimal,v=n.onChange,b=e.format;b=b||t.globalFormat;var S=t.getDatetime(e);i&&S.add(i),l&&S.subtract(l);var w=Boolean(r)&&-S.diff(s()())<r,O="";O=b&&!w?S.format(b):o?S.from(o,m):a||w?S.fromNow(m):c?S.to(c,m):u?S.toNow(m):f?S.calendar(null,f):p?S.diff(p,h,y):g?S.diff(g):d?s()().diff(S):S.toString(),(g||d)&&(O=(O=s.a.duration(O)).format(b));var E=t.globalFilter||this.props.filter;O=E(O),this.setState({content:O},(function(){v(O)}))}},{key:"render",value:function(){var e,n,a,o,i=this.props,l=i.withTitle,s=i.element,u=function(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}(i,["withTitle","element"]),c=this.state.content,m=(e=u,n=t.propTypes,a=Object.keys(n),o=Object.assign({},e),Object.keys(o).filter((function(e){return-1!==a.indexOf(e)})).forEach((function(e){return delete o[e]})),o);return l&&(m.title=this.getTitle()),r.a.createElement(s||t.globalElement,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){d(e,t,n[t])}))}return e}({dateTime:t.getDatetime(this.props)},m),c)}}]),t}();d(b,"propTypes",{element:i.a.any,date:i.a.oneOfType(h),parse:i.a.oneOfType(y),format:i.a.string,add:i.a.object,subtract:i.a.object,ago:i.a.bool,fromNow:i.a.bool,fromNowDuring:i.a.number,from:i.a.oneOfType(h),toNow:i.a.bool,to:i.a.oneOfType(h),calendar:i.a.oneOfType(v),unix:i.a.bool,utc:i.a.bool,local:i.a.bool,tz:i.a.string,withTitle:i.a.bool,titleFormat:i.a.string,locale:i.a.string,interval:i.a.number,diff:i.a.oneOfType(h),duration:i.a.oneOfType(h),durationFromNow:i.a.bool,unit:i.a.string,decimal:i.a.bool,filter:i.a.func,onChange:i.a.func}),d(b,"defaultProps",{element:null,fromNow:!1,toNow:!1,calendar:!1,ago:!1,unix:!1,utc:!1,local:!1,unit:null,withTitle:!1,decimal:!1,titleFormat:"",interval:6e4,filter:function(e){return e},onChange:function(){}}),d(b,"globalMoment",null),d(b,"globalLocale",null),d(b,"globalLocal",null),d(b,"globalFormat",null),d(b,"globalParse",null),d(b,"globalFilter",null),d(b,"globalElement","time"),d(b,"globalTimezone",null),d(b,"pooledElements",[]),d(b,"pooledTimer",null)}]))},504:function(e,t,n){},511:function(e,t,n){},512:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(10),i=n(503),l=n.n(i),s=n(15),u=n(66),c=n(3),m=n(12),f=n(260),p=n(43),g=(n(511),Object(s.b)(null,{addComment:f.a,addCommentToSinglePost:f.b})((function(e){var t=e.postId,n=e.groupId,o=e.userId,i=e.userName,l=e.isSinglePost,s=e.addComment,f=e.addCommentToSinglePost,g=Object(a.useState)({message:"",groupId:n,userId:o,userName:i}),d=Object(m.a)(g,2),h=d[0],y=d[1],v=Object(a.useState)(""),b=Object(m.a)(v,2),S=(b[0],b[1],function(e){e.preventDefault(),h.message&&(l?f(t,h):s(t,h),y(Object(c.a)(Object(c.a)({},h),{},Object(u.a)({},"message",""))))});return r.a.createElement("div",{className:"comment-form"},r.a.createElement("form",{onSubmit:function(e){S(e)}},r.a.createElement("textarea",{name:"message",className:"form-control comment-rounded-textarea ",rows:"2",placeholder:"Write a comment...",value:h.message,onChange:function(e){return y(Object(c.a)(Object(c.a)({},h),{},Object(u.a)({},e.target.name,e.target.value)))},onKeyDown:function(e){return y(Object(c.a)(Object(c.a)({},h),{},Object(u.a)({},e.target.name,e.target.value)))},required:!0}),r.a.createElement(p.a,{htmlType:"button",onClick:S,type:"primary",style:{float:"right",marginTop:5},className:"btn-primary reply-btn"},"Send")))}))),d=n(568),h=n(22),y=n(567),v=n(561),b=n(521),S=n(499),w=n.n(S),O=n(497),E=n(562),T=(n(504),function(e){var t=e.postId,n=e.comment,a=n._id,i=n.message,s=n.userName,u=n.userId,c=(n.avatar,n.postedDate),m=(n.subject,e.isSinglePost),f=d.a.Meta,p=r.a.createElement(h.a,null,r.a.createElement(h.a.Item,{key:"deletepost"}," ",r.a.createElement(O.a,{postId:t,commentId:a,postType:"comment",isSinglePost:m})));return r.a.createElement(y.a.Item,{className:"feed-comment",actions:[r.a.createElement(v.a,{overlay:p,placement:"bottomCenter"},r.a.createElement("a",{className:"ant-dropdown-link",onClick:function(e){return e.preventDefault()}},r.a.createElement(E.a,null)))]},r.a.createElement(f,{avatar:r.a.createElement(b.a,{className:"avatar-icon",size:"small"},u.charAt(0)),description:r.a.createElement("div",null,r.a.createElement(o.b,{to:"/profile/".concat(t,"/").concat(u)},r.a.createElement("span",{className:"feed-author-title"},s)),r.a.createElement("div",{className:"feed-author-time"},r.a.createElement(l.a,{fromNow:!0,ago:!0},c)," ago"),r.a.createElement(w.a,{length:200,tooltip:!0},i))}))}),j=n(486),x={name:"message",theme:"outlined",icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"}}]}},_=n(39),P=function(e,t){return r.a.createElement(_.a,Object.assign({},e,{ref:t,icon:x}))};P.displayName="MessageOutlined";var k=r.a.forwardRef(P),D=function(e){e.style;var t=e.post,n=t._id,a=t.userId,i=t.subject,s=t.message,u=t.userName,c=(t.avatar,t.user,t.likes,t.thanks,t.groupId),m=t.comments,f=t.postedDate,p=e.showActions,S=e.showAllComments,x=e.isSinglePost,_=j.a.Paragraph,P=d.a.Meta,D=r.a.createElement(h.a,{onClick:function(e){}},r.a.createElement(h.a.Item,{key:"deletepost"}," ",r.a.createElement(O.a,{postId:n,postType:"post"})),r.a.createElement(h.a.Item,{key:"editpost"},"Edit")),V=null!==m&&m&&m.length>0&&r.a.createElement(y.a,{itemLayout:"horizontal",dataSource:m,style:{overflow:"hidden"},renderItem:function(e){return r.a.createElement(T,{key:e._id,comment:e,postId:n,groupId:c,isSinglePost:x})}}),I=function(e){var t=e.icon;e.text;return r.a.createElement(o.b,{to:"/posts/".concat(n,"/").concat(c)}," ",r.a.createElement(t)," ",r.a.createElement("span",{className:"comment-count-text"},m.length>1?"".concat(m.length," comments"):"".concat(m.length," comment")))},L=null!==m&&m&&m.length>0&&r.a.createElement(y.a,{itemLayout:"horizontal",dataSource:m.slice(-3),style:{overflow:"hidden"},renderItem:function(e){return r.a.createElement(T,{key:e._id,comment:e,postId:n,groupId:c,isSinglePost:x})}});return r.a.createElement("div",{className:"feed",style:{width:"100%"}},r.a.createElement(d.a,{className:x?"single-feed-card":"feed-card",title:r.a.createElement(o.b,{to:"/profile/".concat(c,"/").concat(a)},r.a.createElement(P,{avatar:r.a.createElement(b.a,{className:"avatar-icon",size:"large"},a.charAt(0)),title:r.a.createElement("span",{className:"feed-author-title"},a),description:r.a.createElement("div",{className:"feed-author-time"},r.a.createElement(l.a,{fromNow:!0,ago:!0},f))})),extra:r.a.createElement(v.a,{overlay:D,placement:"bottomCenter"},r.a.createElement("a",{className:"ant-dropdown-link",onClick:function(e){return e.preventDefault()}},r.a.createElement(E.a,null)))},r.a.createElement(o.b,{className:"feed-title",to:"/posts/".concat(n,"/").concat(c)},r.a.createElement(P,{title:r.a.createElement(w.a,{length:100,tooltip:!0},i)})),r.a.createElement(_,{ellipsis:{rows:2,expandable:!0,symbol:"more"}},s),m&&m.length>0?r.a.createElement(I,{icon:k,key:"list-vertical-message"}):"",p&&r.a.createElement("div",{style:{marginBottom:"2rem"}},S?V:L,r.a.createElement(g,{postId:n,groupId:c,userId:a,userName:u,isSinglePost:x})," ")))};D.defaultProps={showActions:!0,showAllComments:!1,isSinglePost:!1};t.a=Object(s.b)((function(e){return{auth:e.auth}}),{})(D)},521:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));var a=n(0),r=n(4),o=n.n(r),i=n(33),l=n(14);function s(e){return(s="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function p(e,t){return!t||"object"!==s(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var h=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},y=function(e){function t(){var e;return m(this,t),(e=p(this,g(t).apply(this,arguments))).state={scale:1,mounted:!1,isImgExist:!0},e.setScale=function(){if(e.avatarChildren&&e.avatarNode){var t=e.avatarChildren.offsetWidth,n=e.avatarNode.offsetWidth;0===t||0===n||e.lastChildrenWidth===t&&e.lastNodeWidth===n||(e.lastChildrenWidth=t,e.lastNodeWidth=n,e.setState({scale:n-8<t?(n-8)/t:1}))}},e.handleImgLoadError=function(){var t=e.props.onError;!1!==(t?t():void 0)&&e.setState({isImgExist:!1})},e.renderAvatar=function(t){var n,r,i=t.getPrefixCls,s=e.props,m=s.prefixCls,f=s.shape,p=s.size,g=s.src,d=s.srcSet,y=s.icon,v=s.className,b=s.alt,S=h(s,["prefixCls","shape","size","src","srcSet","icon","className","alt"]);Object(l.a)(!("string"===typeof y&&y.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(y,"` at https://ant.design/components/icon"));var w=e.state,O=w.isImgExist,E=w.scale,T=(w.mounted,i("avatar",m)),j=o()((c(n={},"".concat(T,"-lg"),"large"===p),c(n,"".concat(T,"-sm"),"small"===p),n)),x=o()(T,v,j,(c(r={},"".concat(T,"-").concat(f),f),c(r,"".concat(T,"-image"),g&&O),c(r,"".concat(T,"-icon"),y),r)),_="number"===typeof p?{width:p,height:p,lineHeight:"".concat(p,"px"),fontSize:y?p/2:18}:{},P=e.props.children;if(g&&O)P=a.createElement("img",{src:g,srcSet:d,onError:e.handleImgLoadError,alt:b});else if(y)P=y;else{if(e.avatarChildren||1!==E){var k="scale(".concat(E,") translateX(-50%)"),D={msTransform:k,WebkitTransform:k,transform:k},V="number"===typeof p?{lineHeight:"".concat(p,"px")}:{};P=a.createElement("span",{className:"".concat(T,"-string"),ref:function(t){return e.avatarChildren=t},style:u(u({},V),D)},P)}else{P=a.createElement("span",{className:"".concat(T,"-string"),style:{opacity:0},ref:function(t){return e.avatarChildren=t}},P)}}return a.createElement("span",u({},S,{style:u(u({},_),S.style),className:x,ref:function(t){return e.avatarNode=t}}),P)},e}var n,r,s;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,e),n=t,(r=[{key:"componentDidMount",value:function(){this.setScale(),this.setState({mounted:!0})}},{key:"componentDidUpdate",value:function(e){this.setScale(),e.src!==this.props.src&&this.setState({isImgExist:!0,scale:1})}},{key:"render",value:function(){return a.createElement(i.a,null,this.renderAvatar)}}])&&f(n.prototype,r),s&&f(n,s),t}(a.Component);y.defaultProps={shape:"circle",size:"default"}},563:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o={name:"left-circle",theme:"outlined",icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M603.3 327.5l-246 178a7.95 7.95 0 000 12.9l246 178c5.3 3.8 12.7 0 12.7-6.5V643c0-10.2-4.9-19.9-13.2-25.9L457.4 512l145.4-105.2c8.3-6 13.2-15.6 13.2-25.9V334c0-6.5-7.4-10.3-12.7-6.5z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]}},i=n(39),l=function(e,t){return r.a.createElement(i.a,Object.assign({},e,{ref:t,icon:o}))};l.displayName="LeftCircleOutlined";t.a=r.a.forwardRef(l)},565:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(10),i=n(15),l=n(144),s=n(512),u=n(260),c=n(563);t.default=Object(i.b)((function(e){return{post:e.post}}),{getPost:u.g})((function(e){var t=e.getPost,n=e.post,i=n.currentPost,u=n.loading,m=e.match;return Object(a.useEffect)((function(){t(m.params.id),m.params.groupId}),[t,m]),u||null===i?r.a.createElement(l.a,null):r.a.createElement(a.Fragment,null,r.a.createElement(o.b,{to:"/dashboard/".concat(m.params.groupId),style:{fontSize:"1rem",marginLeft:"1rem",marginTop:"1rem",cursor:"pointer",display:"inline-block"}},r.a.createElement(c.a,null)),r.a.createElement(s.a,{post:i,showActions:!0,showAllComments:!0,isSinglePost:!0}))}))}}]);
//# sourceMappingURL=11.38479b81.chunk.js.map