import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "@fortawesome/react-fontawesome";
import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      cloneID: 0,
      cloneTitle: "",
      todoData: [
        {
          id: "1",
          task: "React Rivision",
          completed: false
        },
        {
          id: "2",
          task: "Django Rivision",
          completed: false
        },
        {
          id: "3",
          task: "React + Django projects",
          completed: false
        },
        {
          id: "4",
          task: "Other Projects",
          completed: false
        }
      ]
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleEdits = this.handleEdits.bind(this);
    this.renderEdits = this.renderEdits.bind(this);
    this.handleUpdates = this.handleUpdates.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.handleStrike = this.handleStrike.bind(this);
  }

  // Todo Creation Function (part 1)
  handleUserInput(event) {
    this.setState({
      userInput: event.target.value
    });
  }

  // Todo Creation Function (part 2)
  handleAddItem(id) {
    const someID = Math.random();
    //console.log(someID)
    this.setState((prevState) => ({
      todoData: [
        ...prevState.todoData,
        { id: someID, task: this.state.userInput }
      ],
      userInput: "" // im telling react to empty my userInput (the input box)
    }));
  }

  // Todo edit funciton (part 1)
  // function 1 (runs the very first time (if edit gets clicked))
  handleEdits(theId, theTitle) {
    this.setState({
      edit: true,
      cloneID: theId,
      cloneTitle: theTitle
    });
  }

  // Todo edit function (part 2)
  // function 2  (runs automatically after function 1)
  // (will run only when the edit condition is true (when we click on edit button))
  renderEdits() {
    if (this.state.edit) {
      return (
        <div>
          <form onSubmit={this.handleUpdates}>
            <input
              autoFocus={true}
              placeholder="Update Todos"
              type="text"
              name="data"
              defaultValue={this.state.cloneTitle} // from the cloneTitle
              className="form-control"
            />
            <button
              type="submit"
              className="btn btn-sm btn-success ml-2 updateButton"
            >
              Update
            </button>
          </form>
        </div>
      );
    }
  }

  // Todo edit Function (part 3)
  // function 3 (will run when function 2 runs)
  handleUpdates(event) {
    event.preventDefault();

    this.setState({
      todoData: this.state.todoData.map((item) => {
        if (item.id === this.state.cloneID) {
          item["task"] = event.target.data.value;
          return item;
        } else {
          return item;
        }
      })
    });

    this.setState({
      edit: false
    });
  }

  // Todo delete function
  onRemove(myId) {
    this.setState((prevState) => {
      const updatedList = prevState.todoData.filter((each) => each.id !== myId);
      return {
        todoData: updatedList
      };
    });
  }

  handleStrike(theId, theTask) {
    const todoData = this.state.todoData.map((item) => {
      if (item.id === theId) {
        item["id"] = theId;
        item["task"] = theTask;
        item["completed"] = !item.completed;
        return item;
      } else {
        return item;
      }
    });

    this.setState({
      todoData: todoData
    });
  }

  render() {
    return (
      <div className="card mb-3 sizing mx-auto">
        {this.renderEdits()}
        {this.state.todoData.map((item) => (
          <div className="card-body border text-grey" key={item.id}>
            <span className={"crossed-line" + (item.completed ? "" : "active")}>
              {item.task}
            </span>
            {/* edit button below */}
            <span
              onClick={() => this.handleEdits(item.id, item.task)}
              className="shift2 mr-1"
            >
              <i className="fas fa-edit"></i>
            </span>
            {/* delete button */}
            <span onClick={() => this.onRemove(item.id)} className="mr-2">
              <i className="shift fas fa-trash ml-20"></i>
            </span>
            <span
              className="shift3"
              onClick={() => this.handleStrike(item.id, item.task)}
            >
              {item.completed ? (
                <i className="fas fa-undo-alt"></i>
              ) : (
                <i className="fas fa-check-circle"></i>
              )}
            </span>
          </div>
        ))}
        <br />
        <span>
          <input
            autoFocus={true}
            placeholder="Add Todos"
            value={this.state.userInput || ""}
            onChange={this.handleUserInput}
            className="form-control"
          />
          <span
            style={{ color: "purple" }}
            className="addButton"
            onClick={this.handleAddItem}
            disabled={!this.state.userInput}
          >
            <i className="fas fa-plus-square shift ml-20"></i>
          </span>
        </span>
      </div>
    );
  }
}

export default App;
