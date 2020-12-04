import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import PageFAB from './components/layout/PageFAB';
import SearchBar from './components/layout/SearchBar';
import Footer from './components/layout/Footer';
import LogList from './components/logs/LogList';
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
      <div className="App">
        <SearchBar />
        <PageFAB />
        <main className="container">  
          <AddLogModal />
          <EditLogModal />
          <AddTechModal />
          <TechListModal />
          <LogList />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
