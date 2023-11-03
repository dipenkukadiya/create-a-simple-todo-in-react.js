import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import React, { useState } from "react"; // Importing 'useState' from 'react'
import TodoModal from "./TodoModal";

function TodoItem({ item, onDelete, onEdit, onCheckboxChange }) {
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div>
      <ListGroup.Item
        variant={item.checked ? "success" : "dark"}
        action
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          textDecoration: item.checked ? "strike-through" : "none",
        }}
      >
        <input
          className="form-check"
          value=""
          type="checkbox"
          checked={item.checked}
          onChange={(e) => onCheckboxChange(e.target.checked)}
          style={{ marginTop: "8px" }}
        />
        <h5
          style={{
            marginTop: "8px",
            textDecoration: item.checked ? "line-through" : "none",
          }}
        >
          {item.value}
        </h5>

        <div>
          <Button
            style={{
              marginRight: "10px",
              textAlign: "left",
              color: "chocolate",
            }}
            variant="light"
            onClick={() => onDelete(item.id)}
          >
            Delete
          </Button>
          <Button
            style={{ marginLeft: "10px", color: "darkmagenta" }}
            variant="light"
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </div>
      </ListGroup.Item>
      <TodoModal
        show={showModal}
        item={item}
        onClose={handleClose}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

export default TodoItem;
