import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { searchLogs } from '../../actions/logActions';

const SearchBar = ({ searchLogs }) => {
  const textInput = useRef('');

  const onChange = e => {
    searchLogs(textInput.current.value);
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
  searchLogs: PropTypes.func.isRequired
};

export default connect(
  null,
  { searchLogs }
)(SearchBar);







