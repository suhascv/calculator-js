import "./styles.scss";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0,
      numbers: [],
      operators: [],
      number: 0
    };
    this.handleNumberPress = this.handleNumberPress.bind(this);
    this.handleAc = this.handleAc.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleNumberPress(num) {
    let prev = this.state.display === 0 ? "" : this.state.display;
    let prevNum = this.state.number;
    this.setState({ display: prev + "" + num, number: "" + prevNum + num });
  }

  handleAc() {
    this.setState({
      display: 0,
      numbers: [],
      operators: [],
      number: 0
    });
  }

  handleOperators(op) {
    let oldNumbers = this.state.numbers;
    let oldOperators = this.state.operators;
    let prev = this.state.display;
    let num = this.state.number;

    this.setState({
      numbers: [...oldNumbers, parseFloat(num)],
      operators: [...oldOperators, op],
      number: 0,
      display: prev + " " + op + " "
    });
  }

  calculate() {
    var nums = [...this.state.numbers, parseFloat(this.state.number)];
    var ops = [...this.state.operators];
    console.log(nums, ops);
    for (let i = 0; i < ops.length; i++) {
      if (ops[i] === "*") {
        nums[i + 1] = nums[i] * nums[i + 1];
        nums[i] = "$";
        ops[i] = "$";
      } else if (ops[i] === "/") {
        nums[i + 1] = nums[i] / nums[i + 1];
        nums[i] = "$";
        ops[i] = "$";
      }
    }
    var res = 0;
    var newNums = nums.filter((n) => n !== "$");
    var newOps = ops.filter((n) => n !== "$");
    res = newNums[0];
    console.log(newNums, newOps);
    for (let i = 1; i < newNums.length; i++) {
      if (newOps[i - 1] === "+") {
        res += newNums[i];
      } else if (newOps[i - 1] === "-") {
        res -= newNums[i];
      }
    }
    console.log(res);
    this.setState({ display: res });
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Calculator</h1>
        <div className="calculator">
          <div className="screen">
            <span>{this.state.display}</span>
          </div>
          <div className="keypad">
            <div className="keypad-row">
              <div className=" key ac" onClick={this.handleAc}>
                AC
              </div>
              <div
                className="key"
                onClick={() => {
                  this.handleOperators("/");
                }}
              >
                /
              </div>
            </div>
            <div className="keypad-row">
              <div
                className="key"
                onClick={() => {
                  this.handleNumberPress(7);
                }}
              >
                7
              </div>
              <div
                className="key"
                onClick={() => {
                  this.handleNumberPress(8);
                }}
              >
                8
              </div>
              <div
                className="key"
                onClick={() => {
                  this.handleNumberPress(9);
                }}
              >
                9
              </div>
              <div
                className="key"
                onClick={() => {
                  this.handleOperators("*");
                }}
              >
                *
              </div>
            </div>
            <div className="keypad-row">
              <div
                className="key"
                onClick={() => {
                  this.handleNumberPress(4);
                }}
              >
                4
              </div>
              <div
                className="key"
                onClick={() => {
                  this.handleNumberPress(5);
                }}
              >
                5
              </div>
              <div
                className="key"
                onClick={() => {
                  this.handleNumberPress(6);
                }}
              >
                6
              </div>
              <div
                className="key"
                onClick={() => {
                  this.handleOperators("+");
                }}
              >
                +
              </div>
            </div>
            <div className="keypad-row">
              <div
                className="key"
                onClick={() => {
                  this.handleNumberPress(1);
                }}
              >
                1
              </div>
              <div
                className="key"
                onClick={() => {
                  this.handleNumberPress(2);
                }}
              >
                2
              </div>
              <div
                className="key"
                onClick={() => {
                  this.handleNumberPress(3);
                }}
              >
                3
              </div>
              <div
                className="key"
                onClick={() => {
                  this.handleOperators("-");
                }}
              >
                -
              </div>
            </div>
            <div className="keypad-row">
              <div
                className="key"
                onClick={() => {
                  this.handleNumberPress(0);
                }}
              >
                0
              </div>
              <div
                className="key"
                onClick={() => {
                  this.handleNumberPress(".");
                }}
              >
                .
              </div>
              <div className="key equals" onClick={this.calculate}>
                =
              </div>
            </div>
          </div>
        </div>
        <a href="https://suhascv.netlify.app">
          by <h3> suhascv</h3>
        </a>
      </div>
    );
  }
}
