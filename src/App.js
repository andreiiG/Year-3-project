import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth,API,graphqlOperation } from 'aws-amplify';
import aws_exports from './aws-exports';
import {listScoress} from './graphql/queries';
import {createScores} from './graphql/mutations'
import ArrowRight from './images/ArrowRight.jpg'
import ArrowLeft from './images/ArrowLeft.jpg'
import Plus from './images/plus.jpg'
import Star from './images/star.jpg'
Amplify.configure(aws_exports);

class App extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.test1MainPage = this.test1MainPage.bind(this);
    this.getuserscore = this.getuserscore.bind(this);
    this.nextInstruction = this.nextInstruction.bind(this);
    this.lastInstruction= this.lastInstruction.bind(this);
    this.startTest =this.startTest.bind(this);
    this.randomizeArray=this.randomizeArray.bind(this);
   // this.ShowArrows=this.ShowArrows.bind(this);
    this.nextTrial=this.nextTrial.bind(this);
    this.timeout=this.timeout.bind(this);
    
}
  componentDidMount = () => {
    this.getuserscore()
    this.setState({height: window.innerHeight + 'px'});
    this.setState({width: window.innerWidth + 'px'});
  }
    state={
      testStarted : false,
      userscores :  [],
      username :Auth.user.username,
      display : false,
      width: undefined,
      height: undefined,
      instructionPageTest1 : 1,
      trialCount : 0,
      trialResult : [],
      currentTrial : 0,
      trialset: [
       [1,'congruent','UP',0,'L','L'],
       [1,'congruent','UP',0,'R','R']]
        // [1,'congruent','DOWN',0,'L','L'],
        // [1,'congruent','DOWN',0,'R','R'], 
        // [1,'incongruent','UP',0,'L','R'],
        // [1,'incongruent','UP',0,'R','L'],
        // [1,'incongruent','DOWN',0,'L','R'],
        // [1,'incongruent','DOWN',0,'R','L'],
        // [2,'congruent','UP',0,'L','L'],
        // [2,'congruent','UP',0,'R','R'],
        // [2,'congruent','DOWN',0,'L','L'],
        // [2,'congruent','DOWN',0,'R','R'], 
        // [2,'incongruent','UP',0,'L','R'],
        // [2,'incongruent','UP',0,'R','L'],
        // [2,'incongruent','DOWN',0,'L','R'],
        // [2,'incongruent','DOWN',0,'R','L'],
        // [3,'congruent','UP',0,'L','L'],
        // [3,'congruent','UP',0,'R','R'],
        // [3,'congruent','DOWN',0,'L','L'],
        // [3,'congruent','DOWN',0,'R','R'], 
        // [3,'incongruent','UP',0,'L','R'],
        // [3,'incongruent','UP',0,'R','L'],
        // [3,'incongruent','DOWN',0,'L','R'],
        // [3,'incongruent','DOWN',0,'R','L'],
        // [4,'congruent','UP','UP','L','L'],
        // [4,'congruent','UP','UP','R','R'],
        // [4,'congruent','DOWN','DOWN','L','L'],
        // [4,'congruent','DOWN','DOWN','R','R'], 
        // [4,'incongruent','UP','UP','L','R'],
        // [4,'incongruent','UP','UP','R','L'],
        // [4,'incongruent','DOWN','DOWN','L','R'],
        // [4,'incongruent','DOWN','DOWN','R','L']
      
    }
     startTest() {
      console.log(this.state.trialset[0])
    }
  async createScoresf(dictionary){
    try {
      //const createdScore= dictionary
      const createdScore= { username: this.state.username ,scoreTest1 : 200, scoreTest2 : 800 ,scoreTest3: 200 ,sleephours: 10 ,basetype : 'score'}
      //const response = 
      await API.graphql(graphqlOperation(createScores,{input : createdScore }))
      console.log('user created ')
    } catch (error) {
       console.log('user was not created ',error)
     }
   }
   nextTrial(){
     this.setState({trialset: this.state.trialset.slice(1) })
   }
   async getuserscore(){
     try {
        const response = await API.graphql(graphqlOperation(listScoress,{
           filter:{
             username :{
             eq: this.state.username
             }
           }
         }))
         const repsponsedata= response.data.listScoress.items
         this.setState({items: repsponsedata})
         console.log('this user has this many entries',repsponsedata)
     } catch (error) {
      
     }
   }
   submitForm(){
    this.setState({testStarted : true})
   }
   test1MainPage(){
     this.setState({testStarted :false})
   }
   randomizeArray(){
    const shuffled = this.state.trialset.sort(() => Math.random() - 0.5)
    this.setState({trialset : shuffled})
    console.log(shuffled)
   }
   nextInstruction(){
     if(this.state.instructionPageTest1==4){
      this.setState({instructionPageTest1 : this.state.instructionPageTest1 +1 })
       this.startTest()
       this.randomizeArray()
     }else{
      this.setState({instructionPageTest1 : this.state.instructionPageTest1 +1 })
     }
    
   }
   timeout(){
    setTimeout(this.nextTrial,5000)
   }
   lastInstruction(){
     this.setState({instructionPageTest1 : this.state.instructionPageTest1 -1 })
   }
  render() {
    if(this.state.display){
      return(
        <div>Here I will show the graph</div>
       )
    }else if(this.state.testStarted){
      switch(this.state.instructionPageTest1){
        case 1:{
              return(
                  <div> 
                    <div id="instructionPage1" className="instructionsPage"  >
                      <p>This test measures some aspects of attention, and takes about 10 minutes to complete.</p>
                      <p>You will see 5 arrows on the computer screen</p>
                      <center>
                      <img src={ArrowRight} alt="right Arrow" /><img src={(ArrowRight)} alt="right Arrow" /><img src={ArrowRight}  alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" />
                      </center>
                      <p>You must pay attention to the <b><i>CENTRAL</i></b> arrows, and indicate which way it is pointing by pressing the LEFT or RIGHT arrow keys on the keyboard.
                      </p>
                      <input className="previousButton" type="button" name="previous" value="Previous" onClick={this.test1MainPage} />
                      <input className="nextButton" type="button" name="next" value="Next" onClick={this.nextInstruction}/>
                  </div>
                </div>
              )
            }
        case 2:{
          return(
            <div id="instructionPage2" className="instructionsPage">
            <p>There will always be a cross in the centre of the screen, and the arrows will appear just above or below the cross.</p>
            <center>
              <table id="instructionPageTable">
                <tbody>
                <tr>
                <td><img src={ArrowLeft} alt="left Arrow" className="target" /><img src={ArrowLeft} alt="left Arrow" className="target" /><img src={ArrowLeft} alt="left Arrow" className="target" /><img src={ArrowLeft} alt="left Arrow" className="target" /></td>
                  <td className="spacing"></td>
                </tr>
                <tr>
                  <td className="spacing"></td>
                  <td className="spacing"></td>
                  <td className="spacing"></td>
                </tr>
                <tr>
                  <td><img src={Plus} alt="plus sign" className="cue" /></td>
                  <td className="spacing">OR</td>
                  <td><img src={Plus} alt="plus sign" className="cue" /></td>
                </tr>
                <tr>
                  <td className="spacing"></td>
                  <td className="spacing"></td>
                  <td className="spacing"></td>
                </tr>
                <tr>
                  <td className="spacing"></td>
                  <td className="spacing"></td>
                  <td><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /></td>
                </tr>
                </tbody>
              </table>
            </center>
            <p>Please try to keep your eyes fixed on the cross during the test, rather than moving them to look at the arrows .</p>
            <input className="previousButton" type="button" name="previous" value="Previous" onClick={this.lastInstruction} />
            <input className="nextButton" type="button" name="next" value="Next" onClick={this.nextInstruction} />
          </div>
          )
        }
        case 3:{
          return(
            <div id="instructionPage3" className="instructionsPage">
            <p>Sometimes, one or more asterisks <img src={Star} className="cue imageintext"style={{ resizeMode: "cover",height: 35,width: 35 }} alt="asterix"/> will appear shortly before the arrows.</p>
            <p>When they are presented, the asterisks always appear exactly one half second before .</p>
            <p>If only one asterisk appears, and it is above or below the cross, it also tells you the location in which the arrows will appear.</p>
            <input className="previousButton" type="button" name="previous" value="Previous" onClick={this.lastInstruction} />
            <input className="nextButton" type="button" name="next" value="Next"  onClick={this.nextInstruction} />
          </div>
          )
        }
        case 4:{
          return(
            <div id="instructionPage4" className="instructionsPage">
              <p>As mentioned earlier, you must pay attention to the central arrow, and indicate which way it is pointing by pressing the LEFT or RIGHT arrow keys on the keyboard.</p>
              <p>This test measures both your reaction time and your accuracy, so it is important to respond as quickly as you can, but without making too many errors.</p>
              <p>To facilitate quick responding, keep your left and right index fingers over the LEFT and RIGHT arrow keys respectively.</p>
              <input className="previousButton" type="button" name="previous" value="Previous" onClick={this.lastInstruction} />
              <input className="nextButton" type="button" name="next" value="Next" onClick={this.nextInstruction} />
		        </div>
          )
        }
        case 5:{
          for(var i=0;i<this.state.trialset.length;i++){
            if(this.state.trialset[i][0]==1){
                if(this.state.trialset[i][1]=="congruent"){
                    if(this.state.trialset[i][2]=="UP"){
                      if(this.state.trialset[i][4]=="R"){
                        console.log('R')
                        return (
                          <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                          <div className="container-arrow "> <img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /></div>
                          <img src={Plus} className="cue"  alt="middle plus"  />
                          {this.timeout()}
                        </div>
                        
                        )
                      }else{
                        console.log('L')
                        return(
                        <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                          <div className="container-arrow "> <img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /></div>
                          <img src={Plus} className="cue"  alt="middle plus"  />
                          {this.timeout()}
                        </div>
                        )
                      }
                    }
                }
              
            }
          }
          return (
            <header>
              <div>aici nu</div>  
        </header>
          )
        }
      }

    }else{
      return (
        <div className="App">
          <header className="App-header">
              <button onClick={this.submitForm}>Start First Test</button>
          </header>
              
        </div>
      );
    }
  }
}
class firstGame extends Component{

}

export default withAuthenticator(App, true);
