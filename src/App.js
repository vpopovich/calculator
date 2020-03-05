import React, { Component } from 'react';
import './App.css';

import { Button } from './components/Button';
import { Input } from './components/Input';
import { ClearButton } from './components/ClearButton';

import Web3 from 'web3';

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

  handleEqual = async () => {
    this.setState({ input: await this.calculate(this.state.input) });
  }

  calculate = async (input) => {

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
        output = await _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
        if (isNaN(output) || !isFinite(output)) 
          return output; // exit early if not a number
        input = input.replace(re, output);
      }
    }
  
    return output;
  
    async function _calculate(a, op, b) {
      a = a * 1;
      b = b * 1;

      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      web3.eth.defaultAccount = web3.eth.accounts[0];
    
      var SimpleABI = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "a",
              "type": "int256"
            },
            {
              "internalType": "int256",
              "name": "b",
              "type": "int256"
            }
          ],
          "name": "add",
          "outputs": [
            {
              "internalType": "int256",
              "name": "",
              "type": "int256"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "a",
              "type": "int256"
            },
            {
              "internalType": "int256",
              "name": "b",
              "type": "int256"
            }
          ],
          "name": "div",
          "outputs": [
            {
              "internalType": "int256",
              "name": "",
              "type": "int256"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "a",
              "type": "int256"
            },
            {
              "internalType": "int256",
              "name": "b",
              "type": "int256"
            }
          ],
          "name": "mlt",
          "outputs": [
            {
              "internalType": "int256",
              "name": "",
              "type": "int256"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "a",
              "type": "int256"
            },
            {
              "internalType": "int256",
              "name": "b",
              "type": "int256"
            }
          ],
          "name": "mod",
          "outputs": [
            {
              "internalType": "int256",
              "name": "",
              "type": "int256"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "a",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "b",
              "type": "uint256"
            }
          ],
          "name": "pow",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "a",
              "type": "int256"
            },
            {
              "internalType": "int256",
              "name": "b",
              "type": "int256"
            }
          ],
          "name": "sub",
          "outputs": [
            {
              "internalType": "int256",
              "name": "",
              "type": "int256"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        }
      ];

      var ContractAdress = "0x9108A236a5B48465b0857854F172E8BEa771CAA5";

      var SimpleContract =new web3.eth.Contract(SimpleABI, ContractAdress);
      
      switch (op) {
        case f.add:
          return await SimpleContract.methods.add(a, b).call();
          break;
        case f.sub:
          return await SimpleContract.methods.sub(a, b).call();
          break;
        case f.div:
          return await SimpleContract.methods.div(a, b).call();
          break;
        case f.mlt:
          return await SimpleContract.methods.mlt(a, b).call();
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
