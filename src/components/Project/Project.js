import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import ArchiveStatus from '../ArchiveStatus/ArchiveStatus';

import styles from './Project.module.css';

class Project extends Component {

  routeProjectFullDetail = () => {
    if (this.props.editProject === true) {
      history.push('/test/EditMyProjectFullDetail?projectTitle=' + this.props.projectInfo.title);
    } else {
      history.push('/ProjectFullDetail?projectTitle=' + this.props.projectInfo.title);
    }
  }

  addProjectonClick = () => {
    if (this.props.addProject === true) {
      history.push('/test/EditMyProjectFullDetail?addNewProject=true');
    }
  }

  render() {
    let editProject = [styles.Box];
    let archiveButton = undefined;
    if (this.props.loggedInUser) {
      if (this.props.loggedInUser.isAdmin === true) {
        archiveButton = (<ArchiveStatus projectTitle={this.props.title} />)
      }
    }
    let projectDisplay =
      <>
        <div>
          <img onClick={this.routeProjectFullDetail} src={this.props.img} alt="Project Logo"></img>
        </div>
        <div className={styles.Content}>
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
          <button className={styles.ViewProject} onClick={this.routeProjectFullDetail}>View Project</button>
          {archiveButton}
        </div>
      </>;

    if (this.props.addProject === true) {
      editProject.push(styles.AddProject)
      projectDisplay = null;
    }

    return (
      <div className={editProject.join(' ')} onClick={this.addProjectonClick}>
        {projectDisplay}
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUserReducer.loggedInUser
  };
};

export default connect(mapStateToProps)(Project);
