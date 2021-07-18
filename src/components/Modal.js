function Modal(props){

    return <div className='modal'>
        <h2>Are  you sure buddy?</h2>
        <button onClick={props.onCancel} className='btn btn--alt'>Cancel</button>
        <button onClick={props.onConfirm} className='btn'>Delete</button>
    </div>
}

export default Modal;