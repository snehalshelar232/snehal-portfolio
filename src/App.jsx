
import { motion } from 'motion/react'
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
} from 'lucide-react'

import Navbar from './components/Navbar'
import Scene from './components/Scene'
import SectionTitle from './components/SectionTitle'
import ProjectCard from './components/ProjectCard'
import { profile, skillGroups, projects, journey } from './data'

const viewportSettings = {
  once: true,
  amount: 0.15,
}

const reveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
}

const staggerItem = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

function App() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              CREATIVE MIND. ENGINEERING ROOTS.
            </motion.span>

            <motion.p
              className="hello"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              Hi, I'm {profile.name}.
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={reveal}
              transition={{ delay: 0.25 }}
            >
              Designing Experiences.
              <br />
              <span>Building Possibilities.</span>
            </motion.h1>

            <motion.p
              className="role-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              Frontend Developer <i /> UI/UX Enthusiast <i /> Creative Technologist
            </motion.p>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              I'm an Electronics and Computer Science Engineering student who
              enjoys turning ideas into interactive digital experiences. I
              explore technology, creativity and design through frontend
              development, UI/UX and AI-powered applications.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowUpRight size={17} />
              </a>

              <a
  className="button button-secondary"
 href={`${import.meta.env.BASE_URL}resume.pdf`}
  download="Snehal_Shelar_Resume.pdf"
>
  <Download size={16} />
  Download Resume
</a>
            </motion.div>

            <motion.a
              className="scroll-cue"
              href="#about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              <ArrowDown size={15} /> SCROLL TO EXPLORE
            </motion.a>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25 }}
          >
            <Scene />
          </motion.div>

          <div className="hero-index">01 / PORTFOLIO</div>
        </section>

        {/* ABOUT */}
        <motion.section
          className="about section-wrap section-pad"
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          <motion.div className="about-copy" variants={reveal}>
            <span className="eyebrow">01 / A LITTLE ABOUT ME</span>

            <h2>Curiosity is my starting point.</h2>

            <h3>
              Creativity meets technology. Ideas become practical projects.
            </h3>

            <p>
              I'm passionate about combining creativity with technology. I
              design user-friendly interfaces, develop responsive websites and
              experiment with AI-powered applications. I enjoy learning new
              technologies and turning ideas into practical projects.
            </p>

            <p className="muted">
              Currently pursuing {profile.degree} at {profile.college}.
            </p>
          </motion.div>

          <motion.div
            className="portrait-wrap"
            variants={staggerItem}
          >
            <div className="portrait-glow" />
<img
  className="portrait"
 src={`${import.meta.env.BASE_URL}images/snehal-portrait.jpeg`}
  alt="Portrait of Snehal Shelar"
  onError={(e) => {
    e.currentTarget.style.display = 'none'
    const placeholder = e.currentTarget.nextElementSibling
    if (placeholder) {
      placeholder.style.display = 'grid'
    }
  }}
/>

<div className="portrait-placeholder">
  <span>SS</span>
  <small>ADD YOUR PHOTO</small>
