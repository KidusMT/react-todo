function Modal(props){

    function deleteHandler(){
        console.log("Deleted Item.");
    }

    return <div className='modal'>
        <h2>Are  you sure buddy?</h2>
        <button onClick={props.onCancel} className='btn btn--alt'>Cancel</button>
        <button onClick={deleteHandler} className='btn'>Delete</button>
    </div>
}

export default Modal;