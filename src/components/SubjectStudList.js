import React from 'react';
import SubjectListItemStud from './SubjectListItemStud';

const SubjectStudList = (props) => {
const subjectItems = props.subjects.map((subject) => {
  console.log('KEY',subject.uid);
  //best practise to have a key in the list so it doesent need to render intire list every time
  return (
    <div style={{backgroundColor: '#2c3e50', padding: 5, borderRadius: 5, width: 300 }}>
    <SubjectListItemStud
      onSubjectSelect={props.onSubjectSelect}
      key={subject.uid}
      subject={subject} />
    </div>
  );
});

  return (
    <ul className="col-md-4 list-group">
      {subjectItems}
    </ul>
  );
};

export default SubjectStudList;
