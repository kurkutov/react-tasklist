import React from 'react'
import './Modal.css'


const Modal = props => (
    props.isOpen ? 
    <div className="modal">
        <div className="modal-content">
            <div className="modal-header">
                <h3>{props.header}</h3>
                <div className="modal-close" onClick={() => {props.onClose(false)}}><i className="fa fa-times" aria-hidden="true"></i></div>
            </div>
            {props.children}
        </div>     
        
    </div>
    : null
    
)

export default Modal


        


