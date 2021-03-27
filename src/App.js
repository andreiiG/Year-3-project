import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth,API,graphqlOperation } from 'aws-amplify';
import aws_exports from './aws-exports';
import {createScoresTest1,createScoreTest2,createScoreTest3} from './graphql/mutations'
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
    this.nextInstruction = this.nextInstruction.bind(this);
    this.lastInstruction= this.lastInstruction.bind(this);
    this.randomizeArray=this.randomizeArray.bind(this);
    this.nextTrial=this.nextTrial.bind(this);
    this.timeout=this.timeout.bind(this);
    this.firstStage=this.firstStage.bind(this);
    this.showCue=this.showCue.bind(this);
    this.thirdStage=this.thirdStage.bind(this);
    this.handleKeyPress=this.handleKeyPress.bind(this);
    this.timer=0;
    this.timeouttime=0;
    this.secondtimer=0;
    this.trialResult=[];
    this.trialCount = 0;
    this.gender= " "
    this.age=0;
    this.sleephours=0;
    this.sleepScore=0;
    this.endtest= this.endtest.bind(this);
    this.notAnswerTrial=this.notAnswerTrial.bind(this);
    this.arrowShow=false;
    this.prefixastionTime=this.prefixastionTime.bind(this);
    this.waitStage=this.waitStage.bind(this);
    this.createScoresTest1F=this.createScoresTest1F.bind(this);
    this.createScoresTest2F=this.createScoresTest2F.bind(this);
    this.calculateMean=this.calculateMean.bind(this);
    this.updateAge=this.updateAge.bind(this);
    this.updateGender=this.updateGender.bind(this);
    this.updateSleep=this.updateSleep.bind(this);
    this.endtestEsc=this.endtestEsc.bind(this);
    this.startTest2=this.startTest2.bind(this);
    this.setClock=this.setClock.bind(this);
    this.startClock=this.startClock.bind(this);
    this.test2MainPage=this.test2MainPage.bind(this);
    this.nextInstructionTest2=this.nextInstructionTest2.bind(this);
    this.handleKeyPressTest2=this.handleKeyPressTest2.bind(this);
    this.updateSleepScore=this.updateSleepScore.bind(this);
    this.color="black";
    this.trialsetvar= [
      [1,'congruent','UP','N','L','L'],
      [1,'congruent','UP','N','R','R'],
      [1,'congruent','DOWN','N','L','L'],
      [1,'congruent','DOWN','N','R','R'],
      [1,'incongruent','UP','N','L','R'],
      [1,'incongruent','UP','N','R','L'],
      [1,'incongruent','DOWN','N','L','R'],
      [1,'incongruent','DOWN','N','R','L'],
      [2,'congruent','UP','C','L','L'],
      [2,'congruent','UP',"C",'R','R'],
      [2,'congruent','DOWN',"C",'L','L'],
      [2,'congruent','DOWN',"C",'R','R'], 
      [2,'incongruent','UP',"C",'L','R'],
      [2,'incongruent','UP',"C",'R','L'],
      [2,'incongruent','DOWN',"C",'L','R'],
      [2,'incongruent','DOWN',"C",'R','L'],
      [3,'congruent','UP',"TD",'L','L'],
      [3,'congruent','UP',"TD",'R','R'],
      [3,'congruent','DOWN',"TD",'L','L'],
      [3,'congruent','DOWN',"TD",'R','R'], 
      [3,'incongruent','UP',"TD",'L','R'],
      [3,'incongruent','UP',"TD",'R','L'],
      [3,'incongruent','DOWN',"TD",'L','R'],
      [3,'incongruent','DOWN',"TD",'R','L'],
      [4,'congruent','UP','UP','L','L'],
      [4,'congruent','UP','UP','R','R'],
      [4,'congruent','DOWN','DOWN','L','L'],
      [4,'congruent','DOWN','DOWN','R','R'], 
      [4,'incongruent','UP','UP','L','R'],
      [4,'incongruent','UP','UP','R','L'],
      [4,'incongruent','DOWN','DOWN','L','R'],
      [4,'incongruent','DOWN','DOWN','R','L']
    ];
    this.correctanswer=0;
    this.wronganswer=0;
    this.trialsdone=0;
    this.keypressed=false;
    this.noanswerTimeout=0;
    this.noAnswer=this.noAnswer.bind(this);
    this.endTest2=this.endTest2.bind(this);
    this.smalljump=0;
    this.bigjump=0;
    this.random_number=0;
    this.bigjumpNoAns=0;
    this.smallJumpNoAns=0;
    this.bigJumpRightAns=0;
    this.smallJumpRightAns=0;
    this.smallJumpWrong=0;
    this.bigJumpWrong=0;
    this.startDemoTest2=this.startDemoTest2.bind(this);
    this.startDemo=this.startDemo.bind(this);
    this.skip=false;
    this.noAnswerDemo=this.noAnswerDemo.bind(this);
    this.startDemoClock=this.startDemoClock.bind(this);
    this.endDemo2=this.endDemo2.bind(this);
    this.handleKeyPressTest2Demo=this.handleKeyPressTest2Demo.bind(this);
    this.noanswerTimeoutDemo=0;
    this.endDemoTest2Bool=false;
    this.startDemoTest1=this.startDemoTest1.bind(this)
    this.startTest3=this.startTest3.bind(this);
    this.test3MainPage=this.test3MainPage.bind(this);
    this.prepareTest3=this.prepareTest3.bind(this);
    this.startInput=this.startInput.bind(this);
    this.startTimerTest3=this.startTimerTest3.bind(this);
    this.noAnswerTest3=this.noAnswerTest3.bind(this);
    this.handleKeyPressTest3=this.handleKeyPressTest3.bind(this);
    this.timeoutTest3=0;
    this.timerTest3=0;
    this.timerTest3FinishRound=0;
    this.timerTest3FinishTotal=0;
    this.correctAnswerTest3=0;
    this.wrongAnswerTest3=0;
    this.auxlistTest3=0;
    this.wrongAnsTrialTest3=0;
    this.rightAnsTrialTest3=0;
    this.trialResultTest3=[];
    this.trialCountTest3=0;
    this.endTest3=this.endTest3.bind(this);
    this.calculateDataTest3=this.calculateDataTest3.bind(this);
    this.createScoreTest3F=this.createScoreTest3F.bind(this);
    this.endPageTest3=this.endPageTest3.bind(this);
    
}

  componentDidMount = () => {
    //this.getuserscore()
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
      currentTrial : 0,
      time : 0,
      timer: 0,
      test2Started: false,
      test3Started: false,
      trialset: [
        [1,'congruent','UP','N','L','L'],
        [1,'congruent','UP','N','R','R'],
        [1,'congruent','DOWN','N','L','L'],
        [1,'congruent','DOWN','N','R','R'],
        [1,'incongruent','UP','N','L','R'],
        [1,'incongruent','UP','N','R','L'],
        [1,'incongruent','DOWN','N','L','R'],
        [1,'incongruent','DOWN','N','R','L'],
        [2,'congruent','UP','C','L','L'],
        [2,'congruent','UP',"C",'R','R'],
        [2,'congruent','DOWN',"C",'L','L'],
        [2,'congruent','DOWN',"C",'R','R'], 
        [2,'incongruent','UP',"C",'L','R'],
        [2,'incongruent','UP',"C",'R','L'],
        [2,'incongruent','DOWN',"C",'L','R'],
        [2,'incongruent','DOWN',"C",'R','L'],
        [3,'congruent','UP',"TD",'L','L'],
        [3,'congruent','UP',"TD",'R','R'],
        [3,'congruent','DOWN',"TD",'L','L'],
        [3,'congruent','DOWN',"TD",'R','R'], 
        [3,'incongruent','UP',"TD",'L','R'],
        [3,'incongruent','UP',"TD",'R','L'],
        [3,'incongruent','DOWN',"TD",'L','R'],
        [3,'incongruent','DOWN',"TD",'R','L'],
        [4,'congruent','UP','UP','L','L'],
        [4,'congruent','UP','UP','R','R'],
        [4,'congruent','DOWN','DOWN','L','L'],
        [4,'congruent','DOWN','DOWN','R','R'], 
        [4,'incongruent','UP','UP','L','R'],
        [4,'incongruent','UP','UP','R','L'],
        [4,'incongruent','DOWN','DOWN','L','R'],
        [4,'incongruent','DOWN','DOWN','R','L']
      ],
      trialsetDemo:[
        [1,'congruent','UP','N','R','R'],
        [1,'incongruent','UP','N','L','R'],
        [2,'congruent','UP',"C",'R','R'],
        [2,'incongruent','DOWN',"C",'L','R'],
        [3,'congruent','UP',"TD",'R','R'],
        [3,'incongruent','DOWN',"TD",'L','R'],
        [4,'incongruent','UP','UP','L','R'],
        [4,'congruent','DOWN','DOWN','L','L'],
      ],
      rotate:0,
      instructionPageTest2:1,
      demoTest1Started:false,
      listTest3:[],
      instructionPageTest3:1
    }

  // async createScoresf(dictionary){
  //   try {
  //     //const createdScore= dictionary
  //     const createdScore= { username: this.state.username ,scoreTest1 : 200, scoreTest2 : 800 ,scoreTest3: 200 ,sleephours: 10 ,basetype : 'score'}
  //     //const response = 
  //     await API.graphql(graphqlOperation(createScores,{input : createdScore }))
  //     console.log('user created ')
  //   } catch (error) {
  //      console.log('user was not created ',error)
  //    }
  //  }
   async createScoresTest1F(meanCaux,meanCNaux,meanCCaux,meanCTDaux,meanCSaux,meanIaux,meanINaux,meanICaux,meanITDaux,meanISaux,congAns,congNAns,congCans,congTDans,congSans,incongAns,incongNAns,incongCans,incongTDans,incongSans){
    try {
      const createdScoreTest1= { username: this.state.username, age: this.age, sleephours: this.sleephours,sleepScore: this.sleepScore,gender : this.gender, meanCongruent :meanCaux , meanIncongruent: meanIaux, meanCongruentN:meanCNaux ,meanIncongruentN: meanINaux,  meanCongruentC: meanCCaux,
       meanIncongruentC: meanICaux,meanCongruentTD: meanCTDaux,meanIncongruentTD :meanITDaux, meanCongruentS:meanCSaux, meanIncongruentS : meanISaux, CongruentAnswer:congAns, IncongruentAnswer:incongAns, CongruentNAnswer:congNAns,
      IncongruentNAnswer:incongNAns, CongruentCAnswer:congCans, IncongruentCAnswer:incongCans, CongruentTDAnswer:congTDans , IncongruentTDAnswer:incongTDans, CongruentSAnswer:congSans, IncongruentSAnswer:incongSans , basetype : 'score'}
      await API.graphql(graphqlOperation(createScoresTest1,{input : createdScoreTest1 }))
      console.log('score create for '+this.state.username)
    } catch (error) {
       console.log('score was not created ',error)
     }
   }
   async createScoresTest2F()
   {
     try {
       if(this.smallJumpNoAns+this.bigjumpNoAns>this.trialCount+this.correctanswer){
         this.bigjumpNoAns--;
       }
       console.log(this.state.username,this.age,this.sleephours,this.sleepScore, this.gender,this.correctanswer,this.wronganswer)
       const createInputTest2 ={ username: this.state.username, age: this.age, sleephours: this.sleephours,sleepScore: this.sleepScore,gender : this.gender,correctAnswer: this.correctanswer,
        wrongAnswer: this.wronganswer,bigjumpNoAns: this.bigjumpNoAns,smallJumpNoAns: this.smallJumpNoAns,bigJumpRightAns: this.bigJumpRightAns,smallJumpRightAns :this.smallJumpRightAns,bigJumpWrong: this.bigJumpWrong,
        smallJumpWrong: this.smallJumpWrong, trials: this.trialCount ,basetype: 'scoreTest2'}
      await API.graphql(graphqlOperation(createScoreTest2,{input: createInputTest2}))
      console.log('score create for '+this.state.username)
      } catch (error) {
        console.log('scoreTest 2 was not created ',error)
     }
   }
   async createScoreTest3F(Cans,TCans,Wans,TWans,ACans,TACans)
   { 
     try{
      const createScoreTest3Dict ={username: this.state.username, age: this.age, sleephours: this.sleephours, sleepScore: this.sleepScore, gender : this.gender, correctAnswer: Cans,correctAnswerTime: TCans,wrongAnswer:Wans,
        wrongAnswerTime:TWans,almostCorrectAnswer: ACans,almostCorrectAnswerTime:TACans,basetype: "score"}
        console.log(createScoreTest3Dict)
        await API.graphql(graphqlOperation(createScoreTest3,{input: createScoreTest3Dict}))
        console.log('score create for '+this.state.username)
      }catch(error){
        console.log('score was not created ',error)
      }
        
   }
  //  async getuserscore(){
  //    try {
  //       const response = await API.graphql(graphqlOperation(listScoress,{
  //          filter:{
  //            username :{
  //            eq: this.state.username
  //            }
  //          }
  //        }))
  //        const repsponsedata= response.data.listScoress.items
  //        this.setState({items: repsponsedata})
  //        console.log('this user has this many entries',repsponsedata)
  //    } catch (error) {
  //    }
  //  }
   updateAge(event){
     this.age=event.target.value;
   }
   updateSleep(event){
    this.sleephours=event.target.value;
  }
  updateGender(event){
    this.gender=event.target.value;
  }
  updateSleepScore(event){
    this.sleepScore=event.target.value;
  }





  //test1 
  startDemoTest1(){
    this.setState({trialset:this.state.trialsetDemo,demoTest1Started:true})
    this.trialCount=this.state.trialsetDemo.length
    this.firstStage();
  }
   submitForm(){
    this.trialCount=this.state.trialset.length
    this.randomizeArray()
   }
   test1MainPage(){this.setState({testStarted :false})}
   test2MainPage(){this.setState({test2Started:false})}
   test3MainPage(){this.setState({test3Started:false})}
   randomizeArray(){
      const shuffled = this.state.trialset.sort(() => Math.random() - 0.5)
      this.setState({trialset : shuffled,testStarted : true})
    }
   nextInstruction(){
      this.setState({instructionPageTest1 : this.state.instructionPageTest1 +1 })}

   lastInstruction(){
      this.setState({instructionPageTest1 : this.state.instructionPageTest1 -1 })}
   firstStage(){
      var stage1Time = Math.floor(Math.random()*(1600-400+1))+400
      setTimeout(this.showCue,stage1Time);}

   secondStage(){setTimeout(this.nextInstruction,100)}
   thirdStage(){
      this.trialCount--;
      setTimeout(this.nextInstruction,400)
   }
   showCue(){
    this.setState({instructionPageTest1 : this.state.instructionPageTest1 +1 })
   }
   nextTrial(){
     if(this.trialCount>0){
       console.log(this.trialCount)
       document.removeEventListener("keydown", this.handleKeyPress)
       
    this.setState({trialset: this.state.trialset.slice(1),instructionPageTest1 : 10  })}
    else{
      document.removeEventListener("keydown",this.handleKeyPress);
    this.endtest()
    }
  }
  notAnswerTrial(){
    this.secondtimer = new Date().getTime()
    this.trialResult.push([this.state.trialset[0][1],this.state.trialset[0][2],this.state.trialset[0][3],this.state.trialset[0][4],this.timer,this.secondtimer,"N"])
    this.nextTrial()
  }
  endtest(){

    console.log(this.trialResult)
    if(this.state.demoTest1Started){
      const shuffled = this.trialsetvar.sort(() => Math.random() - 0.5)
      this.setState({testStarted : true,trialset: shuffled,instructionPageTest1:4,demoTest1Started:false})
      this.trialCount=this.state.trialset.length
      this.trialResult=[]
    }else{
      this.setState({testStarted : false,trialset: this.trialsetvar,instructionPageTest1:1})
      this.calculateTest1Data();
  }
  }
  endtestEsc(){
    this.setState({testStarted : false,trialset: this.trialsetvar,instructionPageTest1:1})
    console.log(this.trialResult)
  }
   timeout(){
    document.addEventListener("keydown", this.handleKeyPress, false)
    this.arrowShow=true;
    this.timer = new Date().getTime()
    //change to 1700
    this.timeouttime =setTimeout(this.notAnswerTrial,1700)
    
}
  waitStage(){
    //change to 3000
      setTimeout(this.prefixastionTime,3000)
    }
  prefixastionTime(){
      this.setState({instructionPageTest1: 5})
    }
    //pune pentru luca sa iesi din test cand apesi esc 
  handleKeyPress(event){
    if(this.arrowShow){
     if(event.keyCode == 39){
       if(this.state.trialset[0][4]=="R"){
          this.secondtimer = new Date().getTime()
          clearTimeout(this.timeouttime);
          this.trialResult.push([this.state.trialset[0][1],this.state.trialset[0][2],this.state.trialset[0][3],this.state.trialset[0][4],this.timer,this.secondtimer,"C"])
          this.nextTrial();
          }else{
            this.secondtimer = new Date().getTime()
            clearTimeout(this.timeouttime);
            this.trialResult.push([this.state.trialset[0][1],this.state.trialset[0][2],this.state.trialset[0][3],this.state.trialset[0][4],this.timer,this.secondtimer,"I"])
            this.nextTrial();
          }
    }else if(event.keyCode==37){
          if(this.state.trialset[0][4]=="L"){
            this.secondtimer = new Date().getTime()

            clearTimeout(this.timeouttime);
            this.trialResult.push([this.state.trialset[0][1],this.state.trialset[0][2],this.state.trialset[0][3],this.state.trialset[0][4],this.timer,this.secondtimer,"C"])
            this.nextTrial();
          }else{
            this.secondtimer = new Date().getTime()
            clearTimeout(this.timeouttime);
            this.trialResult.push([this.state.trialset[0][1],this.state.trialset[0][2],this.state.trialset[0][3],this.state.trialset[0][4],this.timer,this.secondtimer,"I"])
            this.nextTrial();
          }
      }else if(event.keyCode==27){
        clearTimeout(this.timeouttime);
        this.endtestEsc()
      }
      else{
         this.trialResult.push([this.state.trialset[0][1],this.state.trialset[0][2],this.state.trialset[0][3],this.state.trialset[0][4],this.timer,this.secondtimer,"NAN"])
         clearTimeout(this.timeouttime);
         
      }
       
    }   
   }
   calculateMean(list){
    var aux=0;
    for( var x =0; x<list.length;x++){
       aux=aux+list[x];
    }
    aux=aux/list.length;
    return parseInt(aux)
  }
   //calculate means for each category
   calculateTest1Data(){
    var meanC =[];
    var meanCN=[];
    var meanCC=[];
    var meanCTD=[];
    var meanCS=[];
    var meanI =[];
    var meanIN=[];
    var meanIC=[];
    var meanITD=[];
    var meanIS=[];
    var congAns=0;
    var incongAns=0;
    var congNAns=0;
    var congCans=0;
    var congTDans=0;
    var congSans=0;
    var incongNAns=0;
    var incongCans=0;
    var incongTDans=0;
    var incongSans=0;
     for(var aux = 0;aux<this.trialResult.length;aux++){
        if(this.trialResult[aux][0]=="incongruent"){
          var auxtime=this.trialResult[aux][5]-this.trialResult[aux][4]
          if(auxtime>1700){
            auxtime=1700
            meanI.push(auxtime)
          }else{
            meanI.push(auxtime)
          }
          if(this.trialResult[aux][6]=="C"){
            incongAns++;
            switch(this.trialResult[aux][2]){
              case 'N' :{
                meanIN.push(auxtime)
                incongNAns++;
                break;
              }
              case 'TD':{
                meanITD.push(auxtime)
                incongTDans++;
                break;
              }
              case 'C':{
                meanIC.push(auxtime)
                incongCans++;
                break;
              }
              case 'DOWN':{
                meanIS.push(auxtime)
                incongSans++;
                break;
              }
              case 'UP':{
                meanIS.push(auxtime)
                incongSans++;
                break;
              }
            }
        }

            
        }else if(this.trialResult[aux][0]=="congruent"){
          var auxtimec=this.trialResult[aux][5]-this.trialResult[aux][4]
          if(auxtimec>1700){
            auxtimec=1700
            meanC.push(auxtimec)
          }else{
            meanC.push(auxtimec)
          }
          if(this.trialResult[aux][6]=="C"){
            congAns++;
            switch(this.trialResult[aux][2]){
              case 'N' :{
                congNAns++;
                meanCN.push(auxtimec)
                break;
              }
              case 'TD':{
                meanCTD.push(auxtimec)
                congTDans++;
                break;
              }
              case 'C':{
                meanCC.push(auxtimec)
                congCans++;
                break;
              }
              case 'DOWN':{
                meanCS.push(auxtimec)
                congSans++;
                break;
              }
              case 'UP':{
                meanCS.push(auxtimec)
                congSans++;
                break;
              }
            }
          }
     }
        
     } 
     var meanCaux =0;
     var meanCNaux=0;
     var meanCCaux=0;
     var meanCTDaux=0;
     var meanCSaux=0;
     var meanIaux =0;
     var meanINaux=0;
     var meanICaux=0;
     var meanITDaux=0;
     var meanISaux=0;
     //calculate mean for all lists and call api to write in to database for test 1
    meanCaux=this.calculateMean(meanC)
    meanCNaux=this.calculateMean(meanCN)
    meanCCaux=this.calculateMean(meanCC)
    meanCTDaux=this.calculateMean(meanCTD)
    meanCSaux=this.calculateMean(meanCS)
    meanIaux=this.calculateMean(meanI)
    meanINaux=this.calculateMean(meanIN)
    meanICaux=this.calculateMean(meanIC)
    meanITDaux=this.calculateMean(meanITD)
    meanISaux=this.calculateMean(meanIS)
    this.createScoresTest1F(meanCaux,meanCNaux,meanCCaux,meanCTDaux,meanCSaux,meanIaux,meanINaux,meanICaux,meanITDaux,meanISaux,congAns,congNAns,congCans,congTDans,congSans,incongAns,incongNAns,incongCans,incongTDans,incongSans)
   }







   //test2 functions
   startTest2(){
     this.setState({test2Started : true})
   }
   startClock(){
    this.random_number = Math.floor(Math.random()*(11-1))+1
   // console.log(random_number)
    if(this.random_number ==1){
      this.setState({rotate: this.state.rotate+2})
      this.skip=true;
      this.trialCount++;
      this.smalljump++
      this.noanswerTimeout = setTimeout(this.noAnswer,1000)

    }
    else if(this.random_number ==10){
      this.setState({rotate: this.state.rotate+4})
      this.skip=true;
      this.trialCount++;
      this.bigjump++;
      this.noanswerTimeout = setTimeout(this.noAnswer,1000)
    }
    else{
      this.skip=false;
      this.setState({rotate: this.state.rotate+1})
      //console.log(this.state.rotate)
    }
    
    
   }
   noAnswer(){
     if(this.random_number ==10){
       this.bigjumpNoAns++;
     }else if(this.random_number ==1){
       this.smallJumpNoAns++;
     }
     this.wronganswer++;
     this.color="red"
   }
   setClock(){
    document.addEventListener("keydown", this.handleKeyPressTest2, false)
    if(this.trialCount==20){
      setTimeout(this.endTest2,2000)
      document.removeEventListener("keydown", this.handleKeyPressTest2, false)
    }else{
      setTimeout(this.startClock,1000)
      this.color="black"
      console.log(this.trialCount)
    }
     
   }
   handleKeyPressTest2(event){
    clearTimeout(this.noanswerTimeout);
    if(event.keyCode==32){
      if(this.skip==true){
        this.skip=false;
        this.color="limegreen"
        this.correctanswer++;
          if(this.random_number ==10){
            this.bigJumpRightAns++;
          }else if(this.random_number ==1){
            this.smallJumpRightAns++;
          }
      }else{
          if(this.random_number ==10){
            this.bigJumpWrong++;
          }else if(this.random_number ==1){
            this.smallJumpWrong++;
          }
        this.color="red"
        this.wronganswer++;
      }
    }
  }
  nextInstructionTest2(){
    this.setState({instructionPageTest2:this.state.instructionPageTest2+1})
  }
  endTest2(){
    this.createScoresTest2F();
    this.setState({instructionPageTest2:1,rotate:0,test2Started:false})
  }







