import React from 'react';
import './index.css';
import axios from 'axios'

class Item extends React.Component {
    state={
        updatedValue: this.props.item.value,
        visible: false
    }
    handleClick = () => {
        this.setState({visible: true})
    }
    handleChange = (e) => {
       this.setState({updatedValue: e.target.value})
    }
    handleResubmit = (e) => {
      e.preventDefault();
      this.props.handleResubmit(this.props.item, this.state.updatedValue);
      this.setState({updatedValue: this.state.updatedValue, visible: false})
    }
    render(){
     return(
        <li>
            <div onClick={this.handleClick}>
                {this.state.visible ? (
                    <form onSubmit={this.handleResubmit}>
                        <input value={this.state.updatedValue} onChange={this.handleChange} />
                    </form>
                ) : (
                    this.props.item.value
                )}
            </div>
        </li>
    )
    }
}

const List = (props) => {
    return(
       <ul>
           {props.list.map(item => (
               <div key={item.id}>
                   <Item item={item} handleResubmit={props.handleResubmit}/>
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
    handleResubmit = (item, value) => {
        const newList = this.state.list.map((element) => {
            if(element.id === item.id) {
               element.value = value
            }
            return element
        })
        this.setState({list: newList})
    }
    render(){
        return(
        <div>
            <Form handleSubmit={this.handleSubmit} />
            <List list={this.state.list} handleResubmit={this.handleResubmit}/>
        </div>
        )
    }
}

export default App