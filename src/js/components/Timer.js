import React, { useEffect } from "react";
import { connect } from "react-redux";
import { recordTime } from "./../redux/actions/timer-actions";

function Timer(props) {
  useEffect(() => {
    if (props.gameFinished) props.recordTime();
  }, [props.gameFinished]);

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

const mapDispatchToProps = dispatch => ({
  recordTime: () => dispatch(recordTime())
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
