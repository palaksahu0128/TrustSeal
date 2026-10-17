import { useState, type ReactNode } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  FileCheck2,
  Fingerprint,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  QrCode,
  RefreshCw,
  ScanLine,
  Settings2,
  ShieldCheck,
  ShieldOff,
  Smartphone,
  X,
} from 'lucide-react';

type Mode = 'verify' | 'activity' | 'notifications';
type Result = 'verified' | 'unsealed' | null;

const activity = [
  { title: 'KYC verification', issuer: 'Example Bank', time: '2 min ago', status: 'Verified', tone: 'green' },
  { title: 'Loan offer', issuer: 'FinServe India', time: '1 hr ago', status: 'Revoked', tone: 'red' },
  { title: 'OTP notice', issuer: 'Example Bank', time: 'Yesterday', status: 'Verified', tone: 'green' },
];

const notifications = [
  { title: 'Verification completed', detail: 'KYC verification from Example Bank was verified.', time: '2 min ago', icon: Check, tone: 'green' },
  { title: 'Message revoked', detail: 'The Loan offer from FinServe India is no longer trusted.', time: '1 hr ago', icon: ShieldOff, tone: 'red' },
  { title: 'Registry update', detail: 'TrustSeal registry is operational on Polygon Amoy.', time: 'Yesterday', icon: Activity, tone: 'teal' },
];

function App() {
  const [mode, setMode] = useState<Mode>('verify');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<Result>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleVerify = () => {
    setResult(message.trim().toLowerCase().includes('transfer') ? 'unsealed' : 'verified');
  };

  const goTo = (nextMode: Mode) => {
    setMode(nextMode);
    setMobileOpen(false);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand-row"><div className="brand-mark"><ShieldCheck size={22} strokeWidth={2.5} /></div><span>Trust<span>Seal</span></span><button className="icon-button close-menu" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={19} /></button></div>
        <div className="workspace-card"><div className="workspace-icon">TS</div><div><p>Personal workspace</p><strong>Demo environment</strong></div><ChevronDown size={15} /></div>
        <p className="nav-label">Workspace</p>
        <nav>
          <button className={`nav-item ${mode === 'verify' ? 'active' : ''}`} onClick={() => goTo('verify')}><ScanLine size={18} /> Verify a message</button>
          <button className={`nav-item ${mode === 'activity' ? 'active' : ''}`} onClick={() => goTo('activity')}><LayoutDashboard size={18} /> Activity log</button>
          <button className={`nav-item ${mode === 'notifications' ? 'active' : ''}`} onClick={() => goTo('notifications')}><Bell size={18} /> Notifications <span className="nav-count">12</span></button>
        </nav>
        <p className="nav-label second-label">Manage</p>
        <nav><button className="nav-item"><Settings2 size={18} /> Settings</button></nav>
        <div className="sidebar-bottom"><div className="security-note"><LockKeyhole size={17} /><div><strong>Privacy by design</strong><span>Message content stays off-chain.</span></div></div><div className="profile"><div className="avatar">PS</div><div><strong>Palak Sahu</strong><span>Administrator</span></div><MoreHorizontal size={18} /></div></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div className="breadcrumb"><span>Workspace</span><ArrowRight size={14} /><strong>{mode === 'verify' ? 'Verify a message' : mode === 'activity' ? 'Activity log' : 'Notifications'}</strong></div><div className="top-actions"><button className="icon-button" onClick={() => goTo('notifications')}><Bell size={19} /><i className="notification-dot" /></button><div className="top-avatar">PS</div></div></header>
        <div className="content-wrap">
          {mode === 'verify' && <VerifyView message={message} result={result} onMessageChange={(value) => { setMessage(value); setResult(null); }} onVerify={handleVerify} onViewAll={() => goTo('activity')} />}
          {mode === 'activity' && <ActivityView />}
          {mode === 'notifications' && <NotificationsView />}
        </div>
      </main>
    </div>
  );
}

function VerifyView({ message, result, onMessageChange, onVerify, onViewAll }: { message: string; result: Result; onMessageChange: (value: string) => void; onVerify: () => void; onViewAll: () => void }) {
  return <>
    <section className="page-heading"><div><p className="eyebrow">PUBLIC VERIFIER</p><h1>Does this message belong to who it says it does?</h1><p className="heading-copy">Check the cryptographic seal before you click, pay, or share.</p></div><div className="trust-pill"><span className="pulse-dot" /> Registry operational</div></section>
    <section className="verify-grid"><div className="panel verify-panel"><div className="panel-heading"><div className="heading-icon teal"><ScanLine size={20} /></div><div><h2>Verify a message</h2><p>Paste the message or scan its TrustSeal QR code.</p></div></div><div className="input-label"><span>Message or seal code</span><span className="optional">Required</span></div><div className="message-input-wrap"><textarea value={message} onChange={(event) => onMessageChange(event.target.value)} placeholder="Paste a message, seal code, or verification link here..." /><button className="scan-button"><QrCode size={18} /> Scan QR</button></div><div className="input-meta"><span>{message.length} / 2,000 characters</span><span><LockKeyhole size={13} /> Never stored</span></div><button className="primary-button verify-button" onClick={onVerify}><ShieldCheck size={18} /> Verify message <ArrowRight size={17} /></button><div className="or-divider"><span>or continue with</span></div><button className="secondary-button"><Smartphone size={17} /> Open camera to scan</button></div><div className="result-column">{result ? <ResultCard result={result} onReset={() => onMessageChange('')} /> : <div className="empty-result"><div className="empty-orbit"><Fingerprint size={31} /></div><h3>Your result will appear here</h3><p>TrustSeal checks the issuer signature and on-chain status in seconds.</p><div className="mini-feature"><Check size={15} /> Authenticity, not guesswork</div><div className="mini-feature"><Check size={15} /> Private by default</div></div>}<div className="how-card"><div className="how-title"><FileCheck2 size={17} /> How TrustSeal works</div><div className="how-steps"><span><b>1</b> Paste</span><ArrowRight size={14} /><span><b>2</b> Check seal</span><ArrowRight size={14} /><span><b>3</b> Act safely</span></div></div></div></section>
    <section className="below-grid"><div><div className="section-title"><div><p className="eyebrow">RECENT ACTIVITY</p><h2>Verification history</h2></div><button className="ghost-button" onClick={onViewAll}>View all <ArrowRight size={15} /></button></div><div className="activity-table">{activity.map((item) => <ActivityRow item={item} key={item.title} />)}</div></div><div className="tip-card"><div className="tip-icon"><ShieldCheck size={19} /></div><div><p className="eyebrow">SAFETY TIP</p><h3>Never share an OTP to verify a message.</h3><p>TrustSeal only needs the message itself — never your password, PIN, or payment details.</p></div></div></section>
  </>;
}

