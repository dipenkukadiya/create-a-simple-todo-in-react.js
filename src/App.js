import TodoModal from "./Components/TodoModal";
import Modal from "react-bootstrap/Modal";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
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
      isEditing: false,
      editingItemId: null,
      isDeleting: false,
      deletingItemId: null,
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
    this.setState({
      isDeleting: true,
      deletingItemId: id,
    });
  }
  closeDeleteModal() {
    this.setState({
      isDeleting: false,
      deletingItemId: null,
    });
  }
  confirmDelete() {
    // Get the ID of the item to delete
    const itemIdToDelete = this.state.deletingItemId;
  
    // Filter the list to exclude the item with the matching ID
    const updatedList = this.state.list.filter((item) => item.id !== itemIdToDelete);
  
    // Update the state with the new list and close the delete modal
    this.setState({
      list: updatedList,
      isDeleting: false,
      deletingItemId: null,
    });
    localStorage.removeItem(`todo_${itemIdToDelete}`);
    this.updateLocalStorage(updatedList);

    // Optionally, update your storage (e.g., IndexedDB or localStorage) here
  }
  
  confirmEdit() {
    const { editingItemId } = this.state;
    if (editingItemId) {
      this.editItem(editingItemId);
    }
    this.closeEditModal();
  }
  closeEditModal() {
    this.setState({
      isEditing: false,
      editingItemId: null,
    });
  }
  onEdit = (id, value) => {
    // Update the item with the new value
    const updatedList = this.state.list.map((item) => {
      if (item.id === id) {
        return { ...item, value };
      }
      return item;
    });
  
    this.setState({
      list: updatedList,
      isEditing: false, // Close the edit modal
      editingItemId: null, // Clear the editing item
    });
  
    this.updateLocalStorage(updatedList);
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
                  onEdit={(itemId) => this.editItem(itemId)}
                  onCheckboxChange={(checked) =>
                    this.updateCheckbox(item.id, checked)
                  }
                />
              ))}
            </ListGroup>
          </Col>
        </Row>
        
        {this.state.isDeleting && (
        <Modal show={this.state.isDeleting} onHide={this.closeDeleteModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this item?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeDeleteModal.bind(this)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => this.confirmDelete()}>Delete</Button>
          </Modal.Footer>
        </Modal>
      )}
     {this.state.isEditing && (
  <TodoModal
    show={this.state.isEditing}
    onClose={this.closeEditModal.bind(this)}
    item={this.state.list.find((item) => item.id === this.state.editingItemId)}
    onEdit={(newValue) => this.onEdit(this.state.editingItemId, newValue)} // Pass the edit function
  />
)}


      </Container>
    );
  }
}

export default App;
