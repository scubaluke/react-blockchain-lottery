// import logo from "./logo.svg";
import "./App.css";
import React from "react";
// import web3 from './web3'
import lottery from './lottery'
import web3 from './web3';

class App extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = { manager: '' }
  // }
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',

  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call()
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)

    this.setState({ manager, players, balance })

  }
  render() {
   
    return (
     <div style={{margin: '20px'}}>
       <h2>Lottery Contract</h2>
       <p>
         This contract is managed by {this.state.manager}
       </p>
      <p>
      There are currently {this.state.players.length} players entered, competing to win
         {web3.utils.fromWei(this.state.balance, 'ether')} Ether!
      </p>
      <hr />
      <form action="">
        <h4>Want to try your luck?</h4>
          <div>
            <label htmlFor="">Amount of Ether to enter</label>
            <input value={this.state.value} type="text" onChange={event => this.setState({ value: event.target.value })}   />
          </div>
          <button>Enter</button>
      </form>
     </div>
    );
  }
}
export default App;
