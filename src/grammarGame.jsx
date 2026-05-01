import { useEffect, useState } from "react";
import n5Grammar from "./data/grammar/n5Grammar.json";

export default function GrammarGame({
  selectedGrammar,
  selectedLevel,
  setView,
}) {
  const [questionPool, setQuestionPool] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [choices, setChoices] = useState([]);

  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    loadQuestionPool();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showExplanation) {
        if (e.key === "Enter") {
          nextQuestion();
        }

        return;
      }

      const keyMap = {
        1: 0,
        2: 1,
        3: 2,
        4: 3,
      };

      if (keyMap[e.key] !== undefined) {
        const index = keyMap[e.key];

        if (choices[index]) {
          handleAnswer(choices[index]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [choices, currentQuestion, showExplanation]);

  const loadQuestionPool = () => {
    let grammarData = [];

    if (selectedLevel === "N5") {
      grammarData = [
        ...n5Grammar.beginner,
        ...n5Grammar.intermediate,
        ...n5Grammar.advanced,
      ];
    }

    const filtered = grammarData.filter((item) =>
      selectedGrammar.includes(item.grammar)
    );

    setQuestionPool(filtered);

    generateQuestion(filtered);
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const generateQuestion = (pool = questionPool) => {
    if (pool.length === 0) return;

    const randomQuestion =
      pool[Math.floor(Math.random() * pool.length)];

    setCurrentQuestion(randomQuestion);
    setChoices(shuffleArray(randomQuestion.choices));

    setSelectedChoice(null);
    setShowExplanation(false);
  };

  const handleAnswer = (choice) => {
    if (showExplanation) return;

    setSelectedChoice(choice);
    setShowExplanation(true);

    setAnsweredQuestions((prev) => prev + 1);

    if (choice === currentQuestion.answer) {
      setScore((prev) => prev + 10);
      setCorrectQuestions((prev) => prev + 1);
    } else {
      const remainingLives = lives - 1;

      setLives(remainingLives);

      if (remainingLives <= 0) {
        setGameOver(true);
      }
    }
  };

  const nextQuestion = () => {
    if (gameOver) return;

    generateQuestion();
  };

  const accuracy =
    answeredQuestions > 0
      ? Math.round((correctQuestions / answeredQuestions) * 100)
      : 0;

  if (!currentQuestion) {
    return <div className="flex-center">Loading...</div>;
  }

  return (
    <div className="grammar-game flex-center flex-column">
      <h1>Grammar Game</h1>

      <div className="grammar-stats">
        <div>Score: {score}</div>
        <div>Lives: {lives}</div>
        <div>
          Progress: {answeredQuestions}
        </div>
        <div>Accuracy: {accuracy}%</div>
      </div>

      {!gameOver ? (
        <>
          <div className="grammar-question-card">
            <h2>{currentQuestion.grammar}</h2>

            <div className="grammar-question">
              {currentQuestion.question}
            </div>
          </div>

          <div className="grammar-choices">
            {choices.map((choice, index) => {
              const isCorrect =
                choice === currentQuestion.answer;

              const isWrong =
                selectedChoice === choice &&
                choice !== currentQuestion.answer;

              return (
                <button
                  key={choice + index}
                  className={`grammar-choice-btn
                    ${showExplanation && isCorrect ? "correct" : ""}
                    ${showExplanation && isWrong ? "wrong" : ""}
                  `}
                  onClick={() => handleAnswer(choice)}
                >
                  <span className="choice-prefix">
                    {index + 1}.
                  </span>

                  {choice}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="grammar-explanation-box">
              <h3>
                {selectedChoice === currentQuestion.answer
                  ? "Correct!"
                  : "Incorrect"}
              </h3>

              <p>
                Correct answer: {currentQuestion.answer}
              </p>

              <p>{currentQuestion.explanation}</p>

              <button className="btn" onClick={nextQuestion}>
                Next Question (Enter)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="game-over-screen">
          <h2>Game Over</h2>

          <p>Final Score: {score}</p>
          <p>Accuracy: {accuracy}%</p>
          <p>Questions Answered: {answeredQuestions}</p>

          <button
            className="btn"
            onClick={() => window.location.reload()}
          >
            Restart
          </button>
        </div>
      )}

      <button className="back-btn" onClick={() => setView("home")}>
        Back
      </button>
    </div>
  );
}