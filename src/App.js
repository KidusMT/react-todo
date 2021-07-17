import Todo from "./components/Todo";
import Backdrop from "./components/Backdrop";
import Modal from "./components/Modal"

function App() {
  return (
    <div>
      <h1>Todos</h1>
      <Todo text='title 1'/>
      <Todo text='title 2'/>
      <Todo text='title 3'/>

      <Modal />
      <Backdrop />
    </div>
  );
}

export default App;
