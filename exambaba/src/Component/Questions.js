import { render } from '@testing-library/react';
import React, { Component, useState } from 'react';
class Questions extends Component {
    // const [questionList,setquestionList] = useState([]);   
    // const [checkdata, setCheckdata] = useState(false); 
    constructor(){
        super();
        this.state={
            questionList: Array().fill(null),
            checkdata: false,
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
    // }
    render(){
    this.fetchQuestions();   
    const que=[];
    for(let i=0;i<this.state.questionList.length;i++){  
        que.push(
            <table class="bix-tbl-container" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tbody><tr>
                <td class="bix-td-qno" rowspan="2" valign="top" align="left"><p>{this.state.questionList[i].id}.&nbsp;</p></td>
                <td class="bix-td-qtxt" valign="top"><p>{this.state.questionList[i].QuestionDesc}</p></td>
            </tr>
            <tr>
                <td  valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="1%" id="tdOptionNo_A_274"><input type="checkbox" /></td><td class="bix-td-option" width="1%" id="tdOptionNo_A_434"><a id="lnkOptionLink_A_434" href="javascript: void 0;">A.</a></td>
                <td  width="99%" >{this.state.questionList[i].Options[0].OptionDesc}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="checkbox" /></td><td width="1%" ><a id="lnkOptionLink_B_434" href="javascript: void 0;">B.</a></td>
                <td width="99%" >{this.state.questionList[i].Options[1].OptionDesc}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="checkbox" /></td><td  width="1%" ><a id="lnkOptionLink_C_434" href="javascript: void 0;">C.</a></td>
                <td width="99%" >{this.state.questionList[i].Options[2].OptionDesc}</td></tr><tr><td width="1%" id="tdOptionNo_A_274"><input type="checkbox" /></td><td  width="1%"><a id="lnkOptionLink_D_434" href="javascript: void 0;">D.</a></td>
                <td width="99%" >{this.state.questionList[i].Options[3].OptionDesc}</td></tr></tbody></table>                    
                </td>
            </tr>
            </tbody></table>         
        );
    }
        if(this.state.checkdata){            
            return(                    
            <div class="bix-div-container">{que}
                <div id="divSubmitTest" align="center">
                 <input align="center" type="button" value="   Submit Test   " id="btnSubmitTest"/>
                </div>
            </div>
            );
            
        }else{
            return <div>Failed to render data</div>
        }
    }
}
export default Questions;