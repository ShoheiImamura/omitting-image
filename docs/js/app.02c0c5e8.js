(function(e){function a(a){for(var n,i,l=a[0],u=a[1],v=a[2],s=0,d=[];s<l.length;s++)i=l[s],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);c&&c(a);while(d.length)d.shift()();return o.push.apply(o,v||[]),t()}function t(){for(var e,a=0;a<o.length;a++){for(var t=o[a],n=!0,l=1;l<t.length;l++){var u=t[l];0!==r[u]&&(n=!1)}n&&(o.splice(a--,1),e=i(i.s=t[0]))}return e}var n={},r={app:0},o=[];function i(a){if(n[a])return n[a].exports;var t=n[a]={i:a,l:!1,exports:{}};return e[a].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=n,i.d=function(e,a,t){i.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,a){if(1&a&&(e=i(e)),8&a)return e;if(4&a&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var n in e)i.d(t,n,function(a){return e[a]}.bind(null,n));return t},i.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(a,"a",a),a},i.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},i.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=a,l=l.slice();for(var v=0;v<l.length;v++)a(l[v]);var c=u;o.push([0,"chunk-vendors"]),t()})({0:function(e,a,t){e.exports=t("56d7")},"034f":function(e,a,t){"use strict";t("85ec")},"2acc":function(e,a,t){},"38e0":function(e,a,t){},"56d7":function(e,a,t){"use strict";t.r(a);t("e260"),t("e6cf"),t("cca6"),t("a79d");var n=t("2b0e"),r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("Description",{attrs:{msg:"画像を省略するやつ"}}),t("DrawingCanvas")],1)},o=[],i=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"hello"},[t("v-card",[t("v-card-title",[e._v(e._s(e.msg)),t("v-spacer"),t("v-btn",{on:{click:function(a){e.show=!e.show}}},[e._v("説明")])],1),t("v-card-text",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}]},[t("p",[e._v("グレー背景に、画像をペーストorドロップしてください。")]),t("p",[e._v("省略したい箇所をクリックして画像の一部を省略できます。")]),t("p",[e._v("［download］ボタンでダウンロードできます。")]),t("p",[e._v("［original］ボタンで加工前の画像を表示できます。")])])],1)],1)},l=[],u={name:"Description",props:{msg:String},data:function(){return{show:!1}}},v=u,c=(t("71f1"),t("2877")),s=t("6544"),d=t.n(s),f=t("8336"),g=t("b0af"),p=t("99d9"),w=t("2fa4"),h=Object(c["a"])(v,i,l,!1,null,"29894d9b",null),m=h.exports;d()(h,{VBtn:f["a"],VCard:g["a"],VCardText:p["a"],VCardTitle:p["b"],VSpacer:w["a"]});var b=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-container",{attrs:{id:"container"},on:{paste:e.pasteImage,dragover:e.dragover,drop:function(a){return a.stopPropagation(),e.dropImage(a)},mousemove:e.mousemove,mouseleave:e.mouseleave}},[t("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.src,expression:"src"}],on:{click:function(a){return e.drawInitialCanvas()}}},[e._v("original")]),t("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.src,expression:"src"}],on:{click:function(a){return e.downloadImage()}}},[e._v("download")]),t("v-row",[t("v-overlay",{attrs:{value:!e.src,absolute:""}},[e._v(" 画像をドロップもしくはペーストしてください。")]),t("v-col",{attrs:{cols:"12",md:"6",lg:"6",xl:"6"}},[e._v(" original image "),t("div",{attrs:{id:"originalArea"}},[t("canvas",{ref:"originalCanvas",attrs:{width:"500",height:"1000",id:"originalCanvas"},on:{mousedown:e.mousedown,mouseup:e.mouseup}}),t("canvas",{ref:"originalOverlayCanvas",attrs:{width:"500",height:"1000",id:"originalOverlayCanvas"},on:{mousedown:e.mousedown,mouseup:e.mouseup}})])]),t("v-col",{attrs:{cols:"12",md:"6",lg:"6",xl:"6"}},[e._v(" processed image "),t("div",[t("canvas",{ref:"processedCanvas",attrs:{width:"500",height:"1000"}}),t("a",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"downloadLink",attrs:{id:"downloadLink",download:"canvas.png"}},[e._v("download link")])])])],1)],1)},O=[],j=(t("cb29"),t("4de4"),t("d3b7"),t("3ca3"),t("ddb0"),t("2b3d"),t("a6f4")),y=Object(j["b"])({name:"DrawingCanvas",setup:function(){var e=Object(j["e"])({start:50,end:100}),a=Object(j["e"])(0),t=Object(j["e"])(""),n=Object(j["e"])(),r=Object(j["e"])(),o=Object(j["e"])(),i=Object(j["e"])(),l=Object(j["e"])(),u=Object(j["e"])(),v=Object(j["e"])(),c=Object(j["e"])(),s=Object(j["e"])(!1),d=function(){f(n.value),f(o.value),f(l.value),console.log("draw original image");var e=new Image;e.src=t.value;var a=e.width,i=e.height;n.value.height=500*i/a,c.value=500/a,r.value.drawImage(e,0,0,a,i,0,0,500,500*i/a)},f=function(e){var a=e.getContext("2d");e.width=500,e.height=1e3,a.clearRect(0,0,e.width,e.height)},g=function(e,a,t,n){e.drawImage(a,0,0,a.width,t,0,0,n,t*n/a.width)},p=function(e,a,t,n,r){e.drawImage(a,0,n,a.width,a.height-n,0,t*r/a.width,r,(a.height-n)*r/a.width)},w=function(e,a,t,n){e.beginPath(),e.moveTo(0,t*n/a.width-5);for(var r=0;r<10;r++){var o=r%2==0?10:-10;e.quadraticCurveTo(25+r*(n/10),t*n/a.width+o-5,(r+1)*(n/10),t*n/a.width-5)}e.lineTo(n,t*n/a.width+5);for(var i=10;i>0;i--){var l=i%2==0?-10:10;e.quadraticCurveTo(25+n/10*(i-1),t*n/a.width+l+5,n/10*(i-1),t*n/a.width+5)}e.lineTo(0,t*n/a.width),e.fillStyle="rgb(255,255,255)",e.fill(),e.strokeStyle="gray",e.stroke()},h=function(){f(l.value);var a=new Image;if(a.src=t.value,e.value.start>e.value.end){var n=e.value.start,r=e.value.end;e.value.start=r,e.value.end=n}var o=a.width,i=a.height;l.value.height=500*i/o,setTimeout((function(){g(u.value,a,e.value.start,500),p(u.value,a,e.value.start,e.value.end,500),w(u.value,a,e.value.start,500)}),100)},m=function(a){f(o.value);var n=new Image;n.src=t.value;var r=n.width,l=n.height;o.value.height=500*l/r;var u=D(a),v=e.value.start*c.value,s=v<u?v:u,d=v<u?u:v;console.log("originalOverlayContext",i.value),i.value.beginPath(),i.value.moveTo(0,s),i.value.lineTo(500,s),i.value.lineTo(500,d),i.value.lineTo(0,d),i.value.closePath(),i.value.clip(),i.value.filter="grayscale(100%) brightness(50%)",i.value.drawImage(n,0,0,r,l,0,0,500,500*l/r)},b=function(e){console.log("called paste image()"),e.preventDefault(),e.stopPropagation();var a=e.clipboardData.items[0].getAsFile();console.log(a);var n=window.URL.createObjectURL(a);t.value=n,console.log(n),d()},O=function(e){e.preventDefault();var a=e.dataTransfer.files;if(1===a.length&&0===a[0].type.indexOf("image")){var n=a[0],r=window.URL.createObjectURL(n);t.value=r,d()}else console.log("画像ファイルではありません。")},y=function(e){e.preventDefault()},C=function(){var e=v.value;e.href=l.value.toDataURL(),e.click()},x=function(a){a.preventDefault(),s.value=!0,e.value.start=D(a)/c.value,e.value.end=D(a)/c.value,f(o.value)},_=function(a){a.preventDefault(),s.value=!1,e.value.end=D(a)/c.value,h()},I=function(e){e.preventDefault(),s.value=!1},T=function(e){e.preventDefault(),s.value&&(console.log("mousemove"),m(e))},D=function(e){var a=n.value.getBoundingClientRect();return e.clientY-a.top};return Object(j["c"])((function(){r.value=n.value.getContext("2d"),i.value=o.value.getContext("2d"),u.value=l.value.getContext("2d")})),Object(j["d"])((function(){})),Object(j["f"])(t,(function(){setTimeout((function(){d()}),100)})),{range:e,value:a,src:t,imageRatio:c,onSelecting:s,originalCanvas:n,originalContext:r,originalOverlayCanvas:o,originalOverlayContext:i,processedCanvas:l,processedContext:u,downloadLink:v,drawInitialCanvas:d,mousedown:x,mouseup:_,mouseleave:I,mousemove:T,getYIndex:D,process:h,selectImage:m,pasteImage:b,drawUpperImage:g,drawLowerImage:p,drawMiddleImage:w,dropImage:O,dragover:y,downloadImage:C}}}),C=y,x=(t("b7b1"),t("62ad")),_=t("a523"),I=t("a797"),T=t("0fd9"),D=Object(c["a"])(C,b,O,!1,null,"3d055aca",null),k=D.exports;d()(D,{VBtn:f["a"],VCol:x["a"],VContainer:_["a"],VOverlay:I["a"],VRow:T["a"]});var P={name:"App",components:{Description:m,DrawingCanvas:k},data:function(){return{}}},S=P,V=(t("034f"),Object(c["a"])(S,r,o,!1,null,null,null)),L=V.exports,R=t("f309");n["default"].use(R["a"]);var U=new R["a"]({});n["default"].use(j["a"]),n["default"].config.productionTip=!1,new n["default"]({vuetify:U,render:function(e){return e(L)}}).$mount("#app")},"71f1":function(e,a,t){"use strict";t("38e0")},"85ec":function(e,a,t){},b7b1:function(e,a,t){"use strict";t("2acc")}});
//# sourceMappingURL=app.02c0c5e8.js.map