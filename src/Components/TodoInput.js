import React, {useState} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
// import ReactTooltip from "react-tooltip";
const TodoInput = ({ value, onChange, onAdd }) => { 
  const [showTooltip, setShowTooltip] = useState(false);
  const handleAddClick = () => {
    if (value === "") {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
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
        <Button variant="dark" className="mt-2" title="ADD A TASK" style={{fontWeight:"bold",color:"darkgoldenrod",backgroundColor:""}} onClick={handleAddClick}>
          ADD THINGS
        </Button>
      </InputGroup>
      {showTooltip && <div className="tooltip"><h1>Please enter a task before adding.</h1></div>}
    </div>
  );
};

export default TodoInput;
