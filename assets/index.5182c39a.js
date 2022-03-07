var te=Object.defineProperty,oe=Object.defineProperties;var se=Object.getOwnPropertyDescriptors;var G=Object.getOwnPropertySymbols;var Ae=Object.prototype.hasOwnProperty,ie=Object.prototype.propertyIsEnumerable;var O=(e,t,o)=>t in e?te(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,B=(e,t)=>{for(var o in t||(t={}))Ae.call(t,o)&&O(e,o,t[o]);if(G)for(var o of G(t))ie.call(t,o)&&O(e,o,t[o]);return e},U=(e,t)=>oe(e,se(t));import{n as T,M as J,L as V,p as q,c as ne,i as X,W as re,R as de,C as j,a as k,b as le,d as ge,B as ae}from"./vendor.fbc2f82b.js";const ue=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))A(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&A(u)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerpolicy&&(n.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?n.credentials="include":s.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function A(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}};ue();class ce extends Error{constructor(t){let o=t.action?t.action.type:"action";super(`Server undid ${o} because of ${t.reason}`);this.name="LoguxUndoError",this.action=t}}function fe(e,t){if(e.processing[t])return e.processing[t][0];let o,A,s=new Promise((n,u)=>{o=n,A=u});return e.processing[t]=[s,o,A],s}function W(e,t,o={}){let A=e.on?e:e.node,s=A.state==="disconnected",n=!1,u=!1;typeof o.duration=="undefined"&&(o.duration=3e3);let a,i=[],c={};function l(){Object.keys(c).length===0&&(n?(n=!1,t("synchronizedAfterWait"),a=setTimeout(()=>{t("synchronized")},o.duration)):t("synchronized"))}function r(){clearTimeout(a),!u&&(A.state==="disconnected"?(s=!0,t(n?"wait":"disconnected")):A.state==="synchronized"?(s=!1,l()):A.state==="connecting"?a=setTimeout(()=>{t("connecting"+(n?"AfterWait":""))},100):t(e.state+(n?"AfterWait":"")))}i.push(A.on("state",r)),i.push(e.node.on("error",g=>{g.type==="wrong-protocol"||g.type==="wrong-subprotocol"?(u=!0,t("protocolError")):g.type!=="timeout"&&t("syncError",{error:g})})),i.push(e.node.on("clientError",g=>{t("syncError",{error:g})}));let d=e.on?e:e.log;return i.push(d.on("add",(g,h)=>{g.type!=="logux/subscribe"&&g.type!=="logux/unsubscribe"&&(g.type==="logux/processed"?(delete c[g.id],l()):g.type==="logux/undo"?delete c[g.id]:h.sync&&(c[h.id]=!0),g.type==="logux/undo"&&g.reason?g.reason==="denied"?t("denied",{action:g,meta:h}):t("error",{action:g,meta:h}):s&&h.sync&&h.added&&(n||t("wait"),n=!0))})),r(),()=>{for(let g of i)g()}}function w(e,t){for(let o in t)e.style[o]=t[o]}function he(e,t){let o=e.style;t==="middle-center"||t==="center-middle"?(o.top="50%",o.left="50%",o.transform="translate(-50%, -50%)"):t.split("-").forEach(A=>{A==="middle"?(o.top="50%",o.transform="translateY(-50%)"):A==="center"?(o.left="50%",o.transform="translateX(-50%)"):o[A]="0"})}const pe={boxSizing:"content-box",visibility:"visible",textIndent:"0",textTransform:"none",wordSpacing:"normal",letterSpacing:"normal",fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",lineHeight:"auto"};function be(e,t){let o=t.messages,A=t.position||"bottom-right",s=t.styles,n=document.createElement("div"),u=document.createElement("span");n.setAttribute("role","alert"),w(n,pe),w(n,s.base),w(u,s.text),he(n,A);let a=(l,r)=>{u.innerHTML=r,w(n,l),n.style.display="block"},i=()=>{n.style.display="none"},c=W(e,l=>{l==="sendingAfterWait"||l==="connectingAfterWait"?a(s.sending,o.sending):l==="synchronizedAfterWait"?a(s.synchronized,o.synchronized):l==="synchronized"?i():l==="disconnected"?a(s.disconnected,o.disconnected):l==="wait"?a(s.wait,o.wait):l==="protocolError"?a(s.protocolError,o.protocolError):l==="syncError"?a(s.error,o.syncError):l==="error"?a(s.error,o.error):l==="denied"&&a(s.error,o.denied)},t);return n.appendChild(u),document.body.appendChild(n),()=>{c(),document.body.removeChild(n)}}let Ie={synchronized:"Your data has been saved",disconnected:"No Internet connection",wait:"No Internet connection<br>Your data has not been saved",sending:"Data saving",syncError:"Server error<br>Your data has not been saved",error:"Server error<br>You changes was reverted",denied:"You have no access<br>You changes was reverted",protocolError:"Saving is not working<br>Refresh the page"},me=["id","time","subprotocol"];function N(e){localStorage.setItem(e.options.prefix+":tab:"+e.tabId,Date.now())}function P(e,t){e.log.removeReason("tab"+t).then(()=>{e.isLocalStorage&&localStorage.removeItem(e.options.prefix+":tab:"+t)})}class ye{constructor(t={}){if(this.options=t,typeof this.options.prefix=="undefined"&&(this.options.prefix="logux"),this.isLocalStorage=!1,typeof localStorage!="undefined"){let r=T();try{localStorage.setItem(r,"1"),localStorage.removeItem(r),this.isLocalStorage=!0}catch{}}this.options.time?(this.tabId=this.options.time.lastId+1+"",this.clientId=this.options.userId+":"+this.tabId):(this.clientId=this.options.userId+":"+this.getClientId(),this.tabId=T(8)),this.nodeId=this.clientId+":"+this.tabId;let o=this.options.store||new J,A;this.options.time?A=this.options.time.nextLog({store:o,nodeId:this.nodeId}):A=new V({store:o,nodeId:this.nodeId}),this.log=A,A.on("preadd",(r,d)=>{q(d.id).nodeId===this.nodeId&&!d.subprotocol&&(d.subprotocol=this.options.subprotocol),d.sync&&!d.resubscribe&&d.reasons.push("syncing")}),this.last={},this.subscriptions={};let s={},n={};this.emitter=ne(),this.on("add",(r,d)=>{let g=r.type,h,D;if((g==="logux/processed"||g==="logux/undo")&&this.log.removeReason("syncing",{id:r.id}),g==="logux/subscribe"&&!d.resubscribe)s[d.id]=r;else if(g==="logux/unsubscribe")n[d.id]=r;else if(g==="logux/processed"){if(n[r.id]){let m=n[r.id];h=JSON.stringify(U(B({},m),{type:"logux/subscribe"}));let x=this.subscriptions[h];x&&(x===1?delete this.subscriptions[h]:this.subscriptions[h]=x-1)}if(s[r.id]){let m=s[r.id];delete s[r.id],h=JSON.stringify(m),this.subscriptions[h]?this.subscriptions[h]+=1:this.subscriptions[h]=1,D=this.last[m.channel],(!D||X(D,d))&&(this.last[m.channel]={id:d.id,time:d.time})}g==="logux/processed"&&this.processing[r.id]&&(this.processing[r.id][1](d),delete this.processing[r.id])}else g==="logux/undo"?(this.processing[r.id]&&(this.processing[r.id][2](new ce(r)),delete this.processing[r.id]),delete s[r.id],delete n[r.id]):d.channels&&(d.id.includes(" "+this.clientId+":")||d.channels.forEach(m=>{D=this.last[m],(!D||X(D,d))&&(this.last[m]={id:d.id,time:d.time})}))}),this.tabPing=6e4,this.tabTimeout=10*this.tabPing;let u="tab"+this.tabId;if(this.isLocalStorage){let r=A.on("add",(d,g)=>{g.reasons.includes(u)&&(N(this),this.pinging=setInterval(()=>{N(this)},this.tabPing),r())})}let a;if(typeof this.options.server=="string"){let r=new re(this.options.server);a=new de(r,{minDelay:this.options.minDelay,maxDelay:this.options.maxDelay,attempts:this.options.attempts})}else a=this.options.server;let i=async(r,d)=>!!d.sync&&q(d.id).userId===this.options.userId,c=async(r,d)=>{let g={};for(let h in d)h==="subprotocol"?d.subprotocol!==this.options.subprotocol&&(g.subprotocol=d.subprotocol):me.includes(h)&&(g[h]=d[h]);return[r,g]};if(this.options.time||(typeof this.options.timeout=="undefined"&&(this.options.timeout=2e4),typeof this.options.ping=="undefined"&&(this.options.ping=5e3)),this.node=new j(this.nodeId,this.log,a,{subprotocol:this.options.subprotocol,outFilter:i,timeout:this.options.timeout,fixTime:!this.options.time,outMap:c,token:this.options.token,ping:this.options.ping}),/^ws:\/\//.test(this.options.server)&&!t.allowDangerousProtocol){let r=this.node.on("state",()=>{this.node.state==="synchronized"&&(r(),this.node.remoteHeaders.env!=="development"&&(console.error("Without SSL, old proxies block WebSockets. Use WSS for Logux or set allowDangerousProtocol option."),this.destroy()))})}this.node.on("debug",(r,d)=>{r==="error"&&console.error(`Error on Logux server:
`,d)});let l=!0;this.node.on("state",()=>{let r=this.node.state;if(r==="synchronized"||r==="sending"){if(l){l=!1;for(let d in this.subscriptions){let g=JSON.parse(d),h=this.last[g.channel];h&&(g.since=h),this.log.add(g,{sync:!0,resubscribe:!0})}}}else this.node.state==="disconnected"&&(l=!0)}),this.onUnload=this.onUnload.bind(this),typeof window!="undefined"&&window.addEventListener&&window.addEventListener("unload",this.onUnload),this.processing={}}get state(){return this.node.state}get connected(){return this.state!=="disconnected"&&this.state!=="connecting"}start(){this.cleanPrevActions(),this.node.connection.connect()}sync(t,o={}){return o.sync=!0,typeof o.id=="undefined"&&(o.id=this.log.generateId()),this.log.add(t,o),fe(this,o.id)}type(t,o,A){return typeof t=="function"&&(t=t.type),this.log.type(t,o,A)}on(t,o){return t==="state"?this.node.emitter.on(t,o):t==="user"?this.emitter.on(t,o):this.log.emitter.on(t,o)}changeUser(t,o){let A=this.node.connected;A&&this.node.connection.disconnect("destroy"),this.options.userId=t,this.options.token=o,this.clientId=t+":"+this.getClientId(),this.nodeId=this.clientId+":"+this.tabId,this.log.nodeId=this.nodeId,this.node.localNodeId=this.nodeId,this.node.options.token=o,this.emitter.emit("user",t),A&&this.node.connection.connect()}waitFor(t){return this.state===t?Promise.resolve():new Promise(o=>{let A=this.on("state",()=>{this.state===t&&(A(),o())})})}destroy(){this.onUnload(),this.node.destroy(),clearInterval(this.pinging),typeof window!="undefined"&&window.removeEventListener&&window.removeEventListener("unload",this.onUnload)}clean(){return this.destroy(),this.log.store.clean?this.log.store.clean():Promise.resolve()}cleanPrevActions(){if(!!this.isLocalStorage)for(let t in localStorage){let o=this.options.prefix+":tab:";if(t.slice(0,o.length)===o){let A=parseInt(localStorage.getItem(t));Date.now()-A>this.tabTimeout&&P(this,t.slice(o.length))}}}onUnload(){this.pinging&&P(this,this.tabId)}getClientId(){return T(8)}}function p(e,t){return e.options.prefix+":"+e.options.userId+":"+t}function y(e,t,o){if(!e.isLocalStorage)return;let A=p(e,t),s=JSON.stringify(o);try{localStorage.setItem(A,s)}catch(n){console.error(n),e.isLocalStorage=!1,e.role="leader",e.emitter.emit("role"),e.node.connection.connect()}}function F(e){let t=localStorage.getItem(p(e,"leader")),o=[];return typeof t=="string"&&(o=JSON.parse(t)),o}function M(e){y(e,"leader",[e.tabId,Date.now()])}function z(e){e.state!=="disconnected"&&$(e,"disconnected"),_(e)}function v(e){clearTimeout(e.watching),e.watching=setTimeout(()=>{Z(e)?v(e):z(e)},e.roleTimeout)}function De(e,t){let o=e.split("."),A=t.split(".");for(let s=0;s<3;s++){let n=parseInt(o[s]||0),u=parseInt(A[s]||0);if(n>u)return 1;if(n<u)return-1}return 0}function C(e,t){if(e.role!==t){let o=e.node;if(e.role=t,clearTimeout(e.watching),t==="leader"?(localStorage.removeItem(p(e,"state")),e.leadership=setInterval(()=>{e.unloading||M(e)},e.leaderPing),o.connection.connect()):(clearTimeout(e.elections),clearInterval(e.leadership),o.state!=="disconnected"&&e.node.connection.disconnect()),t==="follower"){let A="disconnected",s=localStorage.getItem(p(e,"state"));s&&s!==null&&(A=JSON.parse(s)),A!==e.state&&(e.state=A,e.emitter.emit("state"))}e.emitter.emit("role")}}function Z(e){let t=F(e);return t[1]&&t[1]>=Date.now()-e.leaderTimeout}function _(e){M(e),C(e,"candidate"),e.elections=setTimeout(()=>{F(e)[0]===e.tabId?C(e,"leader"):(C(e,"follower"),v(e))},e.electionDelay)}function $(e,t){e.state=t,e.emitter.emit("state"),y(e,"state",e.state)}function Ce(e){return Array.isArray(e.entries)&&Array.isArray(e.added)}class Se extends ye{constructor(t={}){super(t);if(this.role="candidate",this.roleTimeout=3e3+Math.floor(Math.random()*1e3),this.leaderTimeout=5e3,this.leaderPing=2e3,this.electionDelay=1e3,this.leaderState=this.node.state,this.node.on("state",()=>{this.role==="leader"&&$(this,this.node.state)}),this.log.on("add",(o,A)=>{k(this.emitter,"add",o,A),A.tab!==this.tabId&&y(this,"add",[this.tabId,o,A])}),this.log.on("clean",(o,A)=>{k(this.emitter,"clean",o,A)}),typeof window!="undefined"&&window.addEventListener&&(window.addEventListener("storage",o=>this.onStorage(o)),window.addEventListener("unload",o=>this.onUnload(o))),this.isLocalStorage){let o=p(this,"subprotocol");localStorage.getItem(o)!==this.options.subprotocol&&y(this,"subprotocol",this.options.subprotocol)}}get state(){return this.leaderState}set state(t){this.leaderState=t}start(){if(this.cleanPrevActions(),!this.isLocalStorage){this.role="leader",this.emitter.emit("role"),this.node.connection.connect();return}Z(this)?(C(this,"follower"),v(this)):_(this)}destroy(){super.destroy(),clearTimeout(this.watching),clearTimeout(this.elections),clearInterval(this.leadership),typeof window!="undefined"&&window.removeEventListener&&window.removeEventListener("storage",this.onStorage)}clean(){return this.isLocalStorage&&(localStorage.removeItem(p(this,"add")),localStorage.removeItem(p(this,"state")),localStorage.removeItem(p(this,"client")),localStorage.removeItem(p(this,"leader"))),super.clean()}changeUser(t,o){y(this,"user",[this.tabId,t]),super.changeUser(t,o)}type(t,o,A={}){if(A.event==="preadd")return this.log.type(t,o,A);{let s=A.event||"add",n=A.id||"";return this.emitter.on(`${s}-${t}-${n}`,o)}}on(t,o){return t==="preadd"?this.log.emitter.on(t,o):this.emitter.on(t,o)}onStorage(t){if(t.newValue===null)return;let o;if(t.key===p(this,"add")){if(o=JSON.parse(t.newValue),o[0]!==this.tabId){let A=o[1],s=o[2];(!s.tab||s.tab===this.tabId)&&(Ce(this.log.store)&&this.log.store.add(A,s),k(this.emitter,"add",A,s),this.role==="leader"&&this.node.onAdd(A,s))}}else if(t.key===p(this,"leader"))o=JSON.parse(t.newValue),o.length===0?z(this):o[0]!==this.tabId&&this.role!=="candidate"&&(C(this,"follower"),v(this));else if(t.key===p(this,"state")){let A=JSON.parse(localStorage.getItem(t.key));this.leaderState!==A&&(this.leaderState=A,this.emitter.emit("state"))}else if(t.key===p(this,"user"))o=JSON.parse(t.newValue),o[0]!==this.tabId&&this.emitter.emit("user",o[1]);else if(t.key===p(this,"subprotocol")){let A=JSON.parse(t.newValue),s=De(this.options.subprotocol,A);if(s===1)y(this,"subprotocol",this.options.subprotocol);else if(s===-1){let n=new le("wrong-subprotocol",{supported:A,used:this.options.subprotocol},!0);this.node.emitter.emit("error",n)}}}onUnload(){this.role==="leader"&&(this.unloading=!0,y(this,"leader",[])),super.onUnload()}getClientId(){let t=p(this,"client");if(this.isLocalStorage){if(localStorage.getItem(t))return localStorage.getItem(t);{let o=super.getClientId();return localStorage.setItem(t,o),o}}else return super.getClientId()}}function we(e){let t=document,o=!1,A=[],s=!1,n=()=>{o&&(t.title=o,o=!1)},u=()=>{t.hidden&&!o?(o=t.title,t.title="* "+t.title):n(),t.hidden&&(s=setTimeout(u,1e3))},a=()=>{!t.hidden&&s&&(s=clearTimeout(s),n())};return t&&typeof t.hidden!="undefined"&&(A.push(e.node.on("error",i=>{i.type!=="timeout"&&!s&&u()})),A.push(e.on("add",i=>{i.type==="logux/undo"&&i.reason&&!s&&u()})),document.addEventListener("visibilitychange",a,!1),A.push(()=>{document.removeEventListener("visibilitychange",a,!1)})),()=>{for(let i of A)i()}}function R(e){return e.returnValue="unsynced","unsynced"}function ve(e){let t=e.state==="disconnected",o=!1,A=()=>{e.state==="disconnected"?t=!0:e.state==="synchronized"&&(t=!1,o=!1),typeof window!="undefined"&&window.addEventListener&&(e.role!=="follower"&&o&&t?window.addEventListener("beforeunload",R):window.removeEventListener("beforeunload",R))},s=[];return s.push(e.on("role",A)),s.push(e.on("state",A)),A(),s.push(e.on("add",(n,u)=>{n.type!=="logux/subscribe"&&n.type!=="logux/unsubscribe"&&t&&u.sync&&u.added&&(o=!0,A())})),()=>{for(let n of s)n()}}function Ee(e,t){let o=t.normal,A=t.offline,s=t.error,n=[],u=document,a=!1,i=!1;function c(){e.connected&&i!==o?a.href=i=o:!e.connected&&A&&i!==A&&i!==s&&(a.href=i=A)}function l(){s&&i!==s&&(a.href=i=s)}return u&&(a=u.querySelector('link[rel~="icon"]'),typeof o=="undefined"&&(o=a?a.href:""),a||(a=u.createElement("link"),a.rel="icon",a.href="",u.head.appendChild(a)),n.push(e.on("state",c)),c(),n.push(e.on("add",r=>{r.type==="logux/undo"&&r.reason&&l()})),n.push(e.node.on("error",r=>{r.type!=="timeout"&&l()}))),()=>{for(let r of n)r()}}function b(e){return"%c"+e+"%c"}const ee="#c00000";function I(e,t,o){e="%cLogux%c "+e;let A=Array.from(e.match(/%c/g)).map((s,n)=>n===0?o===ee?`color:${o};font-weight:bold`:"color:#ffa200;font-weight:bold":n%2===0?o?`font-weight:bold;color:${o}`:"font-weight:bold":"font-weight:normal");if(t){console.groupCollapsed(e,...A);for(let s in t)typeof t[s]=="string"?console.log(s+": %c"+t[s],"font-weight:bold"):console.log(s,t[s]);console.groupEnd()}else console.log(e,...A)}function xe(e,t={}){let o=e.node,A={},s=[],n=!1;t.state!==!1&&s.push(e.on("state",()=>{let i;e.state==="connecting"&&o.connection.url?i={"Node ID":o.localNodeId,Server:o.connection.url}:e.connected&&!n&&o.remoteNodeId?(n=!0,i={"Server ID":o.remoteNodeId}):e.connected||(n=!1),I("state is "+b(e.state),i)})),t.role!==!1&&s.push(e.on("role",()=>{I("tab role is "+b(e.role))}));let u={},a=(t.ignoreActions||[]).reduce((i,c)=>(i[c]=!0,i),{});return t.add!==!1&&s.push(e.on("add",(i,c)=>{if(c.tab&&c.tab!==e.tabId||a[i.type])return;c.sync&&(A[c.id]=i);let l;if(i.type==="logux/subscribe")l="subscribing to "+b(i.channel)+" channel",Object.keys(i).length===2?I(l):I(l,{Action:i});else if(i.type==="logux/subscribed")I("subscribed to "+b(i.channel)+" channel by server");else if(i.type==="logux/unsubscribe")l="unsubscribed from channel "+b(i.channel),Object.keys(i).length===2?I(l):I(l,{Action:i});else if(i.type==="logux/processed")if(A[i.id]){let r=A[i.id],d={"Processed Action":r};r.type==="logux/subscribe"?I("subscribed to "+b(r.channel)+" channel",d):I("action "+b(r.type)+" was processed",d),delete A[i.id]}else I("action "+b(i.id)+" was processed");else if(i.type==="logux/undo"){i.action.type==="logux/subscribe"?l="subscription to "+b(i.action.channel):l="action "+b(i.action.type),l+=" was undone because of "+b(i.reason);let r={"Reverted Action":i.action};Object.keys(i).length>4&&(r["Undo Action"]=i),A[i.id]&&delete A[i.id],I(l,r,ee)}else{let r={Action:i,Meta:c};l="added ",c.reasons.length===0&&(u[c.id]=!0,l+="and cleaned "),l+=b(i.type)+" action";let{nodeId:d}=q(c.id);d!==o.localNodeId&&(r.From=d),I(l,r,"#008000")}})),t.user!==!1&&s.push(e.on("user",i=>{let c="user ID was changed to "+b(i);I(c,{"Node ID":e.nodeId})})),t.clean!==!1&&s.push(e.on("clean",(i,c)=>{if(u[c.id]){delete u[c.id];return}if(c.tab&&c.tab!==e.tabId||a[i.type]||i.type.startsWith("logux/"))return;let l="cleaned "+b(i.type)+" action";I(l,{Action:i,Meta:c})})),()=>{for(let i of s)i()}}var Q="/client/assets/refresh.9f4c25a3.svg",Te="/client/assets/success.22d27a29.svg",Y="/client/assets/offline.e32df626.svg",ke="/client/assets/error.78666971.svg";let qe={base:{position:"fixed",width:"15.4em",height:"4em",lineHeight:"1.4",margin:"1.5em",paddingLeft:"4.2em",opacity:"0.8",borderRadius:"0.4em",color:"#fff",fontFamily:"Helvetica Neue, sans-serif",zIndex:"999",backgroundPosition:"1.2em center",backgroundRepeat:"no-repeat",backgroundSize:"1.8em"},text:{display:"table-cell",verticalAlign:"middle",height:"4em"},synchronized:{backgroundColor:"#000",backgroundImage:"url("+Te+")"},disconnected:{backgroundColor:"#000",backgroundImage:"url("+Y+")"},wait:{backgroundColor:"#000",backgroundImage:"url("+Y+")"},sending:{backgroundColor:"#000",backgroundImage:"url("+Q+")"},error:{backgroundColor:"#F42A2A",backgroundImage:"url("+ke+")"},protocolError:{backgroundColor:"#000",backgroundImage:"url("+Q+")"}};var Ke="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAABzlBMVEUAAAAAAACAgICZmZmAgICSkpKLi4uAgICJiYmAgICIiIiHh4eAgICGhoaAgICGhoaAgICFhYWAgICFhYWAgICEhISAgICEhISAgICEhISAgICDg4OAgICDg4OAgICDg4OAgICDg4OAgICDg4OAgICCgoKAgICAgICCgoKAgICCgoKAgICAgICCgoKAgICCgoKAgICCgoKAgICBgYGBgYGAgICBgYGAgICBgYGBgYGAgICAgICBgYGAgICBgYGAgICBgYGAgICAgICBgYGAgICBgYGBgYGAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICq+RHaAAAAmXRSTlMAAQQFBgcLDA0ODxESExQVFhcYGRobHB0eHyAhIiMkJSYnKCksLS4wMTI3ODo7PD0+P0xNT1BTVFVXWFpbXl9gYWJmaWprbW6AgYKDhYaHiImKi4yNjo+RkpSXmZqbnJ2foqqtrq+5u7y+xMXGx8jJysvQ0dLT1dbY2drc3d7g4eLj5OXm5+jq6+zt7u/w8fX29/j5+vv8/f5OSOWKAAACyklEQVR4Ae3aA7okSxQE4Bjbtm3bc23btm2b1f1ex25nA1nO813Vv4BCGoGdIBAIBI49/ZVS1dQ5uGAYC4OdTZUpv54eg7TTHwuGqDBZ/vsSxNxJ7qeFvsTbEHA8po22WqKPQ6+LOSt0ZL3gAvS5krNGx0Jlt6DH/pQwXQnnHIIGb8bo2uS3XfDpSh09qb0EX94u0KOlj/BuT0qEnkVy9sKjM230pfkUPLnST5+GbsCDexP0bfohXHu1TA2WX8Cl+4vUYvkRXLk2RU1mbsKFk/3UZvA0HNvXRo2a98KpXGqVCYdeR6hV5B0cuThPzRauwIFdddSuBg58pYBPsHVoggKmDsu3aLUs2LjxH0WEr8FaCYUUwtIFg0JCl2Alj2JyYOHEKsWsHoO5GAqKgrk2CmqGqTsUdQtmkikqHmb6KaoHJs5R2DmofaOwr1ArpbBiqI1Q2BCUjlPcUag8o7gnUPlFcd+hkkpxSVCporgKqDRRXD1UuiiuAyrDFDcElXmKm4WKQXHrG//ijS/qjWxcG9adNmwA2bAhM4XiEqHyk+K+QeUpxT2GylGKO4qN6chDG7W8LdqoBf0XqJ2lrMgZmOilqG6YSaKoOJi5uVEbc7RSUCPMRVPQH5g7vkoxK8dgIZdismHlvEEh6+dgqYhC8mHtWpgiQldgI5si0mHn4DgFTB6Crc8U8AEO1FK7ajhxYY6aLVzeoCu+t1CRb9lpcGpvMzVq2APHTvRSm4FTcOHqJDWZvAJX7ukKJzyESy+XqMHSc7h2d5y+TT2AB1f66NPgdXhyqpm+NJyAR7tj/5ePVam9madHS+/hy6UaelJ9AX69GaVrE9+gwaGsMF0JZRyAHpfdBEKNshvQ51SK4wjseeh1LKqZtpr+HoWAmwk9tNAddwNiTn4sGDQJdl+AtKNPfiRXNLQPzhvG/GB7fUXS9ydHsAMEAoHAP3w+T5jYJRnoAAAAAElFTkSuQmCC",He="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAABzlBMVEUAAAAAAAAAgAAAmQAAgAAAkgAAiwAAgAAAiQAAgAAAiAAAhwAAgAAAhgAAgAAAhgAAgAAAhQAAgAAAhQAAgAAAhAAAgAAAhAAAgAAAhAAAgAAAgwAAgAAAgwAAgAAAgwAAgAAAgwAAgAAAgwAAgAAAggAAgAAAgAAAggAAgAAAggAAgAAAgAAAggAAgAAAggAAgAAAggAAgAAAgQAAgQAAgAAAgQAAgAAAgQAAgQAAgAAAgAAAgQAAgAAAgQAAgAAAgQAAgAAAgAAAgQAAgAAAgQAAgQAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgAAAgACYS+jrAAAAmXRSTlMAAQQFBgcLDA0ODxESExQVFhcYGRobHB0eHyAhIiMkJSYnKCksLS4wMTI3ODo7PD0+P0xNT1BTVFVXWFpbXl9gYWJmaWprbW6AgYKDhYaHiImKi4yNjo+RkpSXmZqbnJ2foqqtrq+5u7y+xMXGx8jJysvQ0dLT1dbY2drc3d7g4eLj5OXm5+jq6+zt7u/w8fX29/j5+vv8/f5OSOWKAAACyklEQVR4Ae3aA7okSxQE4Bjbtm3bc23btm2b1f1ex25nA1nO813Vv4BCGoGdIBAIBI49/ZVS1dQ5uGAYC4OdTZUpv54eg7TTHwuGqDBZ/vsSxNxJ7qeFvsTbEHA8po22WqKPQ6+LOSt0ZL3gAvS5krNGx0Jlt6DH/pQwXQnnHIIGb8bo2uS3XfDpSh09qb0EX94u0KOlj/BuT0qEnkVy9sKjM230pfkUPLnST5+GbsCDexP0bfohXHu1TA2WX8Cl+4vUYvkRXLk2RU1mbsKFk/3UZvA0HNvXRo2a98KpXGqVCYdeR6hV5B0cuThPzRauwIFdddSuBg58pYBPsHVoggKmDsu3aLUs2LjxH0WEr8FaCYUUwtIFg0JCl2Alj2JyYOHEKsWsHoO5GAqKgrk2CmqGqTsUdQtmkikqHmb6KaoHJs5R2DmofaOwr1ArpbBiqI1Q2BCUjlPcUag8o7gnUPlFcd+hkkpxSVCporgKqDRRXD1UuiiuAyrDFDcElXmKm4WKQXHrG//ijS/qjWxcG9adNmwA2bAhM4XiEqHyk+K+QeUpxT2GylGKO4qN6chDG7W8LdqoBf0XqJ2lrMgZmOilqG6YSaKoOJi5uVEbc7RSUCPMRVPQH5g7vkoxK8dgIZdismHlvEEh6+dgqYhC8mHtWpgiQldgI5si0mHn4DgFTB6Crc8U8AEO1FK7ajhxYY6aLVzeoCu+t1CRb9lpcGpvMzVq2APHTvRSm4FTcOHqJDWZvAJX7ukKJzyESy+XqMHSc7h2d5y+TT2AB1f66NPgdXhyqpm+NJyAR7tj/5ePVam9madHS+/hy6UaelJ9AX69GaVrE9+gwaGsMF0JZRyAHpfdBEKNshvQ51SK4wjseeh1LKqZtpr+HoWAmwk9tNAddwNiTn4sGDQJdl+AtKNPfiRXNLQPzhvG/GB7fUXS9ydHsAMEAoHAP3w+T5jYJRnoAAAAAElFTkSuQmCC",Le="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAABzlBMVEUAAAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AADGIKqbAAAAmXRSTlMAAQQFBgcLDA0ODxESExQVFhcYGRobHB0eHyAhIiMkJSYnKCksLS4wMTI3ODo7PD0+P0xNT1BTVFVXWFpbXl9gYWJmaWprbW6AgYKDhYaHiImKi4yNjo+RkpSXmZqbnJ2foqqtrq+5u7y+xMXGx8jJysvQ0dLT1dbY2drc3d7g4eLj5OXm5+jq6+zt7u/w8fX29/j5+vv8/f5OSOWKAAACyklEQVR4Ae3aA7okSxQE4Bjbtm3bc23btm2b1f1ex25nA1nO813Vv4BCGoGdIBAIBI49/ZVS1dQ5uGAYC4OdTZUpv54eg7TTHwuGqDBZ/vsSxNxJ7qeFvsTbEHA8po22WqKPQ6+LOSt0ZL3gAvS5krNGx0Jlt6DH/pQwXQnnHIIGb8bo2uS3XfDpSh09qb0EX94u0KOlj/BuT0qEnkVy9sKjM230pfkUPLnST5+GbsCDexP0bfohXHu1TA2WX8Cl+4vUYvkRXLk2RU1mbsKFk/3UZvA0HNvXRo2a98KpXGqVCYdeR6hV5B0cuThPzRauwIFdddSuBg58pYBPsHVoggKmDsu3aLUs2LjxH0WEr8FaCYUUwtIFg0JCl2Alj2JyYOHEKsWsHoO5GAqKgrk2CmqGqTsUdQtmkikqHmb6KaoHJs5R2DmofaOwr1ArpbBiqI1Q2BCUjlPcUag8o7gnUPlFcd+hkkpxSVCporgKqDRRXD1UuiiuAyrDFDcElXmKm4WKQXHrG//ijS/qjWxcG9adNmwA2bAhM4XiEqHyk+K+QeUpxT2GylGKO4qN6chDG7W8LdqoBf0XqJ2lrMgZmOilqG6YSaKoOJi5uVEbc7RSUCPMRVPQH5g7vkoxK8dgIZdismHlvEEh6+dgqYhC8mHtWpgiQldgI5si0mHn4DgFTB6Crc8U8AEO1FK7ajhxYY6aLVzeoCu+t1CRb9lpcGpvMzVq2APHTvRSm4FTcOHqJDWZvAJX7ukKJzyESy+XqMHSc7h2d5y+TT2AB1f66NPgdXhyqpm+NJyAR7tj/5ePVam9madHS+/hy6UaelJ9AX69GaVrE9+gwaGsMF0JZRyAHpfdBEKNshvQ51SK4wjseeh1LKqZtpr+HoWAmwk9tNAddwNiTn4sGDQJdl+AtKNPfiRXNLQPzhvG/GB7fUXS9ydHsAMEAoHAP3w+T5jYJRnoAAAAAElFTkSuQmCC";let H=new ge(500),K=new V({store:new J,nodeId:"server:uuid"});new ae("server:uuid",K,H.right);K.on("add",(e,t)=>{e.type!=="logux/processed"&&setTimeout(()=>{K.add({type:"logux/processed",id:t.id})},500)});let f=new Se({subprotocol:location.hash.slice(1)||"1.0.0",userId:"10",server:"wss://example.com/"}),L=new j(f.node.localNodeId,f.log,H.left);L.connection.url="wss://example.com/";L.emitter=f.node.emitter;f.node=L;we(f);ve(f);Ee(f,{normal:He,offline:Ke,error:Le});be(f,{messages:Ie,styles:qe});xe(f);W(f,e=>{document.all.status.innerText=e});let E=0;function Ge(e){return e==="disconnected"?"\u{1F634}":e==="connecting"?"\u{1F50C}":"\u{1F60A}"}function Oe(e){return e.slice(0,1).toUpperCase()}function S(){document.title=Ge(f.state)+" "+Oe(f.role)+" "+E}f.on("state",()=>{document.querySelector("#connection").checked=f.connected,S()});f.on("role",()=>{S(),document.querySelector("#connection").disabled=f.role!=="leader"});f.on("add",e=>{e.type==="TICK"&&E++,S()});f.on("clean",e=>{e.type==="TICK"&&E--,S()});f.log.each(e=>{e.type==="TICK"&&E++}).then(()=>{S()});f.on("role",()=>{let e=f.role==="leader";document.all.connection.disabled=!e,document.all.disabled.style.display=e?"none":"inline"});f.start();document.querySelector("#connection").onchange=e=>{e.target.checked?f.node.connection.connect():f.node.connection.disconnect()};document.querySelector("#add").onclick=()=>{f.log.add({type:"TICK"},{reasons:["tick"],sync:!0})};document.querySelector("#clean").onclick=()=>{f.log.removeReason("tick")};document.querySelector("#error").onclick=()=>{setTimeout(()=>{f.log.add({type:"logux/undo",reason:"error",action:{type:"TICK"}})},3e3)};document.querySelector("#denied").onclick=()=>{setTimeout(()=>{f.log.add({type:"logux/undo",reason:"denied",action:{type:"TICK"}})},3e3)};document.querySelector("#serverError").onclick=()=>{setTimeout(()=>{H.right.send(["error","wrong-format"])},3e3)};document.querySelector("#subprotocolError").onclick=()=>{f.node.syncError("wrong-subprotocol",{supported:"2.x",used:"1.0.0"})};f.options.subprotocol==="1.0.1"?document.querySelector("#subprotocolClient").disabled=!0:document.querySelector("#subprotocolClient").onclick=()=>{window.open(location.toString()+"#1.0.1","_blank")};
