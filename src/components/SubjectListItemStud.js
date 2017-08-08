import React from 'react';
import { Link } from 'react-router';

import '../App.css';
const SubjectListItemStud = ({ subject, onSubjectSelect }) => {

  return (
    <Link to={'/ChooseStudass'}  onClick={() => onSubjectSelect(subject)} className="list-group-item">
      <div className="video-list media">
        <div className="list-main">
          <div className="list-image">
            <img className="media-object" src={require('./images/abook.png')} style={{ heigh: 60, width: 60}}/>
          </div>
          <div className="list-text">
            <h2>{subject.emnenavn}</h2>
            <h2>{subject.emnekode}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubjectListItemStud;
