import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaIdCard, FaMapMarkerAlt, FaVoteYea, FaBoxOpen,
  FaChevronDown, FaCheckCircle, FaExternalLinkAlt,
  FaRegCircle,
} from 'react-icons/fa';
import '../styles/Timeline.css';

const timelineData = [
  {
    id: 1,
    title: 'Voter Registration',
    description:
      'Ensure you are eligible and registered to vote. Check deadlines for your state or region — most states require registration weeks before Election Day.',
    icon: <FaIdCard aria-hidden="true" />,
    date: 'Months before Election',
    color: '#2563eb',
    colorLight: 'rgba(37,99,235,0.1)',
    checklist: [
      'Confirm you meet age and citizenship requirements',
      'Gather required documents (ID, proof of address)',
      'Complete registration form online or by mail',
      'Verify your registration status before the deadline',
    ],
    tip: 'Most states allow online registration. Visit vote.gov to find your state\'s portal.',
    link: { label: 'Register to Vote', url: 'https://vote.gov' },
  },
  {
    id: 2,
    title: 'Find Your Polling Station',
    description:
      "Locate your assigned polling place using your state's official voter portal, or request a mail-in ballot if applicable in your jurisdiction.",
    icon: <FaMapMarkerAlt aria-hidden="true" />,
    date: 'Weeks before Election',
    color: '#0d9488',
    colorLight: 'rgba(13,148,136,0.1)',
    checklist: [
      'Look up your polling location using your registered address',
      'Check polling hours for your jurisdiction',
      'Request a mail-in or absentee ballot if needed',
      'Plan your route and transportation in advance',
    ],
    tip: 'Polling locations can change between elections. Always verify before Election Day.',
    link: { label: 'Find Your Polling Place', url: 'https://www.usa.gov/absentee-voting' },
  },
  {
    id: 3,
    title: 'Cast Your Vote',
    description:
      'Go to your polling station on Election Day, bring required ID, and cast your ballot. Polls are typically open from early morning to evening.',
    icon: <FaVoteYea aria-hidden="true" />,
    date: 'Election Day',
    color: '#ec4899',
    colorLight: 'rgba(236,72,153,0.1)',
    checklist: [
      'Bring valid photo ID (requirements vary by state)',
      'Arrive early to avoid long lines',
      'Review your sample ballot beforehand',
      'Ask a poll worker if you need assistance',
    ],
    tip: 'If you\'re in line before polls close, you have the right to vote. Don\'t leave!',
    link: { label: 'Know Your Voting Rights', url: 'https://www.aclu.org/know-your-rights/voting-rights' },
  },
  {
    id: 4,
    title: 'Results & Inauguration',
    description:
      'Votes are counted, results are certified by election officials, and elected officials are sworn into office during the inauguration ceremony.',
    icon: <FaBoxOpen aria-hidden="true" />,
    date: 'Post-Election',
    color: '#7c3aed',
    colorLight: 'rgba(124,58,237,0.1)',
    checklist: [
      'Results are reported on election night (unofficial)',
      'Absentee and mail-in ballots are counted over days',
      'States certify results within weeks',
      'Elected officials are inaugurated and take office',
    ],
    tip: 'Final certified results may differ from election night projections. Be patient.',
    link: { label: 'Learn About the Process', url: 'https://www.usa.gov/election-results' },
  },
];

