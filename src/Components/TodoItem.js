// TodoItem.js
import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

function TodoItem({ item, onDelete, onEdit }) {
  const [completed, setCompleted] = useState(false);
  const handleCheckboxChange = () => {
    setCompleted(!completed);
    // onCheckboxChange(item.id, !completed);
  };

  return (
    <ListGroup.Item
      variant={completed ? "success" : "dark"}
      action
      style={{
        display: "flex",
        justifyContent: "space-between",
        textDecoration: completed ? "line-through" : "none",
      }}
    >
      <input
        value="test"
        type="checkbox"
        checked={completed}
        onChange={handleCheckboxChange}
      />

      {item.value}
      <span>
        <Button
          style={{ marginRight: "10px" }}
          variant="light"
          onClick={() => onDelete(item.id)}
        >
          {" "}
          Delete{" "}
        </Button>
        <Button variant="light" onClick={() => onEdit(item.id)}>
          {" "}
          Edit{" "}
        </Button>
      </span>
    </ListGroup.Item>
  );
}

export default TodoItem;
