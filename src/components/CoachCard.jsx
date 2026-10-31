export default function CoachCard({ coach, onSelect }) {
  return (
    <div className="coach-card" onClick={() => onSelect(coach)}>
      <h3>{coach.name}</h3>
      <p><strong>Company:</strong> {coach.company?.name}</p>
      <p><strong>City:</strong> {coach.address?.city}</p>
    </div>
  )
}