const Timeline = () => {
  const [activeId, setActiveId] = useState(null);
  const [checked, setChecked] = useState({});

  const toggle = (id) => setActiveId(prev => prev === id ? null : id);

  const toggleCheck = (stepId, idx) => {
    const key = `${stepId}-${idx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getProgress = (stepId, total) => {
    const done = Array.from({ length: total }, (_, i) => checked[`${stepId}-${i}`]).filter(Boolean).length;
    return Math.round((done / total) * 100);
  };

  return (
    <main className="timeline-page container animate-fade-in" id="main-content">
      <motion.div
        className="timeline-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>The Election Process</h1>
        <p>A step-by-step guide to participating in democracy. Click each step to explore.</p>
      </motion.div>

      {/* Progress bar across all steps */}
      <motion.div
        className="timeline-overall-progress"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        aria-label="Overall checklist progress"
      >
        <div className="top-progress-label">
          <span>Your Progress</span>
          <span>
            {Object.values(checked).filter(Boolean).length} /&nbsp;
            {timelineData.reduce((a, s) => a + s.checklist.length, 0)} tasks
          </span>
        </div>
        <div className="top-progress-track">
          <motion.div
            className="top-progress-fill"
            animate={{
              width: `${Math.round(
                (Object.values(checked).filter(Boolean).length /
                  timelineData.reduce((a, s) => a + s.checklist.length, 0)) * 100
              )}%`
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      <ol className="timeline-container" aria-label="Election process timeline">
        <div className="timeline-line" aria-hidden="true" />

        {timelineData.map((item, index) => {
          const isActive = activeId === item.id;
          const progress = getProgress(item.id, item.checklist.length);

          return (
            <motion.li
              key={item.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${isActive ? 'is-active' : ''}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              aria-label={`Step ${item.id}: ${item.title}`}
            >
              {/* Icon node */}
              <motion.div
                className="timeline-icon"
                style={{ borderColor: item.color, color: item.color }}
                whileHover={{ scale: 1.15 }}
                animate={isActive ? { scale: 1.1, boxShadow: `0 0 0 6px ${item.colorLight}` } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                aria-hidden="true"
              >
                {item.icon}
                {/* Step number badge */}
                <span className="timeline-step-badge" style={{ background: item.color }}>
                  {item.id}
                </span>
              </motion.div>

              {/* Card */}
              <motion.div
                className="timeline-content"
                style={{ '--step-color': item.color, '--step-color-light': item.colorLight }}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                {/* Top bar with progress */}
                <div className="tc-top">
                  <span className="timeline-date" style={{ background: item.colorLight, color: item.color, borderColor: `${item.color}30` }}>
                    {item.date}
                  </span>
                  {progress > 0 && (
                    <span className="tc-progress-badge" style={{ color: item.color }}>
                      {progress}% done
                    </span>
                  )}
                </div>

                <h2>{item.title}</h2>
                <p className="tc-desc">{item.description}</p>

                {/* Mini progress bar */}
                <div className="tc-mini-progress" aria-label={`${progress}% of checklist complete`}>
                  <div className="tc-mini-track">
                    <motion.div
                      className="tc-mini-fill"
                      style={{ background: item.color }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Expand toggle */}
                <button
                  className="tc-toggle"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isActive}
                  aria-controls={`step-details-${item.id}`}
                  style={{ color: item.color }}
                >
                  <span>{isActive ? 'Hide details' : 'Show checklist & tips'}</span>
                  <motion.span
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'flex' }}
                  >
                    <FaChevronDown aria-hidden="true" />
                  </motion.span>
                </button>

                {/* Expandable details */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={`step-details-${item.id}`}
                      className="tc-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="tc-details-inner">
                        {/* Checklist */}
                        <p className="tc-checklist-label">Your checklist:</p>
                        <ul className="tc-checklist" role="list">
                          {item.checklist.map((task, idx) => {
                            const key = `${item.id}-${idx}`;
                            const done = !!checked[key];
                            return (
                              <motion.li
                                key={idx}
                                className={`tc-check-item ${done ? 'done' : ''}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.06 }}
                                role="listitem"
                              >
                                <button
                                  className="tc-check-btn"
                                  onClick={() => toggleCheck(item.id, idx)}
                                  aria-label={done ? `Uncheck: ${task}` : `Check: ${task}`}
                                  aria-pressed={done}
                                  style={{ color: done ? item.color : undefined }}
                                >
                                  {done
                                    ? <FaCheckCircle aria-hidden="true" />
                                    : <FaRegCircle aria-hidden="true" />
                                  }
                                </button>
                                <span className={done ? 'tc-task-done' : ''}>{task}</span>
                              </motion.li>
                            );
                          })}
                        </ul>

                        {/* Tip */}
                        <div className="tc-tip" style={{ borderLeftColor: item.color, background: item.colorLight }}>
                          <strong>💡 Tip:</strong> {item.tip}
                        </div>

                        {/* External link */}
                        <a
                          href={item.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tc-link"
                          style={{ color: item.color, borderColor: `${item.color}40` }}
                          aria-label={`${item.link.label} (opens in new tab)`}
                        >
                          {item.link.label} <FaExternalLinkAlt aria-hidden="true" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.li>
          );
        })}
      </ol>

      {/* ── Google Maps: Find Polling Stations ── */}
      <motion.section
        className="timeline-map-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        aria-label="Find polling stations near you"
      >
        <div className="timeline-map-header">
          <div className="timeline-map-title-row">
            <span className="timeline-map-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Powered by Google Maps
            </span>
            <h2>Find Polling Stations Near You</h2>
          </div>
          <p>Use the map below to locate polling stations, election offices, and voter registration centers in your area.</p>
        </div>

        <div className="timeline-map-frame" role="region" aria-label="Google Maps showing polling stations">
          <iframe
            title="Find Polling Stations – Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d387190.2799160891!2d-74.25987368715491!3d40.69767006856166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1spolling%20station!5e0!3m2!1sen!2sus!4v1699000000000!5m2!1sen!2sus"
            width="100%"
            height="420"
            style={{ border: 0, borderRadius: '16px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className="timeline-map-note">
          💡 <strong>Tip:</strong> Search "polling station" or "voter registration office" in Google Maps, or visit{' '}
          <a href="https://www.vote.gov" target="_blank" rel="noopener noreferrer">vote.gov</a> for your official state portal.
        </p>
      </motion.section>

    </main>
  );
};

export default Timeline;
