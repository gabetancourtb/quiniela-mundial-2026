import React from "react";
import { useState, useEffect } from "react";

const MATCHES = [
  { id:1,  date:"2026-06-11", venue:"Cd. México",    group:"A", home:"MEXICO",          away:"SUDAFRICA" },
  { id:2,  date:"2026-06-11", venue:"Guadalajara",   group:"A", home:"COREA DEL SUR",   away:"CHEQUIA" },
  { id:3,  date:"2026-06-12", venue:"Toronto",       group:"B", home:"CANADA",          away:"BOSNIA Y HERZ." },
  { id:4,  date:"2026-06-12", venue:"Los Ángeles",   group:"D", home:"EE.UU",           away:"PARAGUAY" },
  { id:5,  date:"2026-06-13", venue:"San Francisco", group:"B", home:"QATAR",           away:"SUIZA" },
  { id:6,  date:"2026-06-13", venue:"New Jersey",    group:"C", home:"BRASIL",          away:"MARRUECOS" },
  { id:7,  date:"2026-06-13", venue:"Boston",        group:"C", home:"HAITI",           away:"ESCOCIA" },
  { id:8,  date:"2026-06-14", venue:"Vancouver",     group:"D", home:"AUSTRALIA",       away:"TURQUIA" },
  { id:9,  date:"2026-06-14", venue:"Houston",       group:"E", home:"ALEMANIA",        away:"CURAZAO" },
  { id:10, date:"2026-06-14", venue:"Dallas",        group:"F", home:"PAISES BAJOS",    away:"JAPON" },
  { id:11, date:"2026-06-14", venue:"Filadelfia",    group:"E", home:"COSTA DE MARFIL", away:"ECUADOR" },
  { id:12, date:"2026-06-14", venue:"Monterrey",     group:"F", home:"SUECIA",          away:"TUNEZ" },
  { id:13, date:"2026-06-15", venue:"Atlanta",       group:"H", home:"ESPANA",          away:"CABO VERDE" },
  { id:14, date:"2026-06-15", venue:"Seattle",       group:"G", home:"BELGICA",         away:"EGIPTO" },
  { id:15, date:"2026-06-15", venue:"Miami",         group:"H", home:"ARABIA SAUDITA",  away:"URUGUAY" },
  { id:16, date:"2026-06-15", venue:"Los Ángeles",   group:"G", home:"IRAN",            away:"NUEVA ZELANDA" },
  { id:17, date:"2026-06-16", venue:"New Jersey",    group:"I", home:"FRANCIA",         away:"SENEGAL" },
  { id:18, date:"2026-06-16", venue:"Boston",        group:"I", home:"IRAK",            away:"NORUEGA" },
  { id:19, date:"2026-06-16", venue:"Kansas City",   group:"J", home:"ARGENTINA",       away:"ARGELIA" },
  { id:20, date:"2026-06-17", venue:"San Francisco", group:"J", home:"AUSTRIA",         away:"JORDANIA" },
  { id:21, date:"2026-06-17", venue:"Houston",       group:"K", home:"PORTUGAL",        away:"REP. DEL CONGO" },
  { id:22, date:"2026-06-17", venue:"Dallas",        group:"L", home:"INGLATERRA",      away:"CROACIA" },
  { id:23, date:"2026-06-17", venue:"Toronto",       group:"L", home:"GHANA",           away:"PANAMA" },
  { id:24, date:"2026-06-17", venue:"Cd. México",    group:"K", home:"UZBEKISTAN",      away:"COLOMBIA" },
  { id:25, date:"2026-06-18", venue:"Atlanta",       group:"A", home:"CHEQUIA",         away:"SUDAFRICA" },
  { id:26, date:"2026-06-18", venue:"Los Ángeles",   group:"B", home:"SUIZA",           away:"BOSNIA Y HERZ." },
  { id:27, date:"2026-06-18", venue:"Vancouver",     group:"B", home:"CANADA",          away:"QATAR" },
  { id:28, date:"2026-06-18", venue:"Guadalajara",   group:"A", home:"MEXICO",          away:"COREA DEL SUR" },
  { id:29, date:"2026-06-19", venue:"Seattle",       group:"D", home:"EE.UU",           away:"AUSTRALIA" },
  { id:30, date:"2026-06-19", venue:"Boston",        group:"C", home:"ESCOCIA",         away:"MARRUECOS" },
  { id:31, date:"2026-06-19", venue:"Filadelfia",    group:"C", home:"BRASIL",          away:"HAITI" },
  { id:32, date:"2026-06-19", venue:"San Francisco", group:"D", home:"TURQUIA",         away:"PARAGUAY" },
  { id:33, date:"2026-06-20", venue:"Houston",       group:"F", home:"PAISES BAJOS",    away:"SUECIA" },
  { id:34, date:"2026-06-20", venue:"Toronto",       group:"E", home:"ALEMANIA",        away:"COSTA DE MARFIL" },
  { id:35, date:"2026-06-20", venue:"Kansas City",   group:"E", home:"ECUADOR",         away:"CURAZAO" },
  { id:36, date:"2026-06-21", venue:"Monterrey",     group:"F", home:"TUNEZ",           away:"JAPON" },
  { id:37, date:"2026-06-21", venue:"Atlanta",       group:"H", home:"ESPANA",          away:"ARABIA SAUDITA" },
  { id:38, date:"2026-06-21", venue:"Los Ángeles",   group:"G", home:"BELGICA",         away:"IRAN" },
  { id:39, date:"2026-06-21", venue:"Miami",         group:"H", home:"URUGUAY",         away:"CABO VERDE" },
  { id:40, date:"2026-06-21", venue:"Vancouver",     group:"G", home:"NUEVA ZELANDA",   away:"EGIPTO" },
  { id:41, date:"2026-06-22", venue:"Dallas",        group:"J", home:"ARGENTINA",       away:"AUSTRIA" },
  { id:42, date:"2026-06-22", venue:"Filadelfia",    group:"I", home:"FRANCIA",         away:"IRAK" },
  { id:43, date:"2026-06-22", venue:"New Jersey",    group:"I", home:"NORUEGA",         away:"SENEGAL" },
  { id:44, date:"2026-06-22", venue:"San Francisco", group:"J", home:"JORDANIA",          away:"ARGELIA" },
  { id:45, date:"2026-06-23", venue:"Houston",       group:"K", home:"PORTUGAL",        away:"UZBEKISTAN" },
  { id:46, date:"2026-06-23", venue:"Boston",        group:"L", home:"INGLATERRA",      away:"GHANA" },
  { id:47, date:"2026-06-23", venue:"Toronto",       group:"L", home:"PANAMA",          away:"CROACIA" },
  { id:48, date:"2026-06-23", venue:"Guadalajara",   group:"K", home:"COLOMBIA",        away:"REP. DEL CONGO" },
  { id:49, date:"2026-06-24", venue:"Vancouver",     group:"B", home:"SUIZA",           away:"CANADA" },
  { id:50, date:"2026-06-24", venue:"Seattle",       group:"B", home:"BOSNIA Y HERZ.",  away:"QATAR" },
  { id:51, date:"2026-06-24", venue:"Miami",         group:"C", home:"ESCOCIA",         away:"BRASIL" },
  { id:52, date:"2026-06-24", venue:"Atlanta",       group:"C", home:"MARRUECOS",       away:"HAITI" },
  { id:53, date:"2026-06-24", venue:"Cd. México",    group:"A", home:"CHEQUIA",         away:"MEXICO" },
  { id:54, date:"2026-06-24", venue:"Monterrey",     group:"A", home:"SUDAFRICA",       away:"COREA DEL SUR" },
  { id:55, date:"2026-06-25", venue:"Filadelfia",    group:"E", home:"CURAZAO",         away:"COSTA DE MARFIL" },
  { id:56, date:"2026-06-25", venue:"New Jersey",    group:"E", home:"ECUADOR",         away:"ALEMANIA" },
  { id:57, date:"2026-06-25", venue:"Dallas",        group:"F", home:"JAPON",           away:"SUECIA" },
  { id:58, date:"2026-06-25", venue:"Kansas City",   group:"F", home:"TUNEZ",           away:"PAISES BAJOS" },
  { id:59, date:"2026-06-25", venue:"Los Ángeles",   group:"D", home:"TURQUIA",         away:"EE.UU" },
  { id:60, date:"2026-06-25", venue:"San Francisco", group:"D", home:"PARAGUAY",        away:"AUSTRALIA" },
  { id:61, date:"2026-06-26", venue:"Boston",        group:"I", home:"NORUEGA",         away:"FRANCIA" },
  { id:62, date:"2026-06-26", venue:"Toronto",       group:"I", home:"SENEGAL",         away:"IRAK" },
  { id:63, date:"2026-06-26", venue:"Houston",       group:"H", home:"CABO VERDE",      away:"ARABIA SAUDITA" },
  { id:64, date:"2026-06-26", venue:"Guadalajara",   group:"H", home:"URUGUAY",         away:"ESPANA" },
  { id:65, date:"2026-06-26", venue:"Seattle",       group:"G", home:"EGIPTO",          away:"IRAN" },
  { id:66, date:"2026-06-26", venue:"Vancouver",     group:"G", home:"NUEVA ZELANDA",   away:"BELGICA" },
  { id:67, date:"2026-06-27", venue:"New Jersey",    group:"L", home:"PANAMA",          away:"INGLATERRA" },
  { id:68, date:"2026-06-27", venue:"Filadelfia",    group:"L", home:"CROACIA",         away:"GHANA" },
  { id:69, date:"2026-06-27", venue:"Miami",         group:"K", home:"COLOMBIA",        away:"PORTUGAL" },
  { id:70, date:"2026-06-27", venue:"Atlanta",       group:"K", home:"REP. DEL CONGO",  away:"UZBEKISTAN" },
  { id:71, date:"2026-06-27", venue:"Kansas City",   group:"J", home:"ARGELIA",         away:"AUSTRIA" },
  { id:72, date:"2026-06-27", venue:"Dallas",        group:"J", home:"JORDANIA",          away:"ARGENTINA" },
];

