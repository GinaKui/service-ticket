import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLog } from './logSlice';
import TechSelectOptions from '../techs/TechSelectOptions';

import M from 'materialize-css/dist/js/materialize.min.js';

const AddLogModal = ({ addLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  const onSubmit = () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      const newLog = {
        message,
        attention,
        tech,
        date: new Date()
      };
      addLog(newLog);
      M.toast({ html: `Ticket added by ${tech}` });

      // Clear Fields
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
    <div id='add-log-modal' className='modal modal-fixed-footer' style={modalStyle}>
      <div className='modal-content'>
        <div className='row'>
          <h4 className='col s12'>New Request Ticket</h4>
        </div>
        <div className='row'>
          <div className='input-field col s12'>
            <textarea
              id='ticket-textarea'
              name='message'
              value={message}
              className='materialize-textarea'
              onChange={e => setMessage(e.target.value)}
            />
            <label htmlFor='ticket-textarea' className='active'>
              request content
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field col s6'>
              <select
                name='tech'
                value={tech}
                className='browser-default'
                onChange={e => setTech(e.target.value)}
              >
                <option value='' disabled>
                  Select Technician
                </option>
                <TechSelectOptions />
              </select>
          </div>
          <div className='input-field col s6'>
              <label>
                <input
                  type='checkbox'
                  checked={attention}
                  value={attention}
                  onChange={e => setAttention(!attention)}
                />
                <span>Immediate Attention</span>
              </label>   
          </div>
        </div>

        <div className='row'>
          
        </div>
      </div>
      <div className='modal-footer'>
        <div className='container center'>
          <a
            href='#!'
            onClick={onSubmit}
            className='modal-close waves-effect indigo darken-3 white-text waves-light btn'
          >
            Submit
          </a>
          <a
            href='#!'
            className='modal-close waves-effect deep-orange darken-4 white-text waves-light btn'
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

export default connect(
  null,
  { addLog }
)(AddLogModal);
