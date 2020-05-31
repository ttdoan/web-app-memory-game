import React, { useEffect } from "react";
import { connect } from "react-redux";
import { recordTime } from "./../redux/actions/timer-actions";

function Timer(props) {
  useEffect(() => {
    if (props.gameFinished) props.recordTime();
  }, [props.gameFinished]);

  const hours = Math.floor(props.timer.second / 3600);
  const mins = Math.floor(props.timer.second / 60);
  const secs = props.timer.second % 60;

  console.log("rendering timer");
  return (
    <>
      <div className="timer">
        <div className="timer-card">
          <p className="title">HOURS</p>
          <p className="number">{(hours > 9 ? "" : "0") + hours}</p>
        </div>
        <p className="delimiter">:</p>
        <div className="timer-card">
          <p className="title">MINUTES</p>
          <p className="number">{(mins > 9 ? "" : "0") + mins}</p>
        </div>
        <p className="delimiter">:</p>
        <div className="timer-card">
          <p className="title">SECONDS</p>
          <p className="number">{(secs > 9 ? "" : "0") + secs}</p>
        </div>
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
