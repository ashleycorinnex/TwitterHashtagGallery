(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{106:function(e,t,a){e.exports=a(264)},263:function(e,t,a){},264:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),s=a(15),l=a.n(s),c=a(51),o=a(88),i=a(89),m=a(90),u=a(105),h=a(91),d=a(104),f=a(19),g=a(36),p=a.n(g),E=a(26),v=a.n(E),b=a(35),w=a.n(b),y=a(96),N=a.n(y),j=a(98),C=a.n(j),S=a(97),O=a.n(S),k=a(50),_=a.n(k),x=a(99),T=a.n(x),I=a(102),P=a.n(I),G=a(100),H=a.n(G),W=a(103),z=a.n(W),D=a(101),Y=a.n(D),M=a(28),B=a(92),J=a(93),L=a(94),q=a.n(L);a(116).polyfill(),a(117),M.b.add(J.a);var A=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(s)))).state={event:"",hashtag:"",search:"",searchTemp:"",posts:[],showGallery:!1,timer:null},a.formComponent=function(){return r.a.createElement("form",{onSubmit:a.handleSubmit},r.a.createElement(w.a,{label:"Event Name",margin:"normal",variant:"outlined",name:"event",fullWidth:!0,onChange:a.handleChange}),r.a.createElement(w.a,{label:"Hashtag",margin:"normal",variant:"outlined",name:"hashtag",fullWidth:!0,onChange:a.handleChange}),r.a.createElement(p.a,{className:"button",type:"submit",fullWidth:!0,variant:"contained",size:"large"},"Start Event"))},a.galleryComponent=function(){var e=a.state,t=e.event,n=e.hashtag,s=e.search;return r.a.createElement("div",{className:"w-100"},r.a.createElement(v.a,{container:!0,justify:"space-between",alignItems:"center",className:"pl-2"},r.a.createElement(v.a,{item:!0},r.a.createElement("h1",{className:"header"},t||"Event Name"),r.a.createElement("h2",{className:"subheader"},r.a.createElement("strong",{className:"xs-block mr-2"},"#",n||"Hashtag"),r.a.createElement("span",{className:"grey--text"},r.a.createElement("strong",null,a.filteredPosts().length)," Posts",r.a.createElement("span",{className:"ml-2"},"//"),r.a.createElement("strong",{className:"ml-2"},a.filteredPosts().map(function(e){return e.user.screen_name}).filter(function(e,t,a){return a.indexOf(e)===t}).length)," Users",r.a.createElement("br",null),r.a.createElement("small",null,""!=s?"Searching handles with '".concat(s,"'"):"")))),r.a.createElement(v.a,null,r.a.createElement("form",{onSubmit:a.handleSearch},r.a.createElement(w.a,{label:"Search",margin:"none",variant:"outlined",name:"searchTemp",onChange:a.handleChange}),r.a.createElement(p.a,{className:"button black ml-2",type:"submit",size:"large",variant:"contained"},"Search")))),r.a.createElement(v.a,{container:!0},a.filteredPosts().map(function(e){return a.renderGalleryItem(e)})))},a.handleChange=function(e){a.setState(Object(o.a)({},e.target.name,e.target.value))},a.handleSearch=function(e){e.preventDefault();var t=a.state.searchTemp;a.setState({search:t})},a.handleSubmit=function(e){e.preventDefault(),a.setState({showGallery:!0}),a.searchTweets();var t=Object(f.a)(Object(f.a)(a));a.setState({timer:setInterval(function(){t.searchTweets()},15e3)})},a.filteredPosts=function(){var e=a.state,t=e.search;return e.posts.filter(function(e){return""==e.search||e.user.screen_name.toLowerCase().indexOf(t.toLowerCase())>-1})},a.searchTweets=function(){var e=a.state,t=e.hashtag,n=e.posts,r=Object(f.a)(Object(f.a)(a));fetch("/api/searchTweets?hashtag=".concat(t||"Hashtag","&since=").concat(n.length>0?n[0].id:"")).then(function(e){return e.json()}).then(function(e){var t=e.statuses.filter(function(e){return e.entities&&e.entities.media&&e.entities.media.length&&!n.find(function(t){return t.id==e.id})});r.setState({posts:[].concat(Object(c.a)(t),Object(c.a)(n))})}).catch(function(e){console.log(e)})},a}return Object(d.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state.showGallery;return r.a.createElement(v.a,{container:!0,justify:e?"flex-start":"center",alignItems:e?"flex-start":"center",direction:"column",id:"grid"},e?this.galleryComponent():this.formComponent())}},{key:"renderGalleryItem",value:function(e,t){return r.a.createElement(N.a,{key:e.id,className:"post",square:!0,elevation:0},r.a.createElement(O.a,{className:"post-image",image:e.entities.media[0].media_url}),r.a.createElement(C.a,{className:"post-overlay"},r.a.createElement(_.a,{className:"post-user"},r.a.createElement(T.a,null,r.a.createElement(H.a,{className:"post-avatar"},r.a.createElement(Y.a,{src:e.user.profile_image_url})),r.a.createElement(P.a,{primary:e.user.screen_name,secondary:q()(e.created_at,"ddd MMM DD HH:mm:ss Z YYYY").fromNow()}),r.a.createElement(z.a,null,r.a.createElement(B.a,{icon:["fab","twitter"],size:"lg",className:"mr-2"})))),r.a.createElement(p.a,{className:"button outlined",size:"large",onClick:function(){window.open("https://twitter.com/statuses/".concat(e.id_str),"_blank")},variant:"outlined"},"View Post")))}}]),t}(n.Component);a(263),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[106,1,2]]]);
//# sourceMappingURL=main.64dcd341.chunk.js.map