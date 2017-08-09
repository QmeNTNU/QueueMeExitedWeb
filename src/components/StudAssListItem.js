import React from 'react';
import { Link } from 'react-router';

import '../App.css';
const StudAssListItem = ({ studass, onStudassSelect }) => {
  //checks gender to display image
  const icon = studass.userGender === 'female' ? require('./images/choosegirlstud2.png') : require('./images/choosepersonstud2.png');

  return (
    <Link to={'/QueueInfo'}  onClick={() => onStudassSelect(studass)} className="list-group-item" style={{ backgroundColor: '#2c3e50', borderWidth: 0, marginBottom: 5 }}>
      <div className="video-list media">
        <div className="list-main">
          <div className="list-image">
            <img className="media-object" src={icon} style={{ heigh: 60, width: 60}}/>
          </div>
          <div className="list-text">
            <h2>{studass.fullname}</h2>
            <h3>available to: {studass.available}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudAssListItem;
