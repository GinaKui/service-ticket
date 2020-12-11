import React from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import { getLogs } from './logSlice';
import Preloader from '../layout/Preloader';
import LogItem from './LogItem';

const LogList = () => {
  const dispatch = useDispatch();
  const logs = useSelector(state => state.log.logs);
  const status = useSelector(state => state.log.status);

  if (status === 'idle') {
    dispatch(getLogs());
    return <Preloader />;
  }
  if(status === 'loading') {
    return <Preloader />
  }

  return (
    <ul className='collection with-header'>
    {/*TODO: the title need to be moved out of <ul> */}
      <li className='collection-header'>
        <h4 className='center'>
          Service Requests
        </h4>   
      </li>
      {logs.length === 0 ? (
        <p className='center'>No tickets right now...</p>
      ) : (
        logs.map(log => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

export default LogList;
