
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getPolls,
  getUserPolls,
  deletePoll
} from '../store/actions';

class Polls extends Component {
  componentDidMount() {
    this.props.getPolls();
  }

  handleSelect = (id) => {
    // navigate to detail page
    this.props.history.push(`/poll/${id}`);
  }

  handleDelete = (e, id) => {
    e.stopPropagation();
    this.props.deletePoll(id);
  }

  render() {
    const { auth, polls, getPolls, getUserPolls } = this.props;

    return (
      <Fragment>
        {auth.isAuthenticated && (
          <div className="button_center">
            <button className="button" onClick={getPolls}>
              All Polls
            </button>
            <button className="button" onClick={getUserPolls}>
              My Polls
            </button>
          </div>
        )}

        <ul className="polls">
          {polls.map(poll => (
            <li
              key={poll._id}
              onClick={() => this.handleSelect(poll._id)}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <Link to={`/poll/${poll._id}`}>{poll.question}</Link>


              {auth.isAuthenticated &&
               auth.user.id === poll.user._id && (
                <button
                  className="button"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    margin: '0.2rem'
                  }}
                  onClick={e => this.handleDelete(e, poll._id)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapState = (state) => ({
  auth: state.auth,
  polls: state.polls
});

export default connect(
  mapState,
  { getPolls, getUserPolls, deletePoll }
)(Polls);
