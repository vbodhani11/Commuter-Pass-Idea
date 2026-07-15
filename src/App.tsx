"use client";

import { useState } from "react";

type Plan = { name: string; price: number; rides: number; miles: number; accent: string; best?: boolean };

const plans: Plan[] = [
  { name: "Essential", price: 149, rides: 20, miles: 8, accent: "#c9f48b" },
  { name: "Everyday", price: 249, rides: 40, miles: 12, accent: "#74e3d1", best: true },
  { name: "Plus", price: 349, rides: 60, miles: 18, accent: "#c7b8ff" },
];

const Icon = ({ children }: { children: React.ReactNode }) => <span className="icon">{children}</span>;

export default function Home() {
  const [tab, setTab] = useState<"home" | "pass" | "schedule">("home");
  const [plan, setPlan] = useState(plans[1]);
  const [sheet, setSheet] = useState<"plans" | "book" | "success" | null>(null);
  const [scheduled, setScheduled] = useState(true);

  const choosePlan = (next: Plan) => {
    setPlan(next);
    setSheet(null);
    setTab("pass");
  };

  return (
    <main>
      <section className="story">
        <div className="brand"><span className="mark">W</span><span>Waymo One</span><em>Concept</em></div>
        <p className="eyebrow">A product concept by Vipul Bodhani</p>
        <h1>Make the daily commute feel like a subscription, not a transaction.</h1>
        <p className="lede">A bounded mobility pass that gives riders predictable monthly costs—and gives Waymo recurring revenue, stronger retention, and more forecastable fleet demand.</p>
        <div className="value-grid">
          <div><strong>40</strong><span>monthly rides</span></div>
          <div><strong>$249</strong><span>predictable price</span></div>
          <div><strong>12 mi</strong><span>per included trip</span></div>
        </div>
        <div className="guardrails">
          <span>✓ Geofenced</span><span>✓ Peak-aware</span><span>✓ Non-transferable</span><span>✓ Fair-use protected</span>
        </div>
        <p className="hint">Try the interactive rider experience →</p>
      </section>

      <section className="device-wrap" aria-label="Interactive app concept">
        <div className="phone">
          <div className="status"><span>9:41</span><span>● ● ●</span></div>
          <div className="app">
            {tab === "home" && <HomeScreen onBook={() => setSheet("book")} onPass={() => setTab("pass")} />}
            {tab === "pass" && <PassScreen plan={plan} onChange={() => setSheet("plans")} onBook={() => setSheet("book")} />}
            {tab === "schedule" && <ScheduleScreen scheduled={scheduled} onToggle={() => setScheduled(!scheduled)} />}
          </div>
          <nav>
            <button className={tab === "home" ? "active" : ""} onClick={() => setTab("home")}><Icon>⌂</Icon>Home</button>
            <button className={tab === "pass" ? "active" : ""} onClick={() => setTab("pass")}><Icon>◇</Icon>My Pass</button>
            <button className={tab === "schedule" ? "active" : ""} onClick={() => setTab("schedule")}><Icon>◷</Icon>Schedule</button>
          </nav>
          {sheet === "plans" && <PlanSheet current={plan} onClose={() => setSheet(null)} onChoose={choosePlan} />}
          {sheet === "book" && <BookSheet plan={plan} onClose={() => setSheet(null)} onConfirm={() => setSheet("success")} />}
          {sheet === "success" && <SuccessSheet onDone={() => { setSheet(null); setTab("pass"); }} />}
        </div>
      </section>
      <footer>Unofficial product concept. Not affiliated with or endorsed by Waymo LLC. Waymo is a trademark of its respective owner.</footer>
    </main>
  );
}

function HomeScreen({ onBook, onPass }: { onBook: () => void; onPass: () => void }) {
  return <>
    <header><div className="mini-mark">W</div><button className="avatar">VB</button></header>
    <div className="map"><div className="roads"></div><span className="pin home-pin">⌂</span><span className="pin work-pin">●</span><div className="car">W</div><div className="eta">4 min away</div></div>
    <div className="home-card">
      <p className="hello">Good morning, Vipul</p><h2>Where to?</h2>
      <button className="destination" onClick={onBook}><span className="dot"></span><span><b>Work</b><small>1600 Amphitheatre Pkwy</small></span><em>›</em></button>
      <button className="destination" onClick={onBook}><span className="dot outline"></span><span><b>Choose destination</b><small>Search or select on map</small></span><em>›</em></button>
      <div className="pass-teaser"><span className="ticket">◇</span><span><b>Everyday Pass</b><small>32 rides left this month</small></span><button onClick={onPass}>View</button></div>
    </div>
  </>;
}