const GROUPS = ["A","B","C","D","E","F","G","H","I","J","K","L"];
const CORRECT_PIN = "2026";

// Real results for first 5 days (matches 1-20)
const TEST_RESULTS = {
  1:[2,0], 2:[1,1], 3:[1,0], 4:[3,1], 5:[0,2],
  6:[2,0], 7:[0,1], 8:[1,2], 9:[4,0], 10:[2,1],
  11:[1,1], 12:[2,0], 13:[3,0], 14:[2,1], 15:[0,1],
  16:[2,0], 17:[2,1], 18:[0,2], 19:[3,0], 20:[1,0],
};

// 30 participants with random picks
const NAMES = [
  "Carlos M.","Sofia R.","Diego L.","Ana P.","Javier T.",
  "María G.","Roberto S.","Lucia F.","Miguel A.","Paula V.",
  "Andrés C.","Valentina H.","Fernando B.","Isabella M.","Ricardo N.",
  "Camila O.","Eduardo Z.","Daniela Q.","Sergio W.","Natalia E.",
  "Luis K.","Gabriela Y.","Jorge X.","Mariana U.","Pablo I.",
  "Catalina J.","Alejandro D.","Verónica R.","Tomás S.","Renata L.",
];
const COLORS = [
  "#FF6B35","#00B4D8","#06D6A0","#FF4D6D","#FFD60A",
  "#C77DFF","#F4A261","#43AA8B","#E63946","#457B9D",
  "#2DC653","#F72585","#4CC9F0","#7209B7","#FB8500",
  "#8338EC","#3A86FF","#FF006E","#FFBE0B","#51CF66",
  "#74C0FC","#FFA94D","#A9E34B","#DA77F2","#63E6BE",
  "#FF8787","#4DABF7","#69DB7C","#FFC078","#E599F7",
];

