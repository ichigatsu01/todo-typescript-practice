import React, { useState } from 'react';
import './App.css'

function App() {

  const [ inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isInputed, setIsInputed] = useState(false);


  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsInputed(e.target.value.trim() !== "")
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    //リロード回避
    e.preventDefault();
    // 新しいtodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: true, //プリントだとfalseだが、初期値はtrueにしとかないといつでも編集できるようになってしまうと思う
    };
    setTodos([newTodo, ...todos]);
    setInputValue("");
    // console.log(`Submitを実行。現在のinputValue:${inputValue}`)
    setIsInputed(false)
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos)
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos);
  }

  // const handleInputed = () => {
  //   if (inputValue !== "") {
  //     setIsInputed(true)
  //   } else {
  //     setIsInputed(false)
  //   }
  // }

  return (
    <div className='App'>
      <div>
        <h2>TypeScriptで簡単ToDoアプリ</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" onChange={(e) => handleChange(e)} className='inputText' value={inputValue} />
          <input
            type="submit"
            value="作成"
            className='submitButton'
            disabled={!isInputed}
            // disabled={true}
          />
        </form>
        <ul className='todoList'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className='inputText'
                value={todo.inputValue}
                disabled={todo.checked}
              />
              <input
                type="checkbox" 
                onChange={() => handleChecked(todo.id, todo.checked)}
                style={{margin:'0 10px'}}
              />
              <button onClick={() => handleDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
