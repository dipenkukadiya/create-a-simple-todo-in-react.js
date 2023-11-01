import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class TodoModal extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      editedValue:props.item.value,
    };
  }

  handleInputChange = (event) => {
    this.setState({ editedValue: event.target.value });
  };

  handleSave = () => {
    console.log("handleSave triggered");
    console.log("Editing ID:", this.props.item.id);
    console.log("Edited Value:", this.state.editedValue);
    this.props.onEdit(this.props.item.id, this.props.state.editedValue);
    this.props.onClose();
  };

  handleDelete = () => {
    this.props.onDelete(this.props.item.id);
    this.props.onClose();
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={this.state.editedValue}
            onChange={this.handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSave}>
            Save Changes
          </Button>
          {/* <Button variant="danger" onClick={this.handleDelete}>
            Delete
          </Button> */}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TodoModal;
