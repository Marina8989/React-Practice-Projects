import React from 'react';
import './index.css';


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
                 <Item item={item}/>
             </div>
          ))}
       </ul>
    )
}

class Form extends React.Component{
    state={
        searchInput: ''
    }
    handleChange = (e) => {
       this.setState({searchInput: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const value = this.state.searchInput;
        this.setState({searchInput: ''});
        this.props.handleSubmit(value);
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input value={this.state.searchInput} onChange={this.handleChange}/>
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
      const newList = [...this.state.list, item];
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