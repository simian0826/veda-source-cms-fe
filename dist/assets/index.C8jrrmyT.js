import{k as o}from"./index.owl8yoTw.js";var n=(e=>(e.Upload="/storage/uploadFile",e.AntUpload="/veda-source/storage/uploadFileByAntd",e.FindHeroSection="/heroSection/findHeroSections",e.CreateHero="/heroSection/create",e.UpdateHero="/heroSection/update",e.GetHomePage="/generalConfig/findHomePage",e.UpdateHomePage="/generalConfig/updateHomePage",e.GetAboutUs="/generalConfig/findAboutUsPage",e.UpdateAboutUs="/generalConfig/updateAboutUsPage",e.GetBasicInfo="/generalConfig/findBasicInfo",e.UpdateBasicInfo="/generalConfig/updateBasicInfo",e))(n||{});const t=async()=>o.get({url:"/heroSection/findHeroSections"}),r=async e=>o.post({url:"/heroSection/update",params:e}),s=async()=>o.get({url:"/generalConfig/findHomePage"}),g=async e=>o.post({url:"/generalConfig/updateHomePage",params:e}),u=async()=>o.get({url:"/generalConfig/findBasicInfo"}),i=async e=>o.post({url:"/generalConfig/updateBasicInfo",params:e}),c=async()=>o.get({url:"/generalConfig/findAboutUsPage"}),d=async e=>o.post({url:"/generalConfig/updateAboutUsPage",params:e});export{n as A,u as a,c as b,i as c,d,t as e,r as f,s as g,g as u};