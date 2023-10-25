
import React,{ useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import QuestionsList from "./comp/QuestionsList";
import { Link } from 'react-router-dom';

function App() {
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [score, setscore] = useState(0);
  const [clicked, setclicked] = useState(false);
  const [showscore, setshowscore] = useState(false);

  const handleCorrectAnswer = (isCorrect) => {
    if (isCorrect) {
      setscore(score + 1);
    }
    setclicked(true);
  };
  const handleNextQuestion = () => {
    setclicked(false);
    if (currentQuestion < QuestionsList.length - 1) {
      setcurrentQuestion(currentQuestion + 1);
    } else {
      setshowscore(true);
    }
  };

  return (
    <div className="app-wrapper">
      {showscore ? (
        <div>
          <div className="completed">Completed!</div>
          <div className="score-section">
            Your Score: {score}/{QuestionsList.length}
          </div>
          <form ><button   className="next-button">Done</button></form>
          
        </div>
      ) : (
        
        <div>
            <h1 style={{color:"white",textAlign:"center",fontSize:"60px"}}>Quiz</h1>
          <div className="question-section-wrapper">
            <div className="question-count">
              <span style={{marginRight:"5px"}}>Question </span> {currentQuestion + 1} of {QuestionsList.length}
            </div>
            <div className="question">
              {QuestionsList[currentQuestion].question}
            </div>
          </div>
    
            {QuestionsList[currentQuestion].answersList.map((answerOption) => (
              <li className="answer-list" key={uuidv4()}>
                <button
                  disabled={clicked}
                  className={`answer-button${
                    clicked && answerOption.isCorrect ? " correct" : ""
                  }`}
                  onClick={() => handleCorrectAnswer(answerOption.isCorrect) }
                >
                  {answerOption.answer}
                </button>
              </li>
            ))}
  

          <div>
            <button
              className="next-button"
              onClick={handleNextQuestion}
              disabled={!clicked}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
