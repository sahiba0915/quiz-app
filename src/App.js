import React, { useState } from "react";
import './App.css';
import Questions from './Components/Questions';
import {v4 as uuidv4} from "uuid";


const  App = () => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [showScore, setShowScore] = useState(false);


  const handleCorrectAnswer = (isCorrect) => {
    if(isCorrect) {
      setScore(score + 1);
    }
    setClicked(true);
  };

  const  handleNextQuestion = () => {
    setClicked(false);
    if(currentQuestion < Questions.length-1){
      setCurrentQuestion(currentQuestion+1);
    }else{
      setShowScore(true);
    }
  };

  return <div className="app-wrapper">

    {showScore ? (
      <div>
        <div className="completed">Completed</div>
        <div className="score-section">
          Your Score : {score}/{Questions.length}
        </div>
     </div>
    ):(
    <div>
      <div className="question-section-wrapper">
        <div className="question-count">
          Question {currentQuestion + 1} of {Questions.length}
        </div>
        <div className="question">
          {Questions[currentQuestion].question}
        </div>
      </div>

      <div className="answer-section-wrapper">
        {Questions[currentQuestion].answers.map((answerOption) =>
        (
           <li className="answer-list" key={uuidv4()}>
            <button disabled ={clicked} 
            className={`answer-button ${clicked &&  answerOption.isCorrect ? "correct": "" }`}
             onClick={()=>handleCorrectAnswer(answerOption.isCorrect)}>{answerOption.answer}</button>
           </li>
        ))}
      </div>

    <div>
      <button className="next-button" onClick={handleNextQuestion} disabled={!clicked}>Next</button>
    </div>
    </div>
    )}
  </div>
}

export default App;
