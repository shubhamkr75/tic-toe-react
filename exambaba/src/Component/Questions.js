import { render } from '@testing-library/react';
import React, { Component, useState } from 'react';
import update from 'react-addons-update';
class Questions extends Component {
    // const [questionList,setquestionList] = useState([]);   
    // const [checkdata, setCheckdata] = useState(false); 
    constructor(){
        super();
        this.state={
            questionList: Array().fill(null),
            checkdata: false,
            showResult: false,
            answerList: Array().fill(null),
            marks: 0            
        }
    }
    
    fetchQuestions(){
        if(!this.state.checkdata){
        fetch(`http://localhost:5000/users`)
            .then((res) => res.json())
            .then((data) => {
                // setquestionList(data.Questions);
                // setCheckdata(true);
                this.setState({questionList:data.Questions,checkdata:true});                
            });
        }
    }
    saveResponse(id,response){
        this.setState(update(this.state, {
            answerList: {
              [id]: {
                $set: response
              }
            }
          }));
    }
    calculateMarks(){
        let marksCalculated=0;
        for(let i=0;i<this.state.questionList.length;i++){ 
            if(this.state.questionList[i].answer===this.state.answerList[this.state.questionList[i].id]){
                marksCalculated++;
            }
        }        
        this.setState({checkdata:false,showResult:true,marks:marksCalculated});
    }

    // }
    render(){
    this.fetchQuestions();   
    const que=[];
    for(let i=0;i<this.state.questionList.length;i++){  
        que.push(
            <table class="questionSection" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tbody><tr>
                <td class="bix-td-qno" rowspan="2" valign="top" align="left"><p>{this.state.questionList[i].id}.&nbsp;</p></td>
                <td class="bix-td-qtxt" valign="top"><p>{this.state.questionList[i].QuestionDesc}</p></td>
            </tr>
            <tr>
                <td  valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="1%" id="tdOptionNo_A_274"><input type="checkbox" name={this.state.questionList[i].id} onClick={()=>this.saveResponse(this.state.questionList[i].id,1)}/></td><td class="bix-td-option" width="1%" id="tdOptionNo_A_434"><a id="lnkOptionLink_A_434" href="javascript: void 0;">A.</a></td>
                <td  width="99%" >{this.state.questionList[i].Options[0].OptionDesc}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="checkbox" onClick={()=>this.saveResponse(this.state.questionList[i].id,2)}/></td><td width="1%" ><a id="lnkOptionLink_B_434" href="javascript: void 0;">B.</a></td>
                <td width="99%" >{this.state.questionList[i].Options[1].OptionDesc}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="checkbox" onClick={()=>this.saveResponse(this.state.questionList[i].id,3)}/></td><td  width="1%" ><a id="lnkOptionLink_C_434" href="javascript: void 0;">C.</a></td>
                <td width="99%" >{this.state.questionList[i].Options[2].OptionDesc}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="checkbox" onClick={()=>this.saveResponse(this.state.questionList[i].id,4)} /></td><td  width="1%"><a id="lnkOptionLink_D_434" href="javascript: void 0;">D.</a></td>
                <td width="99%" >{this.state.questionList[i].Options[3].OptionDesc}</td></tr></tbody></table>                    
                </td>
            </tr>
            </tbody></table>         
        );
    }
        if(this.state.checkdata&&!this.state.showResult){            
            return(                    
            <div class="bix-div-container">{que}
                <div id="divSubmitTest" align="center">
                 <input align="center" onClick={()=>this.calculateMarks()} type="button" value="Submit Test" id="btnSubmitTest"/>
                
                </div>
            </div>
            );
            
        }
        else if(this.state.showResult){
            return(                    
                <div class="bix-div-container">
                   <h1 class="display-3">Thank You. Your Response has been Submitted</h1>
                    <p class="lead"><strong>Your Total Score is </strong> 
                    <span id="result"> {this.state.marks}</span>/{this.state.questionList.length}</p>
                    
                </div>
            );
        }
        else{
            return <div>Failed to render data</div>
        }
    }
}
export default Questions;