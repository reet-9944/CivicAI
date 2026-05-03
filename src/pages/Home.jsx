import { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaRobot, FaShieldAlt, FaBullhorn, FaVoteYea, FaUsers, FaBalanceScale, FaTrophy, FaCalendarAlt, FaHandshake } from 'react-icons/fa';
import heroImage from '../assets/hero_election.png';
import resourcesImg from '../assets/home_resources.png';
import timelineImg from '../assets/home_timeline.png';
import assistantImg from '../assets/home_assistant.png';
import registeringImg from '../assets/home_registering.png';
import parallax1 from '../assets/parallax1.png';
import parallax2 from '../assets/parallax2.png';
import '../styles/Home.css';

const HERO_ILLUSTRATION = 'https://cdni.iconscout.com/illustration/premium/thumb/election-voting-4500558-3804469.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

const electionCycleEvents = [
  {
    id: 1,
    icon: <FaBullhorn aria-hidden="true" />,
    row: 'top',
    title: 'Candidates Declare',
    desc: 'Candidates declare their intentions to run in the spring of the year before an election.',
  },
  {
    id: 2,
    icon: <FaUsers aria-hidden="true" />,
    row: 'bottom',
    title: 'Primaries & Caucuses',
    desc: 'Primary and caucus discussions are held from the summer before an election through April of the election year.',
  },
  {
    id: 3,
    icon: <FaCalendarAlt aria-hidden="true" />,
    row: 'top',
    title: 'State Primaries',
    desc: 'States and parties conduct primaries and caucuses from January through June each election year.',
  },
  {
    id: 4,
    icon: <FaHandshake aria-hidden="true" />,
    row: 'bottom',
    title: 'Nomination Conventions',
    desc: 'Parties have nomination conventions to choose their candidates from July until early September.',
  },
  {
    id: 5,
    icon: <FaBalanceScale aria-hidden="true" />,
    row: 'top',
    title: 'Presidential Debates',
    desc: 'Candidates participate in presidential debates in September and October, and election day falls in early November.',
  },
  {
    id: 6,
    icon: <FaVoteYea aria-hidden="true" />,
    row: 'bottom',
    title: 'Election Day',
    desc: 'Citizens cast their votes on Election Day in early November. Results are tallied and a winner is projected.',
  },
  {
    id: 7,
    icon: <FaTrophy aria-hidden="true" />,
    row: 'top',
    title: 'Inauguration',
    desc: 'The elected president is inaugurated in January, marking the peaceful transfer of power.',
  },
];

/**
 * Home Component.
 * The landing page for CivicAI, featuring a hero section, alternating content layouts,
 * and a parallax scrolling gallery to introduce users to election process education.
 *
 * @component
 * @returns {JSX.Element} The rendered Home page.
 */
