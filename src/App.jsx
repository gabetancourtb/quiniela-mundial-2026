import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";

// ─── FIREBASE ─────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyArCR31Y9mc-VmY7K6sfNSbIvfDXXNl_D8",
  authDomain: "quiniela---fase-final.firebaseapp.com",
  projectId: "quiniela---fase-final",
  storageBucket: "quiniela---fase-final.firebasestorage.app",
  messagingSenderId: "466497822500",
  appId: "1:466497822500:web:6354e0ff72a8a543f05db1",
  measurementId: "G-0PH49ZCBM3"
};
const fbApp = initializeApp(firebaseConfig);
const db    = getFirestore(fbApp);

// Firestore helpers — each key is a top-level document in "quiniela_v2" collection
async function fbGet(key, fallback) {
  try {
    const snap = await getDoc(doc(db, "quiniela_v2", key));
    return snap.exists() ? snap.data().value : fallback;
  } catch { return fallback; }
}
async function fbSet(key, value) {
  try { await setDoc(doc(db, "quiniela_v2", key), { value }); } catch(e) { console.error("fbSet error", e); }
}
function fbListen(key, cb) {
  return onSnapshot(doc(db, "quiniela_v2", key), snap => {
    if (snap.exists()) cb(snap.data().value);
  });
}

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const ADMIN_PIN   = "2026";
const INVITE_CODE = "MUNDIAL26";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  bg:       "#06090f",
  surface:  "#0d1220",
  surface2: "#111827",
  border:   "rgba(255,255,255,0.07)",
  amber:    "#F59E0B",
  amberDim: "rgba(245,158,11,0.12)",
  coral:    "#FF6B6B",
  green:    "#10B981",
  greenDim: "rgba(16,185,129,0.10)",
  blue:     "#3B82F6",
  slate:    "#6B7280",
  white:    "#E8EBF2",
  gold:     "#FCD34D",
};

const P_COLORS = [
  "#F59E0B","#10B981","#3B82F6","#EF4444","#8B5CF6","#F97316","#06B6D4",
  "#EC4899","#84CC16","#14B8A6","#F43F5E","#6366F1","#FBBF24","#22C55E",
  "#0EA5E9","#A78BFA","#FB923C","#34D399","#60A5FA","#C084FC","#4ADE80",
  "#38BDF8","#E879F9","#FDE68A","#6EE7B7","#93C5FD","#DDD6FE","#FCA5A5",
  "#86EFAC","#7DD3FC","#F9A8D4",
];

// ─── KNOCKOUT MATCHES ─────────────────────────────────────────────────────────
// Teams will be filled in by admin once group stage qualifiers are known.
// home/away are placeholder labels until admin sets real team names.
const KO_ROUNDS = [
  {
    id:"r32", label:"Ronda de 32", abbr:"R32", pts: { adv:2, outcome:3, exact:5 },
    matches:[
      {id:"k1",  date:"2026-06-29", home:"SUDAFRICA",        away:"CANADA",              venue:"Los Ángeles (SoFi)"},
      {id:"k2",  date:"2026-06-29", home:"ALEMANIA",         away:"PARAGUAY",            venue:"Boston (Gillette)"},
      {id:"k3",  date:"2026-06-29", home:"PAISES BAJOS",     away:"MARRUECOS",           venue:"Monterrey (BBVA)"},
      {id:"k4",  date:"2026-06-29", home:"BRASIL",           away:"JAPON",               venue:"Houston (NRG)"},
      {id:"k5",  date:"2026-06-30", home:"FRANCIA",          away:"SUECIA",              venue:"New Jersey (MetLife)"},
      {id:"k6",  date:"2026-06-30", home:"COSTA DE MARFIL",  away:"NORUEGA",             venue:"Dallas (AT&T)"},
      {id:"k7",  date:"2026-06-30", home:"MEXICO",           away:"ECUADOR",             venue:"Cd. México (Azteca)"},
      {id:"k8",  date:"2026-07-01", home:"INGLATERRA",       away:"REP. DEL CONGO",      venue:"Atlanta (Mercedes-Benz)"},
      {id:"k9",  date:"2026-07-01", home:"BELGICA",          away:"SENEGAL",             venue:"Seattle (Lumen Field)"},
      {id:"k10", date:"2026-07-01", home:"EE.UU",            away:"BOSNIA Y HERZ.",      venue:"San Francisco (Levi's)"},
      {id:"k11", date:"2026-07-02", home:"ESPANA",           away:"AUSTRIA",             venue:"Los Ángeles (SoFi)"},
      {id:"k12", date:"2026-07-02", home:"PORTUGAL",         away:"CROACIA",             venue:"Dallas (AT&T)"},
      {id:"k13", date:"2026-07-02", home:"AUSTRALIA",        away:"EGIPTO",              venue:"Houston (NRG)"},
      {id:"k14", date:"2026-07-03", home:"ARGENTINA",        away:"CABO VERDE",          venue:"Miami (Hard Rock)"},
      {id:"k15", date:"2026-07-03", home:"COLOMBIA",         away:"GHANA",               venue:"Kansas City (Arrowhead)"},
      {id:"k16", date:"2026-07-03", home:"SUIZA",            away:"ARGELIA",             venue:"Vancouver (BC Place)"},
    ]
  },
  {
    id:"r16", label:"Octavos de Final", abbr:"R16", pts:{ adv:2, outcome:3, exact:5 },
    matches:[
      {id:"k17", date:"2026-07-04", home:"W-k2",  away:"W-k5",  venue:"Atlanta (Mercedes-Benz)"},
      {id:"k18", date:"2026-07-04", home:"W-k1",  away:"W-k3",  venue:"Houston (NRG)"},
      {id:"k19", date:"2026-07-05", home:"W-k4",  away:"W-k6",  venue:"Dallas (AT&T)"},
      {id:"k20", date:"2026-07-05", home:"W-k7",  away:"W-k8",  venue:"Los Ángeles (SoFi)"},
      {id:"k21", date:"2026-07-06", home:"W-k9",  away:"W-k10", venue:"New Jersey (MetLife)"},
      {id:"k22", date:"2026-07-06", home:"W-k11", away:"W-k12", venue:"Kansas City (Arrowhead)"},
      {id:"k23", date:"2026-07-07", home:"W-k16", away:"W-k15", venue:"Seattle (Lumen Field)"},
      {id:"k24", date:"2026-07-07", home:"W-k13", away:"W-k14", venue:"Miami (Hard Rock)"},
    ]
  },
  {
    id:"qf", label:"Cuartos de Final", abbr:"QF", pts:{ adv:2, outcome:3, exact:5 },
    matches:[
      {id:"k25", date:"2026-07-09", home:"W-k17", away:"W-k18", venue:"Boston (Gillette)"},
      {id:"k26", date:"2026-07-10", home:"W-k21", away:"W-k22", venue:"Filadelfia"},
      {id:"k27", date:"2026-07-11", home:"W-k19", away:"W-k20", venue:"Los Ángeles (SoFi)"},
      {id:"k28", date:"2026-07-11", home:"W-k23", away:"W-k24", venue:"Cd. México (Azteca)"},
    ]
  },
  {
    id:"sf", label:"Semifinales", abbr:"SF", pts:{ adv:2, outcome:3, exact:5 },
    matches:[
      {id:"k29", date:"2026-07-23", home:"W-k25", away:"W-k26", venue:"Dallas"},
      {id:"k30", date:"2026-07-24", home:"W-k27", away:"W-k28", venue:"Los Ángeles"},
    ]
  },
  {
    id:"third", label:"Tercer Puesto", abbr:"3°", pts:{ adv:2, outcome:3, exact:5 },
    matches:[
      {id:"k32", date:"2026-07-18", home:"L-k29", away:"L-k30", venue:"MetLife Stadium"},
    ]
  },
  {
    id:"final", label:"Gran Final", abbr:"Final", pts:{ adv:2, outcome:3, exact:5 },
    matches:[
      {id:"k31", date:"2026-07-19", home:"W-k29", away:"W-k30", venue:"MetLife Stadium"},
    ]
  },
];

const ALL_MATCHES = KO_ROUNDS.flatMap(r =>
  r.matches.map(m => ({ ...m, roundId: r.id, roundLabel: r.label, roundPts: r.pts }))
);

// Quick lookup of the static match object (with original placeholder
// home/away labels like "W-k1") by match id.
const MATCH_BY_ID = Object.fromEntries(ALL_MATCHES.map(m => [m.id, m]));

// Maps each R32/R16/QF/SF match winner to the next round slot it fills
// { winnersMatchId: { nextMatchId, slot:"home"|"away" } }
const WINNER_FLOWS = {
  // R32 → R16 (from official FIFA bracket screenshots)
  k1:"k18",  k3:"k18",   // SA/CAN + NED/MAR   → Jul 4 12PM
  k2:"k17",  k5:"k17",   // GER/PAR + FRA/SWE   → Jul 4 4PM
  k9:"k21",  k10:"k21",  // BEL/SEN + USA/BIH   → Jul 6 7PM
  k11:"k22", k12:"k22",  // ESP/AUT + POR/CRO   → Jul 6 2PM
  k4:"k19",  k6:"k19",   // BRA/JPN + CIV/NOR   → Jul 5 3PM
  k7:"k20",  k8:"k20",   // MEX/ECU + ENG/COD   → Jul 5 7PM
  k16:"k23", k15:"k23",  // SUI/ALG + COL/GHA   → Jul 7 3PM
  k13:"k24", k14:"k24",  // AUS/EGY + ARG/CPV   → Jul 7 11AM
  // R16 → QF (from official FIFA bracket screenshots)
  k17:"k25", k18:"k25",  // QF1: Jul 9 3PM
  k21:"k26", k22:"k26",  // QF2: Jul 10 2PM
  k19:"k27", k20:"k27",  // QF3: Jul 11 4PM
  k23:"k28", k24:"k28",  // QF4: Jul 11 8PM
  // QF → SF
  k25:"k29", k26:"k29",
  k27:"k30", k28:"k30",
  // SF → Final
  k29:"k31", k30:"k31",
};
// Which slot does the winner of matchId fill in the next match?
const WINNER_SLOT = {
  k1:"home",  k3:"away",
  k2:"home",  k5:"away",
  k9:"home",  k10:"away",
  k11:"home", k12:"away",
  k4:"home",  k6:"away",
  k7:"home",  k8:"away",
  k16:"home", k15:"away",
  k13:"home", k14:"away",
  k17:"home", k18:"away",
  k21:"home", k22:"away",
  k19:"home", k20:"away",
  k23:"home", k24:"away",
  k25:"home", k26:"away",
  k27:"home", k28:"away",
  k29:"home", k30:"away",
};
// Losers of SF matches fill the third place match
const LOSER_FLOWS = {
  k29: { nextMatchId:"k32", slot:"home" },
  k30: { nextMatchId:"k32", slot:"away" },
};

// Build a resolved teams map from results + static teams
// Returns { matchId: { home: "BRASIL", away: "ARGENTINA" } }
function resolveTeams(staticTeams, results) {
  const resolved = {};
  ALL_MATCHES.forEach(m => {
    resolved[m.id] = {
      home: staticTeams?.[m.id]?.home || m.home,
      away: staticTeams?.[m.id]?.away || m.away,
    };
  });
  // Flow winners forward from results
  ALL_MATCHES.forEach(m => {
    const res = results[m.id];
    if (!res?.winner) return;
    const nextId = WINNER_FLOWS[m.id];
    if (!nextId) return;
    const slot = WINNER_SLOT[m.id];
    const winnerName = res.winner === "home" ? resolved[m.id].home : resolved[m.id].away;
    if (!resolved[nextId]) resolved[nextId] = { home: "", away: "" };
    resolved[nextId][slot] = winnerName;
  });
  // Flow losers of SF into third place match (k32)
  ALL_MATCHES.forEach(m => {
    const res = results[m.id];
    if (!res?.winner) return;
    const loserFlow = LOSER_FLOWS[m.id];
    if (!loserFlow) return;
    const loserName = res.winner === "home" ? resolved[m.id].away : resolved[m.id].home;
    if (!resolved[loserFlow.nextMatchId]) resolved[loserFlow.nextMatchId] = { home: "", away: "" };
    resolved[loserFlow.nextMatchId][loserFlow.slot] = loserName;
  });
  return resolved;
}

