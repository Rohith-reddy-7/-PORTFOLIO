"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, BrainCircuit, ChevronDown, ExternalLink, Globe2, Mail, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import NeuralScene from "./components/NeuralScene";

const projects = [
  { title: "AI Resume Relevance Checker", label: "AI / application", description: "Resume and job-description matching with personalized resume suggestions and OpenAI integration.", signal: "language → relevance", accent: "01", href: "https://resume-checker-8zlv9scgnsohrwsqkammpr.streamlit.app/" },
  { title: "Air Quality Prediction Dashboard", label: "ML / dashboard", description: "Machine-learning based AQI prediction with feature engineering, visualization, and Streamlit deployment.", signal: "sensor → forecast", accent: "02", href: "https://air-quality-index-predictor-vtjjho7vmy3hwakshovfrt.streamlit.app/" },
  { title: "Customer Churn & A/B Testing", label: "Analytics / research", description: "Business analytics work combining churn analysis, statistical testing, and customer insights.", signal: "cohort → decision", accent: "03", href: "https://github.com/Rohith-reddy-7" },
];

const skills = {
  Data: ["Python", "SQL", "Pandas"],
  ML: ["scikit-learn", "Feature engineering", "Evaluation"],
  AI: ["LLM workflows", "Prompt design"],
  Visualization: ["Matplotlib", "Plotly", "Data storytelling"],
};

const stack = ["Python", "SQL", "Machine Learning", "Data Visualization", "AI", "AWS", "FastAPI"];

const certifications = [
  { title: "Aspire", image: "/video/aspire.pdf", label: "leadership / global collaboration", chapter: "the launch", description: "Interacted with people from different countries, built confidence across cultures, and strengthened leadership through collaboration.", signal: "people → perspective → leadership", icon: Globe2 },
  { title: "Code Unnati × SAP", image: "/video/Code unnati X sap_FC.pdf", label: "data & analytics", chapter: "the bridge", description: "A practical bridge between technology and context: learning to turn data, business thinking, and curiosity into useful direction.", signal: "context → analysis → action", icon: Users },
  { title: "Harvard CS50 Python", image: "/video/Harvard python certificate.pdf", label: "computer science", chapter: "the foundation", description: "A rigorous programming foundation for the experiments, analysis, and products that followed.", signal: "logic → code → systems", icon: BrainCircuit },
];

const csiAward = {
  award: "/media/IMG-20260711-WA0004.jpg.jpeg",
  trophy: "/media/IMG-20260711-WA0025.jpg.jpeg",
  presentation: "/media/IMG-20260711-WA0028.jpg.jpeg",
};

const learningTrack = [
  { number: "05", title: "Python, Data Structures & Algorithms", eyebrow: "NPTEL / computational thinking", outcome: "Builds the habit of breaking ambiguous problems into clear, efficient steps before writing code.", document: "/certificates/Programming, Data Structures and Algorithms using Python.pdf" },
  { number: "06", title: "Database Management Systems", eyebrow: "NPTEL / information systems", outcome: "Turns raw information into structured, queryable systems that can support reliable analysis and decisions.", document: "/certificates/Data Base Management System.pdf" },
  { number: "07", title: "Edunet Foundation", eyebrow: "foundation / continued learning", outcome: "Adds the discipline to keep learning across tools, teams, and changing technical contexts.", document: "/certificates/23E41A0509.pdf" },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = counterRef.current;
    if (!target) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 900, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(target);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={counterRef}>{count}{suffix}</span>;
}

