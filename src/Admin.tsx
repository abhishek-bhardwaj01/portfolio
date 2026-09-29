import { useEffect, useState, useCallback } from "react";
import type { CMSData } from "./cms/types";
import { defaultCMS } from "./cms/defaults";

const REPO = "abhishek-bhardwaj01/portfolio";
const CMS_PATH = "public/content/cms.json";
type Sid = "dashboard"|"site"|"seo"|"navigation"|"socials"|"hero"|"stats"|"about"|"projects"|"skills"|"experience"|"cta"|"contact"|"footer";
const NAV: {id:Sid;label:string}[] = [
  {id:"dashboard",label:"Dashboard"},{id:"site",label:"Site"},{id:"seo",label:"SEO"},
  {id:"navigation",label:"Nav"},{id:"socials",label:"Socials"},{id:"hero",label:"Hero"},
  {id:"stats",label:"Stats"},{id:"about",label:"About"},{id:"projects",label:"Projects"},
  {id:"skills",label:"Skills"},{id:"experience",label:"Experience"},{id:"cta",label:"CTA"},
  {id:"contact",label:"Contact"},{id:"footer",label:"Footer"},
];
const ic = "w-full rounded-lg border border-white/10 bg-[#0b0f19] px-3.5 py-2.5 text-sm text-white outline-none focus:border-blue-500";
const lb = "mb-1.5 block text-xs font-medium text-white/50";
const btn = "rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50";
function F({label,children}:{label:string;children:React.ReactNode}){return <div><label className={lb}>{label}</label>{children}</div>;}
function C({title,children}:{title:string;children:React.ReactNode}){return <div className="rounded-xl border border-white/8 bg-[#121826] p-6"><h2 className="mb-5 text-base font-semibold text-white">{title}</h2><div className="space-y-4">{children}</div></div>;}

