import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Preloader from '../layout/Preloader';
import LogItem from './LogItem';
import { getLogs } from '../../actions/logActions';

const LogList = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
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

LogList.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(
  mapStateToProps,
  { getLogs }
)(LogList);
