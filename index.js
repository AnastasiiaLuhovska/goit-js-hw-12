import{a as L,b as w,S as O,i as m}from"./assets/vendor-COdsPqSE.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const f=async(s,e)=>{const{data:a}=await L.get("https://pixabay.com/api/",{params:{key:"49325952-cafcda966d997e584839964e4",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}});return a},S=({webformatURL:s,largeImageURL:e,tags:a,likes:i,views:t,comments:r,downloads:c})=>{const h=a.split(",").filter((y,b,v)=>b===v.indexOf(y)).join(",");return`<li>
      <a class ="link" href="${e}">
          <img class="image" src = "${s}" alt="${h}"/>
          <div class= "wrapper">
              <div class ="container">
                  <p>Likes</p>
                  <p class="numbers">${i}</p>
              </div>
              <div class ="container">
                  <p>Views</p>
                  <p class="numbers">${t}</p>
              </div>
               <div class ="container">
                  <p>Comments</p>
                  <p class="numbers">${r}</p>
              </div>
              <div class ="container">
                  <p>Downloads</p>
                  <p class="numbers">${c}</p>
              </div>
          </div>
      </a>
</li>`},d=w.create('<span class="loader"></span>'),x=new O(".link",{captionsData:"alt"}),g=s=>{const e=s.map(a=>S(a)).join("");o.gallery.insertAdjacentHTML("beforeend",e),x.refresh()},o={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),button:document.querySelector(".load-more")};let n=1,l="",p,u;const q=async s=>{if(s.preventDefault(),l=s.target.elements["search-text"].value.trim(),!!l){s.target.reset(),d.show(),n=1,o.gallery.innerHTML="";try{const{hits:e,total:a}=await f(l,n);if(p=a,u=Math.ceil(p/15),e.length===0){o.button.classList.add("is-hidden"),m.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}g(e),o.button.classList.remove("is-hidden"),u===n&&o.button.classList.add("is-hidden")}catch(e){console.log(e.message)}finally{d.close()}}},P=async s=>{n++,d.show();try{const{hits:e}=await f(l,n);g(e);const i=o.gallery.children[o.gallery.children.length-1].getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"}),u===n&&(o.button.classList.add("is-hidden"),m.info({message:`We're sorry, but you've reached the end of search results.
`}))}catch(e){console.log(e.message)}finally{d.close()}};o.form.addEventListener("submit",q);o.button.addEventListener("click",P);
//# sourceMappingURL=index.js.map
