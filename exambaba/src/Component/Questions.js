import { render } from '@testing-library/react';
import React, { useState } from 'react';
const Questions = () => {
    const [questionList,setquestionList] = useState([]);   
    const [checkdata, setCheckdata] = useState(false); 
    fetch(`http://localhost:5000/users`)
        .then((res) => res.json())
        .then((data) => {
            setquestionList(data.Questions);
            setCheckdata(true);
            if(data.message){
                setCheckdata(false);
            }
        });

    const que=[];
    for(let i=0;i<questionList.length;i++){  
        que.push(
            <table class="bix-tbl-container" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tbody><tr>
                <td class="bix-td-qno" rowspan="2" valign="top" align="left"><p>{questionList[i].id}.&nbsp;</p></td>
                <td class="bix-td-qtxt" valign="top"><p>{questionList[i].QuestionDesc}</p></td>
            </tr>
            <tr>
                <td class="bix-td-miscell" valign="top"><table class="bix-tbl-options" id="tblOption_434" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td class="bix-td-option" width="1%" id="tdOptionNo_A_434"><a id="lnkOptionLink_A_434" href="javascript: void 0;">A.</a></td>
                 <td class="bix-td-option" width="99%" id="tdOptionDt_A_434">{questionList[i].Options[0].OptionDesc}</td></tr><tr><td class="bix-td-option" width="1%" id="tdOptionNo_B_434"><a id="lnkOptionLink_B_434" href="javascript: void 0;">B.</a></td>
                 <td class="bix-td-option" width="99%" id="tdOptionDt_B_434">{questionList[i].Options[1].OptionDesc}</td></tr><tr><td class="bix-td-option" width="1%" id="tdOptionNo_C_434"><a id="lnkOptionLink_C_434" href="javascript: void 0;">C.</a></td>
                 <td class="bix-td-option" width="99%" id="tdOptionDt_C_434">{questionList[i].Options[2].OptionDesc}</td></tr><tr><td class="bix-td-option" width="1%" id="tdOptionNo_D_434"><a id="lnkOptionLink_D_434" href="javascript: void 0;">D.</a></td>
                 <td class="bix-td-option" width="99%" id="tdOptionDt_D_434">{questionList[i].Options[3].OptionDesc}</td></tr></tbody></table>                    
                </td>
            </tr>
            </tbody></table>         
        );
    }
        if(checkdata){            
            return(                    
            <div class="bix-div-container">{que}</div>
            );
            
        }else{
            return <div>Failed to render data</div>
        }
}
export default Questions;