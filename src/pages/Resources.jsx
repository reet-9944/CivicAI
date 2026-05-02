import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCheckCircle, FaRegCircle, FaExternalLinkAlt,
  FaIdCard, FaFileAlt, FaBalanceScale, FaUsers,
} from 'react-icons/fa';
import '../styles/Resources.css';

/* ── Data ─────────────────────────────────────────────────────── */
const guides = [
  {
    id: 'register',
    icon: <FaIdCard aria-hidden="true" />,
    color: '#2563eb',
    label: 'How to Register',
    subtitle: 'Step-by-step registration guide',
    description: 'Everything you need to register in your state — documents, deadlines, and online options.',
    checklist: [
      'Check eligibility (age 18+, US citizen)',
      'Gather valid photo ID',
      'Proof of address (utility bill, bank statement)',
      'Complete registration form online or by mail',
      'Confirm registration status before deadline',
    ],
    stats: [
      { label: 'States with online registration', value: 40, max: 50, unit: '/50' },
      { label: 'Avg. days before election to register', value: 15, max: 30, unit: ' days' },
    ],
    donut: { pct: 80, label: 'States allow\nonline reg.' },
    tip: 'Most states let you register online in under 5 minutes. Visit vote.gov to get started.',
    link: { label: 'Register at vote.gov', url: 'https://vote.gov' },
  },
  {
    id: 'ballots',
    icon: <FaFileAlt aria-hidden="true" />,
    color: '#f59e0b',
    label: 'Understanding Ballots',
    subtitle: 'Know what you\'re voting on',
    description: 'Learn how to read, fill out, and submit your ballot correctly so every vote counts.',
    checklist: [
      'Review your sample ballot before Election Day',
      'Research candidates and ballot measures',
      'Use a black or blue pen (no pencil)',
      'Fill bubbles completely — no stray marks',
      'Double-check before submitting',
    ],
    stats: [
      { label: 'Ballots rejected due to errors', value: 1, max: 100, unit: '%' },
      { label: 'States with mail-in voting', value: 34, max: 50, unit: '/50' },
    ],
    donut: { pct: 68, label: 'States offer\nmail-in voting' },
    tip: 'Request a replacement ballot if you make a mistake — poll workers are there to help.',
    link: { label: 'Sample Ballot Lookup', url: 'https://www.vote411.org' },
  },
  {
    id: 'rights',
    icon: <FaBalanceScale aria-hidden="true" />,
    color: '#10b981',
    label: 'Know Your Rights',
    subtitle: 'Protected rights at the polls',
    description: 'Federal law protects your right to vote. Know what you\'re entitled to before you go.',
    checklist: [
      'Right to vote if in line when polls close',
      'Right to a provisional ballot if name is missing',
      'Right to assistance if you have a disability',
      'Right to vote privately without interference',
      'Right to report voter intimidation',
    ],
    stats: [
      { label: 'Federal voting rights laws', value: 5, max: 5, unit: ' laws' },
      { label: 'Languages ballots available in', value: 28, max: 50, unit: '+' },
    ],
    donut: { pct: 100, label: 'Rights\nprotected' },
    tip: 'Call 1-866-OUR-VOTE to report any voting problems on Election Day.',
    link: { label: 'Know Your Rights (ACLU)', url: 'https://www.aclu.org/know-your-rights/voting-rights' },
  },
  {
    id: 'community',
    icon: <FaUsers aria-hidden="true" />,
    color: '#8b5cf6',
    label: 'Community Organizing',
    subtitle: 'Help others participate',
    description: 'Host voter registration drives and encourage civic participation in your community.',
    checklist: [
      'Partner with local organizations',
      'Set up a registration table at community events',
      'Share official voter info on social media',
      'Offer rides to the polls on Election Day',
      'Volunteer as a poll worker',
    ],
    stats: [
      { label: 'Turnout boost from peer outreach', value: 25, max: 100, unit: '%' },
      { label: 'Poll worker shortage (thousands)', value: 60, max: 100, unit: 'k+' },
    ],
    donut: { pct: 25, label: 'Turnout boost\nfrom outreach' },
    tip: 'Peer-to-peer outreach is the single most effective way to increase voter turnout.',
    link: { label: 'Volunteer at Power the Polls', url: 'https://www.powerthepolls.org' },
  },
];

/* ── Donut SVG ───────────────────────────────────────────────── */
const DonutChart = ({ pct, color, label }) => {
  const r = 34;
  const circ = 2 * Math.PI * r;
  return (
    <div className="res-donut-wrap" aria-label={`${pct}% — ${label.replace('\n', ' ')}`}>
      <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
        <circle cx="42" cy="42" r={r} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="8" />
        <motion.circle
          cx="42" cy="42" r={r}
          fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          transform="rotate(-90 42 42)"
        />
        <text x="42" y="47" textAnchor="middle" fontSize="13" fontWeight="800" fill={color}>{pct}%</text>
      </svg>
      <p className="res-donut-label">{label}</p>
    </div>
  );
};

