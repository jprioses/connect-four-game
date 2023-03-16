import React, {useEffect} from 'react'
import TIMER1 from '../../assets/timer-1.svg'
import TIMER2 from '../../assets/timer-2.svg'

const Timer = ({player, timerCounter, setTimerCounter, setWhoWins}) => {

   useEffect(() => {
     const timer =
     timerCounter > 0 && setInterval(() => setTimerCounter(timerCounter - 1), 1000)
     timerCounter === 0 && player === 1 && setWhoWins(2)
     timerCounter === 0 && player === 2 && setWhoWins(1)

     return () => clearInterval(timer)
      //eslint-disable-next-line react-hooks/exhaustive-deps
   }, [timerCounter])

  return (
    <div className={(player===1) ? 'timer__container' : 'timer__container timer-2'}>
          <div className='timer' style={(player===1) ? { backgroundImage: `url(${TIMER1})` } : { backgroundImage: `url(${TIMER2})`}}>
              <h3>{(player===1) ? `PLAYER 1'S TURN` : `PLAYER 2'S TURN`}</h3>
              <p>{`${timerCounter}s`}</p>
          </div>
    </div>
  )
}

export {Timer}