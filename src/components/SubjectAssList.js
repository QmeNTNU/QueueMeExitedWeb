import React from 'react';
import SubjectListItem from './SubjectListItem';

const SubjectAssList = (props) => {
const subjectItems = props.subjects.map((subject) => {
  console.log('KEY',subject.uid);
  //best practise to have a key in the list so it doesent need to render intire list every time
  return (
    <SubjectListItem
      onSubjectSelect={props.onSubjectSelect}
      key={subject.uid}
      subject={subject} />
  );
});

  return (
    <ul className="col-md-4 list-group">
      {subjectItems}
    </ul>
  );
};

export default SubjectAssList;
