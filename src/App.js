import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TodoInput from "./Components/TodoInput";
import TodoItem from "./Components/TodoItem";
import ListGroup from "react-bootstrap/ListGroup";
import { addTodo, getAllTodos } from "./Database/indexedDB";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      list: [],
    };
  }

  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  updateLocalStorage = (list) => {
    localStorage.setItem("todos", JSON.stringify(list));
    console.log("local storage updated :",list)
  };

  async componentDidMount() {
    try {
      const localStoragetodos = localStorage.getItem("todos");
      if (localStoragetodos) {
        this.setState({ list: JSON.parse(localStoragetodos) });
      
      } else {
        const todos = await getAllTodos();
        this.setState({ list: todos });
        if (todos.length === 0) {
          // Clear local storage
          localStorage.removeItem("todos");
          // Reset state
          this.setState({ list: [] });
        }
      }
    } catch (error) {
      console.error("Error initializing IndexedDB: ", error);
    }
  }

  async addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        id: Math.random(),
        value: this.state.userInput,
        checked:false,
      };
      try {
        await addTodo(userInput);
        const todos = await getAllTodos();
        this.setState({ list: todos, userInput: "" });
        this.updateLocalStorage(todos);
      } catch (error) {
        console.error("Error adding todo to IndexedDB: ", error);
      }

      const list = [...this.state.list];
      list.push(userInput);

      this.setState({
        list,
        userInput: "",
      });
    }
  }
  updateCheckbox(id, checked) {
    const updatedList = this.state.list.map((item) => {
      if (item.id === id) {
        return { ...item, checked };
      }
      return item;
    });
    this.setState({ list: updatedList });
    this.updateLocalStorage(updatedList);
  }
  deleteItem(id) {
    const list = this.state.list.filter((item) => item.id !== id);
    this.setState({ list });
    this.updateLocalStorage(list);
  }

  editItem(id) {
    const editedTodo = prompt("Edit the todo things:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      const updatedList = this.state.list.map((item) => {
        if (item.id === id) {
          return { ...item, value: editedTodo };
        }
        return item;
      });

      this.setState({
        list: updatedList,
      });
      this.updateLocalStorage(updatedList);
    }
  }
  
  render() {
    return (
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
            fontFamily: "cursive",
            color: "green",
          }}
        >
          TODO THINGS
        </Row>

        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <TodoInput
              value={this.state.userInput}
              onChange={this.updateInput.bind(this)}
              onAdd={this.addItem.bind(this)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {this.state.list.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  onDelete={this.deleteItem.bind(this)}
                  onEdit={this.editItem.bind(this)}
                  onCheckboxChange={(checked) =>
                    this.updateCheckbox(item.id, checked)
                  }
                />
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