function PassScreen({ plan, onChange, onBook }: { plan: Plan; onChange: () => void; onBook: () => void }) {
  return <div className="screen-pad">
    <header><div><p className="overline">WAYMO COMMUTE</p><h2>My mobility pass</h2></div><button className="avatar">VB</button></header>
    <div className="pass-card" style={{"--accent": plan.accent} as React.CSSProperties}>
      <div className="pass-top"><span className="mark small">W</span><span>COMMUTER</span><em>ACTIVE</em></div>
      <h3>{plan.name}</h3><p>Renews August 1 · ${plan.price}/month</p>
      <div className="meter"><i style={{width: "80%"}}></i></div>
      <div className="usage"><div><strong>32</strong><span>rides left</span></div><div><strong>8</strong><span>used of {plan.rides}</span></div></div>
    </div>
    <button className="primary" onClick={onBook}>Book with pass</button>
    <div className="section-title"><h3>Pass details</h3><button onClick={onChange}>Change plan</button></div>
    <div className="details">
      <div><Icon>↔</Icon><span><b>Up to {plan.rides} rides / month</b><small>Resets on your billing date</small></span></div>
      <div><Icon>⌖</Icon><span><b>{plan.miles} miles included / ride</b><small>$1.25 per additional mile</small></span></div>
      <div><Icon>◷</Icon><span><b>Weekdays, 5 AM–10 PM</b><small>Designed around your commute</small></span></div>
      <div><Icon>◎</Icon><span><b>Phoenix service zone</b><small>Trips must start or end in your zone</small></span></div>
    </div>
  </div>;
}

function ScheduleScreen({ scheduled, onToggle }: { scheduled: boolean; onToggle: () => void }) {
  return <div className="screen-pad schedule"><header><div><p className="overline">AUTOMATE YOUR WEEK</p><h2>Recurring rides</h2></div><button className="avatar">VB</button></header>
    <div className="calendar"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span>{[15,16,17,18,19].map((d,i)=><b className={i<5?"selected":""} key={d}>{d}</b>)}</div>
    <div className="route-card"><div className="route-head"><span>WEEKDAY COMMUTE</span><button className={`toggle ${scheduled?"on":""}`} onClick={onToggle}><i></i></button></div><div className="route-line"><span className="route-dots">●<i></i>■</span><div><b>Home</b><small>7:45 AM pickup</small><b>Work</b><small>5:15 PM return</small></div></div><div className="days">MON · TUE · WED · THU · FRI</div></div>
    <div className="smart-note"><Icon>✦</Icon><span><b>Smart departure</b><small>Pickup adjusts up to 10 minutes using traffic and fleet availability. You’ll always be notified.</small></span></div>
    <button className="secondary">+ Add recurring ride</button>
  </div>;
}

function PlanSheet({ current, onClose, onChoose }: { current: Plan; onClose: () => void; onChoose: (p: Plan) => void }) {
  return <div className="overlay" onClick={onClose}><div className="sheet plan-sheet" onClick={e=>e.stopPropagation()}><div className="grab"></div><button className="close" onClick={onClose}>×</button><p className="overline">CHOOSE YOUR ROUTINE</p><h2>Commute your way</h2><p className="sub">Unused rides don’t roll over, keeping plans affordable and fleet capacity predictable.</p>
    <div className="plans">{plans.map(p=><button key={p.name} className={`plan ${p.name===current.name?"chosen":""}`} onClick={()=>onChoose(p)}><span className="plan-color" style={{background:p.accent}}></span><span><b>{p.name}{p.best&&<em> MOST POPULAR</em>}</b><small>{p.rides} rides · up to {p.miles} mi each</small></span><strong>${p.price}<small>/mo</small></strong></button>)}</div>
    <p className="fine">Cancel or change before your next billing date. Subject to service availability and fair-use terms.</p></div></div>;
}

function BookSheet({ plan, onClose, onConfirm }: { plan: Plan; onClose: () => void; onConfirm: () => void }) {
  return <div className="overlay" onClick={onClose}><div className="sheet book-sheet" onClick={e=>e.stopPropagation()}><div className="grab"></div><button className="close" onClick={onClose}>×</button><p className="overline">RIDE WITH YOUR PASS</p><h2>Home → Work</h2><div className="trip"><div><b>Pickup</b><span>7:45 AM · 123 Palm Ave</span></div><div><b>Drop-off</b><span>8:12 AM · 1600 Innovation Dr</span></div></div><div className="fare"><span><b>Today’s ride</b><small>10.4 miles · within pass limit</small></span><strong>$0.00</strong></div><div className="fare muted"><span>Pass balance after ride</span><b>{plan.rides - 9} rides</b></div><button className="primary" onClick={onConfirm}>Confirm pickup</button><p className="center-fine">One ride will be deducted when your vehicle is dispatched.</p></div></div>;
}

function SuccessSheet({ onDone }: { onDone: () => void }) { return <div className="overlay solid"><div className="sheet success"><div className="success-icon">✓</div><p className="overline">RIDE CONFIRMED</p><h2>Your Waymo arrives in 4 minutes</h2><p>White Jaguar I‑PACE · 8CAV221</p><div className="car-art"><span>W</span></div><button className="primary" onClick={onDone}>View my pass</button></div></div>; }
