import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { searchLog } from '../logs/logSlice';

const SearchBar = () => {
  const textInput = useRef('');
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(searchLog(textInput.current.value));
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
              onChange={handleChange}
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

export default SearchBar;








