// TodoInput.js
import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
// import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const TodoInput = ({ value, onChange, onAdd }) => {
  return (
    <div className="mb-3">
      <input
        className="form-control-lg"
        style={{ fontFamily: "cursive", fontWeight: "bolder" }}
        placeholder="Add your things here... "
        size="lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="add something"
        aria-describedby="basic-addon2"
      />
      <InputGroup>
        <Button variant="dark" className="mt-2" onClick={() => onAdd()}>
          ADD THINGS
        </Button>
      </InputGroup>
    </div>
  );
};

export default TodoInput;
