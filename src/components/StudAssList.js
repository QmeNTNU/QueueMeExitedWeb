import React from 'react';
import StudAssListItem from './StudAssListItem';

const StudAssList = (props) => {
const studassItems = props.studass.map((studass) => {
  //console.log('KEY',studass.uid);
  //best practise to have a key in the list so it doesent need to render intire list every time
  return (
    <StudAssListItem
      onStudassSelect={props.onStudassSelect}
      key={studass.uid}
      studass={studass} />
  );
});

  return (
    <ul className="col-md-4 list-group">
      {studassItems}
    </ul>
  );
};

export default StudAssList;
