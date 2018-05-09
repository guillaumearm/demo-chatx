import React, { PropTypes } from 'react';

const Room = ({ canRemove, children, onRemove, onSelect, isSelected, isJoined }) => (
  <div className="btn-block btn-group">
    <button
      title={`Select #${children}`}
      onClick={onSelect}
      style={{ width: '80%' }}
      type="button"
      className={`btn ${isSelected ? 'active' : ''} btn-xs btn-${isJoined ? 'primary' : 'secondary'}`}
    >
      {children}
    </button>
    {<button
      title={!canRemove ? 'You have no right to delete this room' : `Delete #${children}`}
      disabled={!canRemove}
      onClick={onRemove}
      style={{ width: '20%' }}
      type="button"
      className="btn btn-xs btn-danger"
    >
      <span className="glyphicon glyphicon-trash"></span>
    </button>}
  </div>
);
Room.propTypes = {
  children: PropTypes.string.isRequired, // room name
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  canRemove: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isJoined: PropTypes.bool.isRequired,
};

export default Room;
