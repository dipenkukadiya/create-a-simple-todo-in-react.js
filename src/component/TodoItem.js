// TodoItem.js
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const TodoItem = ({ item, onDelete, onEdit }) => {
  return (
    <ListGroup.Item
      variant="dark"
      action
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <input value="test" type="checkbox" />
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
};

export default TodoItem;
