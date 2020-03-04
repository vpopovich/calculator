import React, { Component } from 'react';
import './App.css';

import { Button } from './components/Button.js';
import { Input } from './components/Input';
import { ClearButton } from './components/ClearButton';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    }
  }

  addToInput = value => {
    this.setState({input: this.state.input + value});
  }

  handleEqual = () => {
    this.setState({ input: this.calculate(this.state.input) });
  }

  calculate = (input) => {

      var f = {
      add: '+',
      sub: '-',
      div: '/',
      mlt: '*',
      mod: '%',
      exp: '^'
    };
  
    // Create array for Order of Operation and precedence
    f.ooo = [
      [
        [f.mlt],
        [f.div]
      ],
      [
        [f.add],
        [f.sub]
      ]
    ];
  
    input = input.replace(/[^0-9%^*\/()\-+.]/g, ''); // clean up unnecessary characters
  
    var output;
    for (var i = 0, n = f.ooo.length; i < n; i++) {
  
      // Regular Expression to look for operators between floating numbers or integers
      var re = new RegExp('(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])(\\d+\\.?\\d*)');
      re.lastIndex = 0; // take precautions and reset re starting pos
  
      // Loop while there is still calculation for level of precedence
      while (re.test(input)) {
        output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
        if (isNaN(output) || !isFinite(output)) 
          return output; // exit early if not a number
        input = input.replace(re, output);
      }
    }
  
    return output;
  
    function _calculate(a, op, b) {
      a = a * 1;
      b = b * 1;
      switch (op) {
        case f.add:
          return a + b;
          break;
        case f.sub:
          return a - b;
          break;
        case f.div:
          return a / b;
          break;
        case f.mlt:
          return a * b;
          break;
        default:
          return;
      }
    }
  }

  render() {
    return (
      <div className="app">
         <div className="calculator-wrapper">
           <Input input={this.state.input}>Input</Input>
           <div className="row">
             <Button handleClick={this.addToInput}>7</Button>
             <Button handleClick={this.addToInput}>8</Button>
             <Button handleClick={this.addToInput}>9</Button>
             <Button handleClick={this.addToInput}>*</Button>
           </div>
           <div className="row">
             <Button handleClick={this.addToInput}>4</Button>
             <Button handleClick={this.addToInput}>5</Button>
             <Button handleClick={this.addToInput}>6</Button>
             <Button handleClick={this.addToInput}>-</Button>
           </div>
           <div className="row">
             <Button handleClick={this.addToInput}>1</Button>
             <Button handleClick={this.addToInput}>2</Button>
             <Button handleClick={this.addToInput}>3</Button>
             <Button handleClick={this.addToInput}>+</Button>
           </div>
           <div className="row">
             <Button handleClick={this.addToInput}>0</Button>
             <Button handleClick={this.addToInput}>.</Button>
             <Button handleClick={()=>{this.handleEqual()}}>=</Button>
             <Button handleClick={this.addToInput}>/</Button>
           </div>
           <div className="row">
             <ClearButton handleClear={() => this.setState({input: ""})}>Clear</ClearButton>
           </div>
         </div>
        </div>
    );
  }
}

 export default App;
