import React, { Component } from "react";
import { Rnd } from "react-rnd";
import "./App.css";
/**ローカルストレージキーを設定 */
const LOCAL_STORAGE_KEY = "tekitou";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 30,
      hour: 0,
    };
  }

  componentDidMount() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    // ローカルストレージにデータがなかったときだけ、stateの初期値を保存する
    if (data) {
      this.setState({
        ...this.state,
        minutes: JSON.parse(data).minutes,
        hour: JSON.parse(data).hour,
      });
    } else {
      this.syncLocalStorage();
    }
  }

  onResize = (e, direction, ref, delta, position) => {
    const minutes = Math.floor(parseInt(ref.style.width, 10) / 20) * 30;
    const hour = Math.floor(parseInt(position.x, 10) / 40);
    this.setState({ minutes, hour });
    this.syncLocalStorage();
  };
  onDrag = (e, d) => {
    const hour = Math.floor(parseInt(d.x, 10) / 40);
    console.log(hour);
    if (hour > -1) {
      this.setState({ hour });
      this.syncLocalStorage();
    }
  };
  syncLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state));
  };

  render() {
    return (
      <div className="App">
        <h1>RESERVATION</h1>
        <div className="container">
          {Array.from(Array(24).keys()).map((i) => (
            <div className="item" key={i}></div>
          ))}
          <Rnd
            className="rnd"
            default={{
              x: 0,
              y: 0,
              width: 20,
              height: "100%",
            }}
            size={{
              width: (this.state.minutes * 20) / 30,
              height: "100%",
            }}
            position={{
              x: this.state.hour * 40 + 40,
              y: 0,
            }}
            dragAxis="x"
            enableResizing={{
              top: false,
              right: true,
              bottom: false,
              left: true,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            bounds="parent"
            resizeGrid={[20, 0]}
            dragGrid={[20, 0]}
            minWidth="20"
            maxWidth="200"
            onResize={this.onResize}
            onDrag={this.onDrag}
          />
        </div>
        <h2>{this.state.hour} to {this.state.minutes} minutes</h2>
        <button className="button"><p>RESERVE</p></button>
      </div>
    );
  }
}
export default App;
