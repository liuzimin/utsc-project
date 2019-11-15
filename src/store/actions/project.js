import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const setProject = (project) => {
  return {
    type: actionTypes.SET_PROJECT,
    project: project
  }
}

export const fetchProjectFailed = () => {
  return {
    type: actionTypes.FETCH_PROJECT_FAILED
  }
}

export const initProject = (projectTitle) => {
  return (dispatch) => {

    axios.get('Projects/' + projectTitle + '.json')
      .then(res => {
        axios.get('Users/' + res.data.owner + '.json')
        .then(res => {
            dispatch({
                type: actionTypes.FETCH_USER,
                user: res.data
            });
          });
        dispatch(setProject(res.data));
      })
      .catch(error => {
        dispatch(fetchProjectFailed());
      });
  }
}