// Build a participant-specific resolved teams map that fills unresolved slots
// with the team that participant picked to advance — so R16+ shows real names
// even before R32 results are in
function resolveTeamsForParticipant(staticTeams, results, participantPicks) {
  // Start with the global resolved map
  const resolved = {};
  ALL_MATCHES.forEach(m => {
    resolved[m.id] = {
      home: staticTeams?.[m.id]?.home || m.home,
      away: staticTeams?.[m.id]?.away || m.away,
    };
  });

  // First pass: flow from actual results
  ALL_MATCHES.forEach(m => {
    const res = results[m.id];
    if (!res?.winner) return;
    const nextId = WINNER_FLOWS[m.id];
    if (!nextId) return;
    const slot = WINNER_SLOT[m.id];
    const winnerName = res.winner === "home" ? resolved[m.id].home : resolved[m.id].away;
    if (!resolved[nextId]) resolved[nextId] = { home: "", away: "" };
    resolved[nextId][slot] = winnerName;
  });

  // Second pass: for unresolved slots, use participant picks
  // Run multiple passes to chain through rounds (R32→R16→QF→SF→Final)
  for (let pass = 0; pass < 4; pass++) {
    ALL_MATCHES.forEach(m => {
      const pick = participantPicks?.[m.id];
      if (!pick?.side) return;
      const nextId = WINNER_FLOWS[m.id];
      if (!nextId) return;
      const slot = WINNER_SLOT[m.id];
      // Only fill if slot is still a placeholder
      if (!resolved[nextId]) resolved[nextId] = { home: "", away: "" };
      const currentVal = resolved[nextId][slot];
      if (currentVal && !currentVal.startsWith("W-") && !currentVal.startsWith("L-")) return;
      // Get the team this participant picked to win this match
      const pickedTeam = pick.side === "home" ? resolved[m.id].home : resolved[m.id].away;
      if (pickedTeam && !pickedTeam.startsWith("W-") && !pickedTeam.startsWith("L-")) {
        resolved[nextId][slot] = pickedTeam;
      }
    });
    // Also handle loser flows for third place
    ALL_MATCHES.forEach(m => {
      const pick = participantPicks?.[m.id];
      if (!pick?.side) return;
      const loserFlow = LOSER_FLOWS[m.id];
      if (!loserFlow) return;
      const currentVal = resolved[loserFlow.nextMatchId]?.[loserFlow.slot];
      if (currentVal && !currentVal.startsWith("W-") && !currentVal.startsWith("L-") && !currentVal.startsWith("L-")) return;
      const loserTeam = pick.side === "home" ? resolved[m.id].away : resolved[m.id].home;
      if (loserTeam && !loserTeam.startsWith("W-") && !loserTeam.startsWith("L-")) {
        if (!resolved[loserFlow.nextMatchId]) resolved[loserFlow.nextMatchId] = { home: "", away: "" };
        resolved[loserFlow.nextMatchId][loserFlow.slot] = loserTeam;
      }
    });
  }
  return resolved;
}

// Given a participant's picks, find which team they are "backing" in a given match
// by tracing back through their R32 pick side selections
function getBackedTeam(participantId, matchId, picks, resolvedTeams) {
  const pick = picks[participantId]?.[matchId];
  if (!pick?.side) return null;
  const teams = resolvedTeams[matchId];
  if (!teams) return null;
  return pick.side === "home" ? teams.home : teams.away;
}

// Resolve the team name occupying a specific slot ("home"/"away") of a match,
// following ONLY the single chain implied by the participant's own picks —
// never the "other" feeder. `teams` here is the plain admin-set static team
// override map (e.g. { k1: { home:"...", away:"..." } }), NOT a
// results-derived resolution — this keeps the trace fully independent of
// actual match outcomes, so a participant's projected bracket stays intact
// even when real results diverge from what they predicted.
function resolveParticipantSlot(participantId, matchId, side, picks, teams, depth = 0) {
  if (depth > 8) return null; // safety limit against malformed data

  const staticMatch = MATCH_BY_ID[matchId];
  if (!staticMatch) return null;

  const home = teams?.[matchId]?.home || staticMatch.home;
  const away = teams?.[matchId]?.away || staticMatch.away;
  const label = side === "home" ? home : away;

  // Already a real team name (not a "W-"/"L-" placeholder) — done.
  if (label && !label.startsWith("W-") && !label.startsWith("L-")) return label;

  // Placeholder — find the ONE feeder match that fills exactly this slot
  // (never the other slot's feeder) and resolve it recursively.
  const winnerFeederId = Object.keys(WINNER_FLOWS).find(
    fid => WINNER_FLOWS[fid] === matchId && WINNER_SLOT[fid] === side
  );
  if (winnerFeederId) {
    const feederPick = picks[participantId]?.[winnerFeederId];
    if (!feederPick?.side) return null; // participant hasn't decided the feeder match yet
    return resolveParticipantSlot(participantId, winnerFeederId, feederPick.side, picks, teams, depth + 1);
  }

  // Third-place match slots are filled by SF LOSERS, not winners.
  const loserFeederId = Object.keys(LOSER_FLOWS).find(
    fid => LOSER_FLOWS[fid].nextMatchId === matchId && LOSER_FLOWS[fid].slot === side
  );
  if (loserFeederId) {
    const feederPick = picks[participantId]?.[loserFeederId];
    if (!feederPick?.side) return null;
    // The loser is whichever side they did NOT pick to win
    const loserSide = feederPick.side === "home" ? "away" : "home";
    return resolveParticipantSlot(participantId, loserFeederId, loserSide, picks, teams, depth + 1);
  }

  return null;
}

// Determine which team a participant is rooting for in a given match, based
// purely on their own pick chain (side selections) for THAT match — then
// traces backward through the exact slot (home/away) their pick corresponds
// to, round by round, all the way back to a resolved team name. This is
// independent of actual results, so it stays correct even after real
// outcomes diverge from what the participant predicted.
function getRootingTeam(participantId, matchId, picks, teams) {
  const directPick = picks[participantId]?.[matchId];
  if (!directPick?.side) return null; // nothing definitive without a pick on this match
  return resolveParticipantSlot(participantId, matchId, directPick.side, picks, teams);
}

// ─── SCORING ──────────────────────────────────────────────────────────────────
// pick = [homeScore, awayScore], pickedSide = "home"|"away"
// result = { score:[h,a], winner:"home"|"away"|"draw" }
// winner is the team that actually advanced (could be home or away even after draw+pens)
function calcMatchPts(pick, pickedSide, result) {
  if (!pick || !result) return null;
  const pts = { adv: 0, outcome: 0, exact: 0, total: 0, breakdown: [] };

  // 2 pts: did the picked team advance? (always, independent of score)
  if (pickedSide && result.winner && result.winner !== "draw") {
    if (pickedSide === result.winner) {
      pts.adv = 2;
      pts.breakdown.push("⬆ 2pts avance");
    }
  }

  // Outcome / exact are mutually exclusive — exact scoreline implies correct
  // outcome, so it replaces the 3pt bonus rather than stacking with it.
  // Max per match: 2 (adv) + 5 (exact) = 7, or 2 (adv) + 3 (outcome) = 5
  const [ph, pa] = pick;
  const [rh, ra] = result.score;
  const predOutcome = ph > pa ? "home" : ph < pa ? "away" : "draw";
  const isExact = ph === rh && pa === ra;

  if (isExact) {
    pts.exact = 5;
    pts.breakdown.push("+5pts exacto");
  } else if (predOutcome === result.outcome) {
    pts.outcome = 3;
    pts.breakdown.push("+3pts resultado");
  }

  pts.total = pts.adv + pts.outcome + pts.exact;
  return pts;
}

// ─── STORAGE KEYS ────────────────────────────────────────────────────────────
const SK = {
  participants: "participants",
  results:      "results",
  picks:        "picks",
  teams:        "teams",
};
// localStorage fallback (used only for initial render before Firebase loads)
function lsGet(k, fb) { try { const v = localStorage.getItem("qv2_"+k); return v ? JSON.parse(v) : fb; } catch { return fb; } }
function lsSet(k, v)  { try { localStorage.setItem("qv2_"+k, JSON.stringify(v)); } catch {} }

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function fmtDate(d) {
  return new Date(d + "T12:00:00").toLocaleDateString("es-MX", { day:"numeric", month:"short" });
}
function shortName(n) { return n.split(" ")[0]; }
function getRoundForMatch(matchId) {
  return KO_ROUNDS.find(r => r.matches.some(m => m.id === matchId));
}

// ─── SMALL UI ────────────────────────────────────────────────────────────────
function Tag({ color, children, small }) {
  return (
    <span style={{
      background: color + "1e", color, border:`1px solid ${color}40`,
      borderRadius:7, padding: small ? "1px 6px" : "2px 8px",
      fontSize: small ? 9 : 10, fontWeight:700, letterSpacing:0.3, flexShrink:0,
    }}>{children}</span>
  );
}

function ScoreBox({ v }) {
  return (
    <div style={{
      width:36, height:34, display:"flex", alignItems:"center", justifyContent:"center",
      background:"rgba(255,255,255,0.05)", border:`1px solid ${C.border}`,
      borderRadius:7, fontSize:18, fontWeight:800,
      fontFamily:"'Bebas Neue',sans-serif", letterSpacing:1,
      color: v != null ? C.white : "rgba(255,255,255,0.12)",
    }}>{v != null ? v : "—"}</div>
  );
}

function ScoreInput({ value, onChange }) {
  return (
    <input type="number" min="0" max="20" value={value ?? ""}
      onChange={e => onChange(e.target.value === "" ? null : Math.max(0, parseInt(e.target.value)))}
      style={{
        width:48, height:42, textAlign:"center",
        background:"rgba(245,158,11,0.08)", border:`1.5px solid ${C.amber}55`,
        borderRadius:9, color:C.white, fontSize:22, fontWeight:800,
        fontFamily:"'Bebas Neue',sans-serif", outline:"none",
        WebkitAppearance:"none", MozAppearance:"textfield",
      }}
    />
  );
}

function PtsBadge({ pts }) {
  if (pts === null || pts === undefined) return null;
  const color = pts >= 7 ? C.gold : pts >= 5 ? C.green : pts >= 2 ? C.amber : C.slate;
  return (
    <span style={{
      background: color + "20", color, border:`1px solid ${color}50`,
      borderRadius:8, padding:"2px 7px", fontSize:10, fontWeight:800, flexShrink:0,
    }}>{pts}pts</span>
  );
}

// ─── PIN MODAL ────────────────────────────────────────────────────────────────
function PinModal({ title, sub, correctPin, onSuccess, onCancel }) {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState(false);
  function tap(n) {
    if (n === "⌫") { setPin(p => p.slice(0,-1)); setErr(false); return; }
    const next = pin + n;
    setPin(next); setErr(false);
    if (next.length === 4) {
      if (next === correctPin) { onSuccess(); }
      else { setErr(true); setTimeout(() => setPin(""), 500); }
    }
  }
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(6,9,15,0.97)", zIndex:300,
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      gap:18, padding:24 }}>
      <div style={{ fontSize:38 }}>🔐</div>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:16, fontWeight:800, letterSpacing:2, color:C.amber }}>{title}</div>
        {sub && <div style={{ fontSize:12, color:C.slate, marginTop:4 }}>{sub}</div>}
      </div>
      <div style={{ display:"flex", gap:12 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width:13, height:13, borderRadius:"50%",
            background: pin.length > i ? C.amber : "rgba(255,255,255,0.12)",
            transition:"background 0.15s" }} />
        ))}
      </div>
      {err && (
        <div style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)",
          borderRadius:10, padding:"7px 18px", fontSize:12, color:C.coral }}>
          PIN incorrecto
        </div>
      )}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:9, width:"100%", maxWidth:255 }}>
        {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((n,i) => (
          <button key={i} onClick={() => n !== "" && tap(String(n))} style={{
            background: n === "" ? "transparent" : "rgba(255,255,255,0.06)",
            border: n === "" ? "none" : `1px solid ${C.border}`,
            borderRadius:11, padding:"14px 0", fontSize:21, fontWeight:700,
            color:C.white, cursor: n === "" ? "default" : "pointer", fontFamily:"inherit",
          }}>{n}</button>
        ))}
      </div>
      {onCancel && (
        <button onClick={onCancel} style={{ fontSize:12, color:C.slate, background:"none", border:"none", cursor:"pointer" }}>
          ← Cancelar
        </button>
      )}
    </div>
  );
}

