import React from "react";
import { connect } from "react-redux";

function Timer(props) {
  console.log("rendering timer");
  return (
    <>
      <div className="timer">
        <p>
          {Math.floor(props.timer.second / 3600) +
            "hrs " +
            Math.floor(props.timer.second / 60) +
            "mins " +
            (props.timer.second % 60) +
            "secs"}
        </p>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  timer: state.timer
});

export default connect(mapStateToProps)(Timer);
