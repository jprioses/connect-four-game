
import LOGO from './assets/main-logo.png'
import CPUICON from './assets/cpu-icon.png'
import PLAYERICON from './assets/player-icon.png'

function App() {
  return (
    <div className="main__container buttons__container">
      <img src={LOGO} className="main__logo" alt="logo"></img>
      <button className="main__button button-pink">PLAY VS CPU <img src={CPUICON} className="button__icon cpu-icon" alt="cpu icon"></img></button>
      <button className="main__button button-yellow">PLAY VS PLAYER <img src={PLAYERICON} className="button__icon player-icon" alt="player icon"></img></button>
      <button className="main__button button-withe">GAME RULES</button>
    </div>
  );
}

export default App;
