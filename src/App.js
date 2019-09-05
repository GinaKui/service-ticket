import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AddBtn from './components/layout/AddBtn';
import SearchBar from './components/layout/SearchBar';
import Footer from './components/layout/Footer';
import Logs from './components/logs/Logs';
import AddLogModal from './components/logs/AddLogModal';
import EditLogModal from './components/logs/EditLogModal';
import AddTechModal from './components/techs/AddTechModal';
import TechListModal from './components/techs/TechListModal';

import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  },[]);

  return (
    <Provider store={store}>
        <SearchBar />
        <div className='container'>
          <AddBtn />
          <AddLogModal />
          <EditLogModal />
          <AddTechModal />
          <TechListModal />
          <Logs />
        </div>
        <Footer />
    </Provider>
  );
};

export default App;
