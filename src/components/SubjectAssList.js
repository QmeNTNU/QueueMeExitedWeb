import React from 'react';
import SubjectListItem from './SubjectListItem';

const SubjectAssList = (props) => {
const subjectItems = props.subjects.map((subject) => {
  console.log('KEY',subject.uid);
  //best practise to have a key in the list so it doesent need to render intire list every time
  return (
    <div style={{backgroundColor: '#2c3e50', padding: 5, borderRadius: 5, width: 300 }}>
    <SubjectListItem
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

export default SubjectAssList;