function ResultCard({ result, onReset }: { result: Exclude<Result, null>; onReset: () => void }) {
  return <div className={`result-card ${result}`}><div className="result-top"><div className="result-icon">{result === 'verified' ? <Check size={25} /> : <ShieldOff size={25} />}</div><div><span className="result-kicker">TrustSeal result</span><h2>{result === 'verified' ? 'Verified message' : 'Unsealed message'}</h2></div></div><p className="result-message">{result === 'verified' ? 'This message was signed by Example Bank and has not been altered.' : 'No valid seal found. Do not trust this message or share any payment details.'}</p><div className="result-details"><div><span>ISSUER</span><strong>Example Bank</strong></div><div><span>STATUS</span><strong>{result === 'verified' ? 'Active on registry' : 'Unknown'}</strong></div><div><span>CHECKED</span><strong>Just now</strong></div></div><button className="text-button" onClick={onReset}>Verify another <ArrowRight size={15} /></button></div>;
}

function ActivityRow({ item }: { item: typeof activity[number] }) {
  return <div className="activity-row"><div className={`status-icon ${item.tone}`}>{item.tone === 'red' ? <AlertTriangle size={14} /> : <Check size={15} />}</div><div className="activity-main"><strong>{item.title}</strong><span>{item.issuer}</span></div><span className="activity-time">{item.time}</span><span className={`status-badge ${item.tone}`}>{item.status}</span><MoreHorizontal size={17} className="row-more" /></div>;
}

function ActivityView() {
  return <><section className="page-heading"><div><p className="eyebrow">WORKSPACE ACTIVITY</p><h1>Everything trusted, in one place.</h1><p className="heading-copy">Review your verification history and message health at a glance.</p></div><div className="trust-pill"><span className="pulse-dot" /> Registry operational</div></section><section className="stats-grid"><StatCard label="Messages sealed" value="1,284" detail="+12.8% vs last month" tone="teal" icon={<FileCheck2 size={17} />} /><StatCard label="Verification rate" value="98.6%" detail="+2.4% vs last month" tone="green" icon={<Check size={17} />} /><StatCard label="Successful checks" value="1,102" detail="Across your workspace" tone="amber" icon={<ShieldCheck size={17} />} /><StatCard label="Registry status" value="Live" detail="Polygon Amoy testnet" tone="green" live icon={<Activity size={17} />} /></section><section className="panel table-panel activity-dashboard-table"><div className="table-header"><div><h2>Recent messages</h2><p>Every verification and trust event in your workspace.</p></div><div className="table-actions"><button className="icon-button"><RefreshCw size={17} /></button><button className="filter-button">All statuses <ChevronDown size={14} /></button></div></div><div className="activity-table full-activity">{activity.map((item) => <ActivityRow item={item} key={item.title} />)}<div className="activity-row"><div className="status-icon green"><Check size={15} /></div><div className="activity-main"><strong>September statement</strong><span>Example Bank</span></div><span className="activity-time">Sep 16, 11:20</span><span className="status-badge green">Verified</span><MoreHorizontal size={17} className="row-more" /></div></div><button className="load-button"><RefreshCw size={15} /> Load more</button></section></>;
}

function StatCard({ label, value, detail, tone, icon, live = false }: { label: string; value: string; detail: string; tone: string; icon: ReactNode; live?: boolean }) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><div className={`stat-icon ${tone}`}>{icon}</div></div><strong className={live ? 'status-live' : ''}>{live && <i />}{value}</strong><small>{detail}</small></div>;
}

function NotificationsView() {
  return <><section className="page-heading"><div><p className="eyebrow">WORKSPACE UPDATES</p><h1>Notifications</h1><p className="heading-copy">Stay informed about verification results and registry changes.</p></div><div className="notification-summary"><Bell size={16} /> 12 unread</div></section><section className="notifications-layout"><div className="panel notifications-panel"><div className="notifications-header"><div><h2>Recent notifications</h2><p>Updates from your TrustSeal workspace.</p></div><button className="ghost-button">Mark all as read</button></div>{notifications.map((item) => { const Icon = item.icon; return <div className="notification-row" key={item.title}><div className={`notification-icon ${item.tone}`}><Icon size={17} /></div><div className="notification-copy"><strong>{item.title}</strong><p>{item.detail}</p><span>{item.time}</span></div><i className="unread-dot" /></div>; })}</div><div className="tip-card notifications-tip"><div className="tip-icon"><Bell size={19} /></div><div><p className="eyebrow">NOTIFICATION SETTINGS</p><h3>Never miss a trust update.</h3><p>Notifications keep you informed when a message changes status or the registry needs your attention.</p><button className="text-button">Manage preferences <ArrowRight size={14} /></button></div></div></section></>;
}

export default App;