//demo test2

startDemoTest2(){
  this.setState({instructionPageTest2:3})
 }

 startDemo(){
    document.addEventListener("keydown", this.handleKeyPressTest2Demo, false)
    setTimeout(this.startDemoClock,1000)
    this.color="black"
   

 }
 startDemoClock(){
  this.random_number = Math.floor(Math.random()*(11-1))+1
  if(this.random_number ==1){
    this.setState({rotate: this.state.rotate+2})
    this.skip=true;
    this.noanswerTimeoutDemo = setTimeout(this.noAnswerDemo,990)

  }
  else if(this.random_number ==10){
    this.setState({rotate: this.state.rotate+4})
    this.skip=true;
    this.noanswerTimeoutDemo = setTimeout(this.noAnswerDemo,990)
  }
  else{
    this.skip=false;
    this.setState({rotate: this.state.rotate+1})
  }
 }
 
 handleKeyPressTest2Demo(event){
  if(event.keyCode==27){
    clearTimeout(this.noanswerTimeoutDemo);
    this.skip=false;
    document.removeEventListener("keydown", this.handleKeyPressTest2Demo, false)
    this.setState({instructionPageTest2:1,rotate:0})
 }
 if(event.keyCode==32){
    if(this.skip==true){
      clearTimeout(this.noanswerTimeoutDemo);
      this.color="limegreen"
  }else{
    clearTimeout(this.noanswerTimeoutDemo);
      this.color="red"
  }
}

}
 noAnswerDemo(){
  this.color="red"
 }
 endDemo2(){
  this.setState({instructionPageTest2:1,rotate:0})
 }

