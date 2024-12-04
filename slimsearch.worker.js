const{entries:$}=Object,{fromEntries:et}=Object,st="ENTRIES",D="KEYS",W="VALUES",_="";class S{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=b(this._path);if(b(s)===_)return{done:!1,value:this.result()};const n=t.get(b(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=b(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>b(t)).filter(t=>t!==_).join("")}value(){return b(this._path).node.get(_)}result(){switch(this._type){case W:return this.value();case D:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const b=e=>e[e.length-1],nt=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,r=o+s,c=new Uint8Array(r*o).fill(s+1);for(let i=0;i<o;++i)c[i]=i;for(let i=1;i<r;++i)c[i*o]=i;return q(e,t,s,n,c,1,o,""),n},q=(e,t,s,n,o,r,c,i)=>{const h=r*c;t:for(const u of e.keys())if(u===_){const l=o[h-1];l<=s&&n.set(i,[e.get(u),l])}else{let l=r;for(let f=0;f<u.length;++f,++l){const m=u[f],g=c*l,y=g-c;let d=o[g];const a=Math.max(0,l-s-1),w=Math.min(c-1,l+s);for(let p=a;p<w;++p){const O=m!==t[p],C=o[y+p]+ +O,k=o[y+p+1]+1,x=o[g+p]+1,v=o[g+p+1]=Math.min(C,k,x);v<d&&(d=v)}if(d>s)continue t}q(e.get(u),t,s,n,o,l,c,i+u)}};class z{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=I(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,r]=L(n);for(const c of o.keys())if(c!==_&&c.startsWith(r)){const i=new Map;return i.set(c.slice(r.length),o.get(c)),new z(i,t)}}return new z(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,ot(this._tree,t)}entries(){return new S(this,st)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return nt(this._tree,t,s)}get(t){const s=F(this._tree,t);return s!==void 0?s.get(_):void 0}has(t){return F(this._tree,t)?.has(_)??!1}keys(){return new S(this,D)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,E(this._tree,t).set(_,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=E(this._tree,t);return n.set(_,s(n.get(_))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=E(this._tree,t);let o=n.get(_);return o===void 0&&n.set(_,o=s()),o}values(){return new S(this,W)}[Symbol.iterator](){return this.entries()}static from(t){const s=new z;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return z.from(Object.entries(t))}}const I=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==_&&t.startsWith(n))return s.push([e,n]),I(e.get(n),t.slice(n.length),s);return s.push([e,t]),I(void 0,"",s)},F=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==_&&t.startsWith(s))return F(e.get(s),t.slice(s.length))},E=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const r of e.keys())if(r!==_&&t[n]===r[0]){const c=Math.min(s-n,r.length);let i=1;for(;i<c&&t[n+i]===r[i];)++i;const h=e.get(r);if(i===r.length)e=h;else{const u=new Map;u.set(r.slice(i),h),e.set(t.slice(n,n+i),u),e.delete(r),e=u}n+=i;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},ot=(e,t)=>{const[s,n]=I(e,t);if(s!==void 0){if(s.delete(_),s.size===0)R(n);else if(s.size===1){const[o,r]=s.entries().next().value;A(n,o,r)}}},R=e=>{if(e.length===0)return;const[t,s]=L(e);if(t.delete(s),t.size===0)R(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==_&&A(e.slice(0,-1),n,o)}},A=(e,t,s)=>{if(e.length===0)return;const[n,o]=L(e);n.set(o+t,s),n.delete(o)},L=e=>e[e.length-1],rt=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},it=/[\n\r\p{Z}\p{P}]+/u,j="or",N="and",ct="and_not",ut=(e,t)=>{e.includes(t)||e.push(t)},B=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},P=({score:e},{score:t})=>t-e,lt=()=>new Map,M=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},G=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,ht={[j]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:r,match:c}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,c),B(n.terms,r)}}return e},[N]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:r,terms:c,match:i}=t.get(n);B(o.terms,c),s.set(n,{score:o.score+r,terms:o.terms,match:Object.assign(o.match,i)})}return s},[ct]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},dt=(e,t,s,n,o,r)=>{const{k:c,b:i,d:h}=r;return Math.log(1+(s-t+.5)/(t+.5))*(h+e*(c+1)/(e+c*(1-i+i*n/o)))},at=e=>(t,s,n)=>({term:t,fuzzy:typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy??!1,prefix:typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0,termBoost:typeof e.boostTerm=="function"?e.boostTerm(t,s,n):1}),H=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},ft=(e,t,s,n)=>{if(!e._index.has(n)){H(e,s,t,n);return}const o=e._index.fetch(n,lt),r=o.get(t);r?.get(s)==null?H(e,s,t,n):r.get(s)<=1?r.size<=1?o.delete(t):r.delete(s):r.set(s,r.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},mt={k:1.2,b:.7,d:.5},gt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(it),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof console?.[e]=="function"&&console[e](t)},autoVacuum:!0},J={combineWith:j,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:mt},pt={combineWith:N,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},Y={minDirtFactor:.1,minDirtCount:20},yt={..._t,...Y},K=Symbol("*"),wt=(e,t)=>{const s=new Map,n={...e._options.searchOptions,...t};for(const[o,r]of e._documentIds){const c=n.boostDocument?n.boostDocument(r,"",e._storedFields.get(o)):1;s.set(o,{score:c,terms:[],match:{}})}return s},U=(e,t=j)=>{if(e.length===0)return new Map;const s=t.toLowerCase(),n=ht[s];if(!n)throw new Error(`Invalid combination operator: ${t}`);return e.reduce(n)||new Map},T=(e,t,s,n,o,r,c,i,h,u=new Map)=>{if(r==null)return u;for(const l of Object.keys(c)){const f=c[l],m=e._fieldIds[l],g=r.get(m);if(g==null)continue;let y=g.size;const d=e._avgFieldLength[m];for(const a of g.keys()){if(!e._documentIds.has(a)){ft(e,m,a,s),y-=1;continue}const w=i?i(e._documentIds.get(a),s,e._storedFields.get(a)):1;if(!w)continue;const p=g.get(a),O=e._fieldLength.get(a)[m],C=dt(p,y,e._documentCount,O,d,h),k=n*o*f*w*C,x=u.get(a);if(x){x.score+=k,ut(x.terms,t);const v=G(x.match,s);v?v.push(l):x.match[s]=[l]}else u.set(a,{score:k,terms:[t],match:{[s]:[l]}})}}return u},xt=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields??e._options.fields).reduce((d,a)=>({...d,[a]:G(n.boost,a)||1}),{}),{boostDocument:r,weights:c,maxFuzzy:i,bm25:h}=n,{fuzzy:u,prefix:l}={...J.weights,...c},f=e._index.get(t.term),m=T(e,t.term,t.term,1,t.termBoost,f,o,r,h);let g,y;if(t.prefix&&(g=e._index.atPrefix(t.term)),t.fuzzy){const d=t.fuzzy===!0?.2:t.fuzzy,a=d<1?Math.min(i,Math.round(t.term.length*d)):d;a&&(y=e._index.fuzzyGet(t.term,a))}if(g)for(const[d,a]of g){const w=d.length-t.term.length;if(!w)continue;y?.delete(d);const p=l*d.length/(d.length+.3*w);T(e,t.term,d,p,t.termBoost,a,o,r,h,m)}if(y)for(const d of y.keys()){const[a,w]=y.get(d);if(!w)continue;const p=u*d.length/(d.length+w);T(e,t.term,d,p,t.termBoost,a,o,r,h,m)}return m},Q=(e,t,s={})=>{if(t===K)return wt(e,s);if(typeof t!="string"){const l={...s,...t,queries:void 0},f=t.queries.map(m=>Q(e,m,l));return U(f,l.combineWith)}const{tokenize:n,processTerm:o,searchOptions:r}=e._options,c={tokenize:n,processTerm:o,...r,...s},{tokenize:i,processTerm:h}=c,u=i(t).flatMap(l=>h(l)).filter(l=>!!l).map(at(c)).map(l=>xt(e,l,c));return U(u,c.combineWith)},X=(e,t,s={})=>{const n=Q(e,t,s),o=[];for(const[r,{score:c,terms:i,match:h}]of n){const u=i.length||1,l={id:e._documentIds.get(r),score:c*u,terms:Object.keys(h),queryTerms:i,match:h};Object.assign(l,e._storedFields.get(r)),(s.filter==null||s.filter(l))&&o.push(l)}return t===K&&s.boostDocument==null&&e._options.searchOptions.boostDocument==null||o.sort(P),o},zt=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:r,terms:c}of X(e,t,s)){const i=c.join(" "),h=n.get(i);h!=null?(h.score+=r,h.count+=1):n.set(i,{score:r,terms:c,count:1})}const o=[];for(const[r,{score:c,terms:i,count:h}]of n)o.push({suggestion:r,terms:i,score:c/h});return o.sort(P),o};class bt{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if(t?.fields==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...gt,...t,autoVacuum:s,searchOptions:{...J,...t.searchOptions},autoSuggestOptions:{...pt,...t.autoSuggestOptions}},this._index=new z,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=Y,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[r,c]of n)o[r]=Object.fromEntries(c);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,version:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const vt=e=>new bt(e),kt=({documentCount:e,nextId:t,fieldIds:s,averageFieldLength:n,dirtCount:o,version:r},c)=>{if(r!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const i=vt(c);return i._documentCount=e,i._nextId=t,i._idToShortId=new Map,i._fieldIds=s,i._avgFieldLength=n,i._dirtCount=o??0,i._index=new z,i},It=(e,t)=>{const{index:s,documentIds:n,fieldLength:o,storedFields:r}=e,c=kt(e,t);c._documentIds=M(n),c._fieldLength=M(o),c._storedFields=M(r);for(const[i,h]of c._documentIds)c._idToShortId.set(h,i);for(const[i,h]of s){const u=new Map;for(const l of Object.keys(h))u.set(parseInt(l,10),M(h[l]));c._index.set(i,u)}return c},V=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let r=0,c=0;const i=(u,l=!1)=>{let f;c===0?f=u.length>20?`… ${u.slice(-20)}`:u:l?f=u.length+c>100?`${u.slice(0,100-c)}… `:u:f=u.length>20?`${u.slice(0,20)} … ${u.slice(-20)}`:u,f&&o.push(f),c+=f.length,l||(o.push(["mark",t]),c+=t.length,c>=100&&o.push(" …"))};let h=s.indexOf(n,r);if(h===-1)return null;for(;h>=0;){const u=h+n.length;if(i(e.slice(r,h)),r=u,c>100)break;h=s.indexOf(n,r)}return c<100&&i(e.slice(r),!0),o},Mt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),Ot=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),Z=(e,t,s={})=>{const n={};return X(t,e,{boost:{h:2,t:1,c:4},prefix:!0,...s}).forEach(o=>{const{id:r,terms:c,score:i}=o,h=r.includes("@"),u=r.includes("#"),[l,f]=r.split(/[#@]/),m=Number(l),g=c.sort((d,a)=>d.length-a.length).filter((d,a)=>c.slice(a+1).every(w=>!w.includes(d))),{contents:y}=n[m]??={title:"",contents:[]};if(h)y.push([{type:"customField",id:m,index:f,display:g.map(d=>o.c.map(a=>V(a,d))).flat().filter(d=>d!==null)},i]);else{const d=g.map(a=>V(o.h,a)).filter(a=>a!==null);if(d.length&&y.push([{type:u?"heading":"title",id:m,...u&&{anchor:f},display:d},i]),"t"in o&&o.t)for(const a of o.t){const w=g.map(p=>V(a,p)).filter(p=>p!==null);w.length&&y.push([{type:"text",id:m,...u&&{anchor:f},display:w},i])}}}),$(n).sort(([,o],[,r])=>"max"==="total"?Mt(o,r):Ot(o,r)).map(([o,{title:r,contents:c}])=>{if(!r){const i=rt(t,o);i&&(r=i.h)}return{title:r,contents:c.map(([i])=>i)}})},tt=(e,t,s={})=>{const n=zt(t,e,{fuzzy:.2,maxFuzzy:3,...s}).map(({suggestion:o})=>o);return e.includes(" ")?n:n.filter(o=>!o.includes(" "))},Ct=et($(JSON.parse("{\"/\":{\"documentCount\":15,\"nextId\":15,\"documentIds\":{\"0\":\"0\",\"1\":\"1\",\"2\":\"2\",\"3\":\"2#基本配置\",\"4\":\"2#迁移\",\"5\":\"2#常用指令\",\"6\":\"2#连接wsl桌面\",\"7\":\"2#ref\",\"8\":\"3\",\"9\":\"3#安装kali-linux\",\"10\":\"3#安装黑科技kex\",\"11\":\"3#运行kex\",\"12\":\"3#最终解决方法\",\"13\":\"4\",\"14\":\"5\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[2],\"1\":[2,2],\"2\":[2,31],\"3\":[2,42],\"4\":[1,83],\"5\":[2,21],\"6\":[3,22],\"7\":[1,10],\"8\":[10],\"9\":[4,6],\"10\":[4,8],\"11\":[2,138],\"12\":[3,45],\"13\":[0,4],\"14\":[1]},\"averageFieldLength\":[2.6,31.3125],\"storedFields\":{\"0\":{\"h\":\"博客主页\"},\"1\":{\"h\":\"介绍页\",\"t\":[\"空空如也！\"]},\"2\":{\"h\":\"WSL备忘录\",\"t\":[\"在做计网实验时，之前用的一直都是VMware，最近偶然接触到WSL(Windows Subsystem for Linux)，在此记录基本配置过程。\"]},\"3\":{\"h\":\"基本配置\",\"t\":[\"介绍视频（需要武林绝学，或者b站随便找个都行）\",\"支持的GUI应用：https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/gui-apps\",\"取消自动挂载：https://devblogs.microsoft.com/commandline/automatically-configuring-wsl/\"]},\"4\":{\"h\":\"迁移\",\"t\":[\"wsl默认安装在C盘，建议趁刚安装时迁移到容量充足的其他盘\",\"查看当前安装的所有WSL\",\"wsl --list -v\",\"左边的*表示默认项\",\"先导出WSL到指定路径\",\"wsl --export Ubuntu-20.04 E:\\\\wsl\\\\Ubuntu-20.04.tar\",\"删除你要导出的wsl\",\"wsl --unregister Ubuntu-20.04\",\"从第2步中导出的tar文件导入wsl，这里指定了version为2\",\"格式：wsl --import <WSL名称> <导入后wsl工作路径> <wsl压缩包路径>\",\"wsl --import Ubuntu-20.04 E:\\\\wsl\\\\ubuntu-20.04 E:\\\\wsl\\\\Ubuntu-20.04.tar --version 2\",\"配置先前的默认登录用户\",\"格式：<EXE> config --default-user <用户名>\",\"ubuntu2004.exe config --default-user xanadu13\",\"如果是kali-linux：\",\"kali.exe config --default-user xanadu13\"]},\"5\":{\"h\":\"常用指令\",\"t\":[\"软链接挂载文件夹：\",\"ln -s /mnt/e/wsl/share ~/share\",\"运行指定wsl：\",\"wsl -d kali-linux\"]},\"6\":{\"h\":\"连接wsl桌面\",\"t\":[\"目前已知kali-linux wsl可以通过类似远程桌面的方式连接，具体见我的另一篇文章：\"]},\"7\":{\"h\":\"Ref\",\"t\":[\"https://www.jianshu.com/p/2a2d16029dc2\"]},\"8\":{\"h\":\"在WSL中使用kali-linux踩坑记录\"},\"9\":{\"h\":\"安装kali-linux\",\"t\":[\"wsl --install kali-linux\"]},\"10\":{\"h\":\"安装黑科技kex\",\"t\":[\"sudo apt install kali-win-kex\"]},\"11\":{\"h\":\"运行kex\",\"t\":[\"按照视频里说的尝试运行kex --esm --ip -sound会提示找不到命令，如果直接运行kex，输完密码，等待大概十秒钟后，提示开启成功：\",\"但是TigerVNC连接不上：\",\"google了好久，找到一个遇到相同问题的： https://www.reddit.com/r/bashonubuntuonwindows/comments/icu9ks/why_winkex_does_not_working_please_help_me/?rdt=50615\",\"但是下面的回答没有帮助。\",\"再次搜索一番，发现了这个帖子：https://access.redhat.com/solutions/5011721\",\"我们知道，linux里各种设备都是文件，输密码也会有一个密码文件。而在非sudo下试图登录时没有读取密码文件的权限，因此才有“Opening password file failed”。\",\"尝试sudo kex之后，发现可以正常进入kali-linux桌面：\",\"kali-linux桌面\",\"但是这里和默认用户下的桌面、各种文件夹是不互通的，而且笔者也不喜欢在root下运行wsl，因为此时你可以随意删除主机系统文件。\"]},\"12\":{\"h\":\"最终解决方法\",\"t\":[\"在主机上安装TigerVNC：https://sourceforge.net/projects/tigervnc\",\"在kali-linux的bash中执行kex，启动win-kex server，然后直接使用TigerVNC连接wsl即可。\",\"这里的端口号(5901)填win-kex server启动后开放给你的端口。\"]},\"13\":{\"h\":\"\",\"t\":[\"404 Not Found\"]},\"14\":{\"h\":\"Posts\"}},\"dirtCount\":0,\"index\":[[\"404\",{\"1\":{\"13\":1}}],[\"端口\",{\"1\":{\"12\":1}}],[\"端口号\",{\"1\":{\"12\":1}}],[\"给\",{\"1\":{\"12\":1}}],[\"开放\",{\"1\":{\"12\":1}}],[\"开启\",{\"1\":{\"11\":1}}],[\"填\",{\"1\":{\"12\":1}}],[\"5901\",{\"1\":{\"12\":1}}],[\"5011721\",{\"1\":{\"11\":1}}],[\"50615\",{\"1\":{\"11\":1}}],[\"即可\",{\"1\":{\"12\":1}}],[\"然后\",{\"1\":{\"12\":1}}],[\"启动\",{\"1\":{\"12\":2}}],[\"执行\",{\"1\":{\"12\":1}}],[\"net\",{\"1\":{\"12\":1}}],[\"not\",{\"1\":{\"11\":1,\"13\":1}}],[\"机上安装\",{\"1\":{\"12\":1}}],[\"方法\",{\"0\":{\"12\":1}}],[\"方式\",{\"1\":{\"6\":1}}],[\"解决\",{\"0\":{\"12\":1}}],[\"最终\",{\"0\":{\"12\":1}}],[\"最近\",{\"1\":{\"2\":1}}],[\"系统文件\",{\"1\":{\"11\":1}}],[\"主\",{\"1\":{\"12\":1}}],[\"主机\",{\"1\":{\"11\":1}}],[\"主页\",{\"0\":{\"0\":1}}],[\"随意\",{\"1\":{\"11\":1}}],[\"随便\",{\"1\":{\"3\":1}}],[\"因为\",{\"1\":{\"11\":1}}],[\"因此\",{\"1\":{\"11\":1}}],[\"喜欢\",{\"1\":{\"11\":1}}],[\"笔者\",{\"1\":{\"11\":1}}],[\"互通\",{\"1\":{\"11\":1}}],[\"、\",{\"1\":{\"11\":1}}],[\"和\",{\"1\":{\"11\":1}}],[\"进入\",{\"1\":{\"11\":1}}],[\"正常\",{\"1\":{\"11\":1}}],[\"之后\",{\"1\":{\"11\":1}}],[\"之前\",{\"1\":{\"2\":1}}],[\"”\",{\"1\":{\"11\":1}}],[\"found\",{\"1\":{\"13\":1}}],[\"for\",{\"1\":{\"2\":1}}],[\"failed\",{\"1\":{\"11\":1}}],[\"file\",{\"1\":{\"11\":1}}],[\"opening\",{\"1\":{\"11\":1}}],[\"“\",{\"1\":{\"11\":1}}],[\"才有\",{\"1\":{\"11\":1}}],[\"权限\",{\"1\":{\"11\":1}}],[\"读取\",{\"1\":{\"11\":1}}],[\"试图\",{\"1\":{\"11\":1}}],[\"下\",{\"1\":{\"11\":3}}],[\"下面\",{\"1\":{\"11\":1}}],[\"非\",{\"1\":{\"11\":1}}],[\"而且\",{\"1\":{\"11\":1}}],[\"而\",{\"1\":{\"11\":1}}],[\"有\",{\"1\":{\"11\":1}}],[\"也\",{\"1\":{\"11\":2}}],[\"输\",{\"1\":{\"11\":1}}],[\"输完\",{\"1\":{\"11\":1}}],[\"设备\",{\"1\":{\"11\":1}}],[\"各种\",{\"1\":{\"11\":2}}],[\"知道\",{\"1\":{\"11\":1}}],[\"帖子\",{\"1\":{\"11\":1}}],[\"这个\",{\"1\":{\"11\":1}}],[\"这里\",{\"1\":{\"4\":1,\"11\":1,\"12\":1}}],[\"发现\",{\"1\":{\"11\":2}}],[\"搜索\",{\"1\":{\"11\":1}}],[\"再次\",{\"1\":{\"11\":1}}],[\"帮助\",{\"1\":{\"11\":1}}],[\"没有\",{\"1\":{\"11\":2}}],[\"回答\",{\"1\":{\"11\":1}}],[\"=\",{\"1\":{\"11\":1}}],[\"?\",{\"1\":{\"11\":1}}],[\"help\",{\"1\":{\"11\":1}}],[\"https\",{\"1\":{\"3\":2,\"7\":1,\"11\":2,\"12\":1}}],[\"_\",{\"1\":{\"11\":7}}],[\"root\",{\"1\":{\"11\":1}}],[\"rdt\",{\"1\":{\"11\":1}}],[\"r\",{\"1\":{\"11\":1}}],[\"redhat\",{\"1\":{\"11\":1}}],[\"reddit\",{\"1\":{\"11\":1}}],[\"ref\",{\"0\":{\"7\":1}}],[\"问题\",{\"1\":{\"11\":1}}],[\"相同\",{\"1\":{\"11\":1}}],[\"遇到\",{\"1\":{\"11\":1}}],[\"好久\",{\"1\":{\"11\":1}}],[\"google\",{\"1\":{\"11\":1}}],[\"gui\",{\"1\":{\"3\":2}}],[\"不\",{\"1\":{\"11\":2}}],[\"不上\",{\"1\":{\"11\":1}}],[\"不到\",{\"1\":{\"11\":1}}],[\"但是\",{\"1\":{\"11\":3}}],[\"成功\",{\"1\":{\"11\":1}}],[\"十秒钟\",{\"1\":{\"11\":1}}],[\"大概\",{\"1\":{\"11\":1}}],[\"等待\",{\"1\":{\"11\":1}}],[\"密码文件\",{\"1\":{\"11\":2}}],[\"密码\",{\"1\":{\"11\":2}}],[\"直接\",{\"1\":{\"11\":1,\"12\":1}}],[\"命令\",{\"1\":{\"11\":1}}],[\"找到\",{\"1\":{\"11\":1}}],[\"找\",{\"1\":{\"11\":1}}],[\"找个\",{\"1\":{\"3\":1}}],[\"提示\",{\"1\":{\"11\":2}}],[\"会\",{\"1\":{\"11\":2}}],[\"尝试\",{\"1\":{\"11\":2}}],[\"说\",{\"1\":{\"11\":1}}],[\"里\",{\"1\":{\"11\":2}}],[\"按照\",{\"1\":{\"11\":1}}],[\"kex\",{\"0\":{\"10\":1,\"11\":1},\"1\":{\"10\":1,\"11\":3,\"12\":3}}],[\"kali\",{\"0\":{\"8\":1,\"9\":1},\"1\":{\"4\":2,\"5\":1,\"6\":1,\"9\":1,\"10\":1,\"11\":2,\"12\":1}}],[\"科技\",{\"0\":{\"10\":1}}],[\"黑\",{\"0\":{\"10\":1}}],[\"icu9ks\",{\"1\":{\"11\":1}}],[\"ip\",{\"1\":{\"11\":1}}],[\"install\",{\"1\":{\"9\":1,\"10\":1}}],[\"import\",{\"1\":{\"4\":2}}],[\"坑\",{\"0\":{\"8\":1}}],[\"踩\",{\"0\":{\"8\":1}}],[\"使用\",{\"0\":{\"8\":1},\"1\":{\"12\":1}}],[\"中\",{\"0\":{\"8\":1},\"1\":{\"12\":1}}],[\"posts\",{\"0\":{\"14\":1}}],[\"projects\",{\"1\":{\"12\":1}}],[\"password\",{\"1\":{\"11\":1}}],[\"please\",{\"1\":{\"11\":1}}],[\"p\",{\"1\":{\"7\":1}}],[\"jianshu\",{\"1\":{\"7\":1}}],[\"文章\",{\"1\":{\"6\":1}}],[\"文件夹\",{\"1\":{\"5\":1,\"11\":1}}],[\"文件\",{\"1\":{\"4\":1,\"11\":1}}],[\"一番\",{\"1\":{\"11\":1}}],[\"一个\",{\"1\":{\"11\":2}}],[\"一篇\",{\"1\":{\"6\":1}}],[\"一直\",{\"1\":{\"2\":1}}],[\"另\",{\"1\":{\"6\":1}}],[\"我们\",{\"1\":{\"11\":1}}],[\"我\",{\"1\":{\"6\":1}}],[\"见\",{\"1\":{\"6\":1}}],[\"具体\",{\"1\":{\"6\":1}}],[\"远程桌面\",{\"1\":{\"6\":1}}],[\"类似\",{\"1\":{\"6\":1}}],[\"通过\",{\"1\":{\"6\":1}}],[\"可以\",{\"1\":{\"6\":1,\"11\":2}}],[\"已知\",{\"1\":{\"6\":1}}],[\"目前\",{\"1\":{\"6\":1}}],[\"桌面\",{\"0\":{\"6\":1},\"1\":{\"11\":3}}],[\"连接\",{\"0\":{\"6\":1},\"1\":{\"6\":1,\"11\":1,\"12\":1}}],[\"does\",{\"1\":{\"11\":1}}],[\"d\",{\"1\":{\"5\":1}}],[\"default\",{\"1\":{\"4\":3}}],[\"devblogs\",{\"1\":{\"3\":1}}],[\"运行\",{\"0\":{\"11\":1},\"1\":{\"5\":1,\"11\":3}}],[\"~\",{\"1\":{\"5\":1}}],[\"me\",{\"1\":{\"11\":1}}],[\"mnt\",{\"1\":{\"5\":1}}],[\"microsoft\",{\"1\":{\"3\":2}}],[\"server\",{\"1\":{\"12\":2}}],[\"sourceforge\",{\"1\":{\"12\":1}}],[\"sound\",{\"1\":{\"11\":1}}],[\"solutions\",{\"1\":{\"11\":1}}],[\"sudo\",{\"1\":{\"10\":1,\"11\":2}}],[\"subsystem\",{\"1\":{\"2\":1}}],[\"share\",{\"1\":{\"5\":2}}],[\"s\",{\"1\":{\"5\":1}}],[\"链接\",{\"1\":{\"5\":1}}],[\"软\",{\"1\":{\"5\":1}}],[\"指令\",{\"0\":{\"5\":1}}],[\"指定\",{\"1\":{\"4\":2,\"5\":1}}],[\"常用\",{\"0\":{\"5\":1}}],[\"如果\",{\"1\":{\"4\":1,\"11\":1}}],[\"xanadu13\",{\"1\":{\"4\":2}}],[\"登录\",{\"1\":{\"4\":1,\"11\":1}}],[\"先前\",{\"1\":{\"4\":1}}],[\"先导\",{\"1\":{\"4\":1}}],[\"压缩包\",{\"1\":{\"4\":1}}],[\"工作\",{\"1\":{\"4\":1}}],[\"后\",{\"1\":{\"4\":1,\"11\":1,\"12\":1}}],[\">\",{\"1\":{\"4\":5}}],[\"名称\",{\"1\":{\"4\":1}}],[\"<\",{\"1\":{\"4\":5}}],[\"格式\",{\"1\":{\"4\":2}}],[\"为\",{\"1\":{\"4\":1}}],[\"了\",{\"1\":{\"4\":1,\"11\":2}}],[\"导入\",{\"1\":{\"4\":2}}],[\"导出\",{\"1\":{\"4\":2}}],[\"步中\",{\"1\":{\"4\":1}}],[\"2\",{\"1\":{\"4\":3,\"7\":1}}],[\"20.04.\",{\"1\":{\"4\":2}}],[\"20.04\",{\"1\":{\"4\":4}}],[\"第\",{\"1\":{\"4\":1}}],[\"从\",{\"1\":{\"4\":1}}],[\"user\",{\"1\":{\"4\":3}}],[\"unregister\",{\"1\":{\"4\":1}}],[\"ubuntu2004\",{\"1\":{\"4\":1}}],[\"ubuntu\",{\"1\":{\"4\":6}}],[\"要\",{\"1\":{\"4\":1}}],[\"你\",{\"1\":{\"4\":1,\"11\":1,\"12\":1}}],[\"删除\",{\"1\":{\"4\":1,\"11\":1}}],[\"tigervnc\",{\"1\":{\"11\":1,\"12\":3}}],[\"tar\",{\"1\":{\"4\":3}}],[\"tutorials\",{\"1\":{\"3\":1}}],[\"\\\\\",{\"1\":{\"4\":6}}],[\"esm\",{\"1\":{\"11\":1}}],[\"exe\",{\"1\":{\"4\":3}}],[\"export\",{\"1\":{\"4\":1}}],[\"e\",{\"1\":{\"4\":3,\"5\":1}}],[\"路径\",{\"1\":{\"4\":3}}],[\"出\",{\"1\":{\"4\":1}}],[\"项\",{\"1\":{\"4\":1}}],[\"表示\",{\"1\":{\"4\":1}}],[\"*\",{\"1\":{\"4\":1}}],[\"左边\",{\"1\":{\"4\":1}}],[\"version\",{\"1\":{\"4\":2}}],[\"v\",{\"1\":{\"4\":1}}],[\"vmware\",{\"1\":{\"2\":1}}],[\"所有\",{\"1\":{\"4\":1}}],[\"当前\",{\"1\":{\"4\":1}}],[\"查看\",{\"1\":{\"4\":1}}],[\"其他\",{\"1\":{\"4\":1}}],[\"充足\",{\"1\":{\"4\":1}}],[\"容量\",{\"1\":{\"4\":1}}],[\"趁刚\",{\"1\":{\"4\":1}}],[\"建议\",{\"1\":{\"4\":1}}],[\"盘\",{\"1\":{\"4\":2}}],[\"安装\",{\"0\":{\"9\":1,\"10\":1},\"1\":{\"4\":3}}],[\"默认\",{\"1\":{\"4\":3,\"11\":1}}],[\"迁移\",{\"0\":{\"4\":1},\"1\":{\"4\":1}}],[\"access\",{\"1\":{\"11\":1}}],[\"apt\",{\"1\":{\"10\":1}}],[\"apps\",{\"1\":{\"3\":1}}],[\"a2d16029dc2\",{\"1\":{\"7\":1}}],[\"automatically\",{\"1\":{\"3\":1}}],[\"挂载\",{\"1\":{\"3\":1,\"5\":1}}],[\"自动\",{\"1\":{\"3\":1}}],[\"取消\",{\"1\":{\"3\":1}}],[\"c\",{\"1\":{\"4\":1}}],[\"config\",{\"1\":{\"4\":3}}],[\"configuring\",{\"1\":{\"3\":1}}],[\"comments\",{\"1\":{\"11\":1}}],[\"commandline\",{\"1\":{\"3\":1}}],[\"com\",{\"1\":{\"3\":2,\"7\":1,\"11\":2}}],[\"cn\",{\"1\":{\"3\":1}}],[\"-\",{\"0\":{\"8\":1,\"9\":1},\"1\":{\"3\":4,\"4\":29,\"5\":3,\"6\":1,\"9\":3,\"10\":2,\"11\":7,\"12\":3}}],[\"zh\",{\"1\":{\"3\":1}}],[\".\",{\"1\":{\"3\":4,\"4\":2,\"7\":2,\"11\":4,\"12\":1}}],[\"ln\",{\"1\":{\"5\":1}}],[\"list\",{\"1\":{\"4\":1}}],[\"linux\",{\"0\":{\"8\":1,\"9\":1},\"1\":{\"2\":1,\"4\":1,\"5\":1,\"6\":1,\"9\":1,\"11\":3,\"12\":1}}],[\"learn\",{\"1\":{\"3\":1}}],[\"/\",{\"1\":{\"3\":12,\"5\":5,\"7\":4,\"11\":12,\"12\":4}}],[\":\",{\"1\":{\"3\":2,\"4\":3,\"7\":1,\"11\":2,\"12\":1}}],[\"：\",{\"1\":{\"3\":2,\"4\":3,\"5\":2,\"6\":1,\"11\":5,\"12\":1}}],[\"应用\",{\"1\":{\"3\":1}}],[\"支持\",{\"1\":{\"3\":1}}],[\",\",{\"1\":{\"3\":2,\"4\":15,\"5\":3,\"11\":8,\"12\":2}}],[\"）\",{\"1\":{\"3\":1}}],[\"站\",{\"1\":{\"3\":1}}],[\"bash\",{\"1\":{\"12\":1}}],[\"bashonubuntuonwindows\",{\"1\":{\"11\":1}}],[\"b\",{\"1\":{\"3\":1}}],[\"或者\",{\"1\":{\"3\":1}}],[\"绝学\",{\"1\":{\"3\":1}}],[\"武林\",{\"1\":{\"3\":1}}],[\"需要\",{\"1\":{\"3\":1}}],[\"（\",{\"1\":{\"3\":1}}],[\"视频\",{\"1\":{\"3\":1,\"11\":1}}],[\"。\",{\"1\":{\"2\":1,\"11\":4,\"12\":2}}],[\"过程\",{\"1\":{\"2\":1}}],[\"配置\",{\"0\":{\"3\":1},\"1\":{\"2\":1,\"4\":1}}],[\"基本\",{\"0\":{\"3\":1},\"1\":{\"2\":1}}],[\"记录\",{\"0\":{\"8\":1},\"1\":{\"2\":1}}],[\"此时\",{\"1\":{\"11\":1}}],[\"此\",{\"1\":{\"2\":1}}],[\")\",{\"1\":{\"2\":1,\"12\":1}}],[\" \",{\"1\":{\"2\":3,\"4\":26,\"5\":5,\"6\":1,\"9\":2,\"10\":3,\"11\":8,\"12\":2,\"13\":2}}],[\"working\",{\"1\":{\"11\":1}}],[\"why\",{\"1\":{\"11\":1}}],[\"winkex\",{\"1\":{\"11\":1}}],[\"win\",{\"1\":{\"10\":1,\"12\":2}}],[\"windows\",{\"1\":{\"2\":1,\"3\":1}}],[\"www\",{\"1\":{\"7\":1,\"11\":1}}],[\"wsl\",{\"0\":{\"2\":1,\"6\":1,\"8\":1},\"1\":{\"2\":1,\"3\":2,\"4\":16,\"5\":3,\"6\":1,\"9\":1,\"11\":1,\"12\":1}}],[\"(\",{\"1\":{\"2\":1,\"12\":1}}],[\"到\",{\"1\":{\"2\":1,\"4\":2}}],[\"接触\",{\"1\":{\"2\":1}}],[\"偶然\",{\"1\":{\"2\":1}}],[\"是\",{\"1\":{\"2\":1,\"4\":1,\"11\":2}}],[\"都行\",{\"1\":{\"3\":1}}],[\"都\",{\"1\":{\"2\":1,\"11\":1}}],[\"的\",{\"1\":{\"2\":1,\"3\":1,\"4\":6,\"6\":2,\"11\":6,\"12\":3}}],[\"用户名\",{\"1\":{\"4\":1}}],[\"用户\",{\"1\":{\"4\":1,\"11\":1}}],[\"用\",{\"1\":{\"2\":1}}],[\"，\",{\"1\":{\"2\":3,\"3\":1,\"4\":2,\"6\":1,\"11\":12,\"12\":2}}],[\"时\",{\"1\":{\"2\":1,\"4\":1,\"11\":1}}],[\"实验\",{\"1\":{\"2\":1}}],[\"计网\",{\"1\":{\"2\":1}}],[\"做\",{\"1\":{\"2\":1}}],[\"在\",{\"0\":{\"8\":1},\"1\":{\"2\":2,\"4\":1,\"11\":2,\"12\":2}}],[\"备忘录\",{\"0\":{\"2\":1}}],[\"！\",{\"1\":{\"1\":1}}],[\"空空如也\",{\"1\":{\"1\":1}}],[\"页\",{\"0\":{\"1\":1}}],[\"介绍\",{\"0\":{\"1\":1},\"1\":{\"3\":1}}],[\"博客\",{\"0\":{\"0\":1}}]],\"version\":2}}")).map(([e,t])=>[e,It(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n,id:o}})=>{const r=Ct[s];e==="suggest"?self.postMessage([e,o,tt(t,r,n)]):e==="search"?self.postMessage([e,o,Z(t,r,n)]):self.postMessage({suggestions:[e,o,tt(t,r,n)],results:[e,o,Z(t,r,n)]})};
//# sourceMappingURL=index.js.map
