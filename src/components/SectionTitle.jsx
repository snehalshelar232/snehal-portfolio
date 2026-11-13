
export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="section-title">
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        {eyebrow}
      </span>

      <h2>{title}</h2>

      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
