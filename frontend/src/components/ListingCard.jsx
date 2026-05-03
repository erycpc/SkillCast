function ListingCard({ title, description, category, skills = [], owner }) {
  return (
    <div className="card">
      <div className="card-top">
        <span className="card-category">{category}</span>
        {owner?.isPro && <span className="pro-badge">⭐ Pro</span>}
      </div>
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <div className="skills">
        {skills.slice(0, 4).map((skill, index) => (
          <span className="skill-tag" key={`${skill}-${index}`}>{skill}</span>
        ))}
        {skills.length > 4 && (
          <span className="skill-tag muted">+{skills.length - 4} more</span>
        )}
      </div>
      {owner && (
        <div className="card-footer">
          <div className="card-avatar">{owner.name?.charAt(0).toUpperCase()}</div>
          <span className="card-owner">{owner.name}</span>
        </div>
      )}
    </div>
  )
}

export default ListingCard