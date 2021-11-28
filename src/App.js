import React from 'react';
import './index.css';

const Item = (props) => {
    return(
        <li>
          {props.item.value}
          <button onClick={() => props.handleToggle(props.item)}>Toggle</button>
          <button onClick={() => props.handleRemove(props.item)}>Remove</button>
        </li>
    )
}

const List = (props) => {
    return(
       <ul>
           {props.list.map((item) => {
             return(
               <Item
                  key={item.id}
                  item={item}
                  handleToggle={props.handleToggle}
                  handleRemove={props.handleRemove}
                />
               )
           })}
       </ul>
    )
}

class Form extends React.Component{
    state = {
      searchValue: ''
    }
    handleChange = (e) => {
      this.setState({searchValue: e.target.value})
    }
    handleSubmit = (e) => {
       e.preventDefault();
       const value = this.state.searchValue;
       this.setState({searchValue: ''});
       this.props.handleSubmit(value);
    }
    render(){
      return(
        <form onSubmit={this.handleSubmit}>
         <input value={this.state.searchValue} onChange={this.handleChange} />
        </form>
  )
    }
}

class App extends React.Component{
    state={
        list:[],
        value: ''
    }
    handleSubmit = (value) => {
      const item = {
          value,
          id: Math.floor(Math.random() * 45)
      }
      const newList = [...this.state.list, item]
      this.setState({list: newList})
    }
    handleToggle = (el) => {
       const newList = this.state.list.map(item => {
           if(item.id === el.id) {
               console.log('handle toggle')
           }
           return item
       })
       this.setState({list: newList})
    }
    handleRemove = (el) => {
      const newList = this.state.list.filter(item => item.id !== el.id)
      this.setState({list: newList})
    }
    render() {
      return(
         <div>
             <h3>Input Info</h3>
             <Form handleSubmit={this.handleSubmit}/>
             <List list={this.state.list}
                 handleToggle={this.handleToggle}
                 handleRemove={this.handleRemove}
             />
         </div>
      )
  }
}

export default App