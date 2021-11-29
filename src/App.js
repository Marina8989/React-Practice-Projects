import React from 'react';
import './index.css';
import axios from 'axios'

class App extends React.Component{
    state={
        list: [],
        inputValue: ''
    }
     getPageInfo = async (user) => {
         try{
            const {data} = await axios(`https://api.github.com/users/${user}`);
            const newList = [...this.state.list, data];
            this.setState({list: newList})
         }catch(err) {
            console.log(err)
         }
     }
      handleChange = (e) => {
         this.setState({inputValue: e.target.value})
      }

      handleSubmit = (e) => {
         e.preventDefault();
         this.getPageInfo(this.state.inputValue);
         this.setState({inputValue: ''});
      }


    render(){
        console.log(this.state.list)
        return(
        <div>
           <form onSubmit={this.handleSubmit}>
               <input value={this.state.inputValue} onChange={this.handleChange} />
           </form>
           <>
           {this.state.list.map(item => (
               <div key={item.id}>
                 <h3>{item.login}</h3>
                 <img src={item.avatar_url} />
               </div>
           ))}
           </>
        </div>
        )
    }
}

export default App