(this.webpackJsonpbeergeek=this.webpackJsonpbeergeek||[]).push([[0],{18:function(e,t,r){e.exports={beer_detail:"BeerDetail_beer_detail__3zwhb",beer_detail_info:"BeerDetail_beer_detail_info__2nIeM",beer_detail_desc:"BeerDetail_beer_detail_desc__2iYnX",beer_detail_tips:"BeerDetail_beer_detail_tips__2nf9g",beer_detail_foods:"BeerDetail_beer_detail_foods__31xpx"}},25:function(e,t,r){e.exports={login_container:"Login_login_container__FZG4y",login_btn:"Login_login_btn__2T1-a",login_error:"Login_login_error__3ORwV"}},49:function(e,t,r){},7:function(e,t,r){e.exports={layout:"Layout_layout__1nVz4",page_container:"Layout_page_container__3kVUm",header:"Layout_header__27HXS",logo:"Layout_logo__gXj3A",menu:"Layout_menu__3z6hQ",nav:"Layout_nav__1JLRV",username:"Layout_username__1WdfT",logout_btn:"Layout_logout_btn__1f_C_",loading_indicator:"Layout_loading_indicator__10N7o",not_found:"Layout_not_found__bzyy1"}},9:function(e,t,r){e.exports={beers:"Beers_beers__AZSk8",search_form:"Beers_search_form__2AUb-",search_paging:"Beers_search_paging__rZMyH",load_nav_btn:"Beers_load_nav_btn__Cat2G",nav_btn:"Beers_nav_btn__301F-",clear_btn:"Beers_clear_btn__3pxka",beer_list:"Beers_beer_list__1nvRX",card:"Beers_card__3Es4c",bouncedScale:"Beers_bouncedScale__21n7T",beer_info:"Beers_beer_info__1Qv5y",beer_title:"Beers_beer_title__upZT1",beer_abv:"Beers_beer_abv__nt4rm",high_abv:"Beers_high_abv__1xkVf"}},96:function(e,t,r){"use strict";r.r(t);r(49);var n=r(0),a=r.n(n),c=r(22),i=r.n(c),s=r(19),o=r(3),u=r(15),l=r(42),b=r(10),d=(r(44),r(2)),f=r.n(d),j=r(6),m=Object(u.b)({name:"apiRequestsSlice",initialState:{errors:[],requestsStates:[]},reducers:{setLoading:function(e,t){var r=t.payload,n=r.actionName,a=r.actionState,c=e.requestsStates.find((function(e){return e.action===n}));c?c.loading=a:e.requestsStates.push({action:n,loading:a})},addError:function(e,t){var r=t.payload,n=r.actionName,a=r.error,c=e.errors.find((function(e){return e.action===n}));c?(c.error=a,c.hasError=!0):e.errors.push({action:n,error:a,hasError:!0})},removeError:function(e,t){var r=t.payload;e.errors=e.errors.filter((function(e){return e.action!==r.actionName}))},clearErrors:function(e){e.errors=[]}}}),p=m.actions,_=p.setLoading,h=p.addError,v=p.removeError,g=m.reducer,O=r(17),x=function(e){O.b.error(e)},y=function(e){var t=e.dispatch,r=e.getState;return function(e){return function(n){return"function"!==typeof n?e(n):function(){var e=Object(j.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(_({actionName:n.name,actionState:!0})),e.next=4,n(t,r);case 4:t(_({actionName:n.name,actionState:!1})),e.next=13;break;case 7:throw e.prev=7,e.t0=e.catch(0),t(_({actionName:n.name,actionState:!1})),t(h({actionName:n.name,error:e.t0.message})),x(e.t0.message),e.t0;case 13:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}()()}}},N=r(12),w=r(16),k=r.n(w),E=function(){var e=Object(j.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.get("https://yesno.wtf/api");case 2:return t=e.sent,e.abrupt("return","yes"===t.data.answer);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(e){localStorage.setItem("userData",JSON.stringify(e))},B=r(30),C=k.a.create({baseURL:"https://api.punkapi.com/v2"});C.interceptors.response.use((function(e){return e.status>=400&&x(e.statusText),e}),(function(e){if(!k.a.isCancel(e))return x(e.message),Promise.reject(e)}));var A=function(){var e=Object(j.a)(f.a.mark((function e(t,r){var n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.get("/beers?".concat(t),{cancelToken:r});case 2:return a=e.sent,e.abrupt("return",null!==(n=null===a||void 0===a?void 0:a.data)&&void 0!==n?n:[]);case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),L=function(){var e=Object(j.a)(f.a.mark((function e(t){var r,n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.get("/beers/".concat(t));case 2:return n=e.sent,e.abrupt("return",1===(null===n||void 0===n||null===(r=n.data)||void 0===r?void 0:r.length)?n.data[0]:void 0);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M={beers:[],filters:{},paging:{pageSize:12,pageNumber:1,hasMore:!0},isQueryParamsChanged:!0},F=Object(u.b)({name:"beersSlice",initialState:M,reducers:{fetchBeersSuccess:function(e,t){var r=t.payload,n=r.beers,a=r.hasMore;e.paging.hasMore=a,e.beers=n,e.isQueryParamsChanged=!1},fetchBeerSuccess:function(e,t){var r=t.payload.beer;e.beer=r,e.isQueryParamsChanged=!1},resetBeer:function(e){e.beer=void 0},setNameFilter:function(e,t){var r=t.payload;e.filters.name=r,e.paging.pageNumber=1,e.beers=[],e.isQueryParamsChanged=!0},setMinAlcFilter:function(e,t){var r=t.payload;e.filters.minAlcohol=r,e.paging.pageNumber=1,e.beers=[],e.isQueryParamsChanged=!0},setMaxAlcFilter:function(e,t){var r=t.payload;e.filters.maxAlcohol=r,e.paging.pageNumber=1,e.beers=[],e.isQueryParamsChanged=!0},setNextPage:function(e,t){var r=t.payload;e.paging.pageNumber=r,e.beers=[],e.isQueryParamsChanged=!0},resetBeers:function(){return M}}}),P=F.actions,z=P.fetchBeersSuccess,q=P.fetchBeerSuccess,T=F.actions,Q=T.setNameFilter,D=T.setMinAlcFilter,I=T.setMaxAlcFilter,R=T.setNextPage,V=T.resetBeers,Z=T.resetBeer,J=T.resetBeers,X=function(e){return e.beers},H=function(e){return e.beers},U=function(e){return e.beers.isQueryParamsChanged},G=function(e){return Object(B.a)(Object(B.a)({},e.beers.filters),e.beers.paging)},W=F.reducer,Y=function(e){return function(){var t=Object(j.a)(f.a.mark((function t(r,n){var a,c,i,s,o,u,l,b,d,j,m;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n().beers,c=a.filters,i=c.name,s=c.minAlcohol,o=c.maxAlcohol,u=a.paging,l=u.pageSize,b=u.pageNumber,d=K(l,b,i,s,o),t.next=4,A(d,e);case 4:j=t.sent,m=!(j.length<l),r(z({beers:j,hasMore:m})),!m&&0===j.length&&(f="Sorry bro, no beer for you!",O.b.warn(f));case 8:case"end":return t.stop()}var f}),t)})));return function(e,r){return t.apply(this,arguments)}}()},$=function(e){return function(){var t=Object(j.a)(f.a.mark((function t(r){var n;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,L(e);case 2:n=t.sent,r(q({beer:n}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},K=function(e,t,r,n,a){return(e?"&per_page=".concat(e):"")+(t?"&page=".concat(t):"")+((r?"&beer_name=".concat(r):"")+(n?"&abv_gt=".concat(n):"")+(a?"&abv_lt=".concat(a):""))},ee=function(){var e=localStorage.getItem("userData");return e?JSON.parse(e):null}(),te={token:null===ee||void 0===ee?void 0:ee.token,userName:null===ee||void 0===ee?void 0:ee.userName},re=Object(u.b)({name:"authSlice",initialState:te,reducers:{authSuccess:function(e,t){var r=t.payload,n=r.userName,a=r.token;e.userName=n,e.token=a,S({token:a,userName:n})},logoutSuccess:function(e){e.userName=void 0,e.token=void 0,S({token:void 0,userName:void 0})}}}),ne=re.actions,ae=ne.authSuccess,ce=ne.logoutSuccess,ie=function(e){return e.auth.userName},se=function(e){return e.auth.token},oe=re.reducer,ue=function(e,t){return function(){var t=Object(j.a)(f.a.mark((function t(n){var a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E();case 2:a=t.sent,n(a?ae({userName:e,token:"fake_valid_token"}):h({actionName:r.name,error:"Invalid email or password."}));case 4:case"end":return t.stop()}}),t)})));function r(e){return t.apply(this,arguments)}return r}()},le=function(e){return Object(N.c)({router:Object(s.b)(e),apiRequests:g,auth:oe,beers:W})},be=Object(b.a)(),de=le(be);var fe=Object(u.a)({reducer:de,middleware:function(e){var t=e().prepend(y).concat(Object(l.a)(be));return t},devTools:false}),je=function(){return{isAuthenticated:!!Object(o.e)(se),userName:Object(o.e)(ie)}},me=r(7),pe=r.n(me),_e=r(1),he=function(){var e=Object(o.d)(),t=je(),r=t.isAuthenticated,a=t.userName,c=Object(n.useMemo)((function(){return r?a:""}),[r,a]);return Object(_e.jsxs)("nav",{className:pe.a.nav,children:[Object(_e.jsx)("p",{className:pe.a.username,children:c}),Object(_e.jsx)("ul",{children:Object(_e.jsx)("li",{children:r&&Object(_e.jsx)("span",{className:pe.a.logout_btn,onClick:function(){return e(function(){var e=Object(j.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t(ce()),t(J()),t(v({actionName:ue.name}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},children:"Logout"})})})]})};function ve(){return(ve=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function ge(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var Oe=n.createElement("g",null),xe=n.createElement("g",null),ye=n.createElement("g",null),Ne=n.createElement("g",null),we=n.createElement("g",null),ke=n.createElement("g",null),Ee=n.createElement("g",null),Se=n.createElement("g",null),Be=n.createElement("g",null),Ce=n.createElement("g",null),Ae=n.createElement("g",null),Le=n.createElement("g",null),Me=n.createElement("g",null),Fe=n.createElement("g",null),Pe=n.createElement("g",null);function ze(e,t){var r=e.title,a=e.titleId,c=ge(e,["title","titleId"]);return n.createElement("svg",ve({id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 501.386 501.386",style:{enableBackground:"new 0 0 501.386 501.386"},xmlSpace:"preserve",ref:t,"aria-labelledby":a},c),r?n.createElement("title",{id:a},r):null,n.createElement("path",{style:{fill:"#E2E2E2"},d:"M465.056,190.007h-98.22v227.788h98.22c12.539,0,21.943-10.449,21.943-21.943V211.949 C486.999,200.456,477.595,190.007,465.056,190.007z M453.563,384.358h-53.29V223.443h53.29V384.358z"}),n.createElement("path",{style:{fill:"#FFD15C"},d:"M399.228,114.774v364.669c0,11.494-9.404,21.943-21.943,21.943H62.771 c-11.494,0-21.943-9.404-21.943-21.943V114.774H399.228z"}),n.createElement("g",null,n.createElement("path",{style:{fill:"#F8B64C"},d:"M321.905,190.007c-13.584,0-25.078,11.494-25.078,25.078v208.98 c0,13.584,11.494,25.078,25.078,25.078c13.584,0,25.078-11.494,25.078-25.078v-208.98 C346.983,201.501,335.489,190.007,321.905,190.007z"}),n.createElement("path",{style:{fill:"#F8B64C"},d:"M220.55,190.007c-13.584,0-25.078,11.494-25.078,25.078v208.98 c0,13.584,11.494,25.078,25.078,25.078s25.078-11.494,25.078-25.078v-208.98C244.583,201.501,234.134,190.007,220.55,190.007z"}),n.createElement("path",{style:{fill:"#F8B64C"},d:"M118.15,190.007c-13.584,0-25.078,11.494-25.078,25.078v208.98 c0,13.584,11.494,25.078,25.078,25.078c13.584,0,25.078-11.494,25.078-25.078v-208.98 C143.228,201.501,131.734,190.007,118.15,190.007z"})),n.createElement("path",{style:{fill:"#F2F2F2"},d:"M401.318,136.717c0,0,79.412-50.155-14.629-107.624c0,0-51.2-22.988-96.131,6.269 c0,0-80.457-83.592-167.184,6.269c0,0-61.649-29.257-89.861,8.359c-7.314,11.494-10.449,27.167-7.314,41.796 c3.135,18.808,7.314,55.38-3.135,102.4c-10.449,49.11-9.404,87.771-7.314,106.58c1.045,11.494,14.629,41.796,47.02,33.437 c18.808-4.18,29.257-24.033,30.302-42.841c2.09-27.167,6.269-77.322,7.314-136.882c0,0,1.045-18.808,25.078-18.808L401.318,136.717z "}),Oe,xe,ye,Ne,we,ke,Ee,Se,Be,Ce,Ae,Le,Me,Fe,Pe)}var qe=n.forwardRef(ze),Te=(r.p,function(){return Object(_e.jsx)("header",{className:pe.a.header,children:Object(_e.jsxs)("div",{className:pe.a.menu,children:[Object(_e.jsx)("a",{href:"/beers",title:"Beers",children:Object(_e.jsx)(qe,{className:pe.a.logo})}),Object(_e.jsx)(he,{})]})})}),Qe=r(5),De=function(){return Object(_e.jsxs)("div",{className:pe.a.not_found,children:[Object(_e.jsx)("p",{children:"404"}),Object(_e.jsx)("p",{children:"No no no!"})]})},Ie=r(48),Re=r(24),Ve=function(e){return e.apiRequests},Ze=Object(Re.a)(Ve,(function(e){return e.errors})),Je=Object(Re.a)(Ve,(function(e){return e.requestsStates})),Xe=function(e,t){return t},He=Object(Re.a)(Ze,Xe,(function(e,t){return e.find((function(e){return e.action===t}))})),Ue=Object(Re.a)(Je,Xe,(function(e,t){return e.find((function(e){return e.action===t}))})),Ge=function(e){var t,r=Object(o.e)((function(t){return He(t,e)}));return{hasError:null!==(t=null===r||void 0===r?void 0:r.hasError)&&void 0!==t&&t,error:null===r||void 0===r?void 0:r.error}},We=r(25),Ye=r.n(We),$e=function(){var e=Object(o.d)(),t=Object(Ie.a)(),r=t.register,n=t.handleSubmit,a=t.errors,c=Ge(ue.name),i=c.hasError,s=c.error,u=function(){var t=Object(j.a)(f.a.mark((function t(r){var n;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=r.email,r.password,e(ue(n));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(_e.jsx)("div",{className:Ye.a.login_container,children:Object(_e.jsxs)("form",{onSubmit:n(u),children:[Object(_e.jsx)("h3",{children:"Login"}),Object(_e.jsx)("input",{name:"email",ref:r({validate:{isRequired:function(e){return!!e||"Email is required."}},pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:"Invalid email address."}}),placeholder:"Email"}),Object(_e.jsx)("input",{name:"password",ref:r({required:!0}),type:"password",placeholder:"Password"}),Object(_e.jsx)("div",{children:Object(_e.jsx)("input",{className:Ye.a.login_btn,type:"submit"})}),Object(_e.jsxs)("div",{className:Ye.a.login_error,children:[Object(_e.jsx)("p",{children:i&&s}),Object(_e.jsx)("p",{children:a.email&&a.email.message}),Object(_e.jsx)("p",{children:a.password&&"Password is required."})]})]})})},Ke=r(28),et=function(e){var t,r=Object(o.e)((function(t){return Ue(t,e)}));return null!==(t=null===r||void 0===r?void 0:r.loading)&&void 0!==t&&t},tt=r(46),rt=function(){return Object(_e.jsx)("div",{className:pe.a.loading_indicator,children:Object(_e.jsx)(tt.ThreeDots,{width:"140",height:"64",fill:"#f0a500"})})},nt=r(18),at=r.n(nt),ct=function(){var e=Object(o.d)(),t=Object(Qe.f)().id,r=et($.name),a=Object(o.e)(H).beer;return Object(n.useEffect)((function(){return e($(+t)),function(){e(Z())}}),[e,t]),r?Object(_e.jsx)(rt,{}):a?Object(_e.jsxs)("div",{className:at.a.beer_detail,children:[Object(_e.jsx)("img",{src:a.image_url,alt:a.name}),Object(_e.jsxs)("div",{className:at.a.beer_detail_info,children:[Object(_e.jsxs)("h3",{children:[a.name," - ",a.abv," %"]}),Object(_e.jsx)("p",{className:at.a.beer_detail_desc,children:a.description}),Object(_e.jsxs)("p",{className:at.a.beer_detail_tips,children:["Brewers tips: ",a.brewers_tips]}),Object(_e.jsxs)("div",{className:at.a.beer_detail_foods,children:[Object(_e.jsx)("h3",{children:"Food pairings"}),a.food_pairing.map((function(e,t){return Object(_e.jsx)("p",{children:e},t)}))]}),Object(_e.jsx)(Ke.a,{to:"/beers",children:"Back"})]})]}):null},it=r(47),st=r.n(it),ot=r(9),ut=r.n(ot),lt=function(e){var t=e.beer,r=e.onClick;return Object(_e.jsxs)("div",{onClick:function(){return r(t.id)},className:ut.a.card,children:[Object(_e.jsx)(st.a,{height:80,children:Object(_e.jsx)("img",{src:t.image_url,alt:t.name})}),Object(_e.jsxs)("div",{className:ut.a.beer_info,children:[Object(_e.jsx)("p",{className:ut.a.beer_title,children:t.name}),Object(_e.jsxs)("p",{className:ut.a.beer_abv+(t.abv>5?" ".concat(ut.a.high_abv):""),children:[t.abv,"%"]})]})]})},bt=function(){var e=Object(o.d)(),t=Ge(Y.name).hasError,r=et(Y.name),a=Object(o.e)(U),c=Object(o.e)(G),i=c.name,s=c.minAlcohol,u=c.maxAlcohol,l=c.pageNumber,b=Object(o.e)(X).beers;Object(n.useEffect)((function(){if(a&&!t){var r=k.a.CancelToken.source(),n=r.cancel,c=r.token,i=setTimeout((function(){return e(Y(c))}),600);return function(){n(),clearTimeout(i)}}}),[e,a,t,i,s,u,l]);var d=Object(n.useCallback)((function(e){be.push("beers/".concat(e))}),[]);return r?Object(_e.jsx)(rt,{}):Object(_e.jsx)("div",{className:ut.a.beer_list,children:b.map((function(e,t){return Object(_e.jsx)(lt,{beer:e,onClick:d},t)}))})},dt=function(){var e=Object(o.d)(),t=Object(o.e)(G),r=t.name,n=t.minAlcohol,a=t.maxAlcohol,c=t.hasMore,i=t.pageNumber;return Object(_e.jsxs)("div",{className:ut.a.search_form,children:[Object(_e.jsxs)("div",{className:ut.a.search_paging,children:["Page: ",i]}),Object(_e.jsx)("button",{disabled:1===i,className:ut.a.nav_btn,onClick:function(){return e(R(i-1))},children:"Prev"}),Object(_e.jsx)("input",{name:"name",placeholder:"Find me ...",value:null!==r&&void 0!==r?r:"",onChange:function(t){return e(Q(t.target.value))}}),Object(_e.jsx)("input",{name:"minAlcohol",type:"number",placeholder:"min alc",min:"0",max:"100",value:null!==n&&void 0!==n?n:"",onChange:function(t){return e(D(+t.target.value))}}),Object(_e.jsx)("input",{name:"maxAlcohol",type:"number",placeholder:"max alc",min:"0",max:"100",value:null!==a&&void 0!==a?a:"",onChange:function(t){return e(I(+t.target.value))}}),Object(_e.jsx)("button",{className:ut.a.clear_btn,title:"Clear filters",onClick:function(){return e(V())},children:"\u3024"}),Object(_e.jsx)("button",{disabled:!c,className:ut.a.nav_btn,onClick:function(){return e(R(i+1))},children:"Next"})]})},ft=function(){return Object(_e.jsxs)("div",{className:ut.a.beers,children:[Object(_e.jsx)(dt,{}),Object(_e.jsx)(bt,{})]})},jt=function(){return je().isAuthenticated?Object(_e.jsx)("div",{className:pe.a.page_container,children:Object(_e.jsxs)(Qe.c,{children:[Object(_e.jsx)(Qe.a,{exact:!0,path:["/","/beers","/beergeek"],children:Object(_e.jsx)(ft,{})}),Object(_e.jsx)(Qe.a,{exact:!0,path:["/beers/:id","/beergeek/beers/:id"],children:Object(_e.jsx)(ct,{})}),Object(_e.jsx)(Qe.a,{children:Object(_e.jsx)(De,{})})]})}):Object(_e.jsx)("div",{className:pe.a.page_container,children:Object(_e.jsx)($e,{})})},mt=function(){return Object(_e.jsxs)("div",{className:pe.a.layout,children:[Object(_e.jsx)(Te,{}),Object(_e.jsx)(jt,{}),Object(_e.jsx)(O.a,{delay:3e3})]})},pt=function(){return Object(_e.jsx)(a.a.StrictMode,{children:Object(_e.jsx)(o.a,{store:fe,children:Object(_e.jsx)(s.a,{history:be,children:Object(_e.jsx)(mt,{})})})})};i.a.render(Object(_e.jsx)(pt,{}),document.getElementById("root"))}},[[96,1,2]]]);
//# sourceMappingURL=main.ea685c51.chunk.js.map