// // importing react  files
// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";

// // App by function
// function App() {
//   return (
//     <div className="App">
//     <h1>Sagnik</h1>
//     <p>Roy</p>
//     </div>
//   );
// }
// function App() {
//   return(
//     <div className="App">
//     <header className="App-header">
//     <img src={logo} className="App-logo" />
//     <p>Learning React</p>
//     </header>
//     </div>
//   )
// }
// // exporting function
// export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";
//App by Class
class App extends React.Component {
  //Constructor
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
    };
  }
  //Methods
  addItem(todoValue) {
    if (todoValue !== "") {
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false,
      };
      const list = [...this.state.list];
      list.push(newItem);
      //Updating State
      this.setState({
        list: list,
        newItem: "",
      });
    }
  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updateList = list.filter((item) => item.id !== id);
    //Updating State
    this.setState({
      list: updateList,
    });
  }

  updateInput(input) {
    this.setState({ newItem: input });
  }

  render() {
    return (
      <div>
        <img src={logo} width="100" height="100" className="logo" />
        <h1 className="app-title">React TODO App</h1>
        <div className="container">
          Add an item....
          <br />
          <input
            type="text"
            className="input-text"
            placeholder="Write a Todo"
            required
            value={this.state.newItem}
            onChange={(e) => this.updateInput(e.target.value)}
          />
          <button
            className="add-btn"
            onClick={() => this.addItem(this.state.newItem)}
            disabled={!this.state.newItem.length}
          >
            Add TODO
          </button>
          <div>
            <ul>
              {this.state.list.map((item) => {
                return <li key={item.id}> 
                <input 
                type="checkbox"
                name="isDone"
                checked={item.isDone}
                onChange={()=>{}}
                />
                {item.value}
                <button
                className="btn"
                onClick={()=>this.deleteItem(item.id)}
                >Delete</button>
                </li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
//Exporting
export default App;
