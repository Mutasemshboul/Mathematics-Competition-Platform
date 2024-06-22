

var form=document.getElementById("addQuestionModal");
question=document.getElementById("question"),
optionOne=document.getElementById("optionOne"),
optionTwo=document.getElementById("optionTwo"),
optionThree=document.getElementById("optionThree"),
correctAnswer=document.getElementById("correctAnswer"),
submitBtn=document.querySelector(".submit"),
questionsData=document.getElementById("DataLevelTwo"),
levelOne=document.getElementById("DataLevelOne"),
modalTitle=document.querySelector("addQuestionModal .modal-title"),
modal=document.getElementById("addQuestionModal")
let getData= [];
let isData=false,editId

function showDataLevelTwo()
{
    var table=document.getElementById("DataLevelTwo")
    getData.forEach((element,index)=>{
    let createElement=`<tr class="questionData">
    <td>
                                    <span class="custom-checkbox">
                                        <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                                        <label for="checkbox1"></label>
                                    </span>
                                </td>
    <td>${element.Question}</td>
    <td>${element.OptionOne}</td>
    <td>${element.OptionTwo}</td>
    <td>${element.OptionThree}</td>
    <td>${element.CorrectAnswer}</td>
      <td>
                                    <a href="#editQuestionModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                    <a href="#deleteQuestionModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                </td>
    
     
    </tr>`
    
    table.innerHTML+=createElement
    
    })
}




function showData(){

    var table=document.getElementById("DataLevelOne")
getData.forEach((element,index)=>{
let createElement=`<tr class="questionData">
<td>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                                    <label for="checkbox1"></label>
                                </span>
                            </td>
<td>${element.Question}</td>
<td>${element.OptionOne}</td>
<td>${element.OptionTwo}</td>
<td>${element.OptionThree}</td>
<td>${element.CorrectAnswer}</td>
  <td>
                                <a href="#editQuestionModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                <a href="#deleteQuestionModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            </td>

 
</tr>`

table.innerHTML+=createElement

})
}

form.addEventListener('submit',(e)=>{

e.preventDefault()

const information={
    Question:question.value,
    OptionOne:optionOne.value,
    OptionTwo:optionTwo.value,
    OptionThree:optionThree.value,
    CorrectAnswer:correctAnswer.value,
    QuestionData:questionsData.value
}




getData.push(information);
localStorage.setItem("viewQuestions",JSON.stringify(getData))
console.log(localStorage)

submitBtn.innerText="submit"
modalTitle.innerText="Fill The Form !"
window.onload=showData()

form.reset()
modal.style.display="none";
document.querySelector(".modal-body").remove()
}

)