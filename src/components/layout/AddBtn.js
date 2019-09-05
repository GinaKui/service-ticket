import React from 'react';

const AddBtn = () => (
    <div className='fixed-action-btn'>
      <a
        href='#add-log-modal'
        className='btn-floating btn-large indigo darken-2 modal-trigger'
        title='new request ticket'
      >
        <i className='large material-icons'>add</i>
      </a>
      <ul>
        <li>
          <a
            href='#tech-list-modal'
            className='btn-floating green modal-trigger'
            title='edit tech list'
          >
            <i className='material-icons'>people</i>
          </a>
        </li>
        <li>
          <a 
            href='#add-tech-modal'
            className='btn-floating red modal-trigger'
            title='add new tech'
          >
            <i className='material-icons'>person_add</i>
          </a>
        </li>
      </ul>
    </div>
  );


export default AddBtn;
