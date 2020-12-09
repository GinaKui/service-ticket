import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { searchLog } from '../logs/logSlice';

const SearchBar = ({ searchLog }) => {
  const textInput = useRef('');

  const onChange = e => {
    searchLog(textInput.current.value);
  };

  return (
    <nav style={{ marginBottom: '30px' }} className='indigo'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='Search'
              ref={textInput}
              onChange={onChange}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLog: PropTypes.func.isRequired
};

export default connect(
  null,
  { searchLog }
)(SearchBar);








