import React from 'react';
import './index.css';

const Counter = (props) => {
    return (
      <>
        {props.counters.map(item => {
            const {id, counter} = item
            return (
            <div key={id}>
              <h4>{counter}</h4>
              <button onClick={() => props.handleClick(id)}>increment</button>
            </div>
          )
        })}
      </>
    )
}

class App extends React.Component{
    state={
        counters: [
            {id: 1, counter: 5, increment: 5},
            {id: 2, counter: 10, increment: 3},
            {id: 3, counter: 17, increment: 7},
            {id: 4, counter: 20}
        ]
    }
    handleClick = (id) => {
       const newList = this.state.counters.map(item => {
          if(item.id === id) {
              item.counter += item.increment || 1;
          }
          return item
       })
       this.setState({counters: newList})
    }
    render() {
        return(
           <div>
               <h3>Counter App</h3>
               <Counter handleClick={this.handleClick} counters={this.state.counters}/>
           </div>
        )
    }
}

export default App