import {Main} from './components/main/Main';
import {Game} from './components/game/Game';
import { Rules } from './components/rules/Rules';
import { Route, Routes} from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [cpu, setCpu] = useState()
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
