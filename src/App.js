import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TodoInput from "./component/TodoInput";
import TodoItem from "./component/TodoItem";
import ListGroup from "react-bootstrap/ListGroup";
import { addTodo, getAllTodos } from './index_database/indexedDB';

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
  async componentDidMount() {
    try {
      const todos = await getAllTodos();
      this.setState({ list: todos });
    } catch (error) {
      console.error("Error initializing IndexedDB: ", error);
    }
  }

  async addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        id: Math.random(),
        value: this.state.userInput,
      };
      try {
        await addTodo(userInput);
        const todos = await getAllTodos();
        this.setState({ list: todos, userInput: "" });
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

  deleteItem(id) {
    const list = this.state.list.filter((item) => item.id !== id);
    this.setState({
      list,
    });
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
            fontFamily:"cursive",
            color:"green",
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