function rnd(n) { return Math.floor(Math.random() * n); }
function genPick(matchId) {
  const r = TEST_RESULTS[matchId];
  const roll = Math.random();
  if (roll < 0.15) return [r[0], r[1]];        // 15% exact
  if (roll < 0.45) {                             // 30% correct outcome
    if (r[0] > r[1]) return [rnd(3)+1, rnd(2)];
    if (r[0] < r[1]) return [rnd(2), rnd(3)+1];
    return [rnd(2), rnd(2)];
  }
  // 55% wrong
  const opts = [[0,1],[1,0],[0,0],[1,2],[2,0],[0,2],[1,1],[2,2],[3,1],[1,3]];
  const wrong = opts.filter(([h,a]) => {
    const po = h>a?"H":h<a?"A":"D", ro = r[0]>r[1]?"H":r[0]<r[1]?"A":"D";
    return po !== ro;
  });
  return wrong[rnd(wrong.length)] || [0,1];
}

const TEST_PARTICIPANTS = NAMES.map((name, i) => {
  const picks = {};
  Object.keys(TEST_RESULTS).forEach(id => {
    picks[parseInt(id)] = genPick(parseInt(id));
  });
  return { id: i+1, name, color: COLORS[i], picks };
});

function calcPoints(pred, real) {
  if (!pred || !real) return 0;
  const [ph,pa]=pred, [rh,ra]=real;
  if (ph===rh && pa===ra) return 5;
  const po=ph>pa?"H":ph<pa?"A":"D", ro=rh>ra?"H":rh<ra?"A":"D";
  return po===ro ? 3 : 0;
}

function Pts({ pts }) {
  const bg=pts===5?"#FFD60A":pts===3?"#06D6A0":"rgba(255,255,255,0.1)";
  const fg=pts>=3?"#111":"rgba(255,255,255,0.3)";
  return <span style={{background:bg,color:fg,borderRadius:10,padding:"2px 7px",fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{pts===5?"5pts":pts===3?"3pts":"0"}</span>;
}

function SBox({ v }) {
  return (
    <div style={{width:38,height:34,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:6,fontSize:18,fontWeight:700,color:v!=null?"#fff":"rgba(255,255,255,0.15)"}}>
      {v!=null?v:"—"}
    </div>
  );
}

function SInput({ v, onChange }) {
  return (
    <input type="number" min="0" max="20" value={v??""} onChange={e=>onChange(e.target.value===""?null:parseInt(e.target.value))}
      style={{width:48,height:40,textAlign:"center",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:8,color:"#fff",fontSize:22,fontWeight:700,outline:"none",WebkitAppearance:"none",flexShrink:0}}
    />
  );
}

function GFilter({ val, set }) {
  return (
    <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch",paddingBottom:2}}>
      <div style={{display:"flex",gap:6,width:"max-content"}}>
        {["ALL",...GROUPS].map(g=>(
          <button key={g} onClick={()=>set(g)} style={{flexShrink:0,background:val===g?"rgba(255,214,10,0.18)":"rgba(255,255,255,0.05)",border:`1px solid ${val===g?"rgba(255,214,10,0.5)":"rgba(255,255,255,0.1)"}`,borderRadius:20,padding:"5px 12px",fontSize:12,fontWeight:600,color:val===g?"#FFD60A":"rgba(255,255,255,0.45)",cursor:"pointer",whiteSpace:"nowrap"}}>
          {g==="ALL"?"Todos":`Gr.${g}`}
          </button>
        ))}
      </div>
    </div>
  );
}

function PinModal({ onSuccess, onCancel }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  function handle(n) {
    if (n==="⌫") { setPin(p=>p.slice(0,-1)); setError(false); return; }
    const next = pin+n;
    setPin(next);
    setError(false);
    if (next.length===4) {
      if (next===CORRECT_PIN) onSuccess();
      else { setError(true); setPin(""); }
    }
  }
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(7,11,24,0.97)",zIndex:100,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:24}}>
      <div style={{fontSize:44}}>🔐</div>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:18,fontWeight:800,letterSpacing:2,color:"#FFD60A",marginBottom:4}}>ACCESO RESTRINGIDO</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>Ingresa el PIN de 4 dígitos para editar resultados</div>
      </div>
      <div style={{display:"flex",gap:12}}>
        {[0,1,2,3].map(i=>(
          <div key={i} style={{width:16,height:16,borderRadius:"50%",background:pin.length>i?"#FFD60A":"rgba(255,255,255,0.15)",border:"2px solid rgba(255,255,255,0.2)",transition:"all 0.2s"}}/>
        ))}
      </div>
      {error&&<div style={{background:"rgba(255,77,109,0.15)",border:"1px solid rgba(255,77,109,0.3)",borderRadius:10,padding:"8px 20px",fontSize:12,color:"rgba(255,77,109,0.9)"}}>❌ PIN incorrecto, intenta de nuevo</div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,width:"100%",maxWidth:260}}>
        {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((n,i)=>(
          <button key={i} onClick={()=>n!==""&&handle(String(n))} style={{background:n===""?"transparent":"rgba(255,255,255,0.07)",border:n===""?"none":"1px solid rgba(255,255,255,0.12)",borderRadius:12,padding:"16px 0",fontSize:24,fontWeight:700,color:"#fff",cursor:n===""?"default":"pointer"}}>{n}</button>
        ))}
      </div>
      <button onClick={onCancel} style={{fontSize:12,color:"rgba(255,255,255,0.3)",marginTop:4,background:"none",border:"none",cursor:"pointer"}}>← Cancelar</button>
    </div>
  );
}

