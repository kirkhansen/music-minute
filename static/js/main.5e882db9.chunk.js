(this["webpackJsonpmusic-minute"]=this["webpackJsonpmusic-minute"]||[]).push([[0],{24:function(e,t,a){},30:function(e,t,a){e.exports=a.p+"static/media/screen-shot-1.806d58ca.png"},31:function(e,t,a){e.exports=a.p+"static/media/screen-shot-2.a2de2822.png"},33:function(e,t,a){e.exports=a(60)},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},49:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(9),s=a.n(l),i=(a(38),a(10)),r=a(4),c=Object(r.a)();const u="/",d="/about",m="/create/names",h="/create/values",p=[{value:"3/2",label:"3/2"},{value:"2/2",label:"2/2"},{value:"2/4",label:"2/4"},{value:"3/4",label:"3/4"},{value:"4/4",label:"4/4"},{value:"5/4",label:"5/4"},{value:"3/8",label:"3/8"},{value:"5/8",label:"5/8"},{value:"6/8",label:"6/8"},{value:"9/8",label:"9/8"},{value:"12/8",label:"12/8"}],f=[{value:"w",label:"\ud834\udd5d"},{value:"h",label:"\ud834\udd5e"},{value:"q",label:"\u2669"},{value:"8",label:"\ud834\udd60"},{value:"16",label:"\ud834\udd61"},{value:"32",label:"\ud834\udd62"}],v={whole:{properName:"Whole Note",vfNotation:"w",duration:1,numericDesignation:1,active:!1},half:{properName:"Half Note",vfNotation:"h",duration:.5,numericDesignation:2,active:!1},quarter:{properName:"Quarter Note",vfNotation:"q",duration:.25,numericDesignation:4,active:!1},eighth:{properName:"Eighth Note",vfNotation:"8",duration:.125,numericDesignation:8,active:!1},sixteenth:{properName:"Sixteenth Note",vfNotation:"16",duration:.0625,numericDesignation:16,active:!1},thirtysecond:{properName:"Thirty-Second Note",vfNotation:"32",duration:.03125,numericDesignation:32,active:!1}};var g=a(16),N=a(14),E=a.n(N),b=a(2);a(39);function w(e){return+e.split("/")[0]}function y(e){return+e.split("/")[1]}function C(e){const t=function(e){const t=y(e),a=Object.keys(v);let n=null;a.forEach((e,a)=>{v[e].numericDesignation===t&&(n=a)});const o=1/v[a[n]].duration,l=[];return a.forEach((e,t)=>{let a={};a.properName=v[e].properName,a.normalizedDuration=v[e].duration*o,a.vfNotation=v[e].vfNotation,l.push(a)}),l}(e),a=w(e);return t.filter(e=>e.normalizedDuration<=a)}function k(e,t){const a=function(e,t){const a=y(e),n=Object.keys(t);let o=null;n.forEach((e,n)=>{t[e].numericDesignation===a&&(o=n)});const l=1/t[n[o]].duration,s=[];return n.forEach((e,a)=>{let n={};n.properName=t[e].properName,n.normalizedDuration=t[e].duration*l,n.vfNotation=t[e].vfNotation,n.active=t[e].active,n.duration=t[e].duration,n.numericDesignation=t[e].numericDesignation,s.push(n)}),s}(e,t),n=w(e);return a.filter(T,n)}function T(e){return e.normalizedDuration<=this&&!0===e.active}function S(e){return e[Math.floor(Math.random()*Math.floor(e.length))]}function M(e,t){const a=[];for(let n=0;n<e;n+=1)a.push(t[Math.floor(Math.random()*Math.floor(t.length))]);return a}function F(e){return function(e){return e[Math.floor(Math.random()*Math.floor(e.length))]}(e)}function x(e,t){const a=[];let n=e,o=0;for(;n>0;)t[o].normalizedDuration<=n?(n-=t[o].normalizedDuration,a.push(o)):o+=1;return a}function D(e){if(0===e)return"";if(1===e)return"r";return Math.random()<.5?"":"r"}class q extends n.Component{constructor(e){super(e),console.log(this.props);const t=e.allowedNotes,a=e.identifier,n=e.noteTypes,o=S(e.allowedMeters),l=k(o,t),s=F(l);this.state={sTimeSignature:o,sAllowedNotes:l,sAllowedMeters:e.allowedMeters,sPickedNote:s,sNumberOfBeats:w(o),sBeatValue:y(o),sId:a,sNoteSuffix:D(n)},console.log(this.state),this.clefType="percussion",this.fakeClefType="treble",this.notePosition=["b/4"],this.barType="double",this.lineConfig=[{visible:!1},{visible:!1},{visible:!0},{visible:!1},{visible:!1}],this.handleClick=this.handleClick.bind(this)}componentDidUpdate(){console.log(this.state);const e=this.state,t=e.sId,a=e.sTimeSignature,n=e.sPickedNote,o=e.sNoteSuffix;document.getElementById(t).innerHTML="";const l=document.getElementById(t);var s=new b.a.Flow.Renderer(l,b.a.Flow.Renderer.Backends.SVG);s.resize(150,150);var i=s.getContext(),r=new b.a.Flow.Stave(10,40,120);r.setConfigForLines(this.lineConfig),r.addClef(this.clefType).addTimeSignature(a).setEndBarType(this.barType);var c=[];if(w(a)-n.normalizedDuration===0)c.push(new b.a.Flow.StaveNote({clef:this.fakeClefType,keys:this.notePosition,duration:n.vfNotation}));else{c.push(new b.a.Flow.StaveNote({clef:this.fakeClefType,keys:this.notePosition,duration:"".concat(n.vfNotation).concat(o)}));const e=w(a)-n.normalizedDuration,t=C(a).find(t=>t.normalizedDuration===e);if(t)c.push(new b.a.Flow.GhostNote({clef:this.fakeClefType,keys:this.notePosition,duration:t.vfNotation}));else{x(e,C(a)).forEach(e=>{c.push(new b.a.Flow.GhostNote({clef:this.fakeClefType,keys:this.notePosition,duration:C(a)[e].vfNotation}))})}}var u=new b.a.Flow.Voice({num_beats:w(a),beat_value:y(a)});u.addTickables(c),(new b.a.Flow.Formatter).joinVoices([u]).format([u],120),r.setContext(i).draw(),u.draw(i,r)}componentDidMount(){const e=this.state,t=e.sTimeSignature,a=e.sId,n=e.sNoteSuffix,o=e.sPickedNote,l=document.createElement("div");l.id=a,l.classList.add("note-question","col-sm-2");const s=document.getElementById("note-container-row"),i=document.getElementsByClassName(a)[0];i.appendChild(l),s.appendChild(i);var r=new b.a.Flow.Renderer(l,b.a.Flow.Renderer.Backends.SVG);r.resize(150,150);var c=r.getContext(),u=new b.a.Flow.Stave(10,40,120);u.setConfigForLines(this.lineConfig),u.addClef(this.clefType).addTimeSignature(t).setEndBarType(this.barType);var d=[];if(w(t)-o.normalizedDuration===0)d.push(new b.a.Flow.StaveNote({clef:this.fakeClefType,keys:this.notePosition,duration:o.vfNotation}));else{d.push(new b.a.Flow.StaveNote({clef:this.fakeClefType,keys:this.notePosition,duration:"".concat(o.vfNotation).concat(n)}));const e=w(t)-o.normalizedDuration,a=C(t).find(t=>t.normalizedDuration===e);if(a)d.push(new b.a.Flow.GhostNote({clef:this.fakeClefType,keys:this.notePosition,duration:a.vfNotation}));else{x(e,C(t)).forEach(e=>{d.push(new b.a.Flow.GhostNote({clef:this.fakeClefType,keys:this.notePosition,duration:C(t)[e].vfNotation}))})}}var m=new b.a.Flow.Voice({num_beats:w(t),beat_value:y(t)});m.addTickables(d),(new b.a.Flow.Formatter).joinVoices([m]).format([m],120),u.setContext(c).draw(),m.draw(c,u)}handleClick(e){const t=this.state.sAllowedMeters,a=this.props.allowedNotes,n=S(t),o=k(n,a),l=F(o);this.setState({sTimeSignature:n,sAllowedNotes:o,sPickedNote:l,sNumberOfBeats:w(n),sBeatValue:y(n)})}render(){const e=this.state.sId,t="".concat(e," quest-container");return o.a.createElement("div",{className:t},o.a.createElement("button",{type:"button","data-id":e,onClick:this.handleClick},o.a.createElement("i",{className:"screen-only fa fa-redo-alt"})))}}var P=q;class O extends o.a.Component{constructor(e){super(e),this.state={hasError:!1}}componentDidCatch(e,t){this.setState({hasError:!0})}render(){return this.state.hasError?o.a.createElement("h6",null,"Did you select a not and time signature that are not compatible?"):this.props.children}}var R=O,V=a(8);a(40);class z extends o.a.PureComponent{render(){const e=this.props.children;return o.a.createElement(n.Fragment,null,o.a.createElement("nav",{className:"screen-only navbar navbar-expand-lg navbar-dark bg-dark"},o.a.createElement(V.a,{className:"navbar-brand",to:u},o.a.createElement("i",{className:"fas fa-music"})," Music Minute"),o.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNavAltMarkup","aria-controls":"navbarNavAltMarkup","aria-expanded":"false","aria-label":"Toggle navigation"},o.a.createElement("span",{className:"navbar-toggler-icon"})),o.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarNavAltMarkup"},o.a.createElement("div",{className:"navbar-nav"},o.a.createElement(V.b,{activeClassName:"active",className:"nav-item nav-link",exact:!0,to:u},"Create"),o.a.createElement(V.b,{activeClassName:"active",className:"nav-item nav-link",to:d},"About")))),o.a.createElement("main",null,e))}}var B=z;a(49);class Q extends n.Component{constructor(e){super(e),this.state={questionTypes:0,questionCount:20,renderWorksheet:!1,timeSigs:[],allowedNotes:v,allowedMeters:null,hasCustomNotes:!1},this.handleChangeOfAllowedValues=this.handleChangeOfAllowedValues.bind(this),this.handleChangeQuestionTypes=this.handleChangeQuestionTypes.bind(this),this.handleChangeQuestionCount=this.handleChangeQuestionCount.bind(this),this.handleMeterChange=this.handleMeterChange.bind(this),this.handleToggleRender=this.handleToggleRender.bind(this)}componentWillUnmount(){this.timesSigs=[]}handleToggleRender(){const e=this.state,t=e.renderWorksheet,a=e.allowedMeters,n=e.questionCount;console.log(M(10,a)),this.setState({renderWorksheet:!t,timeSigs:M(n,a)})}handleChangeQuestionTypes(e){this.setState({questionTypes:+e.currentTarget.value})}handleChangeOfAllowedValues(e){const t=this.state.allowedNotes,a=Object.keys(t);let n=!1;for(let o=0;o<a.length;o+=1)t[a[o]].active=!1;for(let o=0;o<e.length;o+=1)for(let l=0;l<a.length;l+=1)t[a[l]].vfNotation===e[o].value&&(t[a[l]].active=!0,n=!0);this.state.allowedMeters&&this.state.allowedMeters.length,this.setState({allowedNotes:t,canRender:this.state.allowedMeters&&0!==this.state.allowedMeters.length&&!0===n})}handleMeterChange(e){console.log(e);const t=[];for(let o=0;o<e.length;o+=1)t.push(e[o].value);console.log(t);const a=(n=this.state.allowedNotes,Object.values(n).find(e=>!0===e.active));var n;this.setState({allowedMeters:t,canRender:t&&a})}handleChangeQuestionCount(e){console.log(e),this.setState({questionCount:+e.currentTarget.value})}render(){const e=this.state,t=e.questionCount,a=e.questionTypes,n=e.timeSigs,l=e.renderWorksheet,s=e.allowedNotes,i=e.allowedMeters,r=e.canRender,c=l?"Reset":"Render Worksheet";return o.a.createElement(B,null,o.a.createElement("form",{className:E()({hide:l})},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-3"},o.a.createElement("fieldset",null,o.a.createElement("h3",null,"Note Types"),o.a.createElement("input",{id:"notes",type:"radio",name:"questionTypes",value:"0",onClick:this.handleChangeQuestionTypes,defaultChecked:!0}),o.a.createElement("label",{htmlFor:"notes"},"Only Notes"),o.a.createElement("br",null),o.a.createElement("input",{id:"rests",type:"radio",name:"questionTypes",value:"1",onClick:this.handleChangeQuestionTypes}),o.a.createElement("label",{htmlFor:"rests"},"Only Rests"),o.a.createElement("br",null),o.a.createElement("input",{id:"notes|rests",type:"radio",name:"questionTypes",value:"2",onClick:this.handleChangeQuestionTypes}),o.a.createElement("label",{htmlFor:"notes"},"Notes & Rests"))),o.a.createElement("div",{className:"col-3"},o.a.createElement("fieldset",null,o.a.createElement("h4",null,"Number of Questions"),o.a.createElement("input",{type:"number",id:"number-of-questions",name:"numberOfQuestions",min:"1",max:"60",default:t,placeholder:t,onChange:this.handleChangeQustionCount,onInput:this.handleChangeQuestionCount}))),o.a.createElement("div",{className:"col-6"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12"},o.a.createElement("fieldset",null,o.a.createElement("h4",null,"Time Signatures"),o.a.createElement(g.a,{id:"time-signatures",onChange:this.handleMeterChange,isMulti:!0,isSearchable:!0,options:p,placeholder:"Select time signature(s)."}),o.a.createElement("label",{className:"sr-only",htmlFor:"time-signatures"},"Selection of time signatures")))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-12"},o.a.createElement("fieldset",null,o.a.createElement("h4",null,"Note Value Options"),o.a.createElement(g.a,{id:"note-selection",onChange:this.handleChangeOfAllowedValues,isMulti:!0,isSearchable:!0,options:f,placeholder:"Select note type(s)."}),o.a.createElement("label",{className:"sr-only",htmlFor:"time-signatures"},"Selection of Note Values")))))),o.a.createElement("hr",null)),o.a.createElement("button",{className:"btn btn-primary mt-4 screen-only",type:"button",onClick:this.handleToggleRender,disabled:!r},c),o.a.createElement("button",{id:"print-value-worksheet",onClick:function(){window.print()},className:E()({hide:!l},"btn","screen-only","btn-secondary","mt-4"),type:"button"},o.a.createElement("i",{className:"fas fa-print"})," Print"),l&&o.a.createElement("div",{id:"questions"},o.a.createElement("div",{id:"note-container-row",className:"row"},n.map((e,t)=>o.a.createElement(R,null,o.a.createElement(P,{allowedNotes:s,timeSignature:e,allowedMeters:i,noteTypes:a,key:"ts-".concat(t),identifier:"ts-".concat(t)}))))))}}var A=Q;a(24);var I=e=>o.a.createElement("div",null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-sm-8"},o.a.createElement("p",null,"Shamelessly stolen from ",o.a.createElement("a",{href:"http://secondrunnerup.com/mmm2/"},"Mad Music 2")))));var W=e=>o.a.createElement(B,null,o.a.createElement(I,null)),j=(a(59),a(30)),G=a.n(j),L=a(31),_=a.n(L);var H=e=>o.a.createElement(B,null,o.a.createElement("div",{className:"home-container"},o.a.createElement(V.b,{to:m},o.a.createElement("div",{class:"card"},o.a.createElement("img",{src:_.a,class:"card-img-top",alt:"..."}),o.a.createElement("div",{class:"card-body"},o.a.createElement("h5",{class:"card-title"},"Note Namer"),o.a.createElement("p",{class:"card-text"},"Create a worksheet of random notes picking from a number of clefs, ranges, and key-signatures.")))),o.a.createElement(V.b,{to:h},o.a.createElement("div",{class:"card"},o.a.createElement("img",{src:G.a,class:"card-img-top",alt:"..."}),o.a.createElement("div",{class:"card-body"},o.a.createElement("h5",{class:"card-title"},"Note Value"),o.a.createElement("p",{class:"card-text"},"Create a worksheet of random notes values. Pick from a number of diferent time-signatures and note values."))))));var J=e=>o.a.createElement(B,null,o.a.createElement("div",null,o.a.createElement("h1",null,"Not Found")));var U=()=>o.a.createElement(i.c,null,o.a.createElement(i.a,{exact:!0,path:u,component:H}),o.a.createElement(i.a,{exact:!0,path:d,component:W}),o.a.createElement(i.a,{exact:!0,path:m,component:J}),o.a.createElement(i.a,{exact:!0,path:h,component:A}),o.a.createElement(i.a,{component:J}));class $ extends n.Component{render(){return o.a.createElement(i.b,{history:c},o.a.createElement(U,null))}}var K=$;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})}},[[33,1,2]]]);
//# sourceMappingURL=main.5e882db9.chunk.js.map