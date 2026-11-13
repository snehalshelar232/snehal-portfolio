
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

export default function ProjectCard({ project }) {
  return (
    <motion.article
      className="project-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="project-topline">
        <span className="project-number">{project.number}</span>
        <span className="project-category">{project.category}</span>
      </div>

      <div className="project-art">
        <div className="project-orbit orbit-one" />
        <div className="project-orbit orbit-two" />
        <div className="project-core">{project.number}</div>
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="tags">
          {(project.stack || []).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        {project.note && (
          <p className="project-note">{project.note}</p>
        )}

        {project.link && project.link !== 'https://github.com/' && (
          <a
            className="text-link"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} repository`}
          >
            Project repository
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </motion.article>
  )
}
