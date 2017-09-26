import React, {Component} from 'react'
import _ from 'lodash';
import firebase from 'firebase';
import addSubjectListContainer from './addSubjectListContainer';
import SubjectStudList from './SubjectStudList';

import CreateQueue from './CreateQueue';
import '../App.css';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import ReactScrollbar from 'react-scrollbar-js';

import { favoriteAssSubjectListFetch, getAddedSubject, deleteSubject, addSubject1 } from '../actions';
import { Link } from 'react-router';
import Settings from './Settings';
import AddSubject from './addSubject';


class addSubject extends Component {
  state = { addOrDelete: 'add' };


  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //console.log('DIDMOUNT FIREBASE USER', firebase.auth().currentUser);


      const userUID = firebase.auth().currentUser.uid;
      //makes a ref for favstudsubject
      const { ref } = firebase.database().ref('Subject');
      //adds subject to subjectlist
      const list = this.props.favoriteAssSubjectList;
      const type ='studass';
      this.props.getAddedSubject({ ref, list, type });



    } else {
//console.log('CHOOSESUBJECT RENDERED BUT WITHOUT LOGIN');
          }
    });
  }

  onPress(emnekode, emnenavn) {
    //console.log(emnekode, emnenavn);
}

  onAddPress(emnekode, emnenavn) {

    //gets user uid
    const userUID = firebase.auth().currentUser.uid;
    //makes a ref for favstudsubject
    const { ref } = firebase.database().ref(`users/${userUID}/favasssubject/${emnekode}`);
    //adds subject to subjectlist
    this.props.addSubject1({ ref, emnekode, emnenavn });

  }

  onDeletePress(emnekode, emnenavn) {
    //retireves uid and emnekode to delete the pressed subject
    const userUID = firebase.auth().currentUser.uid;
    //makes a ref for favstudsubject
    const { ref } = firebase.database().ref(`users/${userUID}/favasssubject/${emnekode}`);
    this.props.deleteSubject({ ref });
  }

  findNewArray() {

    const addSubjectArray = _.concat(this.props.addSubjectArray);
    const favoriteAssSubjectList = this.props.favoriteAssSubjectList;
    for (let i = 0; i < addSubjectArray.length; i++) {
      for (let j = 0; j < favoriteAssSubjectList.length; i++) {
      if(favoriteAssSubjectList[j].emnekode === addSubjectArray[i].emnekode){
        addSubjectArray.splice(i, 1);
      }

    }
  }
    return addSubjectArray;
  }

  renderList() {
    let list=[];
    if (this.state.addOrDelete === 'delete') {

      list=this.props.favoriteAssSubjectList;


  const listItems =list.map((subject) =>
    <li
      style={{ listStyleType: 'none', width: '100%'}}
      onClick={() => this.onDeletePress(subject.emnekode, subject.emnenavn)}
      key={subject.uid} >
      <div className="listItem">
        <div className="list-main">
          <div className="list-image">
            <img className="media-object" src={require('./images/delete.png')} style={{ heigh: 40, width: 40}}/>
          </div>
          <div className="list-text">
            <h3>{subject.emnenavn}</h3>
            <h5>{subject.emnekode}</h5>
          </div>
        </div>
        </div>
    </li>

    );
    return (
      <ul className="col-md-4 list-group" style={{ width: '100%'}}>
        {listItems}
      </ul>
   );
  }else {
   if (this.state.addOrDelete === 'add') {

     list=this.props.addSubjectArray;


  const listItems =list.map((subject) =>
   <li
     style={{ listStyleType: 'none', width: '100%'}}
     onClick={() => this.onAddPress(subject.emnekode, subject.emnenavn)}
     key={subject.uid} >
     <div className="listItem">
       <div className="list-main">
         <div className="list-image">
           <img className="media-object" src={require('./images/add.png')} style={{ heigh: 40, width: 40}}/>
         </div>
         <div className="list-text">
           <h3>{subject.emnenavn}</h3>
           <h5>{subject.emnekode}</h5>
         </div>
       </div>
       </div>
   </li>

   );
   return (
     <ul className="col-md-4 list-group" style={{ width: '100%'}}>
       {listItems}
     </ul>
  );
  }
  }

  }

  renderaddOrDeleteButtons() {
    //works as a checkbox for addOrDelete. highlits the button witch match the state

    if (this.state.addOrDelete === 'delete') {
      return(
        <div className="addDelete">
        <button onClick={() => this.setState({ addOrDelete: 'add' })}
          className="btn btn-primary"
          type="button"
          style={{ width: '50%', backgroundColor: '#f49e84', borderWidth: 0, borderRadius: 0}}
        >
          Add
        </button>
        <button onClick={() => this.setState({ addOrDelete: 'delete' })}
          className="btn btn-primary"
          type="button"
          style={{ width: '50%', backgroundColor: '#e74c3c', borderWidth: 0, borderRadius: 0}}
        >
          delete
        </button>
      </div>
      );
    }
    if (this.state.addOrDelete === 'add') {
      return(
        <div className="addDelete">
        <button onClick={() => this.setState({ addOrDelete: 'add' })}
          className="btn btn-primary"
          type="button"
          style={{ width: '50%', backgroundColor: '#27ae60', borderWidth: 0, borderRadius: 0}}
        >
          add
        </button>
        <button onClick={() => this.setState({ addOrDelete: 'delete' })}
          className="btn btn-primary"
          type="button"
          style={{ width: '50%', backgroundColor: '#f49e84', borderWidth: 0, borderRadius: 0}}
        >
        delete
        </button>
      </div>
      );
    }
  }
  render() {
    //console.log('FIREBASE USER', firebase.auth().currentUser);
    //console.log('SUBJECT LIST', this.props.addSubjectArray);

    return (

      <div className="home-main" style={{width: '100%', padding: 0}}>




        <div className="addDelete">
          {this.renderaddOrDeleteButtons()}

        </div>




        <ReactScrollbar className="list-container-scroll">

          {this.renderList()}


        </ReactScrollbar>

      </div>




    );
  }
}

const mapStateToProps = state => {
  const favoriteAssSubjectList = _.map(state.favoriteAssSubjectList, (val, uid) => {
    return { ...val, uid };
  });
  const addSubjectArray = _.map(state.addSubjectStud, (val, uid) => {
    return { ...val, uid };
  });

  return { favoriteAssSubjectList, addSubjectArray, addSubject };
};

export default connect(mapStateToProps,
  { favoriteAssSubjectListFetch, getAddedSubject, deleteSubject, addSubject1 })(addSubject);
