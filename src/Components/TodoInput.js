import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const TodoInput = ({ value, onChange, onAdd }) => {
  const isInputEmpty = value === "";

  const handleAddClick = () => {
    if (isInputEmpty) {
      onAdd();
    } else {
      onAdd();
    }
  };

  return (
    <div className="mb-3">
      <input
        className="form-control-lg"
        style={{ fontWeight: "bolder" }}
        placeholder="Add your things here... "
        maxLength={"25"}
        size="lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="add something"
        aria-describedby="basic-addon2"
      />
      <InputGroup>
        <OverlayTrigger
          placement="right"
          overlay={
            isInputEmpty ? (
              <Tooltip>Please enter a task before adding.</Tooltip>
            ) : (
              <Tooltip>Click To Add.</Tooltip>
            )
          }
        >
          <Button
            variant="dark"
            className="mt-2"
            style={{
              fontWeight: "bold",
              color: "darkgoldenrod",
              backgroundColor: "",
            }}
            onClick={handleAddClick}
          >
            ADD THINGS
          </Button>
        </OverlayTrigger>
      </InputGroup>
    </div>
  );
};

export default TodoInput;