export default function Admin(){
  const [token,setToken]=useState<string|null>(null);
  const [user,setUser]=useState<{login?:string}|null>(null);
  const [section,setSection]=useState<Sid>("dashboard");
  const [cms,setCms]=useState<CMSData>(defaultCMS);
  const [loaded,setLoaded]=useState(false);
  const [saving,setSaving]=useState(false);
  const [message,setMessage]=useState("");

  useEffect(()=>{
    const p=new URLSearchParams(window.location.search);
    const t=p.get("token");
    if(t){localStorage.setItem("gh_token",t);setToken(t);window.history.replaceState({},"","/admin");}
    else{const s=localStorage.getItem("gh_token");if(s)setToken(s);}
  },[]);
  useEffect(()=>{
    if(!token)return;
    fetch("https://api.github.com/user",{headers:{Authorization:`Bearer ${token}`}})
      .then(r=>r.json()).then(u=>{if(u.login)setUser(u);else{localStorage.removeItem("gh_token");setToken(null);}})
      .catch(()=>{localStorage.removeItem("gh_token");setToken(null);});
  },[token]);
  useEffect(()=>{
    fetch("/content/cms.json",{cache:"no-store"}).then(r=>r.ok?r.json():null)
      .then(j=>{if(j)setCms({...defaultCMS,...j,site:{...defaultCMS.site,...j.site}});setLoaded(true);})
      .catch(()=>setLoaded(true));
  },[]);

  const patch=<K extends keyof CMSData>(k:K,v:CMSData[K])=>setCms(p=>({...p,[k]:v}));
  const publish=useCallback(async()=>{
    if(!token)return;setSaving(true);setMessage("");
    try{
      const get=await fetch(`https://api.github.com/repos/${REPO}/contents/${CMS_PATH}`,{headers:{Authorization:`Bearer ${token}`}});
      let sha:string|undefined;if(get.ok)sha=(await get.json()).sha;
      const content=btoa(unescape(encodeURIComponent(JSON.stringify(cms,null,2))));
      const put=await fetch(`https://api.github.com/repos/${REPO}/contents/${CMS_PATH}`,{
        method:"PUT",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},
        body:JSON.stringify({message:"CMS: update via admin",content,sha,branch:"main"}),
      });
      setMessage(put.ok?"Published! Site updates in 1-2 min.":"Publish failed.");
    }catch(e){setMessage(e instanceof Error?e.message:"Error");}
    setSaving(false);
  },[token,cms]);

  if(!token||!user)return(
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121826] p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">AB</div>
        <h1 className="text-2xl font-bold text-white">Portfolio CMS</h1>
        <p className="mt-2 text-sm text-white/50">Login with GitHub to manage content</p>
        <button onClick={()=>window.location.href="/api/auth/login"} className="mt-8 w-full rounded-xl bg-white px-6 py-3.5 font-semibold text-black">Login with GitHub</button>
      </div>
    </div>
  );
  if(!loaded)return <div className="flex min-h-screen items-center justify-center bg-[#0b0f19]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"/></div>;

  return(
    <div className="flex min-h-screen bg-[#0b0f19] text-white">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-48 flex-col border-r border-white/8 bg-[#121826]">
        <div className="flex items-center gap-2 px-4 py-5"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold">AB</div><span className="text-sm font-semibold">CMS</span></div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-4">
          {NAV.map(i=><button key={i.id} onClick={()=>setSection(i.id)} className={`w-full rounded-lg px-3 py-2 text-left text-sm ${section===i.id?"bg-white/10 text-white":"text-white/50 hover:bg-white/5"}`}>{i.label}</button>)}
        </nav>
        <div className="border-t border-white/8 p-3">
          <p className="mb-1 truncate text-xs text-white/40">@{user.login}</p>
          <button onClick={()=>{localStorage.removeItem("gh_token");setToken(null);setUser(null);}} className="text-sm text-red-400">Logout</button>
        </div>
      </aside>
      <div className="ml-48 flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/8 bg-[#0b0f19]/90 px-6 py-4 backdrop-blur">
          <h1 className="text-lg font-semibold capitalize">{section}</h1>
          <button onClick={publish} disabled={saving} className={btn}>{saving?"Publishing...":"Publish"}</button>
        </header>
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {message&&<div className="mb-4 rounded-lg border border-white/10 bg-[#121826] px-4 py-3 text-sm">{message}</div>}
          {section==="dashboard"&&(
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[["Projects",cms.projects.items.length],["Skills",cms.skills.items.length],["Experience",cms.experience.items.length],["Stats",cms.stats.length]].map(([l,v])=>(
                <div key={String(l)} className="rounded-xl border border-white/8 bg-[#121826] p-5"><p className="text-3xl font-bold">{v}</p><p className="mt-1 text-sm text-white/45">{l}</p></div>
              ))}
              <div className="sm:col-span-2 rounded-xl border border-white/8 bg-[#121826] p-5 text-sm text-white/50">Edit any section then Publish. Saves to GitHub, Vercel redeploys in 1-2 min.</div>
            </div>
          )}
          {section==="site"&&(
            <C title="Site Settings">
              <div className="grid gap-4 sm:grid-cols-2">
                <F label="Site Name"><input className={ic} value={cms.site.siteName} onChange={e=>patch("site",{...cms.site,siteName:e.target.value})}/></F>
                <F label="Logo"><input className={ic} value={cms.site.logoText} onChange={e=>patch("site",{...cms.site,logoText:e.target.value})}/></F>
                <F label="Tagline"><input className={ic} value={cms.site.tagline} onChange={e=>patch("site",{...cms.site,tagline:e.target.value})}/></F>
                <F label="Email"><input className={ic} value={cms.site.email} onChange={e=>patch("site",{...cms.site,email:e.target.value})}/></F>
                <F label="Phone"><input className={ic} value={cms.site.phone} onChange={e=>patch("site",{...cms.site,phone:e.target.value})}/></F>
                <F label="Location"><input className={ic} value={cms.site.location} onChange={e=>patch("site",{...cms.site,location:e.target.value})}/></F>
              </div>
              <F label="Navbar CTA"><input className={ic} value={cms.site.navCta?.text||""} onChange={e=>patch("site",{...cms.site,navCta:{text:e.target.value,url:cms.site.navCta?.url||"#contact",openInNewTab:false,enabled:true}})}/></F>
              <F label="Resume text"><textarea className={ic} rows={5} value={cms.site.resumeText} onChange={e=>patch("site",{...cms.site,resumeText:e.target.value})}/></F>
            </C>
          )}
          {section==="seo"&&(
            <C title="SEO">
              <F label="Title"><input className={ic} value={cms.site.seoTitle} onChange={e=>patch("site",{...cms.site,seoTitle:e.target.value})}/></F>
              <F label="Description"><textarea className={ic} rows={3} value={cms.site.seoDescription} onChange={e=>patch("site",{...cms.site,seoDescription:e.target.value})}/></F>
              <F label="OG Image"><input className={ic} value={cms.site.ogImage} onChange={e=>patch("site",{...cms.site,ogImage:e.target.value})}/></F>
            </C>
          )}
          {section==="navigation"&&(
            <C title="Navigation">
              {cms.navigation.map((item,idx)=>(
                <div key={item.id} className="grid gap-2 sm:grid-cols-3">
                  <input className={ic} value={item.label} onChange={e=>{const n=[...cms.navigation];n[idx]={...item,label:e.target.value};patch("navigation",n);}}/>
                  <input className={ic} value={item.href} onChange={e=>{const n=[...cms.navigation];n[idx]={...item,href:e.target.value};patch("navigation",n);}}/>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={item.enabled} onChange={e=>{const n=[...cms.navigation];n[idx]={...item,enabled:e.target.checked};patch("navigation",n);}}/> On</label>
                </div>
              ))}
            </C>
          )}
          {section==="socials"&&(
            <C title="Socials">
              {cms.socials.map((item,idx)=>(
                <div key={item.id} className="grid gap-2 sm:grid-cols-3">
                  <input className={ic} value={item.label} onChange={e=>{const n=[...cms.socials];n[idx]={...item,label:e.target.value};patch("socials",n);}}/>
                  <input className={ic} value={item.url} onChange={e=>{const n=[...cms.socials];n[idx]={...item,url:e.target.value};patch("socials",n);}}/>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={item.enabled} onChange={e=>{const n=[...cms.socials];n[idx]={...item,enabled:e.target.checked};patch("socials",n);}}/> On</label>
                </div>
              ))}
            </C>
          )}
          {section==="hero"&&(
            <C title="Hero">
              <F label="Greeting"><input className={ic} value={cms.hero.greeting} onChange={e=>patch("hero",{...cms.hero,greeting:e.target.value})}/></F>
              <F label="Line 1"><input className={ic} value={cms.hero.headlineLine1} onChange={e=>patch("hero",{...cms.hero,headlineLine1:e.target.value})}/></F>
              <F label="Highlight"><input className={ic} value={cms.hero.headlineHighlight} onChange={e=>patch("hero",{...cms.hero,headlineHighlight:e.target.value})}/></F>
              <F label="Line 2"><input className={ic} value={cms.hero.headlineLine2} onChange={e=>patch("hero",{...cms.hero,headlineLine2:e.target.value})}/></F>
              <F label="Description"><textarea className={ic} rows={3} value={cms.hero.description} onChange={e=>patch("hero",{...cms.hero,description:e.target.value})}/></F>
              <F label="Image"><input className={ic} value={cms.hero.image} onChange={e=>patch("hero",{...cms.hero,image:e.target.value})}/></F>
              <F label="Tools (comma)"><input className={ic} value={cms.hero.tools.join(", ")} onChange={e=>patch("hero",{...cms.hero,tools:e.target.value.split(",").map(t=>t.trim()).filter(Boolean)})}/></F>
            </C>
          )}
          {section==="stats"&&(
            <C title="Stats">
              {cms.stats.map((s,idx)=>(
                <div key={s.id} className="grid gap-2 sm:grid-cols-2">
                  <input className={ic} value={s.value} onChange={e=>{const n=[...cms.stats];n[idx]={...s,value:e.target.value};patch("stats",n);}}/>
                  <input className={ic} value={s.label} onChange={e=>{const n=[...cms.stats];n[idx]={...s,label:e.target.value};patch("stats",n);}}/>
                </div>
              ))}
            </C>
          )}
          {section==="about"&&(
            <C title="About">
              <F label="Badge"><input className={ic} value={cms.about.badge} onChange={e=>patch("about",{...cms.about,badge:e.target.value})}/></F>
              <F label="Heading"><input className={ic} value={cms.about.heading} onChange={e=>patch("about",{...cms.about,heading:e.target.value})}/></F>
              <F label="Paragraphs"><textarea className={ic} rows={4} value={cms.about.paragraphs.join("\n")} onChange={e=>patch("about",{...cms.about,paragraphs:e.target.value.split("\n").filter(Boolean)})}/></F>
              <F label="Image"><input className={ic} value={cms.about.image} onChange={e=>patch("about",{...cms.about,image:e.target.value})}/></F>
            </C>
          )}
          {section==="projects"&&(
            <div className="space-y-4">
              <C title="Projects section">
                <F label="Badge"><input className={ic} value={cms.projects.badge} onChange={e=>patch("projects",{...cms.projects,badge:e.target.value})}/></F>
                <F label="Heading"><input className={ic} value={cms.projects.heading} onChange={e=>patch("projects",{...cms.projects,heading:e.target.value})}/></F>
              </C>
              <button className={btn} onClick={()=>patch("projects",{...cms.projects,items:[...cms.projects.items,{id:"p"+Date.now(),title:"New",shortDescription:"",fullDescription:"",category:"uiux",type:"",image:"",imageAlt:"",gallery:[],tags:[],technologies:[],liveUrl:"",githubUrl:"",client:"",date:"",featured:false,published:true,order:cms.projects.items.length}]})}>+ Add Project</button>
              {cms.projects.items.map((p,idx)=>(
                <C key={p.id} title={p.title}>
                  <F label="Title"><input className={ic} value={p.title} onChange={e=>{const items=[...cms.projects.items];items[idx]={...p,title:e.target.value};patch("projects",{...cms.projects,items});}}/></F>
                  <F label="Category"><input className={ic} value={p.category} onChange={e=>{const items=[...cms.projects.items];items[idx]={...p,category:e.target.value};patch("projects",{...cms.projects,items});}}/></F>
                  <F label="Image"><input className={ic} value={p.image} onChange={e=>{const items=[...cms.projects.items];items[idx]={...p,image:e.target.value};patch("projects",{...cms.projects,items});}}/></F>
                  <F label="Description"><textarea className={ic} rows={2} value={p.fullDescription} onChange={e=>{const items=[...cms.projects.items];items[idx]={...p,fullDescription:e.target.value};patch("projects",{...cms.projects,items});}}/></F>
                  <F label="Tags"><input className={ic} value={p.tags.join(", ")} onChange={e=>{const items=[...cms.projects.items];items[idx]={...p,tags:e.target.value.split(",").map(t=>t.trim()).filter(Boolean)};patch("projects",{...cms.projects,items});}}/></F>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.published} onChange={e=>{const items=[...cms.projects.items];items[idx]={...p,published:e.target.checked};patch("projects",{...cms.projects,items});}}/> Published</label>
                  <button className="text-xs text-red-400" onClick={()=>patch("projects",{...cms.projects,items:cms.projects.items.filter(x=>x.id!==p.id)})}>Delete</button>
                </C>
              ))}
            </div>
          )}
          {section==="skills"&&(
            <C title="Skills">
              <F label="Heading"><input className={ic} value={cms.skills.heading} onChange={e=>patch("skills",{...cms.skills,heading:e.target.value})}/></F>
              {cms.skills.items.map((s,idx)=>(
                <div key={s.id} className="flex gap-2">
                  <input className={ic} value={s.name} onChange={e=>{const items=[...cms.skills.items];items[idx]={...s,name:e.target.value};patch("skills",{...cms.skills,items});}}/>
                  <button className="text-xs text-red-400" onClick={()=>patch("skills",{...cms.skills,items:cms.skills.items.filter(x=>x.id!==s.id)})}>X</button>
                </div>
              ))}
              <button className={btn} onClick={()=>patch("skills",{...cms.skills,items:[...cms.skills.items,{id:"sk"+Date.now(),name:"New",category:"Design",color:"#888",icon:"",enabled:true,order:cms.skills.items.length}]})}>+ Add</button>
            </C>
          )}
          {section==="experience"&&(
            <C title="Experience">
              {cms.experience.items.map((exp,idx)=>(
                <div key={exp.id} className="space-y-2 border-b border-white/10 pb-4">
                  <input className={ic} value={exp.title} onChange={e=>{const items=[...cms.experience.items];items[idx]={...exp,title:e.target.value};patch("experience",{...cms.experience,items});}}/>
                  <input className={ic} value={exp.period} onChange={e=>{const items=[...cms.experience.items];items[idx]={...exp,period:e.target.value};patch("experience",{...cms.experience,items});}}/>
                  <textarea className={ic} rows={2} value={exp.description} onChange={e=>{const items=[...cms.experience.items];items[idx]={...exp,description:e.target.value};patch("experience",{...cms.experience,items});}}/>
                </div>
              ))}
            </C>
          )}
          {section==="cta"&&(
            <C title="CTA">
              <F label="Heading"><input className={ic} value={cms.cta.heading} onChange={e=>patch("cta",{...cms.cta,heading:e.target.value})}/></F>
              <F label="Description"><input className={ic} value={cms.cta.description} onChange={e=>patch("cta",{...cms.cta,description:e.target.value})}/></F>
              <F label="Button"><input className={ic} value={cms.cta.button.text} onChange={e=>patch("cta",{...cms.cta,button:{...cms.cta.button,text:e.target.value}})}/></F>
            </C>
          )}
          {section==="contact"&&(
            <C title="Contact">
              <F label="Heading"><input className={ic} value={cms.contact.heading} onChange={e=>patch("contact",{...cms.contact,heading:e.target.value})}/></F>
              <F label="Highlight"><input className={ic} value={cms.contact.headingHighlight} onChange={e=>patch("contact",{...cms.contact,headingHighlight:e.target.value})}/></F>
              <F label="Description"><textarea className={ic} rows={2} value={cms.contact.description} onChange={e=>patch("contact",{...cms.contact,description:e.target.value})}/></F>
              <F label="Submit text"><input className={ic} value={cms.contact.submitText} onChange={e=>patch("contact",{...cms.contact,submitText:e.target.value})}/></F>
              <F label="Success msg"><input className={ic} value={cms.contact.successMessage} onChange={e=>patch("contact",{...cms.contact,successMessage:e.target.value})}/></F>
            </C>
          )}
          {section==="footer"&&(
            <C title="Footer">
              <F label="Copyright"><input className={ic} value={cms.footer.copyright} onChange={e=>patch("footer",{...cms.footer,copyright:e.target.value})}/></F>
            </C>
          )}
        </main>
      </div>
    </div>
  );
}