// ─── REGISTER MODAL ──────────────────────────────────────────────────────────
function RegisterModal({ onDone, onCancel, existingNames }) {
  const [step, setStep]       = useState(1);
  const [invite, setInvite]   = useState("");
  const [name, setName]       = useState("");
  const [pin, setPin]         = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr]         = useState("");

  const iStyle = {
    width:"100%", background:"rgba(255,255,255,0.06)", border:`1.5px solid ${C.border}`,
    borderRadius:10, padding:"12px 14px", color:C.white, fontSize:15, fontFamily:"inherit", outline:"none",
  };
  const btn = (label, onClick, color) => (
    <button onClick={onClick} style={{
      width:"100%", background: color === "green" ? C.green : C.amber,
      color:"#111", borderRadius:10, padding:"13px", fontWeight:800, fontSize:14,
      border:"none", cursor:"pointer",
    }}>{label}</button>
  );

  function go1() {
    if (invite.trim().toUpperCase() !== INVITE_CODE) { setErr("Código incorrecto."); return; }
    setErr(""); setStep(2);
  }
  function go2() {
    const n = name.trim();
    if (n.length < 2) { setErr("Mín. 2 caracteres."); return; }
    if (existingNames.map(x => x.toLowerCase()).includes(n.toLowerCase())) { setErr("Nombre ya registrado."); return; }
    setErr(""); setStep(3);
  }
  function go3() {
    if (pin.length !== 4 || isNaN(Number(pin))) { setErr("PIN debe ser 4 dígitos."); return; }
    setErr(""); setStep(4);
  }
  function go4() {
    if (confirm !== pin) { setErr("Los PINs no coinciden."); return; }
    onDone({ name: name.trim(), pin });
  }

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(6,9,15,0.97)", zIndex:300,
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ width:"100%", maxWidth:340, display:"flex", flexDirection:"column", gap:14 }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:34, marginBottom:8 }}>⚽</div>
          <div style={{ fontSize:17, fontWeight:800, color:C.amber, letterSpacing:1 }}>UNIRSE A LA QUINIELA</div>
          <div style={{ fontSize:11, color:C.slate, marginTop:3 }}>Paso {step} de 4</div>
        </div>
        <div style={{ display:"flex", gap:4 }}>
          {[1,2,3,4].map(s => (
            <div key={s} style={{ flex:1, height:3, borderRadius:2,
              background: s <= step ? C.amber : "rgba(255,255,255,0.08)", transition:"background 0.3s" }} />
          ))}
        </div>

        {step === 1 && <>
          <div style={{ fontSize:12, color:C.slate, textAlign:"center" }}>Código de invitación</div>
          <input value={invite} onChange={e => setInvite(e.target.value)} placeholder="XXXXXXXX"
            style={{ ...iStyle, textAlign:"center", fontWeight:700, letterSpacing:4, textTransform:"uppercase" }} />
          {err && <div style={{ color:C.coral, fontSize:12, textAlign:"center" }}>{err}</div>}
          {btn("Continuar →", go1)}
        </>}

        {step === 2 && <>
          <div style={{ fontSize:12, color:C.slate, textAlign:"center" }}>¿Cómo aparecer en la tabla?</div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre o apodo"
            style={iStyle} autoFocus />
          {err && <div style={{ color:C.coral, fontSize:12, textAlign:"center" }}>{err}</div>}
          {btn("Continuar →", go2)}
        </>}

        {step === 3 && <>
          <div style={{ fontSize:12, color:C.slate, textAlign:"center" }}>PIN de 4 dígitos — lo usarás para entrar tus picks</div>
          <input type="password" inputMode="numeric" maxLength={4} value={pin}
            onChange={e => setPin(e.target.value.replace(/\D/g,"").slice(0,4))}
            placeholder="••••"
            style={{ ...iStyle, textAlign:"center", letterSpacing:8, fontSize:26 }} />
          {err && <div style={{ color:C.coral, fontSize:12, textAlign:"center" }}>{err}</div>}
          {btn("Continuar →", go3)}
        </>}

        {step === 4 && <>
          <div style={{ fontSize:12, color:C.slate, textAlign:"center" }}>Confirma tu PIN</div>
          <input type="password" inputMode="numeric" maxLength={4} value={confirm}
            onChange={e => setConfirm(e.target.value.replace(/\D/g,"").slice(0,4))}
            placeholder="••••"
            style={{ ...iStyle, textAlign:"center", letterSpacing:8, fontSize:26 }} />
          <div style={{ background:C.amberDim, border:`1px solid ${C.amber}30`,
            borderRadius:10, padding:"10px 14px", fontSize:12, color:C.slate }}>
            Nombre: <strong style={{ color:C.white }}>{name}</strong><br/>
            Tu solicitud quedará <strong style={{ color:C.amber }}>pendiente de aprobación</strong>.
          </div>
          {err && <div style={{ color:C.coral, fontSize:12, textAlign:"center" }}>{err}</div>}
          {btn("Enviar solicitud ✓", go4, "green")}
        </>}

        <button onClick={onCancel} style={{ fontSize:12, color:C.slate, background:"none", border:"none", cursor:"pointer" }}>
          ← Cancelar
        </button>
      </div>
    </div>
  );
}

// ─── MATCH CARD ───────────────────────────────────────────────────────────────
function MatchCard({ match, result, pick, onPickChange, canPick, resolvedTeams, rootingTeam, onConfirm, onUnlock, isAdminView }) {
  const teamHome = resolvedTeams?.[match.id]?.home || match.home;
  const teamAway = resolvedTeams?.[match.id]?.away || match.away;
  // Is one of the teams in this match the team this participant is rooting for?
  const homeIsRooting = rootingTeam && rootingTeam === teamHome;
  const awayIsRooting = rootingTeam && rootingTeam === teamAway;
  // If teams aren't resolved yet but we know who they're rooting for, show pending
  const teamsUnresolved = teamHome?.startsWith("W-") || teamAway?.startsWith("W-") || teamHome?.startsWith("L-");
  const rootingPending = rootingTeam && teamsUnresolved && !homeIsRooting && !awayIsRooting;

  const hasPick    = pick?.score?.[0] != null && pick?.score?.[1] != null;
  const isComplete = hasPick && !!pick?.side;
  const isConfirmed = !!pick?.confirmed;
  // Editable only if: participant can pick, pick isn't confirmed yet
  const editable = canPick && !isConfirmed;

  const ptsObj   = hasPick && result ? calcMatchPts(pick.score, pick.side, result) : null;
  const totalPts = ptsObj?.total ?? null;

  const isRootingMatch = (homeIsRooting || awayIsRooting) && !result;
  return <div style={{
      background: totalPts >= 7 ? "rgba(252,211,77,0.05)" :
                  totalPts >= 5 ? C.greenDim :
                  totalPts >= 2 ? C.amberDim :
                  isRootingMatch ? "rgba(245,158,11,0.04)" : C.surface,
      border:`1px solid ${
        totalPts >= 7 ? "rgba(252,211,77,0.25)" :
        totalPts >= 5 ? "rgba(16,185,129,0.2)" :
        totalPts >= 2 ? "rgba(245,158,11,0.2)" :
        isRootingMatch ? "rgba(245,158,11,0.3)" : C.border}`,
      borderRadius:12, padding:"11px 13px", marginBottom:8,
    }}>
      {/* header row */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:9 }}>
        <span style={{ fontSize:10, color:C.slate }}>{fmtDate(match.date)} · {match.venue}</span>
        <div style={{ display:"flex", gap:5, alignItems:"center" }}>
          {isConfirmed && !isAdminView && (
            <Tag color={C.green} small>🔒 Confirmado</Tag>
          )}
          {result && (
            <Tag color={C.green}>
              {result.score[0]}–{result.score[1]}{result.winner && result.winner !== "draw" ? ` (${result.winner === "home" ? teamHome : teamAway})` : ""}
            </Tag>
          )}
          {totalPts !== null && <PtsBadge pts={totalPts} />}
        </div>
      </div>

      {/* teams + score inputs */}
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        {/* home side */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontWeight:700, fontSize:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
            color: homeIsRooting ? C.amber : C.white }}>
            {teamHome}{homeIsRooting ? " ⭐" : ""}
          </div>
          {editable && (
            <button
              onClick={() => onPickChange({ ...pick, side: pick?.side === "home" ? null : "home" })}
              style={{
                marginTop:5, fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:20,
                background: pick?.side === "home" ? C.amber + "25" : "rgba(255,255,255,0.05)",
                border:`1px solid ${pick?.side === "home" ? C.amber + "60" : C.border}`,
                color: pick?.side === "home" ? C.amber : C.slate, cursor:"pointer",
              }}>
              {pick?.side === "home" ? "✓ Mi equipo" : "Elegir"}
            </button>
          )}
          {!editable && pick?.side === "home" && (
            <Tag color={C.amber} small>Mi equipo</Tag>
          )}
        </div>

        {/* scores */}
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          {editable ? (
            <>
              <ScoreInput value={pick?.score?.[0] ?? null} onChange={v => onPickChange({ ...pick, score:[v, pick?.score?.[1] ?? null] })} />
              <span style={{ color:C.slate, fontWeight:700, fontSize:14 }}>:</span>
              <ScoreInput value={pick?.score?.[1] ?? null} onChange={v => onPickChange({ ...pick, score:[pick?.score?.[0] ?? null, v] })} />
            </>
          ) : (
            <>
              <ScoreBox v={hasPick ? pick.score[0] : null} />
              <span style={{ color:C.slate, fontWeight:700, fontSize:12 }}>:</span>
              <ScoreBox v={hasPick ? pick.score[1] : null} />
            </>
          )}
        </div>

        {/* away side */}
        <div style={{ flex:1, minWidth:0, textAlign:"right" }}>
          <div style={{ fontWeight:700, fontSize:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", direction:"rtl",
            color: awayIsRooting ? C.amber : C.white }}>
            {awayIsRooting ? "⭐ " : ""}{teamAway}
          </div>
          {editable && (
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:5 }}>
              <button
                onClick={() => onPickChange({ ...pick, side: pick?.side === "away" ? null : "away" })}
                style={{
                  fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:20,
                  background: pick?.side === "away" ? C.amber + "25" : "rgba(255,255,255,0.05)",
                  border:`1px solid ${pick?.side === "away" ? C.amber + "60" : C.border}`,
                  color: pick?.side === "away" ? C.amber : C.slate, cursor:"pointer",
                }}>
                {pick?.side === "away" ? "✓ Mi equipo" : "Elegir"}
              </button>
            </div>
          )}
          {!editable && pick?.side === "away" && (
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:4 }}>
              <Tag color={C.amber} small>Mi equipo</Tag>
            </div>
          )}
        </div>
      </div>

      {/* confirm button */}
      {editable && isComplete && onConfirm && (
        <button onClick={onConfirm} style={{
          marginTop:10, width:"100%", background:C.greenDim, border:`1px solid ${C.green}50`,
          borderRadius:8, padding:"8px", fontSize:12, fontWeight:800, color:C.green, cursor:"pointer",
        }}>
          🔒 Confirmar pick
        </button>
      )}
      {editable && !isComplete && canPick && (
        <div style={{ marginTop:8, fontSize:10, color:C.slate, textAlign:"center" }}>
          Completa marcador y equipo para confirmar
        </div>
      )}

      {/* admin unlock button */}
      {isAdminView && isConfirmed && onUnlock && (
        <button onClick={onUnlock} style={{
          marginTop:10, width:"100%", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)",
          borderRadius:8, padding:"7px", fontSize:11, fontWeight:700, color:C.coral, cursor:"pointer",
        }}>
          🔓 Desbloquear pick
        </button>
      )}

      {/* points breakdown */}
      {rootingPending && (
        <div style={{ marginTop:8, display:"flex", alignItems:"center", gap:5 }}>
          <span style={{ fontSize:9, color:C.amber, background:"rgba(245,158,11,0.1)",
            border:`1px solid ${C.amber}40`, borderRadius:6, padding:"2px 8px", fontWeight:700 }}>
            ⭐ Apostando por: {rootingTeam}
          </span>
        </div>
      )}
      {ptsObj && ptsObj.total > 0 && (
        <div style={{ marginTop:8, display:"flex", gap:4, flexWrap:"wrap" }}>
          {ptsObj.breakdown.map((b,i) => (
            <span key={i} style={{ fontSize:9, color:C.slate, background:"rgba(255,255,255,0.04)",
              border:`1px solid ${C.border}`, borderRadius:6, padding:"2px 6px" }}>{b}</span>
          ))}
        </div>
      )}
  </div>;
}