const Home = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const cycleRef = useRef(null);

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);
  const quoteOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.28], [0, 1, 0]);
  const quoteY = useTransform(scrollYProgress, [0.05, 0.28], [40, -40]);
  const galleryParallax1 = useTransform(scrollYProgress, [0.7, 1], [0, -120]);
  const galleryParallax2 = useTransform(scrollYProgress, [0.7, 1], [0, 120]);

  const navToResources = useCallback(() => navigate('/resources'), [navigate]);
  const navToTimeline = useCallback(() => navigate('/timeline'), [navigate]);
  const navToAssistant = useCallback(() => navigate('/assistant'), [navigate]);

  const handleKeyDown = useCallback((e, path) => {
    if (e.key === 'Enter') navigate(path);
  }, [navigate]);

  return (
    <main className="home-page" id="main-content">

      {/* ── Hero ── */}
      <motion.section
        className="hero container"
        style={{ y: heroY }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        aria-label="Hero section"
      >
        <div className="hero-grid">
          <motion.div className="hero-content" variants={itemVariants}>
            <motion.div className="hero-badge" variants={itemVariants} aria-label="Powered by Google Gemini AI">
              <FaShieldAlt aria-hidden="true" /> Powered by Google Gemini AI
            </motion.div>

            <motion.h1 variants={itemVariants}>
              <span className="highlight">Election Process</span> Communication & Education
            </motion.h1>

            <motion.p className="hero-subtitle" variants={itemVariants}>
              Democracy works best when everyone understands how to participate.
              CivicAI uses Google Generative AI to deliver an accessible, non-partisan platform for comprehensive election process communication and voter education.
            </motion.p>


            <motion.div className="hero-actions" variants={itemVariants}>
              <Link to="/assistant" className="btn-primary" aria-label="Start chatting with CivicAI">
                <FaRobot aria-hidden="true" /> Ask CivicAI
              </Link>
              <Link to="/timeline" className="btn-secondary" aria-label="View the election process timeline">
                View Process
              </Link>
            </motion.div>

            <motion.div className="hero-stats" variants={itemVariants} aria-label="Key statistics">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">States Covered</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">AI Available</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Non-Partisan</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="hero-media" variants={itemVariants}>
            <div className="hero-img-wrapper">
              <div className="hero-img-glow" aria-hidden="true" />
              <img
                src={HERO_ILLUSTRATION}
                alt="Illustration of people voting and casting ballots at an election"
                className="hero-img float-animation"
                onError={e => { e.currentTarget.src = heroImage; }}
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Scrolling Quote ── */}
      <motion.section
        className="quote-section container"
        style={{ opacity: quoteOpacity, y: quoteY }}
        aria-label="Inspirational quote"
      >
        <blockquote>
          "Voting is the expression of our commitment to ourselves, one another, this country, and this world."
          <cite>– Sharon Salzberg</cite>
        </blockquote>
      </motion.section>

      {/* ── Alternating Sections ── */}
      <div className="alternating-sections container">

        {/* Section 1 — Image LEFT, Content RIGHT */}
        <motion.section
          className="alt-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          aria-label="Voter resources section"
        >
          <motion.div
            className="alt-media"
            variants={{
              hidden: { opacity: 0, x: -60, rotate: -3 },
              visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
            }}
          >
            <motion.div
              className="alt-img-frame"
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/010/983/387/non_2x/election-day-political-hand-drawn-cartoon-flat-illustration-with-voters-casting-ballots-at-polling-place-in-united-states-suitable-for-poster-or-campaign-vector.jpg"
                alt="Diverse group of people registering to vote at an election information booth"
                className="alt-img"
                loading="lazy"
                onError={e => { e.currentTarget.src = resourcesImg; }}
              />
              <div className="alt-img-shine" aria-hidden="true" />
            </motion.div>
          </motion.div>

          <motion.div
            className="alt-content"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } }
            }}
          >
            <h2
              className="clickable-heading"
              onClick={navToResources}
              role="button"
              tabIndex={0}
              onKeyDown={e => handleKeyDown(e, '/resources')}
              aria-label="Navigate to Resources page"
            >
              Prepare to Vote
            </h2>
            <p>
              Access our comprehensive library of resources. Find out exactly what documents you need,
              how to register in your specific state, and learn how to become a pillar of civic engagement
              in your community.
            </p>
            <Link to="/resources" className="text-link" aria-label="Explore voter resources">
              Explore Resources →
            </Link>
          </motion.div>
        </motion.section>

        {/* Section 2 — Content LEFT, Image RIGHT */}
        <motion.section
          className="alt-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          aria-label="Election timeline section"
        >
          <motion.div
            className="alt-content"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } }
            }}
          >
            <h2
              className="clickable-heading"
              onClick={navToTimeline}
              role="button"
              tabIndex={0}
              onKeyDown={e => handleKeyDown(e, '/timeline')}
              aria-label="Navigate to Timeline page"
            >
              The Election Timeline
            </h2>
            <p>
              Elections don't just happen on a single Tuesday. Understand the entire timeline from early
              registration deadlines, mail-in ballot requests, to the final certification of results.
            </p>
            <Link to="/timeline" className="text-link" aria-label="View the election timeline">
              View Timeline →
            </Link>
          </motion.div>

          <motion.div
            className="alt-media"
            variants={{
              hidden: { opacity: 0, x: 60, rotate: 3 },
              visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
            }}
          >
            <motion.div
              className="alt-img-frame"
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/041/306/359/original/election-and-voting-concept-in-3d-isometric-design-people-vote-in-democratic-elections-choose-their-political-candidate-show-exit-polls-illustration-with-isometry-scene-for-web-graphic-vector.jpg"
                alt="Person casting a ballot at a polling station on election day"
                className="alt-img"
                loading="lazy"
                onError={e => { e.currentTarget.src = timelineImg; }}
              />
              <div className="alt-img-shine" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Section 3 — Image LEFT, Content RIGHT */}
        <motion.section
          className="alt-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          aria-label="AI Assistant section"
        >
          <motion.div
            className="alt-media"
            variants={{
              hidden: { opacity: 0, x: -60, rotate: -3 },
              visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
            }}
          >
            <motion.div
              className="alt-img-frame"
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <img
                src="https://img.freepik.com/premium-vector/ai-assistant-flat-concept-vector-spot-illustration_151150-13187.jpg?w=2000"
                alt="People using AI and technology to learn about the election process"
                className="alt-img"
                loading="lazy"
                onError={e => { e.currentTarget.src = assistantImg; }}
              />
              <div className="alt-img-shine" aria-hidden="true" />
            </motion.div>
          </motion.div>

          <motion.div
            className="alt-content"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } }
            }}
          >
            <h2
              className="clickable-heading"
              onClick={navToAssistant}
              role="button"
              tabIndex={0}
              onKeyDown={e => handleKeyDown(e, '/assistant')}
              aria-label="Navigate to AI Assistant page"
            >
              Ask the AI Assistant
            </h2>
            <p>
              Have a specific question about your voting rights or local polling stations? Chat with our
              secure, non-partisan AI — built on Google's Gemini technology to provide accurate,
              educational answers.
            </p>
            <Link to="/assistant" className="text-link" aria-label="Talk to CivicAI assistant">
              Talk to CivicAI →
            </Link>
          </motion.div>
        </motion.section>

      </div>

      {/* ── Presidential Election Cycle ── */}
      <motion.section
        className="cycle-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
        aria-label="Typical Presidential Election Cycle"
      >
        <div className="container">
          <motion.div className="cycle-header" variants={itemVariants}>
            <h2>Typical Presidential Election Cycle</h2>
            <p>From candidate declarations to inauguration — how a presidential election unfolds throughout the year.</p>
          </motion.div>
        </div>

        {/* Horizontally scrollable track */}
        <div className="cycle-scroll-wrapper" ref={cycleRef} role="region" aria-label="Scroll to see election cycle events">
          <div className="cycle-track" role="list" aria-label="Election cycle events">

            {/* The horizontal spine line */}
            <div className="cycle-spine" aria-hidden="true" />

            {electionCycleEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className={`cycle-event cycle-event--${event.row}`}
                role="listitem"
                aria-label={event.title}
                initial={{ opacity: 0, y: event.row === 'top' ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Card floats above (top) or below (bottom) the spine */}
                <div className="cycle-card glass-panel">
                  <p className="cycle-card-desc">{event.desc}</p>
                </div>

                {/* Stem connects card to node */}
                <div className="cycle-stem" aria-hidden="true" />

                {/* Icon node sits on the spine */}
                <div className="cycle-node" aria-hidden="true">
                  {event.icon}
                </div>

                {/* Title label on the opposite side of the card */}
                <div className="cycle-title">{event.title}</div>
              </motion.div>
            ))}

          </div>
        </div>

        {/* Scroll hint */}
        <div className="container">
          <p className="cycle-scroll-hint" aria-hidden="true">← Scroll to explore →</p>
        </div>
      </motion.section>

      {/* ── Steps Section ── */}
      <motion.section
        className="steps-section container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
        aria-label="Electoral process steps"
      >
        <motion.div className="steps-header" variants={itemVariants}>
          <h2>Electoral Process – Registering the Voters</h2>
          <p>
            This section covers the voter registration process, including mail-in forms, in-person visits
            to the registrar's office, and same-day registration options.
          </p>
        </motion.div>

        <div className="steps-grid-layout">
          <motion.div className="steps-media" variants={itemVariants}>
            <div className="steps-image-container">
              <motion.img
                src="https://cdni.iconscout.com/illustration/premium/thumb/promotion-of-election-illustration-download-in-svg-png-gif-file-formats--voting-vote-box-political-candidate-people-pack-illustrations-3921153.png"
                alt="Illustration of people promoting election voting and civic participation"
                onError={e => { e.currentTarget.src = registeringImg; }}
                loading="lazy"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
                style={{ marginTop: '2rem' }}
              />
              <div className="steps-decoration" aria-hidden="true" />
            </div>
          </motion.div>

          <div className="steps-cards-grid" role="list" aria-label="Registration steps">
            {[
              { id: '01', text: 'In many states, voter registration is done by mail, using forms obtained from the local registrar of voters.' },
              { id: '02', text: 'In certain states, those who want to register must find the appropriate public official and attend the appropriate government office in person.' },
              { id: '03', text: 'State-by-state registration laws differ greatly depending on local jurisdictions.' },
              { id: '04', text: 'Registration deadline, or closure date, is usually several weeks before election day.' },
              { id: '05', text: 'Citizens in several states have the option of registering on election day itself at their polling place.' },
              { id: '06', text: 'Always verify your registration status before heading to the polls to ensure your voice is heard.' },
            ].map(step => (
              <motion.div key={step.id} className="step-card" variants={itemVariants} role="listitem">
                <div className="step-number" aria-label={`Step ${step.id}`}>{step.id}</div>
                <div className="step-text-box">
                  <p>{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Parallax Gallery ── */}
      <section className="parallax-gallery container" aria-label="Civic engagement gallery">
        <div className="gallery-header">
          <h2>Your Voice Matters</h2>
          <p>Join millions of citizens in shaping the future of democracy.</p>
        </div>
        <div className="gallery-grid">
          <motion.div
            className="gallery-img-wrapper gallery-img-wrapper--illustration gallery-img-wrapper--first"
            style={{ y: galleryParallax1 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://media.istockphoto.com/id/1455318318/vector/vote-ballot-box-group-of-people-putting-pepper-vote-into-the-box-election-concept-democracy.jpg?s=170667a&w=0&k=20&c=T3Y9T6GrzlS7ZmGOsHh10MOXkQDmyqyRko2s6U9Sf7Q="
              alt="Election campaign flat vector illustration"
              loading="lazy"
              onError={e => { e.currentTarget.src = parallax1; }}
            />
          </motion.div>
          <motion.div
            className="gallery-img-wrapper gallery-img-wrapper--illustration gallery-img-wrapper--second"
            style={{ y: galleryParallax2 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.5gSxBy0uFBZ9hGzZzMchCwHaEK?r=0&w=1200&h=675&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="International democracy day illustration with hands holding a vote paper"
              loading="lazy"
              onError={e => { e.currentTarget.src = parallax2; }}
            />
          </motion.div>
        </div>
      </section>

    </main>
  );
};

import { memo } from 'react';
export default memo(Home);