//third test

startTest3(){

  var list =[1,2,3,4]
  const shuffled = list.sort(() => Math.random() - 0.5)
  var random_number_test = Math.floor(Math.random()*(4-0))+0
  shuffled.push(list[random_number_test])
  console.log(shuffled)
  this.setState({instructionPageTest3:this.state.instructionPageTest3+1,listTest3:shuffled})
  this.auxlistTest3=shuffled
  this.trialCountTest3++;
  setTimeout(this.startInput,15000)
}
startInput(){
this.setState({instructionPageTest3:3})
}
prepareTest3(){
  this.setState({test3Started:true})
}
startTimerTest3(){
  this.timerTest3=new Date().getTime()
  document.addEventListener("keydown", this.handleKeyPressTest3, false)
  this.timeoutTest3= setTimeout(this.noAnswerTest3,15000)
  this.rightAnsTrialTest3=0;
  this.wrongAnsTrialTest3=0;
}
noAnswerTest3(){
  this.nextTrialTest3();
  document.removeEventListener("keydown", this.handleKeyPressTest3, false)
  this.trialResultTest3.push([this.state.listTest3,15000,this.wrongAnsTrialTest3,this.rightAnsTrialTest3])
}
handleKeyPressTest3(event){

 // clearTimeout(this.timeoutTest3);
 //c =67
 //v= 86
 //z=90
 //x=88
 //change to a switch
 if(event.keyCode==67){
    if(this.auxlistTest3[0]==3){
      this.auxlistTest3.shift()
      this.rightAnsTrialTest3++;
    }else{
      this.auxlistTest3.shift()
      this.wrongAnsTrialTest3++;
    }
 }
 if(event.keyCode==86){
    if(this.auxlistTest3[0]==4){
      this.auxlistTest3.shift()
      this.rightAnsTrialTest3++;
    }else{
      this.auxlistTest3.shift()
      this.wrongAnsTrialTest3++;
    }
  }
  if(event.keyCode==88){
      if(this.auxlistTest3[0]==2){
        this.auxlistTest3.shift()
        this.rightAnsTrialTest3++;
      }else{
        this.auxlistTest3.shift()
        this.wrongAnsTrialTest3++;
      }
    }
  if(event.keyCode==90){
      if(this.auxlistTest3[0]==1){
        this.auxlistTest3.shift()
        this.rightAnsTrialTest3++;
      }else{
        this.auxlistTest3.shift()
        this.wrongAnsTrialTest3++;
      }
 }
 console.log(this.trialCountTest3)
 if(this.auxlistTest3.length==0){
   clearTimeout(this.timeoutTest3)
   document.removeEventListener("keydown", this.handleKeyPressTest3, false)
   var auxtime= new Date().getTime()
   var time= auxtime - this.timerTest3
   console.log(time)
   console.log(this.rightAnsTrialTest3+ "correct press ")
   this.trialResultTest3.push([this.state.listTest3,time,this.wrongAnsTrialTest3,this.rightAnsTrialTest3])
   this.nextTrialTest3();

 }
}
nextTrialTest3(){
  if(this.trialCountTest3==10){
    this.endPageTest3()
  }else{
    var list =[1,2,3,4]
    const shuffled = list.sort(() => Math.random() - 0.5)
    var random_number_test = Math.floor(Math.random()*(4-0))+0
    shuffled.push(list[random_number_test])
    this.setState({instructionPageTest3:2,listTest3:shuffled})
    this.auxlistTest3=shuffled
    setTimeout(this.startInput,15000)
    this.trialCountTest3++;
  }

}

