!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager");let t=(e,t,n)=>{var l;return!!n(e,t.prototype)||(null===(l=e.constructor)||void 0===l?void 0:l.name)===t.name},n=e=>{let n=typeof e;return null===e?"null":"object"===n&&Array.isArray(e)?"array":"object"===n&&t(e,String,(e,t)=>t.isPrototypeOf(e))?"string":n},l=e=>t=>n(t)===e,r=e=>t=>typeof t===e,o=l("string"),i=l("object"),a=l("array"),s=e=>null===e,u=r("boolean"),c=e=>null==e,g=e=>!c(e),d=r("function"),m=(e,t)=>{if(a(e)){for(let n=0,l=e.length;n<l;++n)if(!t(e[n]))return!1;return!0}return!1},h=()=>{},p=e=>()=>e,f=(e,t)=>e===t;class k{constructor(e,t){this.tag=e,this.value=t}static some(e){return new k(!0,e)}static none(){return k.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(e){return this.tag?k.some(e(this.value)):k.none()}bind(e){return this.tag?e(this.value):k.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(e){return!this.tag||e(this.value)?this:k.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw Error(null!=e?e:"Called getOrDie on None")}static from(e){return g(e)?k.some(e):k.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}}k.singletonNone=new k(!1);let v=Array.prototype.indexOf,y=Array.prototype.push,x=(e,t)=>v.call(e,t),b=(e,t)=>x(e,t)>-1,_=(e,t)=>{let n=e.length,l=Array(n);for(let r=0;r<n;r++){let n=e[r];l[r]=t(n,r)}return l},w=(e,t)=>{for(let n=0,l=e.length;n<l;n++)t(e[n],n)},C=(e,t,n)=>(w(e,(e,l)=>{n=t(n,e,l)}),n),O=e=>{let t=[];for(let n=0,l=e.length;n<l;++n){if(!a(e[n]))throw Error("Arr.flatten item "+n+" was not an array, input: "+e);y.apply(t,e[n])}return t},N=(e,t)=>O(_(e,t)),A=(e,t)=>{for(let n=0;n<e.length;n++){let l=t(e[n],n);if(l.isSome())return l}return k.none()},E=(e,t,n=f)=>e.exists(e=>n(e,t)),S=e=>{let t=[],n=e=>{t.push(e)};for(let t=0;t<e.length;t++)e[t].each(n);return t},T=(e,t)=>e?k.some(t):k.none(),R=e=>t=>t.options.get(e),P=e=>{let t=e.options.register;t("link_assume_external_targets",{processor:e=>{let t=o(e)||u(e);return t?!0===e?{value:1,valid:t}:"http"===e||"https"===e?{value:e,valid:t}:{value:0,valid:t}:{valid:!1,message:"Must be a string or a boolean."}},default:!1}),t("link_context_toolbar",{processor:"boolean",default:!1}),t("link_list",{processor:e=>o(e)||d(e)||m(e,i)}),t("link_default_target",{processor:"string"}),t("link_default_protocol",{processor:"string",default:"https"}),t("link_target_list",{processor:e=>u(e)||m(e,i),default:!0}),t("link_rel_list",{processor:"object[]",default:[]}),t("link_class_list",{processor:"object[]",default:[]}),t("link_title",{processor:"boolean",default:!0}),t("allow_unsafe_link_target",{processor:"boolean",default:!1}),t("link_quicklink",{processor:"boolean",default:!1})},L=R("link_assume_external_targets"),M=R("link_context_toolbar"),U=R("link_list"),D=R("link_default_target"),B=R("link_default_protocol"),I=R("link_target_list"),K=R("link_rel_list"),j=R("link_class_list"),z=R("link_title"),q=R("allow_unsafe_link_target"),F=R("link_quicklink");var V=tinymce.util.Tools.resolve("tinymce.util.Tools");let W=e=>o(e.value)?e.value:"",$=e=>o(e.text)?e.text:o(e.title)?e.title:"",G=(e,t)=>{let n=[];return V.each(e,e=>{let l=$(e);if(void 0!==e.menu){let r=G(e.menu,t);n.push({text:l,items:r})}else{let r=t(e);n.push({text:l,value:r})}}),n},H=(e=W)=>t=>k.from(t).map(t=>G(t,e)),J={sanitize:e=>H(W)(e),sanitizeWith:H,createUi:(e,t)=>n=>({name:e,type:"listbox",label:t,items:n}),getValue:W},Q=Object.keys,X=Object.hasOwnProperty,Y=(e,t)=>{let n=Q(e);for(let l=0,r=n.length;l<r;l++){let r=n[l];t(e[r],r)}},Z=e=>(t,n)=>{e[n]=t},ee=(e,t,n,l)=>{Y(e,(e,r)=>{(t(e,r)?n:l)(e,r)})},et=(e,t)=>{let n={};return ee(e,t,Z(n),h),n},en=(e,t)=>X.call(e,t),el=(e,t)=>en(e,t)&&void 0!==e[t]&&null!==e[t];var er=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),eo=tinymce.util.Tools.resolve("tinymce.util.URI");let ei=e=>g(e)&&"a"===e.nodeName.toLowerCase(),ea=e=>ei(e)&&!!ec(e),es=(e,t)=>{if(e.collapsed)return[];{let n=e.cloneContents(),l=n.firstChild,r=new er(l,n),o=[],i=l;do t(i)&&o.push(i);while(i=r.next());return o}},eu=e=>/^\w+:/i.test(e),ec=e=>{var t,n;return null!==(n=null!==(t=e.getAttribute("data-mce-href"))&&void 0!==t?t:e.getAttribute("href"))&&void 0!==n?n:""},eg=(e,t)=>{var n;let l=["noopener"],r=e?e.split(/\s+/):[],o=e=>e.filter(e=>-1===V.inArray(l,e)),i=t?(n=o(n=r)).length>0?n.concat(l):l:o(r);return i.length>0?V.trim(i.sort().join(" ")):""},ed=e=>e.replace(/\uFEFF/g,""),em=(e,t)=>eb(t=t||ef(e.selection.getRng())[0]||e.selection.getNode())?k.from(e.dom.select("a[href]",t)[0]):k.from(e.dom.getParent(t,"a[href]")),eh=(e,t)=>em(e,t).isSome(),ep=(e,t)=>ed(t.fold(()=>e.getContent({format:"text"}),e=>e.innerText||e.textContent||"")),ef=e=>es(e,ea),ek=e=>V.grep(e,ea),ev=e=>ek(e).length>0,ey=e=>ef(e).length>0,ex=e=>{let t=e.schema.getTextInlineElements();if(em(e).exists(e=>e.hasAttribute("data-mce-block")))return!1;let n=e.selection.getRng();return!!n.collapsed||0===es(n,e=>1===e.nodeType&&!ei(e)&&!en(t,e.nodeName.toLowerCase())).length},eb=e=>g(e)&&"FIGURE"===e.nodeName&&/\bimage\b/i.test(e.className),e_=e=>C(["title","rel","class","target"],(t,n)=>(e[n].each(e=>{t[n]=e.length>0?e:null}),t),{href:e.href}),ew=(e,t)=>"http"!==t&&"https"!==t||eu(e)?e:t+"://"+e,eC=(e,t)=>{let n={...t};if(0===K(e).length&&!q(e)){let e=eg(n.rel,"_blank"===n.target);n.rel=e||null}return k.from(n.target).isNone()&&!1===I(e)&&(n.target=D(e)),n.href=ew(n.href,L(e)),n},eO=(e,t,n,l)=>{n.each(e=>{en(t,"innerText")?t.innerText=e:t.textContent=e}),e.dom.setAttribs(t,l),e.selection.select(t)},eN=(e,t,n,l)=>{let r=e.dom;eb(t)?eU(r,t,l):n.fold(()=>{e.execCommand("mceInsertLink",!1,l)},t=>{e.insertContent(r.createHTML("a",l,r.encode(t)))})},eA=(e,t,n)=>{let l=e.selection.getNode(),r=em(e,l),o=eC(e,e_(n));e.undoManager.transact(()=>{n.href===t.href&&t.attach(),r.fold(()=>{eN(e,l,n.text,o)},t=>{e.focus(),eO(e,t,n.text,o)})})},eE=e=>{let t=e.dom,n=e.selection,l=n.getBookmark(),r=n.getRng().cloneRange(),o=t.getParent(r.startContainer,"a[href]",e.getBody()),i=t.getParent(r.endContainer,"a[href]",e.getBody());o&&r.setStartBefore(o),i&&r.setEndAfter(i),n.setRng(r),e.execCommand("unlink"),n.moveToBookmark(l)},eS=e=>{e.undoManager.transact(()=>{let t=e.selection.getNode();eb(t)?eM(e,t):eE(e),e.focus()})},eT=e=>{let{class:t,href:n,rel:l,target:r,text:o,title:i}=e;return et({class:t.getOrNull(),href:n,rel:l.getOrNull(),target:r.getOrNull(),text:o.getOrNull(),title:i.getOrNull()},(e,t)=>!1===s(e))},eR=(e,t)=>{let n=e.options.get,l={allow_html_data_urls:n("allow_html_data_urls"),allow_script_urls:n("allow_script_urls"),allow_svg_data_urls:n("allow_svg_data_urls")},r=t.href;return{...t,href:eo.isDomSafe(r,"a",l)?r:""}},eP=(e,t,n)=>{let l=eR(e,n);e.hasPlugin("rtc",!0)?e.execCommand("createlink",!1,eT(l)):eA(e,t,l)},eL=e=>{e.hasPlugin("rtc",!0)?e.execCommand("unlink"):eS(e)},eM=(e,t)=>{var n;let l=e.dom.select("img",t)[0];if(l){let r=e.dom.getParents(l,"a[href]",t)[0];r&&(null===(n=r.parentNode)||void 0===n||n.insertBefore(l,r),e.dom.remove(r))}},eU=(e,t,n)=>{var l;let r=e.select("img",t)[0];if(r){let t=e.create("a",n);null===(l=r.parentNode)||void 0===l||l.insertBefore(t,r),t.appendChild(r)}},eD=e=>el(e,"items"),eB=(e,t)=>A(t,t=>eD(t)?eB(e,t.items):T(t.value===e,t)),eI=(e,t,n,l)=>{let r=l[t],o=e.length>0;return void 0!==r?eB(r,n).map(t=>({url:{value:t.value,meta:{text:o?e:t.text,attach:h}},text:o?e:t.text})):k.none()},eK=(e,t)=>"link"===t?e.link:"anchor"===t?e.anchor:k.none(),ej=(e,t)=>{let n={text:e.text,title:e.title},l=e=>{var t;return T(n.title.length<=0,k.from(null===(t=e.meta)||void 0===t?void 0:t.title).getOr(""))},r=e=>{var t;return T(n.text.length<=0,k.from(null===(t=e.meta)||void 0===t?void 0:t.text).getOr(e.value))},o=e=>{let t=r(e.url),n=l(e.url);return t.isSome()||n.isSome()?k.some({...t.map(e=>({text:e})).getOr({}),...n.map(e=>({title:e})).getOr({})}):k.none()},i=(e,l)=>{let r=eK(t,l).getOr([]);return eI(n.text,l,r,e)};return{onChange:(e,t)=>{let l=t.name;return"url"===l?o(e()):b(["anchor","link"],l)?i(e(),l):(("text"===l||"title"===l)&&(n[l]=e()[l]),k.none())}}};var ez=tinymce.util.Tools.resolve("tinymce.util.Delay");let eq=(e,t,n)=>{let l=e.selection.getRng();ez.setEditorTimeout(e,()=>{e.windowManager.confirm(t,t=>{e.selection.setRng(l),n(t)})})},eF=e=>{let t=e.href;return t.indexOf("@")>0&&-1===t.indexOf("/")&&-1===t.indexOf("mailto:")?k.some({message:"The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?",preprocess:e=>({...e,href:"mailto:"+t})}):k.none()},eV=(e,t)=>n=>{let l=n.href;return 1===e&&!eu(l)||0===e&&/^\s*www(\.|\d\.)/i.test(l)?k.some({message:`The URL you entered seems to be an external link. Do you want to add the required ${t}:// prefix?`,preprocess:e=>({...e,href:t+"://"+l})}):k.none()},eW=(e,t)=>A([eF,eV(L(e),B(e))],e=>e(t)).fold(()=>Promise.resolve(t),n=>new Promise(l=>{eq(e,n.message,e=>{l(e?n.preprocess(t):t)})})),e$=e=>{let t=N(e.dom.select("a:not([href])"),e=>{let t=e.name||e.id;return t?[{text:t,value:"#"+t}]:[]});return t.length>0?k.some([{text:"None",value:""}].concat(t)):k.none()},eG=e=>{let t=j(e);return t.length>0?J.sanitize(t):k.none()},eH=e=>{try{return k.some(JSON.parse(e))}catch(e){return k.none()}},eJ=e=>{let t=t=>e.convertURL(t.value||t.url||"","href"),n=U(e);return new Promise(e=>{o(n)?fetch(n).then(e=>e.ok?e.text().then(eH):Promise.reject()).then(e,()=>e(k.none())):d(n)?n(t=>e(k.some(t))):e(k.from(n))}).then(e=>e.bind(J.sanitizeWith(t)).map(e=>e.length>0?[{text:"None",value:""}].concat(e):e))},eQ=(e,t)=>{let n=K(e);if(n.length>0){let l=E(t,"_blank");return(!1===q(e)?J.sanitizeWith(e=>eg(J.getValue(e),l)):J.sanitize)(n)}return k.none()},eX=[{text:"Current window",value:""},{text:"New window",value:"_blank"}],eY=e=>{let t=I(e);return a(t)?J.sanitize(t).orThunk(()=>k.some(eX)):!1===t?k.none():k.some(eX)},eZ=(e,t,n)=>{let l=e.getAttrib(t,n);return null!==l&&l.length>0?k.some(l):k.none()},e0=(e,t)=>{let n=e.dom,l=ex(e)?k.some(ep(e.selection,t)):k.none(),r=t.bind(e=>k.from(n.getAttrib(e,"href"))),o=t.bind(e=>k.from(n.getAttrib(e,"target"))),i=t.bind(e=>eZ(n,e,"rel")),a=t.bind(e=>eZ(n,e,"class"));return{url:r,text:l,title:t.bind(e=>eZ(n,e,"title")),target:o,rel:i,linkClass:a}},e1=(e,t)=>eJ(e).then(n=>{let l=e0(e,t);return{anchor:l,catalogs:{targets:eY(e),rels:eQ(e,l.target),classes:eG(e),anchor:e$(e),link:n},optNode:t,flags:{titleEnabled:z(e)}}}),e3=(e,t)=>n=>{let l=n.getData();if(!l.url.value){eL(e),n.close();return}let r=e=>k.from(l[e]).filter(n=>!E(t.anchor[e],n)),o={href:l.url.value,text:r("text"),target:r("target"),rel:r("rel"),class:r("linkClass"),title:r("title")},i={href:l.url.value,attach:void 0!==l.url.meta&&l.url.meta.attach?l.url.meta.attach:h};eW(e,o).then(t=>{eP(e,i,t)}),n.close()},e2=e=>{let t=em(e);return e1(e,t)},e4=(e,t)=>{let n=e.anchor,l=n.url.getOr("");return{url:{value:l,meta:{original:{value:l}}},text:n.text.getOr(""),title:n.title.getOr(""),anchor:l,link:l,rel:n.rel.getOr(""),target:n.target.or(t).getOr(""),linkClass:n.linkClass.getOr("")}},e5=(e,t,n)=>{let l=e.anchor.text.map(()=>({name:"text",type:"input",label:"Text to display"})).toArray(),r=e.flags.titleEnabled?[{name:"title",type:"input",label:"Title"}]:[],o=e4(e,k.from(D(n))),i=e.catalogs,a=ej(o,i);return{title:"Insert/Edit Link",size:"normal",body:{type:"panel",items:O([[{name:"url",type:"urlinput",filetype:"file",label:"URL",picker_text:"Browse links"}],l,r,S([i.anchor.map(J.createUi("anchor","Anchors")),i.rels.map(J.createUi("rel","Rel")),i.targets.map(J.createUi("target","Open link in...")),i.link.map(J.createUi("link","Link list")),i.classes.map(J.createUi("linkClass","Class"))])])},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],initialData:o,onChange:(e,{name:t})=>{a.onChange(e.getData,{name:t}).each(t=>{e.setData(t)})},onSubmit:t}},e6=e=>{e2(e).then(t=>{let n=e3(e,t);return e5(t,n,e)}).then(t=>{e.windowManager.open(t)})},e7=e=>{e.addCommand("mceLink",(t,n)=>{(null==n?void 0:n.dialog)!==!0&&F(e)?e.dispatch("contexttoolbar-show",{toolbarKey:"quicklink"}):e6(e)})};var e8=tinymce.util.Tools.resolve("tinymce.util.VK");let e9=(e,t)=>{document.body.appendChild(e),e.dispatchEvent(t),document.body.removeChild(e)},te=e=>{let t=document.createElement("a");t.target="_blank",t.href=e,t.rel="noreferrer noopener";let n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),e9(t,n)},tt=e=>{let t=e.selection.getRng(),n=t.startContainer;return ea(n)&&t.startContainer===t.endContainer&&1===e.dom.select("img",n).length},tn=e=>e.selection.isCollapsed()||tt(e)?ek(e.dom.getParents(e.selection.getStart())):ef(e.selection.getRng()),tl=e=>tn(e)[0],tr=e=>!0===e.altKey&&!1===e.shiftKey&&!1===e.ctrlKey&&!1===e.metaKey,to=(e,t)=>{if(t){let n=ec(t);if(/^#/.test(n)){let t=e.dom.select(n);t.length&&e.selection.scrollIntoView(t[0],!0)}else te(t.href)}},ti=e=>()=>{e.execCommand("mceLink",!1,{dialog:!0})},ta=e=>()=>{to(e,tl(e))},ts=e=>{e.on("click",t=>{let n=ek(e.dom.getParents(t.target));1===n.length&&e8.metaKeyPressed(t)&&(t.preventDefault(),to(e,n[0]))}),e.on("keydown",t=>{if(!t.isDefaultPrevented()&&13===t.keyCode&&tr(t)){let n=tl(e);n&&(t.preventDefault(),to(e,n))}})},tu=(e,t)=>(e.on("NodeChange",t),()=>e.off("NodeChange",t)),tc=e=>t=>{let n=()=>{t.setActive(!e.mode.isReadOnly()&&eh(e,e.selection.getNode())),t.setEnabled(e.selection.isEditable())};return n(),tu(e,n)},tg=e=>t=>{let n=()=>{t.setEnabled(e.selection.isEditable())};return n(),tu(e,n)},td=e=>1===tn(e).length,tm=e=>t=>{let n=()=>t.setEnabled(td(e));return n(),tu(e,n)},th=e=>t=>{let n=t=>ev(t)||ey(e.selection.getRng()),l=e.dom.getParents(e.selection.getStart()),r=l=>{t.setEnabled(n(l)&&e.selection.isEditable())};return r(l),tu(e,e=>r(e.parents))},tp=e=>{e.addShortcut("Meta+K","",()=>{e.execCommand("mceLink")})},tf=e=>{e.ui.registry.addToggleButton("link",{icon:"link",tooltip:"Insert/edit link",onAction:ti(e),onSetup:tc(e),shortcut:"Meta+K"}),e.ui.registry.addButton("openlink",{icon:"new-tab",tooltip:"Open link",onAction:ta(e),onSetup:tm(e)}),e.ui.registry.addButton("unlink",{icon:"unlink",tooltip:"Remove link",onAction:()=>eL(e),onSetup:th(e)})},tk=e=>{e.ui.registry.addMenuItem("openlink",{text:"Open link",icon:"new-tab",onAction:ta(e),onSetup:tm(e)}),e.ui.registry.addMenuItem("link",{icon:"link",text:"Link...",shortcut:"Meta+K",onSetup:tg(e),onAction:ti(e)}),e.ui.registry.addMenuItem("unlink",{icon:"unlink",text:"Remove link",onAction:()=>eL(e),onSetup:th(e)})},tv=e=>{e.ui.registry.addContextMenu("link",{update:t=>e.dom.isEditable(t)?ev(e.dom.getParents(t,"a"))?"link unlink openlink":"link":""})},ty=e=>{let t=e=>{e.selection.collapse(!1)},n=t=>{let n=e.selection.getNode();return t.setEnabled(eh(e,n)),h},l=t=>{let n=em(e),l=ex(e);return n.isNone()&&l?T(0===ep(e.selection,n).length,t):k.none()};e.ui.registry.addContextForm("quicklink",{launch:{type:"contextformtogglebutton",icon:"link",tooltip:"Link",onSetup:tc(e)},label:"Link",predicate:t=>M(e)&&eh(e,t),initValue:()=>em(e).fold(p(""),ec),commands:[{type:"contextformtogglebutton",icon:"link",tooltip:"Link",primary:!0,onSetup:t=>{let n=e.selection.getNode();return t.setActive(eh(e,n)),tc(e)(t)},onAction:n=>{let r=n.getValue(),o=l(r);eP(e,{href:r,attach:h},{href:r,text:o,title:k.none(),rel:k.none(),target:k.from(D(e)),class:k.none()}),t(e),n.hide()}},{type:"contextformbutton",icon:"unlink",tooltip:"Remove link",onSetup:n,onAction:t=>{eL(e),t.hide()}},{type:"contextformbutton",icon:"new-tab",tooltip:"Open link",onSetup:n,onAction:t=>{ta(e)(),t.hide()}}]})};e.add("link",e=>{P(e),tf(e),tk(e),tv(e),ty(e),ts(e),e7(e),tp(e)})}();