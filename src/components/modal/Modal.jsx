import React from 'react'
import ReactDOM from 'react-dom'
import './modal.css'

const Modal = ({children, setPause}) => {
  return ReactDOM.createPortal(
    <div className='modal__container' onClick={() => setPause(false)} >
        {children}
    </div>,
    document.getElementById('modal')
  )
}

export {Modal}
