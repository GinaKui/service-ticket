import React from 'react';

const PageFAB = () => (
    <div className='fixed-action-btn' style={{position: 'absolute', bottom: '80px', right: '60px'}}>
      <a
        href='#add-log-modal'
        className='btn-floating btn-large indigo modal-trigger waves-effect waves-light'
        title='create request'
      >
        <i className='large material-icons'>mode_edit</i>
      </a>
      <ul>
        <li>
          <a
            href='#tech-list-modal'
            className='btn-floating teal modal-trigger waves-effect waves-light'
            title='edit tech list'
          >
            <i className='large material-icons'>people</i>
          </a>
        </li>
        <li>
          <a 
            href='#add-tech-modal'
            className='btn-floating amber darken-2 modal-trigger waves-effect waves-light'
            title='add new tech'
          >
            <i className='large material-icons'>person_add</i>
          </a>
        </li>
      </ul>
    </div>
  );


export default PageFAB;
