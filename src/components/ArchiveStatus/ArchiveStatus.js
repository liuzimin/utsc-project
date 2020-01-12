import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from "./ArchiveStatus.module.css";
import * as archiveStatus from "../../store/actions/archiveStatus";

class ArchiveButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectTitle: this.props.projectTitle
        }
    }

    render() {
        const archive = (<button className={styles.ContentButton} onClick={() => { this.props.changeArchiveStatus(true, this.state.projectTitle) }}> Archive </button>)
        const unArchive = (<button className={styles.ContentButton} onClick={() => { this.props.changeArchiveStatus(false, this.state.projectTitle) }}> Activate </button> /**/)
        return (
            <div>
                {archive}
                {unArchive}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUserReducer.loggedInUser,
        project: state.projectReducer.project,
        isArchived: state.archiveStatusReducer.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeArchiveStatus: (status, pTitle) => dispatch(archiveStatus.changeArchiveStatus(status, pTitle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveButton);