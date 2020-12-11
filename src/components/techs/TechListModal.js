import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTechs } from './techSlice';
import TechItem from './TechItem';


const TechListModal = () => {
  const dispatch = useDispatch();
  dispatch(getTechs);
  const techs = useSelector(state => state.tech.techs);
  const status = useSelector(state => state.tech.status);

  return (
    <div id='tech-list-modal' className='modal modal-fixed-footer'>
      <div className='modal-content'>
        <h4>Technician List</h4>
        <ul className='collection'>
          { status === 'succeeded' &&
            techs !== null &&
            techs.map(tech => <TechItem tech={tech} key={tech.id} />)}
        </ul>
      </div>
    </div>
  );
};

export default TechListModal;
