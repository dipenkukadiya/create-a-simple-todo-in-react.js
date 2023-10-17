import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

function TodoItem({ item, onDelete, onEdit, onCheckboxChange }) {
  return (
    <ListGroup.Item
      variant={item.checked ? "success" : "dark"}
      action
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        textDecoration: item.checked ? "line-through" : "none",
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
      </div>
    </ListGroup.Item>
  );
}

export default TodoItem;
