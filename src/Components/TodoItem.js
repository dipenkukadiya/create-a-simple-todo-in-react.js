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
        marginTop:"10px",
        textDecoration: completed ? "line-through" : "none",
      }}
    >
      <input
      className="form-check"
        value=""
        id="flexCheckChecked"
        type="checkbox"
        checked={completed}
        onChange={handleCheckboxChange}
        style={{ marginTop: "8px" }}
        
      />
      <h5 style={{marginTop:"8px"}}>{item.value}</h5>
         
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
