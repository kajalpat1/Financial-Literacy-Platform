import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Poll from '../components/Poll';
import ErrorMessage from '../components/ErrorMessage';
import { getCurrentPoll, deletePoll } from '../store/actions/polls';
import { clearChoices } from '../store/actions/scenario';

const PollPage = ({ getPoll, deletePoll, poll }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(clearChoices());

    if (id) getPoll(id);
  }, [id, getPoll, dispatch]);

  const handleDelete = async () => {
    await deletePoll(id);
    navigate('/');
  };

  return (
    <div className="page">
      <ErrorMessage />
      <Poll />
      <div className="button_center" style={{ marginTop: '1rem' }}>
        <button className="button" onClick={handleDelete}>
          Delete Poll
        </button>
      </div>
    </div>
  );
};

const mapState = state => ({
  poll: state.currentPoll
});

export default connect(mapState, {
  getPoll: getCurrentPoll,
  deletePoll
})(PollPage);