endPageTest3(){
  this.setState({instructionPageTest3:4})
  setTimeout(this.endTest3,4000)
  }

endTest3(){
  this.setState({test3Started:false,instructionPageTest3:1})
  this.calculateDataTest3();
}
calculateDataTest3(){
  var correctansaux=0;
  var almostcorrectans=0;
  var wrongans=0;
  var timecorrect=0;
  var timealmostcorrect=0;
  var timewrong=0;
  var meantimecorrect=0;
  var meantimewrong=0;
  var meanalmostright=0;
  for(var j=0;j<this.trialResultTest3.length;j++){
      // correct ans, wrong ans, almost correct ans, mean of time , mean time correct ans, mean time wrong ans, mean time almost correct ans, 
      if(this.trialResultTest3[j][3]==5){
        correctansaux++;
        timecorrect+=this.trialResultTest3[j][1]
      }else if(this.trialResultTest3[j][3]==4){
        almostcorrectans++;
        timealmostcorrect+=this.trialResultTest3[j][1];
      }
      else{
        wrongans++;
        timewrong+=this.trialResultTest3[j][1];
      }
  }
  if(correctansaux==0){
    meantimecorrect= timecorrect;
  }else{
    meantimecorrect= timecorrect/correctansaux;
  }
  if(wrongans==0){
    meantimewrong= timewrong;
  }else{
    meantimewrong= meantimewrong+ timewrong/wrongans
  }
  if(almostcorrectans==0){
    meantimecorrect= timealmostcorrect;
  }else{
    meanalmostright= meanalmostright+ timealmostcorrect/almostcorrectans
  }

  this.createScoreTest3F(correctansaux,parseInt(meantimecorrect),wrongans,parseInt(meantimewrong),almostcorrectans,parseInt(meanalmostright))
}




  render() {
    if(this.state.display){
      return(
        <div>Here I will show the graph</div>
       )
    }else if(this.state.testStarted){
        switch(this.state.instructionPageTest1){
          default:{
            return(
              <div>Something went wrong</div>
            )
          }
          case 1:{
                return(
                    <div> 
                      <div id="instructionPage1" className="instructionsPage"  >
                        <p>It is better to use fullscreen, press F11 for entering full screen</p>
                        <p>This test measures some aspects of attention, and takes about 5 minutes to complete.</p>
                        <p>You will see 5 arrows on the computer screen</p>
                        <center>
                        <img src={ArrowRight} alt="right Arrow" /><img src={(ArrowRight)} alt="right Arrow" /><img src={ArrowRight}  alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" />
                        </center>
                        <p>You must pay attention to the <b><i>CENTRAL</i></b> arrow, and indicate which way it is pointing by pressing the LEFT or RIGHT arrow keys on the keyboard.
                        </p>
                        <button className="myButton"  style={{outline: 'none'}} onClick={this.test1MainPage} >Previous</button>
                        <button className="myButton" style={{outline: 'none'}} onClick={this.nextInstruction} >Next</button>
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
              <button className="myButton" style={{outline: 'none'}} onClick={this.lastInstruction} >Previous</button>
              <button className="myButton" style={{outline: 'none'}} onClick={this.nextInstruction} >Next</button>

            </div>
            )
          }
          case 3:{
            return(
              <div id="instructionPage3" className="instructionsPage">
              <p>Sometimes, one or more asterisks <img src={Star} className="cue imageintext"style={{ resizeMode: "cover",height: 35,width: 35 }} alt="asterix"/> will appear shortly before the arrows.</p>
              <p>When they are presented, the asterisks always appear exactly  400ms second before the arrows .</p>
              <p>If only one asterisk appears, and it is above or below the cross, it also tells you the location in which the arrows will appear.</p>
              <button className="myButton" style={{outline: 'none'}} onClick={this.lastInstruction} >Previous</button>
              <button className="myButton" style={{outline: 'none'}} onClick={this.nextInstruction} >Next</button>
            </div>
            )
          }
          case 4:{
            return(
              <div id="instructionPage4" className="instructionsPage">
                <p>As mentioned earlier, you must pay attention to the central arrow, and indicate which way it is pointing by pressing the LEFT or RIGHT arrow keys on the keyboard.</p>
                <p>This test measures both your reaction time and your accuracy, so it is important to respond as quickly as you can, but without making too many errors.</p>
                <p>To facilitate quick responding, keep your left and right index fingers over the LEFT and RIGHT arrow keys respectively.</p>
                <p>The demo contains 8 trials for practice.</p>
                <button className="myButton" style={{outline: 'none'}} onClick={this.lastInstruction} >Previous</button>
                <button className="myButton" style={{outline: 'none'}} onClick={this.nextInstruction} >StartTest</button>
                <button className="myButton" style={{outline: 'none'}} onClick={this.startDemoTest1 } >Start Demo</button>
              </div>
            )
          }
          //first stage
          case 5:{
            
            return(
              <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                            <img src={Plus} className="plus"  alt="middle plus"  />
                            {this.firstStage()}
                          </div>
            )
          }
          //second stage show cue
          case 6:{
           
                    for(var z=0;z<this.state.trialset.length;z++){
                      if(this.state.trialset[z][3]=="N"){
                        return(
                                <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                                    <img src={Plus} className="plus"  alt="middle plus"  />
                                    {this.secondStage()}
                                </div>
                        )
                      }else if(this.state.trialset[z][3]=="C"){
                        return(
                            <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                                <img src={Star} className="plus"  alt="middle plus"  />
                                {this.secondStage()}
                            </div>
                            )             
                      }else if(this.state.trialset[z][3]=="TD"){
                        return(
                          <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                              <img src ={Star} className="container-cue-top" alt=" Star top"></img>
                              <img src={Plus} className="plus"  alt="middle plus"  />
                              <img src ={Star} className="container-cue-down" alt=" Star down"></img>
                              {this.secondStage()}
                          </div>
                          ) 
                      }else if(this.state.trialset[z][3]=="UP"){
                        return(
                        <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                              <img src ={Star} className="container-cue-top" alt=" Star top"></img>
                              <img src={Plus} className="plus"  alt="middle plus"  />
                              {this.secondStage()}
                          </div>
                          ) 
                      }else if(this.state.trialset[z][3]=="DOWN"){
                        return(
                        <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                              <img src={Plus} className="plus"  alt="middle plus"  />
                              <img src ={Star} className="container-cue-down" alt=" Star down"></img>
                              {this.secondStage()}
                          </div>
                          ) 
                }
              }
            }
            /* falls through */

          case 7:{
                            //third stage remove cue 
            return(
                    <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                          <img src={Plus} className="plus"  alt="middle plus"  />
                          {this.thirdStage()}
                  </div>
            )
                }
                // forth stage show arrows
          case 8:{
            for(var i=0;i<this.state.trialset.length;i++){
                  if(this.state.trialset[i][1]=="congruent"){
                      if(this.state.trialset[i][2]=="UP"){
                        if(this.state.trialset[i][4]=="R"){
                          return (
                            <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                            <div className="container-arrow-top "> <img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /></div>
                            <img src={Plus} className="plus"  alt="middle plus"  />
                            {this.timeout()}
                          </div>
                          
                          )
                        }else{
                          return(
                          <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                            <div className="container-arrow-top "> <img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /></div>
                            <img src={Plus} className="plus"  alt="middle plus" />
                            
                            {this.timeout()}
                          </div>
                          )
                        }
                      }else if(this.state.trialset[i][2]){
                        if(this.state.trialset[i][4]=="R"){
                          return (
                            <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                            <img src={Plus} className="plus"  alt="middle plus"  />
                            <div className="container-arrow-bottom "> <img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /></div>
                            
                            {this.timeout()}
                          </div>
                          
                          )
                        }else{
                          return(
                          <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                            <img src={Plus} className="plus"  alt="middle plus"  />
                            <div className="container-arrow-bottom "> <img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /></div>
                            
                            {this.timeout()}
                          </div>
                          )
                        }
                      }
                  }else if(this.state.trialset[i][1]=="incongruent"){    
                    if(this.state.trialset[i][2]=="UP"){
                      if(this.state.trialset[i][4]=="L"){
                        return (
                          <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                          <div className="container-arrow-top "> <img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /></div>
                          <img src={Plus} className="plus"  alt="middle plus"/>
                          {this.timeout()}
                        </div>
                        
                        )
                      }else{
                        return(
                        <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                          <div className="container-arrow-top"> <img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /></div>
                          <img src={Plus} className="plus"  alt="middle plus"  />
                          {this.timeout()}
                        </div>
                        )
                      }
                  }else if(this.state.trialset[i][2]){
                    if(this.state.trialset[i][4]=="L"){
                      return (
                        <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                        <img src={Plus} className="plus"  alt="middle plus"  />
                        <div className="container-arrow-bottom "> <img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowRight} alt="right Arrow" /></div>
                        
                        {this.timeout()}
                      </div>
                      
                      )
                    }else{                    return(
                      <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                        <img src={Plus} className="plus"  alt="middle plus"  />
                        <div className="container-arrow-bottom"> <img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowRight} alt="right Arrow" /><img src={ArrowLeft} alt="left Arrow" /><img src={ArrowLeft} alt="left Arrow" /></div>
                        
                        {this.timeout()}
                      </div>
                      )
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
          case 10:{
            return(
              <div id="cueType10" className="container-div"style={{display: 'flex', justifyContent : 'center', alignItems: 'center'}}>
                            <img src={Plus} className="plus"  alt="middle plus"  />
                            {this.waitStage()}
                          </div>
            )
          }
        }

    }else if(this.state.test2Started){
      switch(this.state.instructionPageTest2){
        default:{
          return(
            <div>Something went wrong</div>
          )
        }
        case 1 :{
          return(
            <div>
                        <p>The second test is called Computerized Mackworth Clock Test</p>
                        <p>In this test you watch the clock hand move around. When the hand jumps more then normally,you press space bar immediately.   </p>
                        <p>You will get an error signal(red light in the middle) when you press the space bar key when there was no unusual clockhand jumping or when you didn't detect it.</p>
                        <p>You will get a positive feedback(green light) if you press the space bar correctly.</p>
                        <p>Remember that you need to answer in one second , the clockhand moves once per second.</p>
                        <p>To stop the Demo press the escape key otherwise the Demo won't stop</p>
                        <p>The test itself last for 20 jumps</p>
                        <button className="myButton" onClick={this.test2MainPage} >Previous</button>
                        <button className="myButton" onClick={this.startDemoTest2}>Start Demo</button>
                        <button className="myButton" onClick={this.nextInstructionTest2} >Start Test</button>
             </div>
          )
        }
        case 2:{
          return(
            <body className="pageTest2">
              
              <div className="circle"  style={{background: this.color}}></div>
              {this.setClock()}
              <div className="hand second" style={{transform: `translateX(-50%) rotate(${this.state.rotate}deg)`}}> </div>
          </body>
          )
        }
        case 3:{
          return(
            <body className="pageTest2">
              
              <div className="circle"  style={{background: this.color}}></div>
              {this.startDemo()}
              <div className="hand second" style={{transform: `translateX(-50%) rotate(${this.state.rotate}deg)`}}> </div>
          </body>
          )
        }
      }
    }else if(this.state.test3Started){
      switch(this.state.instructionPageTest3){
        default:{
          return(
            <div>Something went wrong</div>
          )
        }
        case 1:{
          return(
            <div>
            <div className="listTest3">{this.state.listTest3}</div>
            <p style={{ marginLeft: '1.5rem' }}>In the next test 5 numbers(from 1 to 4) will appear on the screen for 15 seconds.</p >
            <p style={{ marginLeft: '1.5rem' }}>You will need to recreate the sequence of numbers by pressing z,x,c,v keys on the keyboard</p>
            <p style={{ marginLeft: '1.5rem' }}>The z key represents 1, the x key represents 2, the c key represents 3 and the v key represents 4</p>
            <p style={{ marginLeft: '1.5rem' }}>Exemple: the number 43212 appears on the screen. </p>
            <p style={{ marginLeft: '1.5rem' }}>After the the number disappears you need to press v c x z x for a correct answer.</p>
            <p style={{ marginLeft: '1.5rem' }}>You have 15 seconds to press the 5 keys </p>
            <button className="myButton" onClick={this.test3MainPage}  style={{ marginLeft: '1.5rem' }}>Previous</button>
            <button className="myButton" onClick={this.startTest3}  style={{ marginLeft: '1.5rem' }}>Start Test</button>
    
            </div>
          )
        }
        case 2:{
          return(
            <div>
            <div className="listTest3">{this.state.listTest3}</div>
    
            </div>
          )
        }
        case 3: {
          return(
            <div>
              <div className="timerTest3Text">Timer started !</div>
            {this.startTimerTest3()}
            </div>
          )
        }
        case 4:{
          return(
            <div>
              <div className="timerTest3Text">Test Finished</div>
            </div>
          )
        }
      }

    }
    else{
      return (
        <div className="App">
          <header className="App-header">
            
            <label> Enter your age* : <input type="text" className="inputFields" name="age" placeholder="Age"  onChange={this.updateAge }style={{ marginLeft: '5.4rem' }}/></label>
            <br></br>
            <label>Enter your gender* : <input type="text" className="inputFields" name ="gender" placeholder="Gender" onChange={this.updateGender} style={{ marginLeft: '3.8rem' }}></input></label>
            <br></br>
            <label>Enter hours slept last night* : <input type="text" className="inputFields" name ="sleepH" placeholder="Sleep Hours" onChange={this.updateSleep} ></input></label>
            <br></br>
            <label>Enter sleep score : <input type="text" className="inputFields" name ="Sleep Score" placeholder="Sleep Score(for FitBit)" onChange={this.updateSleepScore} style={{ marginLeft: '4.8rem' }}></input></label>
            
            <br></br>
            <br></br>
            <button className ="myButton" onClick={this.submitForm}style={{ marginLeft: '1.5rem' }}>Start First Test</button>
            <button className ="myButton" onClick={this.startTest2}style={{ marginLeft: '1.5rem' }}> Start Second Test </button>
            <button className ="myButton" onClick={this.prepareTest3}style={{ marginLeft: '1.5rem' }}> Start Third Test </button>

          </header>
              
        </div>
      );
    }
  }
}
           

export default withAuthenticator(App, true);
