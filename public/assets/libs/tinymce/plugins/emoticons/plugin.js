!function(){"use strict";let e;var t=tinymce.util.Tools.resolve("tinymce.PluginManager");let o=e=>t=>e===t,r=o(null),n=o(void 0),l=e=>null==e,s=e=>!l(e),a=()=>{},i=()=>!1;class u{constructor(e,t){this.tag=e,this.value=t}static some(e){return new u(!0,e)}static none(){return u.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(e){return this.tag?u.some(e(this.value)):u.none()}bind(e){return this.tag?e(this.value):u.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(e){return!this.tag||e(this.value)?this:u.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw Error(null!=e?e:"Called getOrDie on None")}static from(e){return s(e)?u.some(e):u.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}}u.singletonNone=new u(!1);let c=(e,t)=>{for(let o=0,r=e.length;o<r;o++)if(t(e[o],o))return!0;return!1},g=(e,t)=>{let o=e.length,r=Array(o);for(let n=0;n<o;n++){let o=e[n];r[n]=t(o,n)}return r},h=(e,t)=>{for(let o=0,r=e.length;o<r;o++)t(e[o],o)},m=e=>{let t=e;return{get:()=>t,set:e=>{t=e}}},d=(e,t)=>{let o=null,n=()=>{r(o)||(clearTimeout(o),o=null)};return{cancel:n,throttle:(...r)=>{n(),o=setTimeout(()=>{o=null,e.apply(null,r)},t)}}},p=(e,t)=>{e.insertContent(t)},y=Object.keys,f=Object.hasOwnProperty,b=(e,t)=>{let o=y(e);for(let r=0,n=o.length;r<n;r++){let n=o[r];t(e[n],n)}},v=(e,t)=>j(e,(e,o)=>({k:o,v:t(e,o)})),j=(e,t)=>{let o={};return b(e,(e,r)=>{let n=t(e,r);o[n.k]=n.v}),o},w=(e,t)=>f.call(e,t),C=(e=(e,t)=>t,(...t)=>{if(0===t.length)throw Error("Can't merge zero objects");let o={};for(let r=0;r<t.length;r++){let n=t[r];for(let t in n)w(n,t)&&(o[t]=e(o[t],n[t]))}return o}),_=e=>{let t=m(u.none()),o=()=>t.get().each(e);return{clear:()=>{o(),t.set(u.none())},isSet:()=>t.get().isSome(),get:()=>t.get(),set:e=>{o(),t.set(u.some(e))}}},A=()=>{let e=_(a);return{...e,on:t=>e.get().each(t)}},k=(e,t,o)=>""===t||e.length>=t.length&&e.substr(o,o+t.length)===t,O=(e,t,o=0,r)=>{let l=e.indexOf(t,o);return -1!==l&&(!!n(r)||l+t.length<=r)},x=(e,t)=>k(e,t,0);var E=tinymce.util.Tools.resolve("tinymce.Resource");let S=e=>t=>t.options.get(e),L=(e,t)=>{let o=e.options.register;o("emoticons_database",{processor:"string",default:"emojis"}),o("emoticons_database_url",{processor:"string",default:`${t}/js/${N(e)}${e.suffix}.js`}),o("emoticons_database_id",{processor:"string",default:"tinymce.plugins.emoticons"}),o("emoticons_append",{processor:"object",default:{}}),o("emoticons_images_url",{processor:"string",default:"https://cdnjs.cloudflare.com/ajax/libs/twemoji/15.1.0/72x72/"})},N=S("emoticons_database"),T=S("emoticons_database_url"),D=S("emoticons_database_id"),F=S("emoticons_append"),P=S("emoticons_images_url"),$={symbols:"Symbols",people:"People",animals_and_nature:"Animals and Nature",food_and_drink:"Food and Drink",activity:"Activity",travel_and_places:"Travel and Places",objects:"Objects",flags:"Flags",user:"User Defined"},I=(e,t)=>w(e,t)?e[t]:t,z=e=>v(F(e),e=>({keywords:[],category:"user",...e})),M=(e,t,o)=>{let r=A(),n=A(),l=P(e),s=e=>x(e.char,"<img")?e.char.replace(/src="([^"]+)"/,(e,t)=>`src="${l}${t}"`):e.char,a=e=>{let t={},o=[];b(e,(e,r)=>{let n={title:r,keywords:e.keywords,char:s(e),category:I($,e.category)},l=void 0!==t[n.category]?t[n.category]:[];t[n.category]=l.concat([n]),o.push(n)}),r.set(t),n.set(o)};e.on("init",()=>{E.load(o,t).then(t=>{a(C(t,z(e)))},e=>{console.log(`Failed to load emojis: ${e}`),r.set({}),n.set([])})});let i=()=>n.get().getOr([]),c=()=>r.isSet()&&n.isSet();return{listCategories:()=>["All"].concat(y(r.get().getOr({}))),hasLoaded:c,waitForLoad:()=>c()?Promise.resolve(!0):new Promise((e,o)=>{let r=15,n=setInterval(()=>{c()?(clearInterval(n),e(!0)):--r<0&&(console.log("Could not load emojis from url: "+t),clearInterval(n),o(!1))},100)}),listAll:i,listCategory:e=>"All"===e?i():r.get().bind(t=>u.from(t[e])).getOr([])}},R=(e,t)=>O(e.title.toLowerCase(),t)||c(e.keywords,e=>O(e.toLowerCase(),t)),U=(e,t,o)=>{let r=[],n=t.toLowerCase(),l=o.fold(()=>i,e=>t=>t>=e);for(let o=0;o<e.length&&!((0===t.length||R(e[o],n))&&(r.push({value:e[o].char,text:e[o].title,icon:e[o].char}),l(r.length)));o++);return r},B="pattern",q=(e,t)=>{let o={pattern:"",results:U(t.listAll(),"",u.some(300))},r=m("All"),n=e=>{let o=e.getData(),n=r.get(),l=U(t.listCategory(n),o[B],"All"===n?u.some(300):u.none());e.setData({results:l})},l=d(e=>{n(e)},200),s={label:"Search",type:"input",name:B},a={type:"collection",name:"results"},i=()=>({title:"Emojis",size:"normal",body:{type:"tabpanel",tabs:g(t.listCategories(),e=>({title:e,name:e,items:[s,a]}))},initialData:o,onTabChange:(e,t)=>{r.set(t.newTabName),l.throttle(e)},onChange:l.throttle,onAction:(t,o)=>{"results"===o.name&&(p(e,o.value),t.close())},buttons:[{type:"cancel",text:"Close",primary:!0}]}),c=e.windowManager.open(i());c.focus(B),t.hasLoaded()||(c.block("Loading emojis..."),t.waitForLoad().then(()=>{c.redial(i()),l.throttle(c),c.focus(B),c.unblock()}).catch(e=>{c.redial({title:"Emojis",body:{type:"panel",items:[{type:"alertbanner",level:"error",icon:"warning",text:"Could not load emojis"}]},buttons:[{type:"cancel",text:"Close",primary:!0}],initialData:{pattern:"",results:[]}}),c.focus(B),c.unblock()}))},G=(e,t)=>{e.addCommand("mceEmoticons",()=>q(e,t))},H=e=>{e.on("PreInit",()=>{e.parser.addAttributeFilter("data-emoticon",e=>{h(e,e=>{e.attr("data-mce-resize","false"),e.attr("data-mce-placeholder","1")})})})},J=(e,t)=>{e.ui.registry.addAutocompleter("emoticons",{trigger:":",columns:"auto",minChars:2,fetch:(e,o)=>t.waitForLoad().then(()=>U(t.listAll(),e,u.some(o))),onAction:(t,o,r)=>{e.selection.setRng(o),e.insertContent(r),t.hide()}})},K=e=>t=>{let o=()=>{t.setEnabled(e.selection.isEditable())};return e.on("NodeChange",o),o(),()=>{e.off("NodeChange",o)}},Q=e=>{let t=()=>e.execCommand("mceEmoticons");e.ui.registry.addButton("emoticons",{tooltip:"Emojis",icon:"emoji",onAction:t,onSetup:K(e)}),e.ui.registry.addMenuItem("emoticons",{text:"Emojis...",icon:"emoji",onAction:t,onSetup:K(e)})};t.add("emoticons",(e,t)=>{L(e,t);let o=T(e),r=D(e),n=M(e,o,r);return G(e,n),Q(e),J(e,n),H(e),{getAllEmojis:()=>n.waitForLoad().then(()=>n.listAll())}})}();