// ─── TABLA TAB ────────────────────────────────────────────────────────────────
function TablaTab({ participants, results, picks, resolvedTeams }) {
  const approved = participants.filter(p => p.status === "approved");

  const scored = approved.map(p => {
    let total = 0, exact = 0, outcome = 0, adv = 0, played = 0;
    ALL_MATCHES.forEach(m => {
      const pick = picks[p.id]?.[m.id];
      const res  = results[m.id];
      if (!pick || !res) return;
      played++;
      const pts = calcMatchPts(pick.score, pick.side, res);
      if (!pts) return;
      total   += pts.total;
      adv     += pts.adv;
      outcome += pts.outcome > 0 ? 1 : 0;
      exact   += pts.exact > 0 ? 1 : 0;
    });
    return { ...p, total, exact, outcome, adv, played };
  }).sort((a,b) => b.total - a.total);

  const playedMatches = Object.keys(results).length;
  const remaining = ALL_MATCHES.length - playedMatches;
  const maxPerMatch = 7;
  const leader = scored[0]?.total ?? 0;

  return (
    <div>
      {/* Podium top 2 */}
      {scored.length >= 2 && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
          {scored.slice(0,2).map((p,i) => (
            <div key={p.id} style={{
              background: i===0 ? "linear-gradient(155deg,#1c1400,#0e0900)" : `linear-gradient(155deg,${C.surface},${C.bg})`,
              border:`1px solid ${i===0 ? "rgba(245,158,11,0.4)" : "rgba(180,180,220,0.18)"}`,
              borderRadius:14, padding:"14px 12px", textAlign:"center", position:"relative", overflow:"hidden",
            }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
                background: i===0 ? `linear-gradient(90deg,${C.amber},${C.coral})` : "linear-gradient(90deg,#8892A4,#555f6e)" }} />
              <div style={{ fontSize: i===0 ? 26:20, marginBottom:4 }}>{i===0?"🏆":"🥈"}</div>
              <div style={{ fontSize:9, fontWeight:800, letterSpacing:2,
                color: i===0 ? C.amber : C.slate, marginBottom:6 }}>{i===0?"GANADOR":"2DO LUGAR"}</div>
              <div style={{ width:9,height:9,borderRadius:"50%",background:p.color,
                margin:"0 auto 6px", boxShadow:`0 0 10px ${p.color}` }} />
              <div style={{ fontSize:13, fontWeight:700,
                color: i===0 ? C.amber : C.white,
                overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginBottom:4 }}>{p.name}</div>
              <div style={{ fontSize:34, fontWeight:800, color:p.color,
                fontFamily:"'Bebas Neue',sans-serif", lineHeight:1 }}>{p.total}</div>
              <div style={{ fontSize:9, color:C.slate, marginBottom:8 }}>pts</div>
              <div style={{ display:"flex", justifyContent:"center", gap:4, flexWrap:"wrap" }}>
                <Tag color={C.gold}>⭐{p.exact} exactos</Tag>
                <Tag color={C.green}>✓{p.outcome} result.</Tag>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full standings */}
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:14 }}>
        <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`,
          display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11, fontWeight:800, letterSpacing:1.5, color:C.slate }}>TABLA GENERAL</span>
          <span style={{ fontSize:10, color:C.slate }}>{playedMatches}/{ALL_MATCHES.length} partidos</span>
        </div>

        {scored.length === 0 && (
          <div style={{ padding:"28px 0", textAlign:"center", color:C.slate, fontSize:12 }}>
            Sin participantes aprobados aún
          </div>
        )}

        {scored.map((p,i) => {
          const maxPossible = p.played * maxPerMatch;
          const pct = maxPossible > 0 ? Math.round((p.total / maxPossible) * 100) : 0;
          const maxTotal = p.total + remaining * maxPerMatch;
          const canWin = maxTotal >= leader;
          return (
            <div key={p.id}>
              {i === 2 && (
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 14px",
                  background:"rgba(239,68,68,0.04)",
                  borderTop:"1px dashed rgba(239,68,68,0.2)",
                  borderBottom:"1px dashed rgba(239,68,68,0.2)" }}>
                  <div style={{ flex:1 }}/>
                  <span style={{ fontSize:9, color:"rgba(239,68,68,0.45)", fontWeight:700, letterSpacing:1 }}>— SIN PREMIO —</span>
                  <div style={{ flex:1 }}/>
                </div>
              )}
              <div style={{ padding:"9px 14px",
                borderTop: i===0 ? "none" : `1px solid ${C.border}`,
                display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ fontSize:14, fontWeight:800, width:20, flexShrink:0,
                  color: i < 2 ? p.color : "rgba(255,255,255,0.18)" }}>{i+1}</div>
                <div style={{ width:8,height:8,borderRadius:"50%",background:p.color,flexShrink:0 }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:600, fontSize:12,
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
                    <div style={{ flex:1, height:3, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden" }}>
                      <div style={{ width:`${pct}%`, height:"100%", background:p.color, borderRadius:2 }} />
                    </div>
                    <span style={{ fontSize:9, color:C.slate, flexShrink:0 }}>{p.played > 0 ? `${pct}%` : "—"}</span>
                  </div>
                </div>
                <div style={{ display:"flex", gap:4, flexShrink:0 }}>
                  <Tag color={C.gold} small>⭐{p.exact}</Tag>
                  <Tag color={C.green} small>✓{p.outcome}</Tag>
                  {i > 0 && remaining > 0 && (
                    <Tag color={canWin ? C.green : C.coral} small>{canWin ? "🎯" : "✗"}</Tag>
                  )}
                </div>
                <div style={{ fontSize:22, fontWeight:800,
                  color: i < 2 ? p.color : "rgba(255,255,255,0.28)",
                  flexShrink:0, minWidth:30, textAlign:"right",
                  fontFamily:"'Bebas Neue',sans-serif", letterSpacing:1 }}>{p.total}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scoring legend */}
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"12px 14px" }}>
        <div style={{ fontSize:10, fontWeight:800, letterSpacing:1.5, color:C.slate, marginBottom:8 }}>SISTEMA DE PUNTOS</div>
        {[
          [C.amber, "2 pts", "Tu equipo avanza (siempre)"],
          [C.green, "+3 pts","Resultado correcto (ganador o empate al fin del tiempo reglamentario)"],
          [C.gold,  "+5 pts","Marcador exacto"],
          ["#a855f7","Máx 7 pts", "Por partido"],
        ].map(([color, label, desc]) => (
          <div key={label} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:5 }}>
            <Tag color={color}>{label}</Tag>
            <span style={{ fontSize:11, color:C.slate, lineHeight:1.4 }}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PRONÓSTICOS TAB (personal pick entry) ────────────────────────────────────
function PronosticosTab({ participant, results, picks, onPickChange, onConfirmPick, resolvedTeams, teams }) {
  const [round, setRound] = useState("r32");
  const activeRound = KO_ROUNDS.find(r => r.id === round);
  const myPicks = picks[participant.id] || {};

  let total=0, played=0;
  ALL_MATCHES.forEach(m => {
    const pick = myPicks[m.id];
    const res  = results[m.id];
    if (pick && res) {
      played++;
      const pts = calcMatchPts(pick.score, pick.side, res);
      if (pts) total += pts.total;
    }
  });

  const pendingPicks = ALL_MATCHES.filter(m => !myPicks[m.id]?.score?.[0] == null || myPicks[m.id]?.score?.[0] === undefined).length;

  return (
    <div>
      {/* Personal header */}
      <div style={{
        background:`linear-gradient(135deg,${C.surface},${C.bg})`,
        border:`1px solid ${participant.color}30`,
        borderRadius:14, padding:"13px 15px", marginBottom:14,
        display:"flex", alignItems:"center", gap:12,
      }}>
        <div style={{ width:11,height:11,borderRadius:"50%",background:participant.color,
          boxShadow:`0 0 12px ${participant.color}`, flexShrink:0 }} />
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:800, fontSize:14, color:C.white }}>{participant.name}</div>
          <div style={{ fontSize:10, color:C.slate, marginTop:1 }}>Tus pronósticos de eliminatoria</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:30, fontWeight:800, color:participant.color,
            fontFamily:"'Bebas Neue',sans-serif", lineHeight:1 }}>{total}</div>
          <div style={{ fontSize:9, color:C.slate }}>pts</div>
        </div>
      </div>

      {/* Reminder if picks incomplete */}
      {ALL_MATCHES.some(m => {
        const p = myPicks[m.id];
        return !p || p.score?.[0] == null || p.score?.[1] == null || !p.side;
      }) && (
        <div style={{ background:"rgba(245,158,11,0.07)", border:`1px solid ${C.amber}30`,
          borderRadius:10, padding:"9px 12px", marginBottom:12, fontSize:12, color:C.slate,
          display:"flex", gap:8 }}>
          <span style={{ flexShrink:0 }}>⚠️</span>
          <span>Completa todos tus pronósticos antes del inicio de la Ronda de 32. ¡Incluye marcador Y equipo que avanza por partido!</span>
        </div>
      )}

      {/* Round selector */}
      <div style={{ display:"flex", gap:6, marginBottom:14, overflowX:"auto", paddingBottom:2 }}>
        {KO_ROUNDS.map(r => {
          const rMatches = r.matches;
          const done = rMatches.filter(m => {
            const p = myPicks[m.id];
            return p && p.score?.[0] != null && p.score?.[1] != null && p.side;
          }).length;
          return (
            <button key={r.id} onClick={() => setRound(r.id)} style={{
              flexShrink:0,
              background: round===r.id ? C.amberDim : "rgba(255,255,255,0.04)",
              border:`1px solid ${round===r.id ? C.amber+"60" : C.border}`,
              borderRadius:20, padding:"6px 13px", fontSize:10, fontWeight:700,
              color: round===r.id ? C.amber : C.slate, cursor:"pointer", whiteSpace:"nowrap",
            }}>
              {r.abbr}
              <span style={{ marginLeft:5, fontSize:9, opacity:0.7 }}>{done}/{rMatches.length}</span>
            </button>
          );
        })}
      </div>

      {activeRound?.matches.map(m => {
        // Use participant-specific resolved teams so their R32 picks show as team names in R16+
        const partResolved = resolveTeamsForParticipant(
          Object.fromEntries(ALL_MATCHES.map(mx => [mx.id, resolvedTeams[mx.id]])),
          results,
          myPicks
        );
        const homeTeam = partResolved[m.id]?.home || resolvedTeams[m.id]?.home || m.home;
        const awayTeam = partResolved[m.id]?.away || resolvedTeams[m.id]?.away || m.away;
        const partResolvedWithMatch = { ...partResolved, [m.id]: { home: homeTeam, away: awayTeam } };
        // Trace the participant's own pick chain (independent of actual results)
        // to find which team, if any, they're definitively rooting for here.
        const rootingTeam = getRootingTeam(participant.id, m.id, myPicks, teams);
        return (
          <MatchCard
            key={m.id}
            match={m}
            result={results[m.id]}
            pick={myPicks[m.id]}
            onPickChange={val => onPickChange(participant.id, m.id, val)}
            canPick={true}
            resolvedTeams={partResolvedWithMatch}
            rootingTeam={rootingTeam}
            onConfirm={() => onConfirmPick(participant.id, m.id)}
          />
        );
      })}
    </div>
  );
}

// ─── PICKS TAB (transparency view) ───────────────────────────────────────────
function PicksTab({ participants, results, picks, resolvedTeams }) {
  const [round, setRound]  = useState("r32");
  const [viewBy, setViewBy] = useState("match"); // "match" | "person"
  const approved = participants.filter(p => p.status === "approved");
  const activeRound = KO_ROUNDS.find(r => r.id === round);

  return (
    <div>
      {/* View toggle */}
      <div style={{ display:"flex", gap:0, marginBottom:14, background:"rgba(255,255,255,0.04)", borderRadius:10, padding:4 }}>
        {[["match","Por partido"],["person","Por persona"]].map(([id,label]) => (
          <button key={id} onClick={() => setViewBy(id)} style={{
            flex:1, background: viewBy===id ? "rgba(245,158,11,0.15)" : "transparent",
            border:`1px solid ${viewBy===id ? C.amber+"50" : "transparent"}`,
            borderRadius:8, padding:"8px 4px", fontSize:12, fontWeight:700,
            color: viewBy===id ? C.amber : C.slate, cursor:"pointer",
          }}>{label}</button>
        ))}
      </div>

      {/* Round tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:14, overflowX:"auto", paddingBottom:2 }}>
        {KO_ROUNDS.map(r => (
          <button key={r.id} onClick={() => setRound(r.id)} style={{
            flexShrink:0,
            background: round===r.id ? C.amberDim : "rgba(255,255,255,0.04)",
            border:`1px solid ${round===r.id ? C.amber+"60" : C.border}`,
            borderRadius:20, padding:"6px 13px", fontSize:10, fontWeight:700,
            color: round===r.id ? C.amber : C.slate, cursor:"pointer",
          }}>{r.abbr} · {r.label}</button>
        ))}
      </div>

      {/* BY MATCH */}
      {viewBy === "match" && activeRound?.matches.map(m => {
        const res   = results[m.id];
        const tHome = resolvedTeams?.[m.id]?.home || m.home;
        const tAway = resolvedTeams?.[m.id]?.away || m.away;
        const participantPicks = approved.map(p => ({
          ...p,
          pick: picks[p.id]?.[m.id],
          pts: picks[p.id]?.[m.id] && res
            ? calcMatchPts(picks[p.id][m.id].score, picks[p.id][m.id].side, res)
            : null,
        }));
        return (
          <div key={m.id} style={{
            background:C.surface, border:`1px solid ${C.border}`,
            borderRadius:12, padding:"11px 13px", marginBottom:10,
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:10, color:C.slate }}>{fmtDate(m.date)} · {m.venue}</span>
              {res && <Tag color={C.green}>{res.score[0]}–{res.score[1]}</Tag>}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ fontWeight:700, fontSize:13 }}>{tHome}</span>
              <span style={{ color:C.slate, fontSize:11 }}>vs</span>
              <span style={{ fontWeight:700, fontSize:13 }}>{tAway}</span>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {participantPicks.map(p => {
                const hasPick = p.pick?.score?.[0] != null;
                const pts = p.pts?.total ?? null;
                return (
                  <div key={p.id} style={{
                    display:"flex", alignItems:"center", gap:4,
                    background: pts !== null ? (pts >= 7 ? "rgba(252,211,77,0.1)" : pts >= 5 ? C.greenDim : pts >= 2 ? C.amberDim : "rgba(255,255,255,0.04)") : "rgba(255,255,255,0.04)",
                    border:`1px solid ${pts !== null ? (pts >= 7 ? "rgba(252,211,77,0.35)" : pts >= 5 ? "rgba(16,185,129,0.25)" : pts >= 2 ? "rgba(245,158,11,0.25)" : C.border) : p.color+"22"}`,
                    borderRadius:8, padding:"4px 8px",
                  }}>
                    <div style={{ width:6,height:6,borderRadius:"50%",background:p.color,flexShrink:0 }}/>
                    <span style={{ fontSize:10, color:C.slate }}>{shortName(p.name)}</span>
                    {hasPick ? (
                      <>
                        <span style={{ fontSize:11, fontWeight:700 }}>{p.pick.score[0]}–{p.pick.score[1]}</span>
                        <span style={{ fontSize:9, color:C.amber }}>
                          {p.pick.side === "home" ? `↑${tHome.split(" ")[0]}` : `↑${tAway.split(" ")[0]}`}
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize:10, color:"rgba(255,255,255,0.2)" }}>—</span>
                    )}
                    {pts !== null && <PtsBadge pts={pts} />}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* BY PERSON */}
      {viewBy === "person" && approved.map(p => {
        let roundTotal = 0;
        const myPicks = picks[p.id] || {};
        activeRound?.matches.forEach(m => {
          const pick = myPicks[m.id];
          const res  = results[m.id];
          if (pick && res) {
            const pts = calcMatchPts(pick.score, pick.side, res);
            if (pts) roundTotal += pts.total;
          }
        });
        return (
          <div key={p.id} style={{
            background:C.surface, border:`1px solid ${p.color}20`,
            borderRadius:12, marginBottom:10, overflow:"hidden",
          }}>
            <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}`,
              display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:9,height:9,borderRadius:"50%",background:p.color,flexShrink:0 }}/>
              <span style={{ flex:1, fontWeight:700, fontSize:13 }}>{p.name}</span>
              {roundTotal > 0 && <Tag color={p.color}>{roundTotal} pts esta ronda</Tag>}
            </div>
            {activeRound?.matches.map(m => {
              const pick = myPicks[m.id];
              const res  = results[m.id];
              const hasPick = pick?.score?.[0] != null;
              const tHome = resolvedTeams?.[m.id]?.home || m.home;
              const tAway = resolvedTeams?.[m.id]?.away || m.away;
              const pts = pick && res ? calcMatchPts(pick.score, pick.side, res) : null;
              return (
                <div key={m.id} style={{ padding:"8px 14px", borderBottom:`1px solid ${C.border}`,
                  display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:11, color:C.slate, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {tHome} vs {tAway}
                    </div>
                    {pick?.side && (
                      <div style={{ fontSize:10, color:C.amber, marginTop:2 }}>
                        ↑ {pick.side === "home" ? tHome : tAway}
                      </div>
                    )}
                  </div>
                  {hasPick
                    ? <span style={{ fontSize:14, fontWeight:800, color:C.white,
                        fontFamily:"'Bebas Neue',sans-serif" }}>{pick.score[0]}–{pick.score[1]}</span>
                    : <span style={{ fontSize:12, color:"rgba(255,255,255,0.15)" }}>—</span>}
                  {res && <Tag color={C.green}>{res.score[0]}–{res.score[1]}</Tag>}
                  {pts !== null && <PtsBadge pts={pts.total} />}
                </div>
              );
            })}
          </div>
        );
      })}

      {approved.length === 0 && (
        <div style={{ textAlign:"center", padding:"28px 0", color:C.slate, fontSize:12 }}>
          Sin participantes aprobados aún
        </div>
      )}
    </div>
  );
}

