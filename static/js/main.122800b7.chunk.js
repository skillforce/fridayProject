(this.webpackJsonphwproj=this.webpackJsonphwproj||[]).push([[0],{15:function(e,t,n){e.exports={default:"SuperButton_default__HO61J",red:"SuperButton_red__1C2W2",disableClass:"SuperButton_disableClass__2VWRR"}},16:function(e,t,n){e.exports={header_tittle:"header_header_tittle__1q0Br",header_nav:"header_header_nav__24qu2",header_nav_active:"header_header_nav_active__1_DUk"}},19:function(e,t,n){e.exports={checkbox:"SuperCheckbox_checkbox__1Ml_a",spanClassName:"SuperCheckbox_spanClassName__3CsxZ"}},20:function(e,t,n){e.exports={superInput:"SuperInputText_superInput__BXG1H",errorInput:"SuperInputText_errorInput__2vQeS"}},24:function(e,t,n){e.exports={err404:"error404_err404__2acUt"}},25:function(e,t,n){e.exports={test_component:"test_test_component__hXlio"}},32:function(e,t,n){},33:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(13),s=n.n(c),o=(n(32),n(33),n(3)),i=n(1),j=function(){return Object(i.jsx)("div",{children:"EnterNewPass"})},u=n.p+"static/media/notfound.52f5b072.gif",l=n(24),d=n.n(l).a.err404,b=function(){return Object(i.jsx)("div",{className:d,children:Object(i.jsx)("img",{src:u,alt:"ErrorImg"})})},h=function(){return Object(i.jsx)("div",{children:"Login"})},x=function(){return Object(i.jsx)("div",{children:"Profile"})},p=function(){return Object(i.jsx)("div",{children:"RecoverPass"})},O=function(){return Object(i.jsx)("div",{children:"Registration"})},_=n(22),v=n(10),f=n(11),m=n(19),C=n.n(m),N=function(e){e.type,e.onChange;var t=e.onChangeChecked,n=e.className,r=(e.spanClassName,e.children),a=Object(f.a)(e,["type","onChange","onChangeChecked","className","spanClassName","children"]),c="".concat(C.a.checkbox," ").concat(n||"");return Object(i.jsxs)("label",{children:[Object(i.jsx)("input",Object(v.a)({type:"checkbox",onChange:function(e){var n=e.currentTarget.checked;t&&t(n)},className:c},a)),r&&Object(i.jsx)("span",{className:C.a.spanClassName,children:r})]})},g=n(20),k=n.n(g),w=k.a.superInput,P=k.a.errorInput,S=function(e){e.type;var t=e.onChange,n=e.onChangeText,r=e.onKeyPress,a=e.onEnter,c=e.error,s=(e.className,e.spanClassName,Object(f.a)(e,["type","onChange","onChangeText","onKeyPress","onEnter","error","className","spanClassName"])),o=s.value?w:P;return Object(i.jsx)("input",Object(v.a)({type:"text",onChange:function(e){t&&t(e),n&&n(e.currentTarget.value)},onKeyPress:function(e){r&&r(e),a&&"Enter"===e.key&&a(e)},className:o,placeholder:c},s))},y=n(15),I=n.n(y),T=function(e){var t=e.red,n=e.className,r=e.disabled,a=e.addUser,c=Object(f.a)(e,["red","className","disabled","addUser"]),s="".concat(t?I.a.red:I.a.default," ").concat(n),o="".concat(r?I.a.disableClass:s);return Object(i.jsx)("button",Object(v.a)({onClick:a,disabled:r,className:o},c))},B=n(25),E=n.n(B).a.test_component,F=function(){var e=Object(r.useState)(!1),t=Object(_.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(""),s=Object(_.a)(c,2),o=s[0],j=s[1],u=o?"":"Enter the text";return Object(i.jsxs)("div",{className:E,children:[Object(i.jsx)(N,{checked:n,onChangeChecked:a}),Object(i.jsx)(S,{value:o,onChangeText:j,error:u}),Object(i.jsx)(T,{children:"testBTN"})]})},R="/newPassword",U="/err404",J="/login",K="/profile",L="/recPassword",q="/reg",D="/test",H=function(){return Object(i.jsx)("div",{children:Object(i.jsxs)(o.d,{children:[Object(i.jsx)(o.b,{path:"/",exact:!0,render:function(){return Object(i.jsx)(o.a,{to:J})}}),Object(i.jsx)(o.b,{path:R,render:function(){return Object(i.jsx)(j,{})}}),Object(i.jsx)(o.b,{path:U,render:function(){return Object(i.jsx)(b,{})}}),Object(i.jsx)(o.b,{path:J,render:function(){return Object(i.jsx)(h,{})}}),Object(i.jsx)(o.b,{path:K,render:function(){return Object(i.jsx)(x,{})}}),Object(i.jsx)(o.b,{path:L,render:function(){return Object(i.jsx)(p,{})}}),Object(i.jsx)(o.b,{path:q,render:function(){return Object(i.jsx)(O,{})}}),Object(i.jsx)(o.b,{path:D,render:function(){return Object(i.jsx)(F,{})}})]})})},M=n(8),W=n(16),X=n.n(W),A=X.a.header_tittle,G=X.a.header_nav,Q=X.a.header_nav_active,V=function(){return Object(i.jsxs)("div",{className:A,children:[Object(i.jsx)(M.b,{to:R,className:G,activeClassName:Q,children:"enter new pass"}),Object(i.jsx)(M.b,{to:U,className:G,activeClassName:Q,children:"error404"}),Object(i.jsx)(M.b,{to:J,className:G,activeClassName:Q,children:"login"}),Object(i.jsx)(M.b,{to:K,className:G,activeClassName:Q,children:"profile"}),Object(i.jsx)(M.b,{to:L,className:G,activeClassName:Q,children:"recover pass"}),Object(i.jsx)(M.b,{to:q,className:G,activeClassName:Q,children:"registration"}),Object(i.jsx)(M.b,{to:D,className:G,activeClassName:Q,children:"test"})]})},Z=function(){return Object(i.jsxs)("div",{className:"App",children:[Object(i.jsx)(V,{}),Object(i.jsx)(H,{})]})},z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,41)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))},Y=n(27),$=n(23),ee=Object($.a)({enterNewPass:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e},login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e},test:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e},recoverPass:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e},registration:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e},error404:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e}}),te=Object($.b)(ee),ne=te;window.store=te,s.a.render(Object(i.jsx)(M.a,{children:Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(Y.a,{store:ne,children:Object(i.jsx)(Z,{})})})}),document.getElementById("root")),z()}},[[40,1,2]]]);
//# sourceMappingURL=main.122800b7.chunk.js.map