/* ── Bar stat ────────────────────────────────────────────────── */
const StatBar = ({ label, value, max, unit, color }) => (
  <div className="res-stat-bar">
    <div className="res-stat-bar-top">
      <span>{label}</span>
      <span style={{ color, fontWeight: 800 }}>{value}{unit}</span>
    </div>
    <div className="res-stat-track">
      <motion.div
        className="res-stat-fill"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      />
    </div>
  </div>
);

/* ── Main ────────────────────────────────────────────────────── */
const Resources = () => {
  const [activeId, setActiveId] = useState('register');
  const [checked, setChecked] = useState({});

  const active = guides.find(g => g.id === activeId);

  const toggleCheck = (guideId, idx) => {
    const key = `${guideId}-${idx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getDone = (guideId, total) =>
    Array.from({ length: total }, (_, i) => checked[`${guideId}-${i}`]).filter(Boolean).length;

  return (
    <main className="resources-page container" id="main-content">

      {/* Header */}
      <motion.div
        className="resources-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Voter <span className="highlight">Resources</span> &amp; Guides</h1>
        <p>Select a guide on the left to explore checklists, stats, and tips.</p>
      </motion.div>

      {/* Two-panel layout */}
      <div className="res-layout">

        {/* ── LEFT: Arrow selector panel ── */}
        <div className="res-selector" role="tablist" aria-label="Resource guides">
          {guides.map((guide, index) => {
            const isActive = activeId === guide.id;
            const done = getDone(guide.id, guide.checklist.length);
            const pct = Math.round((done / guide.checklist.length) * 100);

            return (
              <motion.button
                key={guide.id}
                className={`res-arrow-tab ${isActive ? 'active' : ''}`}
                style={{
                  '--tab-color': guide.color,
                  '--tab-index': index,
                }}
                onClick={() => setActiveId(guide.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`res-panel-${guide.id}`}
                id={`res-tab-${guide.id}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ x: isActive ? 0 : 6 }}
              >
                {/* Arrow shape via clip-path is done in CSS */}
                <span className="res-tab-icon" style={{ background: isActive ? '#fff' : `${guide.color}22`, color: guide.color }}>
                  {guide.icon}
                </span>
                <span className="res-tab-text">
                  <span className="res-tab-label">{guide.label}</span>
                  <span className="res-tab-sub">{guide.subtitle}</span>
                </span>
                {/* Progress ring */}
                <span className="res-tab-progress" aria-label={`${pct}% complete`}>
                  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                    <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
                    <circle
                      cx="16" cy="16" r="12"
                      fill="none"
                      stroke={isActive ? '#fff' : guide.color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 12}`}
                      strokeDashoffset={`${2 * Math.PI * 12 * (1 - pct / 100)}`}
                      transform="rotate(-90 16 16)"
                      style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                    />
                    <text x="16" y="20" textAnchor="middle" fontSize="8" fontWeight="800"
                      fill={isActive ? '#fff' : guide.color}>{pct}%</text>
                  </svg>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ── RIGHT: Detail panel ── */}
        <div className="res-detail-panel" role="tabpanel" id={`res-panel-${active.id}`} aria-labelledby={`res-tab-${active.id}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="res-detail-inner"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Panel header */}
              <div className="res-detail-header">
                <div className="res-detail-icon" style={{ background: `${active.color}15`, color: active.color }}>
                  {active.icon}
                </div>
                <div>
                  <span className="res-detail-subtitle" style={{ color: active.color }}>{active.subtitle}</span>
                  <h2 className="res-detail-title">{active.label}</h2>
                </div>
              </div>

              <p className="res-detail-desc">{active.description}</p>

              <div className="res-detail-cols">

                {/* Checklist */}
                <div>
                  <p className="res-col-label">Checklist</p>
                  <ul className="res-checklist" role="list">
                    {active.checklist.map((task, idx) => {
                      const key = `${active.id}-${idx}`;
                      const done = !!checked[key];
                      return (
                        <motion.li
                          key={idx}
                          className={`res-check-item ${done ? 'done' : ''}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.07 }}
                          role="listitem"
                        >
                          <button
                            className="res-check-btn"
                            onClick={() => toggleCheck(active.id, idx)}
                            aria-label={done ? `Uncheck: ${task}` : `Check: ${task}`}
                            aria-pressed={done}
                            style={{ color: done ? active.color : '#cbd5e1' }}
                          >
                            {done ? <FaCheckCircle aria-hidden="true" /> : <FaRegCircle aria-hidden="true" />}
                          </button>
                          <span className={done ? 'task-done' : ''}>{task}</span>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                {/* Charts */}
                <div>
                  <p className="res-col-label">Key Stats</p>
                  <DonutChart pct={active.donut.pct} color={active.color} label={active.donut.label} />
                  <div className="res-stat-bars-wrap">
                    {active.stats.map((s, i) => (
                      <StatBar key={i} {...s} color={active.color} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Tip */}
              <div className="res-tip" style={{ borderLeftColor: active.color, background: `${active.color}0d` }}>
                <strong>💡 Tip:</strong> {active.tip}
              </div>

              {/* Link */}
              <a
                href={active.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="res-link"
                style={{ color: active.color, borderColor: `${active.color}50` }}
                aria-label={`${active.link.label} (opens in new tab)`}
              >
                {active.link.label} <FaExternalLinkAlt aria-hidden="true" />
              </a>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default Resources;