function DataGraph() {
  const reduceMotion = useReducedMotion();
  const nodes = [
    { x: 50, y: 34, label: "DATA" },
    { x: 180, y: 88, label: "INSIGHTS" },
    { x: 324, y: 40, label: "ML" },
    { x: 455, y: 104, label: "AI" },
    { x: 592, y: 48, label: "PRODUCTS" },
  ];

  return (
    <svg className="data-graph" viewBox="0 0 640 150" role="img" aria-label="Data flows through insights, machine learning and AI into products">
      {nodes.slice(0, -1).map((node, index) => {
        const next = nodes[index + 1];
        const path = `M ${node.x + 8} ${node.y} C ${(node.x + next.x) / 2} ${node.y}, ${(node.x + next.x) / 2} ${next.y}, ${next.x - 8} ${next.y}`;
        return <path key={path} className={`graph-path graph-path-${index}`} d={path} />;
      })}
      {nodes.map((node, index) => (
        <g key={node.label} className={`graph-node graph-node-${index} ${index === nodes.length - 1 && !reduceMotion ? "graph-node-final" : ""}`}>
          <circle cx={node.x} cy={node.y} r={index === nodes.length - 1 ? 6 : 4} />
          <text x={node.x} y={node.y + 25} textAnchor="middle">{node.label}</text>
        </g>
      ))}
    </svg>
  );
}

function IntroReveal() {
  return <div className="intro-reveal" aria-hidden="true"><span>DEVIREDDY ROHITH REDDY</span><i /></div>;
}

function ProjectVisual({ index }: { index: number }) {
  if (index === 0) {
    return <div className="project-scene project-scene-ai" aria-hidden="true"><Image className="resume-ai-image" src="/media/robo.png" alt="" fill sizes="(max-width: 800px) 100vw, 50vw" /><span className="resume-ai-shade" /><span className="scene-code">AI REVIEWER / 01</span><span className="resume-eye-beam resume-eye-beam-left" /><span className="resume-eye-beam resume-eye-beam-right" /><span className="resume-eye-origin resume-eye-origin-left" /><span className="resume-eye-origin resume-eye-origin-right" /><span className="resume-image-score">92% MATCH</span><span className="resume-image-pulse" /><span className="resume-image-caption">CV → SIGNAL → FIT</span></div>;
  }
  if (index === 1) {
    return <div className="project-scene project-scene-air" aria-hidden="true"><video className="aqi-video" src="/video/globe-clean.mp4" autoPlay muted loop playsInline /><span className="aqi-scene-label">LIVE / AQI</span><span className="aqi-video-glass" /><b>PM2.5</b></div>;
  }
  return <div className="project-scene project-scene-churn" aria-hidden="true"><span className="churn-split churn-split-a">A</span><span className="churn-split churn-split-b">B</span><span className="scene-cohort scene-cohort-one" /><span className="scene-cohort scene-cohort-two" /><span className="scene-cohort scene-cohort-three" /><span className="churn-beam" /><span className="churn-axis churn-axis-x" /><span className="churn-axis churn-axis-y" /><b>retention / lift</b></div>;
}