export default function App() {
  const [tab,setTab]         = useState("dashboard");
  const [parts]              = useState(TEST_PARTICIPANTS);
  const [results,setResults] = useState(()=>{
    try { const s=localStorage.getItem("quiniela_results_2026"); return s?JSON.parse(s):TEST_RESULTS; } catch{ return TEST_RESULTS; }
  });

  useEffect(()=>{
    try { localStorage.setItem("quiniela_results_2026", JSON.stringify(results)); } catch{}
  }, [results]);
  const [fg,setFg]           = useState("ALL");
  const [fd,setFd]           = useState("ALL"); // date filter for picks
  const [activeP,setActiveP] = useState(1);
  const [editRes,setEditRes] = useState({});
  const [canEdit,setCanEdit] = useState(false);
  const [showPin,setShowPin] = useState(false);

  const scores = parts.map(p=>{
    let total=0,exact=0,outcome=0;
    MATCHES.forEach(m=>{
      const pred=p.picks[m.id],real=results[m.id];
      if(pred&&real){const pts=calcPoints(pred,real);total+=pts;if(pts===5)exact++;else if(pts===3)outcome++;}
    });
    return{...p,total,exact,outcome};
  }).sort((a,b)=>b.total-a.total);

  const playedDates=[...new Set(MATCHES.filter(m=>results[m.id]).map(m=>m.date))].sort();
  const ptsByDate=playedDates.map(date=>{
    const ms=MATCHES.filter(m=>m.date===date&&results[m.id]);
    const pp=parts.map(p=>({...p,pts:ms.reduce((s,m)=>s+(p.picks[m.id]&&results[m.id]?calcPoints(p.picks[m.id],results[m.id]):0),0)})).sort((a,b)=>b.pts-a.pts);
    return{date,count:ms.length,pp};
  });

  const rem=MATCHES.filter(m=>!results[m.id]).length;
  const maxRem=rem*5;
  const leader=scores[0]?.total??0;
  const alive=scores.map(p=>({...p,maxP:p.total+maxRem,canWin:p.total+maxRem>=leader,gap:leader-p.total}));
  const allDates = [...new Set(MATCHES.map(m=>m.date))].sort();
  const played=Object.keys(results).length;
  const filtered=fg==="ALL"?MATCHES:MATCHES.filter(m=>m.group===fg);
  const filteredByDate = fd==="ALL" ? filtered : filtered.filter(m=>m.date===fd);
  const part=parts.find(p=>p.id===activeP);
  const lastPlayedDate = playedDates.length>0 ? playedDates[playedDates.length-1] : null;

  function setResult(id,h,a){
    if(h!==""&&h!==null&&a!==""&&a!==null) setResults(prev=>({...prev,[id]:[parseInt(h),parseInt(a)]}));
    else setResults(prev=>{const n={...prev};delete n[id];return n;});
  }

  const NAV=[{id:"dashboard",icon:"📊",label:"Tabla"},{id:"picks",icon:"🔒",label:"Picks"},{id:"results",icon:"⚽",label:"Resultados"},{id:"analysis",icon:"📈",label:"Análisis"}];

  return (
    <div style={{minHeight:"100vh",background:"#070b18",fontFamily:"Inter,sans-serif",color:"#e8eaf0",width:"100%",maxWidth:480,margin:"0 auto",fontSize:14,overflowX:"clip"}}>
      <style>{`
        *{box-sizing:border-box;}
        html{overflow-x:clip;}
        body{overflow-x:clip;margin:0;}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}
        button{cursor:pointer;border:none;font-family:inherit;background:none;}
        ::-webkit-scrollbar{display:none;}
      `}</style>

      {showPin && <PinModal onSuccess={()=>{setCanEdit(true);setShowPin(false);}} onCancel={()=>setShowPin(false)}/>}

      {/* NAV */}
      <div style={{background:"rgba(7,11,24,0.98)",borderBottom:"1px solid rgba(255,255,255,0.08)",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px 4px"}}>
          <div>
            <div style={{fontSize:17,fontWeight:800,letterSpacing:2,color:"#FFD60A",lineHeight:1}}>🏆 QUINIELA MUNDIAL 2026</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",letterSpacing:1,marginTop:1}}>CANADÁ · EE.UU · MÉXICO — FASE DE GRUPOS</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:16,fontWeight:700,color:"rgba(255,255,255,0.45)"}}>{played}<span style={{fontSize:11,fontWeight:400}}>/72</span></div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.28)"}}>{parts.length} participantes</div>
          </div>
        </div>
        <div style={{display:"flex"}}>
          {NAV.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"7px 2px 9px",borderBottom:`2px solid ${tab===t.id?"#FFD60A":"transparent"}`,color:tab===t.id?"#FFD60A":"rgba(255,255,255,0.38)",fontSize:10,fontWeight:600,textAlign:"center"}}>
              <div style={{fontSize:15,marginBottom:1}}>{t.icon}</div>{t.label}
            </button>
          ))}
        </div>
      </div>

      {/* BANNER */}
      <div style={{position:"relative",width:"100%",height:100,overflow:"hidden",flexShrink:0}}>
        <img src="https://wallpapercave.com/wp/wp15655996.jpg" alt="FIFA World Cup 2026" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 25%",display:"block"}} onError={e=>{e.target.style.display="none";}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(7,11,24,0.2) 0%,rgba(7,11,24,0.72) 100%)"}} />
      </div>

      <div style={{padding:"10px 10px 72px"}}>

        {/* ══ TABLA ══ */}
        {tab==="dashboard"&&(
          <div>
            {/* Top 2 podium */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              {scores.slice(0,2).map((p,i)=>(
                <div key={p.id} style={{background:i===0?"linear-gradient(160deg,#1b1400,#110d00)":"linear-gradient(160deg,#0d1520,#091020)",border:`1px solid ${i===0?"rgba(255,214,10,0.4)":"rgba(180,180,220,0.25)"}`,borderRadius:14,padding:"16px 12px",textAlign:"center",position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:i===0?"linear-gradient(90deg,#FFD60A,#FF6B35)":"linear-gradient(90deg,#aab4d0,#7080a0)"}}/>
                  <div style={{fontSize:i===0?28:22,marginBottom:4}}>{i===0?"🏆":"🥈"}</div>
                  <div style={{fontSize:10,fontWeight:800,letterSpacing:2,color:i===0?"#FFD60A":"rgba(180,190,220,0.8)",marginBottom:6,textTransform:"uppercase"}}>{i===0?"Ganador":"2do Lugar"}</div>
                  <div style={{width:10,height:10,borderRadius:"50%",background:p.color,margin:"0 auto 6px",boxShadow:`0 0 10px ${p.color}`}}/>
                  <div style={{fontSize:13,fontWeight:700,color:i===0?"#FFD60A":"#e8eaf0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:4}}>{p.name}</div>
                  <div style={{fontSize:34,fontWeight:800,color:p.color,lineHeight:1}}>{p.total}</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.28)",marginBottom:8}}>pts</div>
                  <div style={{display:"flex",justifyContent:"center",gap:4}}>
                    <span style={{fontSize:10,background:"rgba(255,214,10,0.15)",color:"#FFD60A",borderRadius:7,padding:"2px 7px"}}>⭐{p.exact}</span>
                    <span style={{fontSize:10,background:"rgba(6,214,160,0.15)",color:"#06D6A0",borderRadius:7,padding:"2px 7px"}}>✓{p.outcome}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Standings */}
            <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,overflow:"hidden",marginBottom:12}}>
              <div style={{padding:"9px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)",fontSize:13,fontWeight:700,letterSpacing:1,color:"rgba(255,255,255,0.55)"}}>TABLA GENERAL</div>
              {scores.map((p,i)=>{
                const pp=MATCHES.filter(m=>results[m.id]&&p.picks[m.id]).length;
                const pct=pp>0?Math.round((p.exact*5+p.outcome*3)/(pp*5)*100):0;
                return(
                  <div key={p.id}>
                    {i===2&&(
                      <div style={{display:"flex",alignItems:"center",gap:8,padding:"5px 14px",background:"rgba(255,77,109,0.05)",borderTop:"1px dashed rgba(255,77,109,0.25)",borderBottom:"1px dashed rgba(255,77,109,0.25)"}}>
                        <div style={{flex:1}}/>
                        <span style={{fontSize:10,color:"rgba(255,77,109,0.5)",fontWeight:700,letterSpacing:1}}>— SIN PREMIO —</span>
                        <div style={{flex:1}}/>
                      </div>
                    )}
                    <div style={{padding:"9px 14px",borderTop:i===2?"none":"1px solid rgba(255,255,255,0.04)",display:"flex",alignItems:"center",gap:8,opacity:i>=2?0.5:1}}>
                      <div style={{fontSize:15,color:i<2?p.color:"rgba(255,255,255,0.2)",width:18,flexShrink:0,fontWeight:700}}>{i+1}</div>
                      <div style={{width:8,height:8,borderRadius:"50%",background:p.color,flexShrink:0}}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:600,fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                        <div style={{display:"flex",alignItems:"center",gap:4,marginTop:2}}>
                          <div style={{flex:1,height:3,background:"rgba(255,255,255,0.07)",borderRadius:2,overflow:"hidden"}}>
                            <div style={{width:`${pct}%`,height:"100%",background:p.color,borderRadius:2}}/>
                          </div>
                          <span style={{fontSize:9,color:"rgba(255,255,255,0.25)",flexShrink:0}}>{pp>0?`${pct}%`:"—"}</span>
                        </div>
                      </div>
                      <span style={{background:"rgba(255,214,10,0.13)",color:"#FFD60A",borderRadius:7,padding:"1px 5px",fontSize:10,flexShrink:0}}>⭐{p.exact}</span>
                      <span style={{background:"rgba(6,214,160,0.13)",color:"#06D6A0",borderRadius:7,padding:"1px 5px",fontSize:10,flexShrink:0}}>✓{p.outcome}</span>
                      <div style={{fontSize:20,fontWeight:800,color:i<2?p.color:"rgba(255,255,255,0.35)",flexShrink:0,minWidth:30,textAlign:"right"}}>{p.total}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ PICKS ══ */}
        {tab==="picks"&&(
          <div>
            <div style={{display:"flex",gap:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"9px 12px",marginBottom:12,fontSize:12,color:"rgba(255,255,255,0.5)"}}>
              <span style={{fontSize:15,flexShrink:0}}>🔒</span>
              <span>Pronósticos de <strong style={{color:"rgba(255,255,255,0.75)"}}>solo lectura</strong>. Cargados antes del partido inaugural.</span>
            </div>
            {/* Filters — native selects, work perfectly on all mobile */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
              {/* Participant */}
              <div>
                <div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.35)",letterSpacing:1,marginBottom:4}}>PARTICIPANTE</div>
                <select value={activeP} onChange={e=>setActiveP(Number(e.target.value))} style={{width:"100%",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"7px 8px",color:"#fff",fontSize:11,fontWeight:600,outline:"none",WebkitAppearance:"none",appearance:"none"}}>
                  <option value={0} style={{background:"#1a1a2e"}}>👥 Todos</option>
                  {parts.map(p=>(
                    <option key={p.id} value={p.id} style={{background:"#1a1a2e"}}>{p.name}</option>
                  ))}
                </select>
              </div>
              {/* Date */}
              <div>
                <div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.35)",letterSpacing:1,marginBottom:4}}>FECHA</div>
                <select value={fd} onChange={e=>setFd(e.target.value)} style={{width:"100%",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"7px 8px",color:"#fff",fontSize:11,fontWeight:600,outline:"none",WebkitAppearance:"none",appearance:"none"}}>
                  <option value="ALL" style={{background:"#1a1a2e"}}>Todas</option>
                  {allDates.map(d=>{
                    const hasResults=MATCHES.filter(m=>m.date===d).some(m=>results[m.id]);
                    const label=new Date(d+"T12:00:00").toLocaleDateString("es-MX",{day:"numeric",month:"short"});
                    return <option key={d} value={d} style={{background:"#1a1a2e"}}>{hasResults?"✓ ":""}{label}</option>;
                  })}
                </select>
              </div>
              {/* Group */}
              <div>
                <div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.35)",letterSpacing:1,marginBottom:4}}>GRUPO</div>
                <select value={fg} onChange={e=>setFg(e.target.value)} style={{width:"100%",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"7px 8px",color:"#fff",fontSize:11,fontWeight:600,outline:"none",WebkitAppearance:"none",appearance:"none"}}>
                  <option value="ALL" style={{background:"#1a1a2e"}}>Todos</option>
                  {GROUPS.map(g=><option key={g} value={g} style={{background:"#1a1a2e"}}>Grupo {g}</option>)}
                </select>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                {activeP===0
                  ? <><span style={{fontSize:16}}>👥</span><span style={{fontSize:13,fontWeight:700,color:"#FFD60A"}}>Todos los participantes</span></>
                  : <><div style={{width:8,height:8,borderRadius:"50%",background:part?.color}}/><span style={{fontSize:13,fontWeight:700,color:part?.color}}>{part?.name}</span></>
                }
              </div>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.28)"}}>{filteredByDate.length} partidos</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {filteredByDate.map(m=>{
                const real=results[m.id];

                if(activeP === 0) {
                  // ── VISTA TODOS ──
                  return(
                    <div key={m.id} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"9px 12px"}}>
                      {/* Match header */}
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,gap:6}}>
                        <span style={{fontSize:10,color:"rgba(255,255,255,0.28)"}}>#{m.id} · Gr.{m.group} · {m.date.slice(5).replace("-","/")} · {m.venue}</span>
                        {real&&<span style={{fontSize:11,background:"rgba(6,214,160,0.18)",color:"#06D6A0",borderRadius:8,padding:"1px 7px",fontWeight:700,flexShrink:0}}>{real[0]}–{real[1]}</span>}
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                        <span style={{fontWeight:700,fontSize:13}}>{m.home}</span>
                        <span style={{color:"rgba(255,255,255,0.3)",fontSize:12}}>vs</span>
                        <span style={{fontWeight:700,fontSize:13}}>{m.away}</span>
                      </div>
                      {/* All participants' picks */}
                      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                        {parts.map(p=>{
                          const pick=p.picks[m.id];
                          const has=pick&&pick[0]!=null&&pick[1]!=null;
                          const pts=real&&has?calcPoints(pick,real):null;
                          return(
                            <div key={p.id} style={{display:"flex",alignItems:"center",gap:4,background:pts===5?"rgba(255,214,10,0.1)":pts===3?"rgba(6,214,160,0.08)":"rgba(255,255,255,0.04)",border:`1px solid ${pts===5?"rgba(255,214,10,0.3)":pts===3?"rgba(6,214,160,0.2)":p.color+"22"}`,borderRadius:8,padding:"4px 8px"}}>
                              <div style={{width:6,height:6,borderRadius:"50%",background:p.color,flexShrink:0}}/>
                              <span style={{fontSize:10,color:"rgba(255,255,255,0.5)"}}>{p.name.split(" ")[0]}</span>
                              <span style={{fontSize:11,fontWeight:700,color:has?"#fff":"rgba(255,255,255,0.2)"}}>{has?`${pick[0]}–${pick[1]}`:"—"}</span>
                              {pts!==null&&<Pts pts={pts}/>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                // ── VISTA INDIVIDUAL ──
                const pick=part?.picks[m.id];
                const has=pick&&pick[0]!=null&&pick[1]!=null;
                const pts=real&&has?calcPoints(pick,real):null;
                return(
                  <div key={m.id} style={{background:pts===5?"rgba(255,214,10,0.05)":pts===3?"rgba(6,214,160,0.04)":"rgba(255,255,255,0.03)",border:`1px solid ${pts===5?"rgba(255,214,10,0.22)":pts===3?"rgba(6,214,160,0.18)":"rgba(255,255,255,0.07)"}`,borderRadius:10,padding:"9px 12px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7,gap:6}}>
                      <span style={{fontSize:10,color:"rgba(255,255,255,0.28)"}}>#{m.id} · Gr.{m.group} · {m.date.slice(5).replace("-","/")} · {m.venue}</span>
                      {pts!==null&&<Pts pts={pts}/>}
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:12}}>{m.home}</span>
                      <SBox v={has?pick[0]:null}/>
                    </div>
                    <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",margin:"4px 0"}}/>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{fontWeight:700,fontSize:12}}>{m.away}</span>
                      <SBox v={has?pick[1]:null}/>
                    </div>
                    {real&&<div style={{textAlign:"center",marginTop:6,fontSize:11,color:"rgba(255,255,255,0.38)"}}>Real: <strong style={{color:"rgba(255,255,255,0.6)"}}>{real[0]}–{real[1]}</strong></div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ RESULTADOS ══ */}
        {tab==="results"&&(
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,background:canEdit?"rgba(6,214,160,0.07)":"rgba(255,255,255,0.04)",border:`1px solid ${canEdit?"rgba(6,214,160,0.25)":"rgba(255,255,255,0.1)"}`,borderRadius:10,padding:"9px 12px",marginBottom:12}}>
              <span style={{fontSize:15,flexShrink:0}}>{canEdit?"✏️":"👁"}</span>
              <span style={{flex:1,fontSize:12,color:"rgba(255,255,255,0.5)"}}>
                {canEdit?<strong style={{color:"#06D6A0"}}>Modo edición activo.</strong>:<>Resultados visibles. <strong style={{color:"rgba(255,255,255,0.7)"}}>Solo lectura.</strong></>}
              </span>
              {canEdit?(
                <div style={{display:"flex",gap:6,flexShrink:0}}>
                  <button onClick={()=>{if(window.confirm("¿Borrar todos los resultados?")){ setResults({}); setEditRes({}); }}} style={{background:"rgba(255,77,109,0.12)",border:"1px solid rgba(255,77,109,0.25)",borderRadius:8,padding:"4px 10px",fontSize:11,color:"rgba(255,77,109,0.8)",fontWeight:600}}>🗑</button>
                  <button onClick={()=>setCanEdit(false)} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"4px 10px",fontSize:11,color:"rgba(255,255,255,0.5)",fontWeight:600}}>🔒 Cerrar</button>
                </div>
              ):(
                <button onClick={()=>setShowPin(true)} style={{flexShrink:0,background:"rgba(255,214,10,0.12)",border:"1px solid rgba(255,214,10,0.3)",borderRadius:8,padding:"4px 12px",fontSize:11,color:"#FFD60A",fontWeight:700}}>✏️ Editar</button>
              )}
            </div>
            <div style={{marginBottom:11}}><GFilter val={fg} set={setFg}/></div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {filtered.map(m=>{
                const real=results[m.id];
                const eh=editRes[m.id]?.[0]??(real?.[0]??"");
                const ea=editRes[m.id]?.[1]??(real?.[1]??"");
                return(
                  <div key={m.id} style={{background:real?"rgba(6,214,160,0.04)":"rgba(255,255,255,0.03)",border:`1px solid ${real?"rgba(6,214,160,0.18)":"rgba(255,255,255,0.07)"}`,borderRadius:10,padding:"9px 12px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7,gap:6}}>
                      <span style={{fontSize:10,color:"rgba(255,255,255,0.28)"}}>#{m.id} · Gr.{m.group} · {m.date.slice(5).replace("-","/")} · {m.venue}</span>
                      {real?<span style={{fontSize:10,background:"rgba(6,214,160,0.18)",color:"#06D6A0",borderRadius:8,padding:"1px 7px",fontWeight:700,flexShrink:0}}>✓ Ok</span>
                           :<span style={{fontSize:10,color:"rgba(255,255,255,0.2)",flexShrink:0}}>Pendiente</span>}
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:12}}>{m.home}</span>
                      {canEdit?<SInput v={eh===""?null:eh} onChange={v=>{const h=v===null?"":v,a=editRes[m.id]?.[1]??(real?.[1]??"");setEditRes(p=>({...p,[m.id]:[h,a]}));setResult(m.id,h,a);}}/>:<SBox v={real!=null?real[0]:null}/>}
                    </div>
                    <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",margin:"4px 0"}}/>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{fontWeight:700,fontSize:12}}>{m.away}</span>
                      {canEdit?<SInput v={ea===""?null:ea} onChange={v=>{const h=editRes[m.id]?.[0]??(real?.[0]??""),a=v===null?"":v;setEditRes(p=>({...p,[m.id]:[h,a]}));setResult(m.id,h,a);}}/>:<SBox v={real!=null?real[1]:null}/>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ ANÁLISIS ══ */}
        {tab==="analysis"&&(
          <div style={{display:"flex",flexDirection:"column",gap:14}}>

            {/* Ganadores de la fecha — solo última jornada, top 10 */}
            <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,overflow:"hidden"}}>
              <div style={{padding:"10px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)",display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:17}}>📅</span>
                <div>
                  <div style={{fontSize:13,fontWeight:800,letterSpacing:1,color:"#FFD60A"}}>GANADORES DE LA FECHA</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.28)"}}>Top 10 · Última jornada jugada</div>
                </div>
              </div>
              {!lastPlayedDate?(
                <div style={{padding:"28px 0",textAlign:"center",color:"rgba(255,255,255,0.2)",fontSize:12}}>Sin resultados registrados</div>
              ):ptsByDate.filter(d=>d.date===lastPlayedDate).map(({date,count,pp})=>(
                <div key={date} style={{padding:"10px 14px"}}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:600,marginBottom:7}}>
                    {new Date(date+"T12:00:00").toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long"}).toUpperCase()} · {count} partido{count!==1?"s":""}
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:4}}>
                    {pp.slice(0,10).map((p,i)=>(
                      <div key={p.id} style={{display:"flex",alignItems:"center",gap:8,background:i===0?`${p.color}14`:"rgba(255,255,255,0.02)",border:`1px solid ${i===0?p.color+"2e":"rgba(255,255,255,0.05)"}`,borderRadius:8,padding:"6px 10px"}}>
                        <span style={{fontSize:13,width:22,flexShrink:0}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}.`}</span>
                        <div style={{width:7,height:7,borderRadius:"50%",background:p.color,flexShrink:0}}/>
                        <span style={{flex:1,fontSize:12,fontWeight:i===0?700:400}}>{p.name}</span>
                        <span style={{fontSize:20,fontWeight:800,color:i===0?p.color:"rgba(255,255,255,0.35)"}}>{p.pts}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Los más acertados */}
            <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,overflow:"hidden"}}>
              <div style={{padding:"10px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)",display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:17}}>⭐</span>
                <div>
                  <div style={{fontSize:13,fontWeight:800,letterSpacing:1,color:"#FFD60A"}}>LOS MÁS ACERTADOS</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.28)"}}>Top 10 · Resultados exactos · 5 pts c/u</div>
                </div>
              </div>
              {[...scores].sort((a,b)=>b.exact-a.exact).slice(0,10).map((p,i)=>{
                const pct=played>0?(p.exact/played)*100:0;
                return(
                  <div key={p.id} style={{padding:"9px 14px",borderBottom:"1px solid rgba(255,255,255,0.04)",display:"flex",alignItems:"center",gap:8}}>
                    <div style={{fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.2)",width:18,flexShrink:0}}>{i+1}</div>
                    <div style={{width:8,height:8,borderRadius:"50%",background:p.color,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:600,fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                      <div style={{display:"flex",alignItems:"center",gap:4,marginTop:2}}>
                        <div style={{flex:1,height:3,background:"rgba(255,255,255,0.07)",borderRadius:2,overflow:"hidden"}}>
                          <div style={{width:`${pct}%`,height:"100%",background:p.color,borderRadius:2}}/>
                        </div>
                        <span style={{fontSize:9,color:"rgba(255,255,255,0.28)",flexShrink:0}}>{Math.round(pct)}%</span>
                      </div>
                    </div>
                    <div style={{textAlign:"center",flexShrink:0}}>
                      <div style={{fontSize:20,fontWeight:800,color:"#FFD60A",lineHeight:1}}>{p.exact}</div>
                      <div style={{fontSize:9,color:"rgba(255,255,255,0.22)"}}>exactos</div>
                    </div>
                    <div style={{textAlign:"center",flexShrink:0}}>
                      <div style={{fontSize:20,fontWeight:800,color:p.color,lineHeight:1}}>{p.outcome}</div>
                      <div style={{fontSize:9,color:"rgba(255,255,255,0.22)"}}>resultado</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quiénes tienen chance */}
            <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,overflow:"hidden"}}>
              <div style={{padding:"10px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:17}}>🎯</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:800,letterSpacing:1,color:"#FFD60A"}}>¿QUIÉNES TIENEN CHANCE?</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.28)"}}>Top 10 · Posibilidades matemáticas de ganar</div>
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:17,fontWeight:800,color:"#FF6B35"}}>{rem}</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,0.28)"}}>restantes</div>
                </div>
              </div>
              <div>
                {alive.slice(0,10).map((p,i)=>(
                  <div key={p.id} style={{padding:"9px 14px",borderBottom:"1px solid rgba(255,255,255,0.04)",opacity:p.canWin?1:0.38,background:i===0?"rgba(255,214,10,0.04)":"transparent"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                      <div style={{width:7,height:7,borderRadius:"50%",background:p.canWin?p.color:"#555",flexShrink:0}}/>
                      <span style={{flex:1,fontWeight:600,fontSize:12}}>{p.name}</span>
                      {i===0&&<span style={{background:"rgba(255,214,10,0.18)",color:"#FFD60A",borderRadius:10,padding:"2px 7px",fontSize:10,fontWeight:700}}>👑 Líder</span>}
                      {i>0&&<span style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>-{p.gap}pts</span>}
                      {p.canWin?<span style={{background:"rgba(6,214,160,0.15)",color:"#06D6A0",borderRadius:10,padding:"2px 7px",fontSize:10,fontWeight:700}}>✓</span>
                               :<span style={{background:"rgba(255,77,109,0.12)",color:"rgba(255,77,109,0.65)",borderRadius:10,padding:"2px 7px",fontSize:10,fontWeight:700}}>✗</span>}
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4}}>
                      {[{l:"Actual",v:p.total,c:p.canWin?p.color:"#555"},{l:"Disponibles",v:`+${maxRem}`,c:"rgba(255,255,255,0.3)"},{l:"Máx posible",v:p.maxP,c:p.canWin?"#FFD60A":"#555"}].map(({l,v,c})=>(
                        <div key={l} style={{background:"rgba(255,255,255,0.04)",borderRadius:7,padding:"4px 3px",textAlign:"center"}}>
                          <div style={{fontSize:15,fontWeight:800,color:c,lineHeight:1}}>{v}</div>
                          <div style={{fontSize:8,color:"rgba(255,255,255,0.2)",marginTop:1}}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{padding:"6px 14px",fontSize:10,color:"rgba(255,255,255,0.15)"}}>* Sigue si: actual + {maxRem} pts ≥ líder ({leader} pts)</div>
              </div>
            </div>

            {/* Rendimiento por participante */}
            <div style={{fontSize:13,fontWeight:800,letterSpacing:1,color:"rgba(255,255,255,0.45)",padding:"4px 2px"}}>RENDIMIENTO POR PARTICIPANTE</div>
            {parts.map(p=>{
              const ms=MATCHES.filter(m=>results[m.id]&&p.picks[m.id]);
              const tot=ms.reduce((s,m)=>s+calcPoints(p.picks[m.id],results[m.id]),0);
              const max=ms.length*5;
              const byG={};GROUPS.forEach(g=>{byG[g]={pts:0,pos:0};});
              ms.forEach(m=>{const pts=calcPoints(p.picks[m.id],results[m.id]);byG[m.group].pts+=pts;byG[m.group].pos+=5;});
              return(
                <div key={p.id} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${p.color}1a`,borderRadius:12,padding:"12px 14px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <div style={{width:9,height:9,borderRadius:"50%",background:p.color,boxShadow:`0 0 7px ${p.color}`}}/>
                    <span style={{fontWeight:700,fontSize:13,flex:1}}>{p.name}</span>
                    <span style={{fontSize:18,fontWeight:800,color:p.color}}>{tot} pts</span>
                  </div>
                  <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden",marginBottom:8}}>
                    <div style={{width:`${max>0?(tot/max)*100:0}%`,height:"100%",background:p.color,borderRadius:2}}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:4}}>
                    {GROUPS.map(g=>{
                      const bg=byG[g];
                      const pct=bg.pos>0?bg.pts/bg.pos:0;
                      const col=pct>=0.66?"#06D6A0":pct>=0.33?"#FFD60A":pct>0?"#FF6B35":"rgba(255,255,255,0.07)";
                      return(
                        <div key={g} title={`Gr.${g}: ${bg.pts}/${bg.pos} pts`} style={{background:`${col}1a`,border:`1px solid ${col}33`,borderRadius:7,padding:"4px 2px",textAlign:"center"}}>
                          <div style={{fontSize:9,color:"rgba(255,255,255,0.38)",fontWeight:600}}>Gr.{g}</div>
                          <div style={{fontSize:13,fontWeight:700,color:bg.pos>0?col:"rgba(255,255,255,0.15)"}}>{bg.pos>0?bg.pts:"—"}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Comparativa partido a partido */}
            <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,overflow:"hidden"}}>
              <div style={{padding:"10px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                <span style={{fontSize:13,fontWeight:800,letterSpacing:1,color:"rgba(255,255,255,0.45)"}}>COMPARATIVA PARTIDO A PARTIDO</span>
              </div>
              {MATCHES.filter(m=>results[m.id]).length===0?(
                <div style={{padding:"28px 0",textAlign:"center",color:"rgba(255,255,255,0.2)",fontSize:12}}>Ingresa resultados para ver la comparativa</div>
              ):MATCHES.filter(m=>results[m.id]).map((m,i)=>(
                <div key={m.id} style={{padding:"9px 14px",borderBottom:"1px solid rgba(255,255,255,0.04)",background:i%2===0?"transparent":"rgba(255,255,255,0.01)"}}>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.33)",marginBottom:6}}>
                    #{m.id} · {m.home} vs {m.away} · <strong style={{color:"rgba(255,255,255,0.55)"}}>{results[m.id][0]}–{results[m.id][1]}</strong>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {parts.map(p=>{
                      const pick=p.picks[m.id];
                      const pts=pick?calcPoints(pick,results[m.id]):null;
                      return(
                        <div key={p.id} style={{display:"flex",alignItems:"center",gap:4,background:"rgba(255,255,255,0.04)",border:`1px solid ${p.color}2e`,borderRadius:8,padding:"3px 7px"}}>
                          <div style={{width:5,height:5,borderRadius:"50%",background:p.color}}/>
                          <span style={{fontSize:10,color:"rgba(255,255,255,0.45)"}}>{p.name.split(" ")[0]}</span>
                          <span style={{fontSize:10,fontWeight:700}}>{pick?`${pick[0]}:${pick[1]}`:"—"}</span>
                          {pts!==null&&<Pts pts={pts}/>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}