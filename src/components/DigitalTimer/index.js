// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerLimitMinutes: 25,
    timerElapsedSeconds: 0,
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  onClickReset = () => {
    this.setState({
      isTimerRunning: false,
      timerLimitMinutes: 25,
      timerElapsedSeconds: 0,
    })
    this.clearTimer()
  }

  onClickSubtract = () => {
    const {timerLimitMinutes} = this.state

    if (timerLimitMinutes > 1) {
      this.setState(prevState => ({
        timerLimitMinutes: prevState.timerLimitMinutes - 1,
      }))
    }
  }

  onClickAddition = () => {
    this.setState(prevState => ({
      timerLimitMinutes: prevState.timerLimitMinutes + 1,
    }))
  }

  startTimerCountDown = () => {
    const {timerElapsedSeconds, timerLimitMinutes} = this.state
    const isTimeCompleted = timerElapsedSeconds === timerLimitMinutes * 60
    if (isTimeCompleted) {
      this.clearTimer()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedSeconds: prevState.timerElapsedSeconds + 1,
      }))
    }
  }

  onClickStartPause = () => {
    const {isTimerRunning, timerElapsedSeconds, timerLimitMinutes} = this.state
    const isTimeCompleted = timerElapsedSeconds === timerLimitMinutes * 60
    if (isTimeCompleted) {
      this.setState({timerElapsedSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimer()
    } else {
      this.intervalId = setInterval(() => {
        this.startTimerCountDown()
      }, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  renderStartPauseRest = () => {
    const {isTimerRunning} = this.state

    const startOrPauseImg = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAlt = isTimerRunning ? 'pause icon' : 'play icon'
    const startStopTxt = isTimerRunning ? 'Pause' : 'Start'

    return (
      <div className="start-pause-rest">
        <div className="start-pause-rest-btn-container">
          <button
            onClick={this.onClickStartPause}
            type="button"
            className="play-pause-rest-btn"
          >
            <img
              src={startOrPauseImg}
              alt={startOrPauseAlt}
              className="play-pause-rest-icon"
            />
            <p className="play-pause-rest-txt">{startStopTxt}</p>
          </button>
        </div>
        <div className="start-pause-rest-btn-container">
          <button
            onClick={this.onClickReset}
            type="button"
            className="play-pause-rest-btn"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="play-pause-rest-icon"
            />
            <h1 className="play-pause-rest-txt"> Reset </h1>
          </button>
        </div>
      </div>
    )
  }

  renderSetTimerControl = () => {
    const {timerLimitMinutes, timerElapsedSeconds} = this.state
    const isButtonDisabled = timerElapsedSeconds > 0

    return (
      <div className="set-timer-container">
        <p className="set-timer-txt">Set Timer Limit </p>
        <div className="timer-limit-container">
          <button
            onClick={this.onClickSubtract}
            type="button"
            className="operation-btn"
            disabled={isButtonDisabled}
          >
            -
          </button>
          <p className="count">{timerLimitMinutes}</p>
          <button
            onClick={this.onClickAddition}
            type="button"
            className="operation-btn"
            disabled={isButtonDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  convertTimeIntoTimer = () => {
    const {timerLimitMinutes, timerElapsedSeconds} = this.state
    const timeInSec = timerLimitMinutes * 60 - timerElapsedSeconds
    const minutes = Math.floor(timeInSec / 60)
    const seconds = Math.floor(timeInSec % 60)
    const minInStrFormat = minutes > 9 ? minutes : `0${minutes}`
    const secInStrFormat = minutes > 9 ? seconds : `0${seconds}`
    return `${minInStrFormat}:${secInStrFormat}`
  }

  render() {
    const {isTimerRunning} = this.state
    const statusText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="digi-timer-container">
        <h1 className="heading"> Digital Timer </h1>
        <div className="timer-container">
          <div className="timer-elapsed-bg">
            <div className="time-container">
              <h1 className="time"> {this.convertTimeIntoTimer()} </h1>
              <p className="status">{statusText}</p>
            </div>
          </div>
          <div className="buttons-container">
            {this.renderStartPauseRest()}
            {this.renderSetTimerControl()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
