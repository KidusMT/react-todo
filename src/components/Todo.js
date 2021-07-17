
function Todo(props) {
    function deleteHandler(){
        console.log(props.text + " clicked!")
    }
  return (
    <div className='card'>
      <h2>{props.text}</h2>
      <div className='actions'>
        {/* <button className='btn' onClick={function()=>{}}>Delete</button> */}
        {/* <button className='btn' onClick={()=>{}}>Delete</button> */}
        <button className='btn' onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default Todo;