</div>

            <span className="portrait-label">
              A LITTLE MORE HUMAN, A LITTLE MORE CREATIVE.
            </span>
          </motion.div>
        </motion.section>

        {/* SKILLS */}
        <section className="section-wrap section-pad" id="skills">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={reveal}
          >
            <SectionTitle
              eyebrow="02 / WHAT I WORK WITH"
              title="Curiosity, meet capability."
              subtitle="A growing toolkit across development, technology and visual design."
            />
          </motion.div>

          <motion.div
            className="skills-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            {skillGroups.map((group, i) => (
              <motion.article
                className="skill-card"
                key={group.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <span className="skill-number">
                  0{i + 1}
                </span>

                <h3>{group.title}</h3>

                <div className="tags">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* PROJECTS */}
        <section className="section-wrap section-pad" id="projects">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={reveal}
          >
            <SectionTitle
              eyebrow="03 / SELECTED WORK"
              title="Ideas turned into projects."
              subtitle="A selection of things I've explored, designed and built."
            />
          </motion.div>

          <motion.div
            className="projects-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            {projects.map((project) => (
              <motion.div key={project.number} variants={staggerItem}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* JOURNEY */}
        <section
          className="section-wrap section-pad journey-section"
          id="journey"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={reveal}
          >
            <SectionTitle
              eyebrow="04 / THE JOURNEY SO FAR"
              title="Learning by doing."
              subtitle="A little about the experiences shaping my path."
            />
          </motion.div>

          <motion.div
            className="timeline"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            {journey.map((item, i) => (
              <motion.article
                className="timeline-item"
                key={item.title}
                variants={staggerItem}
              >
                <span className="timeline-number">
                  0{i + 1}
                </span>

                <div>
                  <h3>{item.title}</h3>
                  <h4>{item.place}</h4>
                  <p>{item.detail}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            className="contribution-note"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={reveal}
          >
            <span className="eyebrow">BEYOND ACADEMICS</span>

            <p>
              I enjoy contributing to the creative side of college technical
              events through visual design, poster creation, certificates and
              event-related graphics. I believe in combining technical
              knowledge with creativity, collaboration and continuous learning.
            </p>
          </motion.div>
        </section>

        
{/* GALLERY */}
<section className="section-wrap section-pad" id="gallery">
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={viewportSettings}
    variants={reveal}
  >
    <SectionTitle
      eyebrow="05 / THE CREATIVE SIDE"
      title="Designs beyond the code."
      subtitle="A collection of my visual designs, creative experiments and interface explorations."
    />
  </motion.div>

  <motion.div
    className="gallery-grid"
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={viewportSettings}
  >
    {[
      {
       image: `${import.meta.env.BASE_URL}images/gallery/design-1.png`,
        title: 'Visual Design',
        category: 'CANVA / GRAPHIC DESIGN',
      },
      {
       image: `${import.meta.env.BASE_URL}images/gallery/design-2.png`,
        title: 'Interface Exploration',
        category: 'UI / UX DESIGN',
      },
      {
       image: `${import.meta.env.BASE_URL}images/gallery/design-3.png`,
        title: 'Creative Work',
        category: 'POSTERS / COMPOSITIONS',
      },
    ].map((item) => (
      <motion.a
        key={item.image}
        href={item.image}
        target="_blank"
        rel="noopener noreferrer"
        className="gallery-card"
        variants={staggerItem}
        whileHover={{ y: -8 }}
        aria-label={`View ${item.title} in full size`}
      >
        <div className="gallery-image">
          <img src={item.image} alt={item.title} loading="lazy" />
        </div>
        <div className="gallery-info">
          <span>{item.category}</span>
          <h3>{item.title}</h3>
          <span className="gallery-view">View design ↗</span>
        </div>
      </motion.a>
    ))}
  </motion.div>
</section>


        {/* CONTACT */}
        <motion.section
          className="contact section-wrap section-pad"
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
        >
          <motion.span className="eyebrow" variants={staggerItem}>
            06 / HAVE SOMETHING IN MIND?
          </motion.span>

          <motion.h2 variants={staggerItem}>
            Let's make something
            <br />
            <span>meaningful together.</span>
          </motion.h2>

          <motion.p variants={staggerItem}>
            I'm open to learning opportunities, collaborations and frontend or
            UI/UX internship opportunities.
          </motion.p>

          <motion.a
            className="button button-primary"
            href={`mailto:${profile.email}`}
            variants={staggerItem}
          >
            Say hello <ArrowUpRight size={17} />
          </motion.a>

          <motion.div className="contact-links" variants={staggerItem}>
            <a href={`mailto:${profile.email}`}>
              <Mail size={18} /> Email
            </a>

            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={18} /> GitHub <ExternalLink size={13} />
            </a>

            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} /> LinkedIn <ExternalLink size={13} />
            </a>
          </motion.div>
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="footer section-wrap">
        <a className="brand" href="#home">
          snehal<span>.</span>s
        </a>

        <span>Designed with curiosity. Built with code.</span>

        <span>© {new Date().getFullYear()} Snehal Shelar</span>
      </footer>
    </>
  )
}

export default App
