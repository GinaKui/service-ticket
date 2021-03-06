import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import M from 'materialize-css/dist/js/materialize.min.js';

import { deleteLog, setCurrent } from './logSlice';

//@TODO: - wrap component in React.memo() to avoid  unnecessary re-render
const LogItem = ({ log, deleteLog, setCurrent }) => {
  const onDelete = () => {
    deleteLog(log.id);
    M.toast({ html: 'Ticket Deleted' });
  };

  return (
    <li className='collection-item'>
      <div>
        <a
          href='#edit-log-modal'
          className={`modal-trigger ${log.attention ? 'red-text' : 'indigo-text'}`}
          onClick={() => setCurrent(log)}
        >
          {log.message}
        </a>
        <br />
        <span className='grey-text'>
        ID{' '}
          <span className='black-text'>#{log.id}</span> last updated by{' '}
          <span className='black-text'>{log.tech}</span> on{' '}
          <Moment format='MMMM Do YYYY, h:mm:ss a'>{log.date}</Moment>
        </span>
        <a href='#!' onClick={onDelete} className='secondary-content'>
          <i className='material-icons grey-text'>cancel</i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteLog, setCurrent }
)(LogItem);
