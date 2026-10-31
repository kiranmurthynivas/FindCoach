export default function CoachModal({ coach, onClose }) {
  if (!coach) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{coach.name}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <p><strong>Username:</strong> {coach.username}</p>
          <p><strong>Email:</strong> <a href={`mailto:${coach.email}`}>{coach.email}</a></p>
          <p><strong>Phone:</strong> {coach.phone}</p>
          <p><strong>Website:</strong> <a href={`https://${coach.website}`} target="_blank" rel="noreferrer">{coach.website}</a></p>
          
          <hr />

          <p><strong>Company:</strong> {coach.company?.name}</p>
          <p><strong>Catchphrase:</strong> "{coach.company?.catchPhrase}"</p>
          <p><strong>Business:</strong> {coach.company?.bs}</p>

          <hr />

          <p><strong>Address:</strong> {coach.address?.suite}, {coach.address?.street}, {coach.address?.city}, {coach.address?.zipcode}</p>
        </div>
      </div>
    </div>
  )
}
