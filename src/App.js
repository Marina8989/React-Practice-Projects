import React from 'react';
import './index.css';
import axios from 'axios'

const Item = (props) => {
    return(
        <li>{props.item.value}</li>
    )
}

const List = (props) => {
    return(
       <ul>
           {props.list.map(item => (
               <div key={item.id}>
                   <Item item={item} />
               </div>
           ))}
       </ul>
    )
}
class Form extends React.Component{
    state={
        inputValue: ''
    }
    handleChange = (e) => {
      this.setState({inputValue: e.target.value})
    }
    handleSubmit = (e) => {
       e.preventDefault();
       const value = this.state.inputValue;
       this.setState({inputValue: ''});
       this.props.handleSubmit(value)
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.inputValue} onChange={this.handleChange}/>
            </form>
        )
    }
}
class App extends React.Component{
    state={
        list: []
    }
    handleSubmit = (value) => {
      const item = {
          value,
          id: Math.floor(Math.random() * 45)
      }
      const newList = [...this.state.list, item]
      this.setState({list: newList})
    }
    render(){
        return(
        <div>
            <Form handleSubmit={this.handleSubmit} />
            <List list={this.state.list} />
        </div>
        )
    }
}

export default App