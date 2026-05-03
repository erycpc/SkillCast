function ListingCard({ title, description, category, skills = [], owner }) {
  return (
    <div className="card">
      <span className="card-category">{category}</span>
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
      <div className="skills">
        {skills.map((skill, index) => (
          <span className="skill-tag" key={`${skill}-${index}`}>{skill}</span>
        ))}
      </div>
      {owner && <p className="card-owner">By {owner.name}</p>}
    </div>
  )
}

export default ListingCard