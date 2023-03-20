import {Main} from './components/main/Main';
import {Game} from './components/game/Game';
import { Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/game' element={<Game/>}/>
      </Routes>
    </>
  );
}

export {App};