// ─── ANÁLISIS TAB ─────────────────────────────────────────────────────────────
function AnalisisTab({ participants, results, picks, resolvedTeams }) {
  const approved = participants.filter(p => p.status === "approved");
  const playedMatches = ALL_MATCHES.filter(m => results[m.id]);

  // Per-participant aggregates
  const stats = approved.map(p => {
    const myPicks = picks[p.id] || {};
    let total=0, advPts=0, outcomePts=0, exactPts=0;
    let advCount=0, outcomeCount=0, exactCount=0, played=0;
    let roundTotals = {};
    KO_ROUNDS.forEach(r => { roundTotals[r.id] = 0; });

    ALL_MATCHES.forEach(m => {
      const pick = myPicks[m.id];
      const res  = results[m.id];
      if (!pick || !res) return;
      played++;
      const pts = calcMatchPts(pick.score, pick.side, res);
      if (!pts) return;
      total     += pts.total;
      advPts    += pts.adv;
      outcomePts+= pts.outcome;
      exactPts  += pts.exact;
      if (pts.adv > 0)     advCount++;
      if (pts.outcome > 0) outcomeCount++;
      if (pts.exact > 0)   exactCount++;
      roundTotals[m.roundId] = (roundTotals[m.roundId] || 0) + pts.total;
    });

    const maxPts = played * 7;
    const eff = maxPts > 0 ? Math.round((total / maxPts) * 100) : 0;
    return { ...p, total, advPts, outcomePts, exactPts, advCount, outcomeCount, exactCount, played, eff, roundTotals };
  }).sort((a,b) => b.total - a.total);

  // Best day: match-by-match leaders
  const matchLeaders = playedMatches.map(m => {
    const sorted = approved.map(p => {
      const pick = picks[p.id]?.[m.id];
      const res  = results[m.id];
      const pts  = pick && res ? calcMatchPts(pick.score, pick.side, res) : null;
      return { ...p, pts: pts?.total ?? 0 };
    }).sort((a,b) => b.pts - a.pts);
    return { match: m, leader: sorted[0], top: sorted.slice(0,3) };
  });

  // Most popular picks per match
  const popularPicks = playedMatches.map(m => {
    const tHome = resolvedTeams?.[m.id]?.home || m.home;
    const tAway = resolvedTeams?.[m.id]?.away || m.away;
    let homeAdv=0, awayAdv=0, homeTotal=0, awayTotal=0;
    approved.forEach(p => {
      const pick = picks[p.id]?.[m.id];
      if (!pick?.side) return;
      if (pick.side === "home") homeAdv++;
      else awayAdv++;
      if (pick?.score?.[0] != null) { homeTotal += pick.score[0]; awayTotal += pick.score[1]; }
    });
    const n = homeAdv + awayAdv || 1;
    return {
      match: m, tHome, tAway, homeAdv, awayAdv, n,
      avgHome: n > 0 ? (homeTotal / n).toFixed(1) : "—",
      avgAway: n > 0 ? (awayTotal / n).toFixed(1) : "—",
    };
  });

  if (playedMatches.length === 0) {
    return (
      <div style={{ textAlign:"center", padding:"48px 16px" }}>
        <div style={{ fontSize:36, marginBottom:12 }}>📊</div>
        <div style={{ fontSize:14, color:C.slate }}>Las estadísticas aparecerán cuando se registren resultados.</div>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

      {/* Eficiencia general */}
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:11, fontWeight:800, letterSpacing:1.5, color:C.amber }}>EFICIENCIA GENERAL</div>
          <div style={{ fontSize:10, color:C.slate, marginTop:1 }}>Puntos obtenidos vs máximo posible · {playedMatches.length} partidos jugados</div>
        </div>
        {stats.map((p,i) => (
          <div key={p.id} style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`,
            display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ fontSize:13, fontWeight:800, width:20, flexShrink:0,
              color: i < 2 ? p.color : C.slate }}>{i+1}</div>
            <div style={{ width:8,height:8,borderRadius:"50%",background:p.color,flexShrink:0 }}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:600, fontSize:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                {p.name}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:3 }}>
                <div style={{ flex:1, height:4, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden" }}>
                  <div style={{ width:`${p.eff}%`, height:"100%", background:p.color, borderRadius:2 }}/>
                </div>
                <span style={{ fontSize:10, color:p.color, fontWeight:700, flexShrink:0 }}>{p.eff}%</span>
              </div>
            </div>
            <div style={{ textAlign:"right", flexShrink:0 }}>
              <div style={{ fontSize:20, fontWeight:800, color:p.color,
                fontFamily:"'Bebas Neue',sans-serif", lineHeight:1 }}>{p.total}</div>
              <div style={{ fontSize:9, color:C.slate }}>pts</div>
            </div>
          </div>
        ))}
      </div>

      {/* Desglose de puntos */}
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:11, fontWeight:800, letterSpacing:1.5, color:C.amber }}>DESGLOSE POR CATEGORÍA</div>
          <div style={{ fontSize:10, color:C.slate, marginTop:1 }}>Avances · Resultados · Marcadores exactos</div>
        </div>
        {stats.map(p => (
          <div key={p.id} style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:7 }}>
              <div style={{ width:7,height:7,borderRadius:"50%",background:p.color,flexShrink:0 }}/>
              <span style={{ fontWeight:700, fontSize:12, flex:1 }}>{p.name}</span>
              <span style={{ fontWeight:800, fontSize:16, color:p.color,
                fontFamily:"'Bebas Neue',sans-serif" }}>{p.total} pts</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6 }}>
              {[
                { label:"Avances", val: p.advCount,     pts: p.advPts,     color: C.amber },
                { label:"Result.", val: p.outcomeCount, pts: p.outcomePts, color: C.green },
                { label:"Exactos", val: p.exactCount,   pts: p.exactPts,   color: C.gold  },
              ].map(s => (
                <div key={s.label} style={{ background:"rgba(255,255,255,0.04)",
                  border:`1px solid ${s.color}25`, borderRadius:9, padding:"7px 6px", textAlign:"center" }}>
                  <div style={{ fontSize:18, fontWeight:800, color:s.color,
                    fontFamily:"'Bebas Neue',sans-serif", lineHeight:1 }}>{s.val}</div>
                  <div style={{ fontSize:9, color:C.slate }}>{s.label}</div>
                  <div style={{ fontSize:10, color:s.color, fontWeight:700 }}>+{s.pts}pts</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Por ronda */}
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:11, fontWeight:800, letterSpacing:1.5, color:C.amber }}>RENDIMIENTO POR RONDA</div>
        </div>
        {stats.map(p => (
          <div key={p.id} style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
              <div style={{ width:7,height:7,borderRadius:"50%",background:p.color }}/>
              <span style={{ fontWeight:700, fontSize:12, flex:1 }}>{p.name}</span>
            </div>
            <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
              {KO_ROUNDS.map(r => {
                const roundPts = p.roundTotals[r.id] || 0;
                const roundPlayed = r.matches.filter(m => results[m.id] && picks[p.id]?.[m.id]).length;
                const maxR = roundPlayed * 7;
                const col = roundPts === 0 && roundPlayed === 0 ? C.slate :
                            roundPts >= maxR * 0.7 ? C.green :
                            roundPts >= maxR * 0.4 ? C.amber : C.coral;
                return (
                  <div key={r.id} style={{ background:`${col}18`, border:`1px solid ${col}35`,
                    borderRadius:8, padding:"5px 8px", textAlign:"center", minWidth:50 }}>
                    <div style={{ fontSize:9, color:C.slate, fontWeight:700 }}>{r.abbr}</div>
                    <div style={{ fontSize:16, fontWeight:800, color: roundPlayed > 0 ? col : C.slate,
                      fontFamily:"'Bebas Neue',sans-serif", lineHeight:1 }}>
                      {roundPlayed > 0 ? roundPts : "—"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Ganadores por partido */}
      {matchLeaders.length > 0 && (
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:1.5, color:C.amber }}>MEJOR POR PARTIDO</div>
            <div style={{ fontSize:10, color:C.slate, marginTop:1 }}>Quién anotó más puntos en cada encuentro</div>
          </div>
          {matchLeaders.slice(-10).reverse().map(({ match, leader, top }) => {
            const tHome = resolvedTeams?.[match.id]?.home || match.home;
            const tAway = resolvedTeams?.[match.id]?.away || match.away;
            return (
              <div key={match.id} style={{ padding:"8px 14px", borderBottom:`1px solid ${C.border}`,
                display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:10, color:C.slate, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {tHome} vs {tAway}
                  </div>
                  <div style={{ fontSize:10, color:C.slate, marginTop:1 }}>{results[match.id]?.score[0]}–{results[match.id]?.score[1]}</div>
                </div>
                <div style={{ display:"flex", gap:4 }}>
                  {top.filter(x => x.pts > 0).map((x,i) => (
                    <div key={x.id} style={{ display:"flex", alignItems:"center", gap:3,
                      background: i===0 ? `${x.color}18` : "rgba(255,255,255,0.04)",
                      border:`1px solid ${i===0 ? x.color+"40" : C.border}`,
                      borderRadius:7, padding:"3px 7px" }}>
                      <div style={{ width:6,height:6,borderRadius:"50%",background:x.color }}/>
                      <span style={{ fontSize:10 }}>{shortName(x.name)}</span>
                      <PtsBadge pts={x.pts} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Popularidad de picks */}
      {popularPicks.length > 0 && (
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:1.5, color:C.amber }}>CONSENSO DE PICKS</div>
            <div style={{ fontSize:10, color:C.slate, marginTop:1 }}>Qué equipos eligió el grupo para avanzar</div>
          </div>
          {popularPicks.map(({ match, tHome, tAway, homeAdv, awayAdv, n }) => {
            const homePct = Math.round((homeAdv / n) * 100);
            const awayPct = 100 - homePct;
            return (
              <div key={match.id} style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5, fontSize:11 }}>
                  <span style={{ fontWeight:700 }}>{tHome}</span>
                  <span style={{ color:C.slate, fontSize:10 }}>{fmtDate(match.date)}</span>
                  <span style={{ fontWeight:700 }}>{tAway}</span>
                </div>
                <div style={{ display:"flex", height:18, borderRadius:9, overflow:"hidden", gap:2 }}>
                  <div style={{ flex: homeAdv, background: C.blue + "cc", display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:10, fontWeight:700, color:"#fff", minWidth: homeAdv > 0 ? 28 : 0 }}>
                    {homeAdv > 0 ? `${homePct}%` : ""}
                  </div>
                  <div style={{ flex: awayAdv, background: C.coral + "cc", display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:10, fontWeight:700, color:"#fff", minWidth: awayAdv > 0 ? 28 : 0 }}>
                    {awayAdv > 0 ? `${awayPct}%` : ""}
                  </div>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:3, fontSize:9, color:C.slate }}>
                  <span>{homeAdv} picks</span>
                  <span>{awayAdv} picks</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

// ─── ADMIN TAB ────────────────────────────────────────────────────────────────
function AdminTab({ participants, results, teams, picks, onApprove, onReject, onDelete, onSetResult, onSetTeams, onResetPicks, onUnlockPick, onResetResults, onClearResult }) {
  const [section, setSection] = useState("pending");
  const [round, setRound]     = useState("r32");
  const [editR, setEditR]     = useState({});   // { matchId: { score:[h,a], outcome, winner } }
  const [editT, setEditT]     = useState({});   // { matchId: { home, away } }

  const pending  = participants.filter(p => p.status === "pending");
  const approved = participants.filter(p => p.status === "approved");
  const activeRound = KO_ROUNDS.find(r => r.id === round);

  function saveResult(matchId) {
    const v = editR[matchId];
    if (!v || v.score?.[0] == null || v.score?.[1] == null || !v.winner) return;
    onSetResult(matchId, v);
    setEditR(prev => { const n = {...prev}; delete n[matchId]; return n; });
  }

  function saveTeams(matchId) {
    const v = editT[matchId] || teams[matchId] || {};
    if (v.home || v.away) onSetTeams(matchId, v);
  }

  return (
    <div>
      <div style={{ background:C.amberDim, border:`1px solid ${C.amber}30`,
        borderRadius:12, padding:"10px 14px", marginBottom:14,
        display:"flex", gap:10, alignItems:"center" }}>
        <span style={{ fontSize:16 }}>🛡</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, fontWeight:800, color:C.amber }}>PANEL ADMIN</div>
          <div style={{ fontSize:10, color:C.slate }}>
            {approved.length} aprobados · {pending.length} pendientes · PIN: {ADMIN_PIN}
          </div>
        </div>
        <div style={{ display:"flex", gap:6, flexShrink:0 }}>
          <button onClick={() => {
            if (window.confirm("¿Borrar TODOS los resultados? Los picks de los participantes NO se borrarán.")) {
              onResetResults();
            }
          }} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)",
            borderRadius:8, padding:"6px 10px", fontSize:11, fontWeight:700,
            color:C.coral, cursor:"pointer" }}>
            🗑 Reset resultados
          </button>
          <button onClick={() => {
            if (window.confirm("¿Borrar TODOS los picks de todos los participantes? Esta acción no se puede deshacer.")) {
              onResetPicks();
            }
          }} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)",
            borderRadius:8, padding:"6px 10px", fontSize:11, fontWeight:700,
            color:C.coral, cursor:"pointer" }}>
            🗑 Reset picks
          </button>
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ display:"flex", gap:5, marginBottom:14, flexWrap:"wrap" }}>
        {[
          ["pending",  `🕐 Solicitudes (${pending.length})`],
          ["results",  "⚽ Resultados"],
          ["teams",    "🏷 Equipos"],
          ["lockpicks","🔓 Picks bloqueados"],
        ].map(([id, label]) => (
          <button key={id} onClick={() => setSection(id)} style={{
            flex:1, background: section===id ? C.amberDim : "rgba(255,255,255,0.04)",
            border:`1px solid ${section===id ? C.amber+"50" : C.border}`,
            borderRadius:10, padding:"8px 4px", fontSize:10, fontWeight:700,
            color: section===id ? C.amber : C.slate, cursor:"pointer",
          }}>{label}</button>
        ))}
      </div>

      {/* Pending approvals */}
      {section === "pending" && (
        <div>
          {pending.length === 0 && (
            <div style={{ textAlign:"center", padding:"24px 0", color:C.slate, fontSize:12 }}>
              ✅ Sin solicitudes pendientes
            </div>
          )}
          {pending.map(p => (
            <div key={p.id} style={{ background:C.surface, border:`1px solid ${C.amber}25`,
              borderRadius:12, padding:"12px 14px", marginBottom:8,
              display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:10,height:10,borderRadius:"50%",background:p.color }}/>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:13 }}>{p.name}</div>
                <Tag color={C.amber}>Pendiente</Tag>
              </div>
              <button onClick={() => onApprove(p.id)} style={{ background:C.greenDim,
                border:`1px solid ${C.green}40`, borderRadius:8, padding:"6px 12px",
                fontSize:12, fontWeight:700, color:C.green, cursor:"pointer" }}>✓ Aprobar</button>
              <button onClick={() => onReject(p.id)} style={{ background:"rgba(239,68,68,0.1)",
                border:"1px solid rgba(239,68,68,0.3)", borderRadius:8, padding:"6px 12px",
                fontSize:12, fontWeight:700, color:C.coral, cursor:"pointer" }}>✗ Rechazar</button>
            </div>
          ))}

          {approved.length > 0 && (
            <div style={{ marginTop:14 }}>
              <div style={{ fontSize:10, fontWeight:800, letterSpacing:1.5, color:C.slate, marginBottom:8 }}>APROBADOS</div>
              {approved.map(p => (
                <div key={p.id} style={{ display:"flex", alignItems:"center", gap:8,
                  padding:"8px 12px", background:C.surface, border:`1px solid ${C.border}`,
                  borderRadius:10, marginBottom:6 }}>
                  <div style={{ width:8,height:8,borderRadius:"50%",background:p.color }}/>
                  <span style={{ flex:1, fontSize:13, fontWeight:600 }}>{p.name}</span>
                  <Tag color={C.green}>✓ Aprobado</Tag>
                  <button onClick={() => { if(window.confirm(`¿Eliminar a ${p.name}?`)) onDelete(p.id); }}
                    style={{ background:"none",border:"none",cursor:"pointer",fontSize:14,color:C.slate,padding:"2px 6px" }}>🗑</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Results entry */}
      {section === "results" && (
        <div>
          <div style={{ display:"flex", gap:5, marginBottom:12, overflowX:"auto" }}>
            {KO_ROUNDS.map(r => (
              <button key={r.id} onClick={() => setRound(r.id)} style={{
                flexShrink:0, background: round===r.id ? C.amberDim : "rgba(255,255,255,0.04)",
                border:`1px solid ${round===r.id ? C.amber+"60" : C.border}`,
                borderRadius:20, padding:"5px 12px", fontSize:10, fontWeight:700,
                color: round===r.id ? C.amber : C.slate, cursor:"pointer",
              }}>{r.abbr}</button>
            ))}
          </div>
          {activeRound?.matches.map(m => {
            const res     = results[m.id];
            const curr    = editR[m.id] || {};
            const tHome   = teams?.[m.id]?.home || m.home;
            const tAway   = teams?.[m.id]?.away || m.away;
            const sh      = curr.score?.[0] ?? res?.score?.[0] ?? null;
            const sa      = curr.score?.[1] ?? res?.score?.[1] ?? null;
            const winner  = curr.winner  ?? res?.winner  ?? null;
            const outcome = curr.outcome ?? res?.outcome ?? null;

            function setField(field, val) {
              setEditR(prev => ({
                ...prev,
                [m.id]: {
                  score:[
                    field==="sh" ? val : (prev[m.id]?.score?.[0] ?? sh),
                    field==="sa" ? val : (prev[m.id]?.score?.[1] ?? sa),
                  ],
                  outcome: field==="outcome" ? val : (prev[m.id]?.outcome ?? outcome),
                  winner:  field==="winner"  ? val : (prev[m.id]?.winner  ?? winner),
                }
              }));
            }

            return (
              <div key={m.id} style={{ background: res ? C.greenDim : C.surface,
                border:`1px solid ${res ? "rgba(16,185,129,0.2)" : C.border}`,
                borderRadius:10, padding:"10px 12px", marginBottom:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:10, color:C.slate }}>{m.id} · {fmtDate(m.date)} · {m.venue}</span>
                  {res ? <Tag color={C.green}>✓ OK</Tag> : <span style={{ fontSize:10, color:C.slate }}>Pendiente</span>}
                </div>
                {/* Score row */}
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <span style={{ fontWeight:700, fontSize:11, flex:1 }}>{tHome}</span>
                  <ScoreInput value={sh} onChange={v => setField("sh",v)} />
                  <span style={{ color:C.slate, fontWeight:700 }}>:</span>
                  <ScoreInput value={sa} onChange={v => setField("sa",v)} />
                  <span style={{ fontWeight:700, fontSize:11, flex:1, textAlign:"right" }}>{tAway}</span>
                </div>
                {/* Outcome + winner selectors */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10 }}>
                  <div>
                    <div style={{ fontSize:9, color:C.slate, marginBottom:4, fontWeight:700 }}>RESULTADO (90+30 min)</div>
                    <select value={outcome||""} onChange={e => setField("outcome", e.target.value || null)}
                      style={{ width:"100%", background:C.surface2, border:`1px solid ${C.border}`,
                        borderRadius:8, padding:"7px 8px", color:C.white, fontSize:11, outline:"none" }}>
                      <option value="">— seleccionar —</option>
                      <option value="home">Gana {tHome}</option>
                      <option value="away">Gana {tAway}</option>
                      <option value="draw">Empate</option>
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize:9, color:C.slate, marginBottom:4, fontWeight:700 }}>EQUIPO QUE AVANZA</div>
                    <select value={winner||""} onChange={e => setField("winner", e.target.value || null)}
                      style={{ width:"100%", background:C.surface2, border:`1px solid ${C.border}`,
                        borderRadius:8, padding:"7px 8px", color:C.white, fontSize:11, outline:"none" }}>
                      <option value="">— seleccionar —</option>
                      <option value="home">{tHome}</option>
                      <option value="away">{tAway}</option>
                    </select>
                  </div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button onClick={() => saveResult(m.id)}
                    style={{ flex:1, background:C.amberDim, border:`1px solid ${C.amber}40`,
                      borderRadius:8, padding:"8px", fontSize:12, fontWeight:700, color:C.amber, cursor:"pointer" }}>
                    Guardar resultado
                  </button>
                  {res && (
                    <button onClick={() => {
                      if (window.confirm(`¿Borrar el resultado de ${tHome} vs ${tAway}?`)) onClearResult(m.id);
                    }} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)",
                      borderRadius:8, padding:"8px 12px", fontSize:12, fontWeight:700, color:C.coral, cursor:"pointer" }}>
                      🗑
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Teams entry */}
      {section === "teams" && (
        <div>
          <div style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${C.border}`,
            borderRadius:10, padding:"9px 12px", marginBottom:12, fontSize:12, color:C.slate }}>
            Actualiza los nombres reales de los equipos a medida que se definen los clasificados.
          </div>
          <div style={{ display:"flex", gap:5, marginBottom:12, overflowX:"auto" }}>
            {KO_ROUNDS.map(r => (
              <button key={r.id} onClick={() => setRound(r.id)} style={{
                flexShrink:0, background: round===r.id ? C.amberDim : "rgba(255,255,255,0.04)",
                border:`1px solid ${round===r.id ? C.amber+"60" : C.border}`,
                borderRadius:20, padding:"5px 12px", fontSize:10, fontWeight:700,
                color: round===r.id ? C.amber : C.slate, cursor:"pointer",
              }}>{r.abbr}</button>
            ))}
          </div>
          {activeRound?.matches.map(m => {
            const currT = editT[m.id] || teams?.[m.id] || {};
            const iStyle = { width:"100%", background:C.surface2, border:`1px solid ${C.border}`,
              borderRadius:8, padding:"8px 10px", color:C.white, fontSize:12, fontFamily:"inherit", outline:"none" };
            return (
              <div key={m.id} style={{ background:C.surface, border:`1px solid ${C.border}`,
                borderRadius:10, padding:"10px 12px", marginBottom:8 }}>
                <div style={{ fontSize:10, color:C.slate, marginBottom:8 }}>{m.id} · {fmtDate(m.date)}</div>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:9, color:C.slate, marginBottom:3 }}>Local ({m.home})</div>
                    <input value={currT.home||""} onChange={e => setEditT(p => ({...p,[m.id]:{...currT,home:e.target.value}}))}
                      placeholder={m.home} style={iStyle} />
                  </div>
                  <span style={{ color:C.slate, fontWeight:700 }}>vs</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:9, color:C.slate, marginBottom:3 }}>Visitante ({m.away})</div>
                    <input value={currT.away||""} onChange={e => setEditT(p => ({...p,[m.id]:{...currT,away:e.target.value}}))}
                      placeholder={m.away} style={iStyle} />
                  </div>
                </div>
                <button onClick={() => saveTeams(m.id)}
                  style={{ width:"100%", background:C.amberDim, border:`1px solid ${C.amber}40`,
                    borderRadius:8, padding:"7px", fontSize:12, fontWeight:700, color:C.amber, cursor:"pointer" }}>
                  Guardar equipos
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Locked picks management */}
      {section === "lockpicks" && (
        <div>
          <div style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${C.border}`,
            borderRadius:10, padding:"9px 12px", marginBottom:12, fontSize:12, color:C.slate }}>
            Picks confirmados por cada participante. Desbloquea uno si necesitan corregir un error.
          </div>
          <div style={{ display:"flex", gap:5, marginBottom:12, overflowX:"auto" }}>
            {KO_ROUNDS.map(r => (
              <button key={r.id} onClick={() => setRound(r.id)} style={{
                flexShrink:0, background: round===r.id ? C.amberDim : "rgba(255,255,255,0.04)",
                border:`1px solid ${round===r.id ? C.amber+"60" : C.border}`,
                borderRadius:20, padding:"5px 12px", fontSize:10, fontWeight:700,
                color: round===r.id ? C.amber : C.slate, cursor:"pointer",
              }}>{r.abbr}</button>
            ))}
          </div>
          {approved.length === 0 && (
            <div style={{ textAlign:"center", padding:"24px 0", color:C.slate, fontSize:12 }}>
              Sin participantes aprobados
            </div>
          )}
          {approved.map(p => {
            const userPicks = picks?.[p.id] || {};
            const confirmedInRound = activeRound?.matches.filter(m => userPicks[m.id]?.confirmed) || [];
            if (confirmedInRound.length === 0) return null;
            return (
              <div key={p.id} style={{ background:C.surface, border:`1px solid ${p.color}25`,
                borderRadius:10, marginBottom:8, overflow:"hidden" }}>
                <div style={{ padding:"9px 12px", borderBottom:`1px solid ${C.border}`,
                  display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:8,height:8,borderRadius:"50%",background:p.color }}/>
                  <span style={{ flex:1, fontWeight:700, fontSize:12 }}>{p.name}</span>
                  <Tag color={C.green} small>{confirmedInRound.length} confirmados</Tag>
                </div>
                {confirmedInRound.map(m => {
                  const pick = userPicks[m.id];
                  const tHome = teams?.[m.id]?.home || m.home;
                  const tAway = teams?.[m.id]?.away || m.away;
                  return (
                    <div key={m.id} style={{ padding:"8px 12px", borderBottom:`1px solid ${C.border}`,
                      display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:10, color:C.slate, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                          {tHome} vs {tAway}
                        </div>
                        <div style={{ fontSize:12, fontWeight:700, marginTop:2 }}>
                          {pick.score[0]}–{pick.score[1]} <span style={{ fontSize:9, color:C.amber, fontWeight:400 }}>
                            ({pick.side === "home" ? tHome : tAway})
                          </span>
                        </div>
                      </div>
                      <button onClick={() => onUnlockPick(p.id, m.id)} style={{
                        background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)",
                        borderRadius:8, padding:"5px 10px", fontSize:11, fontWeight:700,
                        color:C.coral, cursor:"pointer", flexShrink:0,
                      }}>🔓 Desbloquear</button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [participants, setParticipants] = useState(() => lsGet(SK.participants, []));
  const [results,      setResults]      = useState(() => lsGet(SK.results, {}));
  const [picks,        setPicks]        = useState(() => lsGet(SK.picks, {}));
  const [teams,        setTeams]        = useState(() => lsGet(SK.teams, {}));
  const [fbReady,      setFbReady]      = useState(false);

  // ── Bootstrap: load initial state from Firestore once
  useEffect(() => {
    async function load() {
      const [p, r, pk, t] = await Promise.all([
        fbGet(SK.participants, []),
        fbGet(SK.results, {}),
        fbGet(SK.picks, {}),
        fbGet(SK.teams, {}),
      ]);
      setParticipants(p);
      setResults(r);
      setPicks(pk);
      setTeams(t);
      setFbReady(true);
    }
    load();
  }, []);

  // ── Real-time listeners — keep all devices in sync
  useEffect(() => {
    if (!fbReady) return;
    const unsubs = [
      fbListen(SK.participants, v => setParticipants(v)),
      fbListen(SK.results,      v => setResults(v)),
      fbListen(SK.picks,        v => setPicks(v)),
      fbListen(SK.teams,        v => setTeams(v)),
    ];
    return () => unsubs.forEach(u => u());
  }, [fbReady]);

  // ── Persist to Firestore + localStorage on every change (after initial load)
  useEffect(() => { if (fbReady) { fbSet(SK.participants, participants); lsSet(SK.participants, participants); } }, [participants, fbReady]);
  useEffect(() => { if (fbReady) { fbSet(SK.results,      results);      lsSet(SK.results,      results);      } }, [results,      fbReady]);
  useEffect(() => { if (fbReady) { fbSet(SK.picks,        picks);        lsSet(SK.picks,        picks);        } }, [picks,        fbReady]);
  useEffect(() => { if (fbReady) { fbSet(SK.teams,        teams);        lsSet(SK.teams,        teams);        } }, [teams,        fbReady]);

  const [tab,           setTab]          = useState("tabla");
  const [currentUser,   setCurrentUser]  = useState(null);
  const [showRegister,  setShowRegister] = useState(false);
  const [loginTarget,   setLoginTarget]  = useState(null);
  const [showAdminPin,  setShowAdminPin] = useState(false);
  const [isAdmin,       setIsAdmin]      = useState(false);

  // Resolved team names — flows winners from results into subsequent rounds
  const resolvedTeams = resolveTeams(teams, results);

  function doRegister({ name, pin }) {
    const color = P_COLORS[participants.length % P_COLORS.length];
    setParticipants(prev => [...prev, { id: Date.now(), name, pin, color, status:"pending" }]);
    setShowRegister(false);
    alert(`Listo, ${name}! Solicitud enviada. Guarda tu PIN: ${pin}`);
  }
  function doApprove(id) { setParticipants(p => p.map(x => x.id===id ? {...x,status:"approved"} : x)); }
  function doReject(id)  { setParticipants(p => p.filter(x => x.id!==id)); }
  function doDelete(id)  {
    setParticipants(p => p.filter(x => x.id!==id));
    setPicks(p => { const n={...p}; delete n[id]; return n; });
  }
  function doResetPicks()              { setPicks({}); }
  function doResetResults()            { setResults({}); }
  function doClearResult(matchId)      { setResults(p => { const n = {...p}; delete n[matchId]; return n; }); }
  function doSetResult(matchId, val)   { setResults(p => ({...p, [matchId]: val})); }
  function doSetTeams(matchId, val)    { setTeams(p   => ({...p, [matchId]: val})); }
  function doPickChange(uid, mid, val) { setPicks(p   => ({...p, [uid]: {...(p[uid]||{}), [mid]: val}})); }
  function doConfirmPick(uid, mid) {
    setPicks(p => {
      const userPicks = p[uid] || {};
      const currentPick = userPicks[mid];
      if (!currentPick) return p;
      return { ...p, [uid]: { ...userPicks, [mid]: { ...currentPick, confirmed: true } } };
    });
  }
  function doUnlockPick(uid, mid) {
    setPicks(p => {
      const userPicks = p[uid] || {};
      const currentPick = userPicks[mid];
      if (!currentPick) return p;
      return { ...p, [uid]: { ...userPicks, [mid]: { ...currentPick, confirmed: false } } };
    });
  }

  const approved = participants.filter(p => p.status === "approved");
  const pending  = participants.filter(p => p.status === "pending");
  const played   = Object.keys(results).length;

  const NAV = [
    { id:"tabla",       icon:"📊", label:"Tabla"    },
    { id:"pronosticos", icon:"⚡", label:"Picks"    },
    { id:"picks",       icon:"👥", label:"Ver todo"  },
    { id:"analisis",    icon:"📈", label:"Análisis"  },
    { id:"admin",       icon:"🛡", label:"Admin"     },
  ];

  if (!fbReady) return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", gap:16,
      fontFamily:"'Inter',system-ui,sans-serif", color:C.white }}>
      <div style={{ fontSize:40 }}>🏆</div>
      <div style={{ fontSize:16, fontWeight:800, color:C.amber, letterSpacing:2 }}>QUINIELA MUNDIAL 2026</div>
      <div style={{ fontSize:12, color:C.slate }}>Cargando datos…</div>
      <div style={{ width:48, height:4, background:"rgba(255,255,255,0.1)", borderRadius:2, overflow:"hidden", marginTop:4 }}>
        <div style={{ width:"60%", height:"100%", background:C.amber, borderRadius:2,
          animation:"slide 1s ease-in-out infinite alternate" }}/>
      </div>
      <style>{`@keyframes slide { from{transform:translateX(-100%)} to{transform:translateX(100%)} }`}</style>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:C.bg,
      fontFamily:"'Inter',system-ui,sans-serif", color:C.white,
      width:"100%", maxWidth:480, margin:"0 auto", fontSize:14, overflowX:"clip" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;}
        html,body{overflow-x:clip;margin:0;}
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}
        input[type=number]{-moz-appearance:textfield;}
        button{cursor:pointer;border:none;font-family:inherit;background:none;}
        ::-webkit-scrollbar{display:none;}
        select{-webkit-appearance:none;appearance:none;}
      `}</style>

      {showRegister && (
        <RegisterModal onDone={doRegister} onCancel={() => setShowRegister(false)}
          existingNames={participants.map(p => p.name)} />
      )}
      {loginTarget && (
        <PinModal title={`HOLA, ${loginTarget.name.toUpperCase()}`} sub="Ingresa tu PIN personal"
          correctPin={loginTarget.pin}
          onSuccess={() => { setCurrentUser(loginTarget); setLoginTarget(null); setTab("pronosticos"); }}
          onCancel={() => setLoginTarget(null)} />
      )}
      {showAdminPin && (
        <PinModal title="ACCESO ADMIN" sub="PIN de administrador" correctPin={ADMIN_PIN}
          onSuccess={() => { setIsAdmin(true); setShowAdminPin(false); setTab("admin"); }}
          onCancel={() => setShowAdminPin(false)} />
      )}

      {/* HEADER */}
      <div style={{ background:"rgba(6,9,15,0.97)", borderBottom:`1px solid ${C.border}`,
        position:"sticky", top:0, zIndex:50, backdropFilter:"blur(10px)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px 6px" }}>
          <div>
            <div style={{ fontSize:15, fontWeight:800, letterSpacing:2,
              fontFamily:"'Bebas Neue',sans-serif", color:C.amber, lineHeight:1 }}>
              🏆 QUINIELA MUNDIAL 2026
            </div>
            <div style={{ fontSize:9, color:C.slate, letterSpacing:1, marginTop:1 }}>ELIMINATORIA · CAN / USA / MEX</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:17, fontWeight:800, color:"rgba(255,255,255,0.35)",
              fontFamily:"'Bebas Neue',sans-serif", lineHeight:1 }}>
              {played}<span style={{ fontSize:10, fontWeight:400 }}>/{ALL_MATCHES.length}</span>
            </div>
            <div style={{ fontSize:9, color:C.slate }}>
              {approved.length} jugadores{pending.length > 0 ? ` · ${pending.length} ⏳` : ""}
            </div>
          </div>
        </div>
        <div style={{ display:"flex" }}>
          {NAV.map(t => {
            const active = tab === t.id;
            const accent = t.id==="pronosticos" && currentUser ? currentUser.color : C.amber;
            return (
              <button key={t.id} onClick={() => {
                if (t.id === "admin" && !isAdmin) { setShowAdminPin(true); return; }
                setTab(t.id);
              }} style={{
                flex:1, padding:"7px 2px 9px",
                borderBottom:`2px solid ${active ? accent : "transparent"}`,
                color: active ? accent : C.slate,
                fontSize:9, fontWeight:700, textAlign:"center", transition:"color 0.2s",
              }}>
                <div style={{ fontSize:14, marginBottom:2 }}>{t.icon}</div>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* BANNER */}
      <div style={{ position:"relative", width:"100%", height:85, overflow:"hidden" }}>
        <img src="https://wallpapercave.com/wp/wp15655996.jpg" alt="FIFA 2026"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 25%" }}
          onError={e => { e.target.style.display="none"; }} />
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(to bottom,rgba(6,9,15,0.1) 0%,rgba(6,9,15,0.72) 100%)" }} />
      </div>

      {/* CONTENT */}
      <div style={{ padding:"12px 10px 80px" }}>

        {tab === "tabla" && (
          <TablaTab participants={participants} results={results} picks={picks} resolvedTeams={resolvedTeams} />
        )}

        {tab === "pronosticos" && !currentUser && (
          <div>
            <div style={{ textAlign:"center", padding:"28px 0 20px" }}>
              <div style={{ fontSize:38, marginBottom:10 }}>⚡</div>
              <div style={{ fontSize:16, fontWeight:800, color:C.amber, letterSpacing:1, marginBottom:6 }}>
                TUS PRONÓSTICOS
              </div>
              <div style={{ fontSize:13, color:C.slate, marginBottom:22 }}>
                Inicia sesión para ingresar tus picks de eliminatoria.
              </div>
              <button onClick={() => setShowRegister(true)} style={{
                display:"block", width:"100%", maxWidth:300, margin:"0 auto 12px",
                background:C.amberDim, border:`1.5px solid ${C.amber}50`,
                borderRadius:12, padding:"13px", fontWeight:800, fontSize:14, color:C.amber,
              }}>⚽ Crear cuenta</button>
            </div>
            {approved.length > 0 && (
              <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
                <div style={{ padding:"9px 14px", borderBottom:`1px solid ${C.border}`,
                  fontSize:10, fontWeight:800, letterSpacing:1.5, color:C.slate }}>SELECCIONA TU NOMBRE</div>
                {approved.map(p => (
                  <button key={p.id} onClick={() => setLoginTarget(p)} style={{
                    width:"100%", display:"flex", alignItems:"center", gap:10,
                    padding:"11px 14px", borderBottom:`1px solid ${C.border}`,
                    background:"none", color:C.white, textAlign:"left",
                  }}>
                    <div style={{ width:10,height:10,borderRadius:"50%",background:p.color,flexShrink:0 }}/>
                    <span style={{ flex:1, fontWeight:600, fontSize:13 }}>{p.name}</span>
                    <span style={{ fontSize:12, color:C.slate }}>→</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "pronosticos" && currentUser && (
          <div>
            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:10 }}>
              <button onClick={() => setCurrentUser(null)} style={{
                background:"rgba(255,255,255,0.05)", border:`1px solid ${C.border}`,
                borderRadius:8, padding:"5px 12px", fontSize:11, color:C.slate,
              }}>Cerrar sesión</button>
            </div>
            <PronosticosTab participant={currentUser} results={results} picks={picks}
              onPickChange={doPickChange} onConfirmPick={doConfirmPick} resolvedTeams={resolvedTeams} teams={teams} />
          </div>
        )}

        {tab === "picks" && (
          <PicksTab participants={participants} results={results} picks={picks} resolvedTeams={resolvedTeams} />
        )}

        {tab === "analisis" && (
          <AnalisisTab participants={participants} results={results} picks={picks} resolvedTeams={resolvedTeams} />
        )}

        {tab === "admin" && !isAdmin && (
          <div style={{ textAlign:"center", padding:"40px 0" }}>
            <div style={{ fontSize:34, marginBottom:12 }}>🔐</div>
            <div style={{ color:C.slate, marginBottom:14 }}>Acceso restringido</div>
            <button onClick={() => setShowAdminPin(true)} style={{
              background:C.amberDim, border:`1px solid ${C.amber}40`,
              borderRadius:10, padding:"10px 24px", fontWeight:700, color:C.amber,
            }}>Ingresar PIN</button>
          </div>
        )}

        {tab === "admin" && isAdmin && (
          <div>
            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:10 }}>
              <button onClick={() => { setIsAdmin(false); setTab("tabla"); }} style={{
                background:"rgba(255,255,255,0.05)", border:`1px solid ${C.border}`,
                borderRadius:8, padding:"5px 12px", fontSize:11, color:C.slate,
              }}>Salir admin</button>
            </div>
            <AdminTab participants={participants} results={results} teams={teams} picks={picks}
              onApprove={doApprove} onReject={doReject} onDelete={doDelete}
              onSetResult={doSetResult} onSetTeams={doSetTeams} onResetPicks={doResetPicks}
              onUnlockPick={doUnlockPick} onResetResults={doResetResults} onClearResult={doClearResult} />
          </div>
        )}

      </div>
    </div>
  );
}