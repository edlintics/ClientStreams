import React from 'react';
import ReactDOM from 'react-dom';
// refer to create Portal in order to render the component at the parent level, avoid z-index problem

const Modal = props => {
    // className come from semantic ui
    //when the user click in the background of the modal, it pushes back to the main route (onClick)
    // stopPropagation avoids events get bubled up to parents elements
    return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active" >
        <div onClick={(e)=> e.stopPropagation()}className="ui standard modal visible active">
            <div className="header">{props.title}</div>
            <div className="content">
                {props.content}
            </div>
            <div className="actions">
                {props.actions}
            </div>
        </div>
    </div>,
    document.querySelector('#modal') // the modal div is stored in the main public/index.html file, we render at the same level as parent
    )
}

export default Modal