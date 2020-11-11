import React, { Component } from "react";
import Aux from "../../../hoc/Auxilary/Auxilary";
import classes from "./Input.css";

class input extends Component {
  shouldComponentUpdate(next_state, next_props) {
    return next_props !== this.props && next_state !== this.state;
  }

  render() {
    return (
      <Aux>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log(this.props.value.id)
              console.log(this.props.value.description)
              this.props.save(this.props.value.id, this.props.value.title);
            }
          }}
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            this.props.changed(event.target.value);
          }}
          className={classes.Input}
          value={this.props.value.title}
        ></input>
      </Aux>
    );
  }
}

export default input;
