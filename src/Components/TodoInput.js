import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const TodoInput = ({ value, onChange, onAdd }) => {
  return (
    <div className="mb-3">
      <input
        className="form-control-lg"
        style={{ fontWeight: "bolder" }}
        placeholder="Add your things here... "
        size="lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="add something"
        aria-describedby="basic-addon2"
      />
      <InputGroup>
        <Button variant="dark" className="mt-2" style={{fontWeight:"bold",color:"darkgoldenrod",backgroundColor:""}} onClick={() => onAdd()}>
          ADD THINGS
        </Button>
      </InputGroup>
    </div>
  );
};

export default TodoInput;
