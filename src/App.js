import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth,API,graphqlOperation } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import aws_exports from './aws-exports';
import {listScoress} from './graphql/queries';
import {createScores} from './graphql/mutations'
Amplify.configure(aws_exports);

class App extends Component {
  componentDidMount = () => {
    this.getuserscore()
  }
    state={
      testStarted : false,
      userscores :  []
    }
  //username=Auth.user.username
 //  const[userscores, usersetScores] = useState([]);
  // async createScoresf(dictionary){
  //   try {
  //     //const createdScore= dictionary
  //     const createdScore= { username: "test" ,scoreTest1 : 200, scoreTest2 : 800 ,scoreTest3: 200 ,sleephours: 10 ,basetype : 'score'}
  //     //const response = 
  //     await API.graphql(graphqlOperation(createScores,{input : createdScore }))
  //     console.log('user created ')
  //   } catch (error) {
  //     console.log('user was not created ',error)
  //   }
  // }
   async getuserscore(){
     try {
         const userToGet = "user.username"
        const response = await API.graphql(graphqlOperation(listScoress,{
           filter:{
             username :{
             eq: userToGet
             }
           }
         }))
         const repsponsedata= response.data.listScoress.items
         this.setState({items: repsponsedata})
         console.log('this user has this many entries',repsponsedata)
     } catch (error) {
      
     }
   }
  render() {
    if(this.state.testStarted){

    }else{
      return (
        <div className="App">
          <header className="App-header">
          <h1>Hello {Auth.user.username}</h1>
          <AmplifySignOut />
          </header>
          <body>
              <form name="form" id="form">
                <label>Monitor Diagonal:</label>
                <select name="monitorSize" id="monitorSize">
                  <option value="10">10"</option>
                  <option value="11">11"</option>
                  <option value="12">12"</option>
                  <option value="13">13"</option>
                  <option value="14">14"</option>
                  <option value="15">15"</option>
                  <option value="16">16"</option>
                  <option value="17">17"</option>
                  <option value="18">18"</option>
                  <option value="19">19"</option>
                  <option value="20">20"</option>
                </select> 
              <br/>
              </form>
          </body>
        </div>
      );
    }
  }
}
class firstGame extends Component{

}

export default withAuthenticator(App, true);
