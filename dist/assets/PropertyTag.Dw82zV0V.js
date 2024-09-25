import{Y as J,$ as Q,cS as Y,cT as q,y as D,a4 as G,d as _,a8 as A,F as B,Q as E,f as u,K as S,D as Z,aH as ee,J as oe,cU as le,cV as ae,N as P,cW as te,X as N,bM as ne,a5 as se,r as re,H as ce,x as ie,b as p,c as f,ae as de,j as C,w as m,g as h,m as I,ag as M,am as ue,cX as ge,I as pe,n as ve,aU as be,_ as he}from"./index.D4Ou2A85.js";import{P as fe}from"./PlusOutlined.COTIR227.js";const y=(e,c,t)=>{const n=Y(t);return{["".concat(e.componentCls,"-").concat(c)]:{color:e["color".concat(t)],background:e["color".concat(n,"Bg")],borderColor:e["color".concat(n,"Border")],["&".concat(e.componentCls,"-borderless")]:{borderColor:"transparent"}}}},Ce=e=>q(e,(c,t)=>{let{textColor:n,lightBorderColor:o,lightColor:a,darkColor:i}=t;return{["".concat(e.componentCls,"-").concat(c)]:{color:n,background:a,borderColor:o,"&-inverse":{color:e.colorTextLightSolid,background:i,borderColor:i},["&".concat(e.componentCls,"-borderless")]:{borderColor:"transparent"}}}}),me=e=>{const{paddingXXS:c,lineWidth:t,tagPaddingHorizontal:n,componentCls:o}=e,a=n-t,i=c-t;return{[o]:D(D({},G(e)),{display:"inline-block",height:"auto",marginInlineEnd:e.marginXS,paddingInline:a,fontSize:e.tagFontSize,lineHeight:"".concat(e.tagLineHeight,"px"),whiteSpace:"nowrap",background:e.tagDefaultBg,border:"".concat(e.lineWidth,"px ").concat(e.lineType," ").concat(e.colorBorder),borderRadius:e.borderRadiusSM,opacity:1,transition:"all ".concat(e.motionDurationMid),textAlign:"start",["&".concat(o,"-rtl")]:{direction:"rtl"},"&, a, a:hover":{color:e.tagDefaultColor},["".concat(o,"-close-icon")]:{marginInlineStart:i,color:e.colorTextDescription,fontSize:e.tagIconSize,cursor:"pointer",transition:"all ".concat(e.motionDurationMid),"&:hover":{color:e.colorTextHeading}},["&".concat(o,"-has-color")]:{borderColor:"transparent",["&, a, a:hover, ".concat(e.iconCls,"-close, ").concat(e.iconCls,"-close:hover")]:{color:e.colorTextLightSolid}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",["&:not(".concat(o,"-checkable-checked):hover")]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive}},"&-hidden":{display:"none"},["> ".concat(e.iconCls," + span, > span + ").concat(e.iconCls)]:{marginInlineStart:a}}),["".concat(o,"-borderless")]:{borderColor:"transparent",background:e.tagBorderlessBg}}},O=J("Tag",e=>{const{fontSize:c,lineHeight:t,lineWidth:n,fontSizeIcon:o}=e,a=Math.round(c*t),i=e.fontSizeSM,v=a-n*2,g=e.colorFillAlter,r=e.colorText,l=Q(e,{tagFontSize:i,tagLineHeight:v,tagDefaultBg:g,tagDefaultColor:r,tagIconSize:o-2*n,tagPaddingHorizontal:8,tagBorderlessBg:e.colorFillTertiary});return[me(l),Ce(l),y(l,"success","Success"),y(l,"processing","Info"),y(l,"error","Error"),y(l,"warning","Warning")]}),ye=()=>({prefixCls:String,checked:{type:Boolean,default:void 0},onChange:{type:Function},onClick:{type:Function},"onUpdate:checked":Function}),k=_({compatConfig:{MODE:3},name:"ACheckableTag",inheritAttrs:!1,props:ye(),setup(e,c){let{slots:t,emit:n,attrs:o}=c;const{prefixCls:a}=A("tag",e),[i,v]=O(a),g=l=>{const{checked:s}=e;n("update:checked",!s),n("change",!s),n("click",l)},r=B(()=>E(a.value,v.value,{["".concat(a.value,"-checkable")]:!0,["".concat(a.value,"-checkable-checked")]:e.checked}));return()=>{var l;return i(u("span",S(S({},o),{},{class:[r.value,o.class],onClick:g}),[(l=t.default)===null||l===void 0?void 0:l.call(t)]))}}}),Se=()=>({prefixCls:String,color:{type:String},closable:{type:Boolean,default:!1},closeIcon:N.any,visible:{type:Boolean,default:void 0},onClose:{type:Function},onClick:ne(),"onUpdate:visible":Function,icon:N.any,bordered:{type:Boolean,default:!0}}),b=_({compatConfig:{MODE:3},name:"ATag",inheritAttrs:!1,props:Se(),slots:Object,setup(e,c){let{slots:t,emit:n,attrs:o}=c;const{prefixCls:a,direction:i}=A("tag",e),[v,g]=O(a),r=Z(!0);ee(e.visible===void 0,"Tag",'`visible` is deprecated, please use `<Tag v-show="visible" />` instead.'),oe(()=>{e.visible!==void 0&&(r.value=e.visible)});const l=d=>{d.stopPropagation(),n("update:visible",!1),n("close",d),!d.defaultPrevented&&e.visible===void 0&&(r.value=!1)},s=B(()=>le(e.color)||ae(e.color)),$=B(()=>E(a.value,g.value,{["".concat(a.value,"-").concat(e.color)]:s.value,["".concat(a.value,"-has-color")]:e.color&&!s.value,["".concat(a.value,"-hidden")]:!r.value,["".concat(a.value,"-rtl")]:i.value==="rtl",["".concat(a.value,"-borderless")]:!e.bordered})),R=d=>{n("click",d)};return()=>{var d,x,T;const{icon:W=(d=t.icon)===null||d===void 0?void 0:d.call(t),color:w,closeIcon:z=(x=t.closeIcon)===null||x===void 0?void 0:x.call(t),closable:j=!1}=e,L=()=>j?z?u("span",{class:"".concat(a.value,"-close-icon"),onClick:l},[z]):u(se,{class:"".concat(a.value,"-close-icon"),onClick:l},null):null,U={backgroundColor:w&&!s.value?w:void 0},V=W||null,H=(T=t.default)===null||T===void 0?void 0:T.call(t),X=V?u(P,null,[V,u("span",null,[H])]):H,K=e.onClick!==void 0,F=u("span",S(S({},o),{},{onClick:R,class:[$.value,o.class],style:[U,o.style]}),[X,L()]);return v(K?u(te,null,{default:()=>[F]}):F)}}});b.CheckableTag=k;b.install=function(e){return e.component(b.name,b),e.component(k.name,k),e};const $e={class:"flex"},xe={key:0},Te=_({__name:"PropertyTag",props:{items:{type:Array,default:()=>[]},disabled:{type:Boolean,default:!1}},emits:["update:items"],setup(e,{emit:c}){const t=re(),n=e;ce(()=>n.items,r=>{o.tags=r});const o=ie({tags:n.items,inputVisible:!1,inputValue:""}),a=c,i=r=>{const l=o.tags.filter(s=>s!==r);a("update:items",l)},v=()=>{o.inputVisible=!0,be(()=>{t.value.focus()})},g=()=>{const r=o.inputValue;let l=o.tags;r&&l.indexOf(r)===-1&&(l=[...l,{label:r,value:r}]),a("update:items",l),Object.assign(o,{inputVisible:!1,inputValue:""})};return(r,l)=>(p(),f("div",$e,[(p(!0),f(P,null,de(o.tags,s=>(p(),f(P,{key:s},[s.label.length>20?(p(),C(h(ue),{key:0,title:s.label},{default:m(()=>[u(h(b),{closable:!e.disabled&&o.tags.length!==1,class:"py-1 px-4",onClose:$=>i(s)},{default:m(()=>[I(M("".concat(s.label.slice(0,20),"...")),1)]),_:2},1032,["closable","onClose"])]),_:2},1032,["title"])):(p(),C(h(b),{key:1,class:"py-1 px-4",closable:!e.disabled&&o.tags.length!==1,onClose:$=>i(s)},{default:m(()=>[I(M(s.label),1)]),_:2},1032,["closable","onClose"]))],64))),128)),e.disabled?ve("",!0):(p(),f("div",xe,[o.inputVisible?(p(),C(h(pe),{key:0,ref_key:"inputRef",ref:t,value:o.inputValue,"onUpdate:value":l[0]||(l[0]=s=>o.inputValue=s),type:"text",size:"small",style:{width:"78px",height:"30px",minHeight:"30px !important"},onBlur:g,onKeyup:ge(g,["enter"])},null,8,["value"])):(p(),C(h(b),{key:1,class:"py-1 px-4",style:{background:"#fff","border-style":"dashed"},onClick:v},{default:m(()=>[u(h(fe)),I(" New Tag ")]),_:1}))]))]))}}),Pe=he(Te,[["__file","E:/deloitte_project/bruno/cms-front-end/src/views/product/components/PropertyTag.vue"]]);export{Pe as default};
