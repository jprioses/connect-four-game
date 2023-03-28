import {Main} from './components/main/Main';
import {Game} from './components/game/Game';
import { Rules } from './components/rules/Rules';
import { Route, Routes} from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {

  const [cpu, setCpu] = useState()

  useEffect(() => {
    setCpu(JSON.parse(window.localStorage.getItem('cpu')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cpu', cpu);
  }, [cpu]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main setCpu={setCpu}/>} />
        <Route path='/game' element={<Game cpu={cpu}/>}/>
        <Route path='/rules' element={<Rules/>}/>
      </Routes>
    </>
  );
}

export {App};