export default function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <main>
      <div className="ambient-field" aria-hidden="true">
        <span className="field-scan field-scan-one" /><span className="field-scan field-scan-two" />
        <span className="field-path field-path-one" /><span className="field-path field-path-two" />
        <span className="field-node field-node-one" /><span className="field-node field-node-two" /><span className="field-node field-node-three" />
      </div>
      <IntroReveal />
      <nav className="site-nav section-shell" aria-label="Primary navigation">
        <a href="#top" className="wordmark">R / DATA</a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-status" href="#contact"><span /> available to connect</a>
      </nav>

      <section id="top" className="hero section-shell">
        <div className="hero-grid-bg" />
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="eyebrow">AI enthusiast / data analyst</p>
          <h1>I turn messy data into useful direction.</h1>
          <p className="hero-lede">AI & machine learning engineer, Python developer, and data analytics enthusiast building technology that solves real-world problems.</p>
          <div className="hero-actions">
            <a className="cta-primary" href="#work">Explore the work <ArrowUpRight size={16} /></a>
            <a className="cta-outline" href="#contact">Let&apos;s connect <Mail size={16} /></a>
            <a className="cta-text" href="#about">More about the practice <ArrowUpRight size={14} /></a>
          </div>
          <div className="hero-footerline"><span>est. in 2026</span><span>( signal lab )</span><span>scroll to explore ↓</span></div>
        </motion.div>
        <NeuralScene />
        <motion.div
          className="hero-graph-wrap"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="graph-caption">a working path / from raw signal to shipped idea</span>
          <DataGraph />
        </motion.div>
        <a className="scroll-cue" href="#work"><span className="scroll-cue-line" /> scroll to inspect</a>
      </section>

      <div className="marquee" aria-label="Technology stack">
        <div className="marquee-track">{[...stack, ...stack].map((item, index) => <span className="marquee-item" key={`${item}-${index}`}>{item}</span>)}</div>
      </div>

      <section className="signal-band section-shell" aria-label="Portfolio stats">
        <div><strong><Counter value={150} suffix="+" /></strong><span>LeetCode problems solved</span></div>
        <div><strong><Counter value={3} /></strong><span>featured projects</span></div>
        <div><strong><Counter value={certifications.length + learningTrack.length} /></strong><span>credentials listed</span></div>
        <p className="signal-note">Signals pulled from the public GitHub profile.</p>
      </section>

      <section id="work" className="section-pad section-shell">
        <div className="section-heading-row"><div><span className="eyebrow">selected work</span><h2>Useful things, carefully made.</h2></div><span className="section-aside">/ project archive</span></div>
        <div className="project-grid">
          {projects.map((project, index) => <a href={project.href} target="_blank" rel="noreferrer" className="project-card" key={project.accent}>
            <div className={`project-card-top project-visual project-visual-${index}`}><span className="project-kicker">{project.label}</span><span className="project-arrow"><ExternalLink size={16} /></span><ProjectVisual index={index} /><span className="project-signal">{project.signal}</span></div>
            <div className="project-card-body"><span className="project-index">{project.accent}</span><h3>{project.title}</h3><p>{project.description}</p><div className="workflow-meta">Data <span>→</span> Cleaning <span>→</span> Modeling <span>→</span> Insight</div></div>
          </a>)}
        </div>
      </section>

      <section id="about" className="section-pad section-shell about-section">
        <div className="section-heading-row"><div><span className="eyebrow">the practice</span><h2>Tools are a means, not the point.</h2></div></div>
        <div className="about-grid"><div><Image className="profile-image" src="/media/profile.jpeg" alt="Devireddy Rohith Reddy" width={900} height={1100} /><p className="large-copy">The interesting part is the translation: taking an unclear question, finding the signal, and building a result someone can use.</p></div><div className="skills-grid">{Object.entries(skills).map(([category, tags]) => <div className="skill-group" key={category}><span className="eyebrow">{category}</span><div>{tags.map((tag) => <span className="skill-tag" key={tag}>{tag}</span>)}</div></div>)}</div></div>
      </section>

      <section className="section-pad section-shell credentials-section">
        <div className="section-heading-row"><div><span className="eyebrow">proof of practice</span><h2>Recognition, then momentum.</h2></div><span className="section-aside">/ certifications</span></div>
        <div className="award-feature">
          <div className="award-copy"><span className="eyebrow">01 / defining moment</span><h3>Computer Society of India<br /><em>Best Innovative Project Award</em></h3><p>One project, three moments: the work, the recognition, and the room where it was presented. This is the achievement that anchors the archive.</p><span className="award-mark">CSI / INNOVATION / 2026</span></div>
          <div className="award-gallery">
            <a className="award-image award-image-main" href={csiAward.award} target="_blank" rel="noreferrer"><Image src={csiAward.award} alt="Computer Society of India Best Innovative Project Award certificate" fill sizes="(max-width: 767px) 100vw, 50vw" /></a>
            <a className="award-image award-image-trophy" href={csiAward.trophy} target="_blank" rel="noreferrer"><Image src={csiAward.trophy} alt="Computer Society of India award trophy" fill sizes="(max-width: 767px) 50vw, 25vw" /></a>
            <a className="award-image award-image-presentation" href={csiAward.presentation} target="_blank" rel="noreferrer"><Image src={csiAward.presentation} alt="Award presentation at the Computer Society of India" fill sizes="(max-width: 767px) 50vw, 25vw" /></a>
          </div>
        </div>
        <div className="capability-story">
          <div className="capability-story-label"><span className="eyebrow">02 / the part worth remembering</span><span className="story-line" /></div>
          <div className="capability-story-copy"><p className="story-lead">I learned to work with people who do not share my background, context, or first language.</p><p className="story-emphasis">That changed the way I lead.</p><p className="story-body">Through Aspire, conversations with people from different countries became a practical lesson in listening, adapting, and making space for other perspectives. The result was not just a certificate. It was the confidence to bring people together and move an idea forward.</p><div className="story-signals"><span><Globe2 size={17} /> different perspectives</span><span><Users size={17} /> collaborative leadership</span><span><ArrowUpRight size={17} /> clearer communication</span></div><a className="story-proof" href={certifications[0].image} target="_blank" rel="noreferrer">read the supporting certificate <ExternalLink size={14} /></a></div>
          <div className="story-graphic" aria-hidden="true"><span className="graphic-ring graphic-ring-one" /><span className="graphic-ring graphic-ring-two" /><span className="graphic-axis graphic-axis-one" /><span className="graphic-axis graphic-axis-two" /><span className="graphic-core">LISTEN<br /><b>→</b><br />LEAD</span><span className="graphic-caption">many voices / one direction</span></div>
        </div>
        <div className="credential-heading"><span className="eyebrow">03 / the technical spine</span><p className="muted-copy">The human skill became stronger when it met a disciplined technical foundation.</p></div>
        <div className="credential-grid">{certifications.slice(1).map((cert, index) => { const Icon = cert.icon; return <article className={`credential-card credential-card-${index + 1}`} key={cert.title}><div className="credential-signal"><span>0{index + 3} / {cert.chapter}</span><Icon size={22} strokeWidth={1.5} /><b>{cert.signal}</b></div><div><span className="eyebrow">{cert.label}</span><h3>{cert.title}</h3><p>{cert.description}</p><a className="credential-link" href={cert.image} target="_blank" rel="noreferrer">view supporting certificate <ExternalLink size={13} /></a></div></article>; })}</div>
        <div className="learning-track">
          <div className="learning-track-heading"><span className="eyebrow">03 / what the learning changed</span><h3>From curiosity<br /><em>to capability.</em></h3><p>NPTEL and Edunet are not just badges in the archive. Together, they explain how the work gets done: reason clearly, structure information, and keep expanding the range.</p></div>
          <div className="learning-steps">{learningTrack.map((item) => <a className="learning-step" href={item.document} target="_blank" rel="noreferrer" key={item.number}><span className="learning-step-number">{item.number}</span><div><span className="eyebrow">{item.eyebrow}</span><h4>{item.title}</h4><p>{item.outcome}</p><span className="learning-proof">open proof <ExternalLink size={13} /></span></div></a>)}</div>
        </div>
      </section>

      <section className="section-pad section-shell workflow-section"><span className="eyebrow">a repeatable workflow</span><div className="workflow-steps">{['Data', 'Cleaning', 'Exploration', 'Modeling', 'Insights'].map((step, index) => <div className="workflow-step" key={step}><span>{index + 1}</span><strong>{step}</strong>{index < 4 && <i>→</i>}</div>)}</div></section>

      <section id="contact" className="contact-section section-shell"><div><span className="eyebrow">open channel</span><h2>Have a question worth investigating?</h2><p>Open to learning, building, and opportunities in AI, data, and software engineering.</p></div><a className="cta-primary" href="mailto:rohithdevireddy48@gmail.com">Start a conversation <Mail size={16} /></a><div className="social-links"><a href="https://www.linkedin.com/in/rohith-devireddy-4112692a5/" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> LinkedIn</a><a href="https://github.com/Rohith-reddy-7" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> GitHub</a><a href="https://leetcode.com/u/ROHITH_REDDY_7/" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> LeetCode</a><a href="https://www.hackerrank.com/profile/rohithdevireddy1" target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> HackerRank</a></div></section>

      <footer className="footer section-shell"><span>© {new Date().getFullYear()} Rohith</span><span>built with curiosity / data / code</span><a href="#top"><ChevronDown size={16} className="back-top" /> back to top</a></footer>
    </main>
  );
}