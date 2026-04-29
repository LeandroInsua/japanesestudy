import { useEffect, useRef, useState } from "react";

export default function ConjugationGame({conjugationPool, mode, onExit,BASE_PATH,}) {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(null);
    const [currentType, setCurrentType] = useState("");
    const [choices, setChoices] = useState([]);
    const [input, setInput] = useState("");
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [answered, setAnswered] = useState(false);
    const inputRef = useRef(null);
    const correctSound = useRef(null);

    /* EFFECTS */
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (data.length > 0) nextQuestion();
  }, [data]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
      if (answered) {
          nextQuestion();
          return;
      }

      if (mode === "typing") {
          submit(input);
          return;
      }
      }

      if (mode !== "multiple") return;
      if (answered) return;

      const index = Number(e.key) - 1;

      if (index >= 0 && index < choices.length) {
      submit(choices[index]);
      }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
      window.removeEventListener("keydown", handleKeyDown);
  };
  }, [choices, mode, answered, input, current]);

  useEffect(() => {
      if (mode === "typing" && inputRef.current) {
          inputRef.current.focus();
      }
  }, [current, mode]);

  useEffect(() => {
    correctSound.current = new Audio(
      `${BASE_PATH}Audio/correct.wav`
    );
  }, [BASE_PATH]);

  const loadData = async () => {
    try {
      const res = await fetch(`${BASE_PATH}Data/Conjugation.json`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const isAnswerCorrect = (answer, type) => {
    const normalizedInput = answer.trim();

    const kanjiAnswer = current[type]?.trim();
    const kanaAnswer = current[`${type}_kana`]?.trim();

    return (
      normalizedInput === kanjiAnswer ||
      normalizedInput === kanaAnswer
    );
  };

  const nextQuestion = () => {
    const verb = randomItem(data);
    const type = randomItem(conjugationPool);
    setAnswered(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setFeedback("");
    setCurrent(verb);
    setCurrentType(type);

    const correct = verb[type];

    if (mode === "multiple") {
    
    const excludedKeys = [
      "verb",
      "verb_kana",
      "verb_furigana",
    ];

    const allForms = Object.entries(verb)
      .filter(([key, value]) => {
        return (
          !excludedKeys.includes(key) &&
          !key.endsWith("_kana") &&
          key !== currentType &&
          typeof value === "string" &&
          value.trim() !== ""
        );
      })
      .map(([_, value]) => value);

    const uniqueForms = [...new Set(allForms)]
      .filter((value) => value !== correct);

    const wrong = uniqueForms
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setChoices(
      [correct, ...wrong].sort(() => Math.random() - 0.5)

    );
    }

    setInput("");
    setFeedback("");
  };

  const submit = (answer) => {
    if (answered) return;

    const correct = current[currentType];
  const correctKana = current[`${currentType}_kana`];

  setAnswered(true);
  setCorrectAnswer(correct);
  setSelectedAnswer(answer);

  const isCorrect = isAnswerCorrect(answer, currentType);

    if (isCorrect) {
      setScore((s) => s + 1);

      if (correctSound.current) {
        correctSound.current.pause();
        correctSound.current.currentTime = 0;
        correctSound.current.play().catch(() => {});
      }

      if (mode === "typing") {
        setFeedback("Correct!");
      }
    } else {
        if (mode === "typing") {
        setFeedback(
          `Wrong! Correct answer: ${correct} (${correctKana})`
        );
        }
    }
    };

  const handleTyping = (e) => {
    if (e.key === "Enter") {
      submit(input);
    }
  };

  if (!current) return <div>Loading...</div>;

  return (
    <div className="flex-center flex-column">
      <div className="conjugation-hud">
        <span>Score: {score}</span>
        <h1>Conjugation Game</h1>
      </div>

      

      <div className="question-card">
        <h2 dangerouslySetInnerHTML={{__html: current.verb_furigana || current.verb,}}/>

        <h3>
          Convert to: <strong>{currentType.replaceAll("_", " ")}</strong>
        </h3>
      </div>

      {mode === "multiple" ? (
        <div className="answers">
        {choices.map((choice, i) => {
            let className = "choice-container";

            if (answered) {
            if (choice === correctAnswer) {
                className += " correct";
            } else if (choice === selectedAnswer) {
                className += " incorrect";
            }
            }

            return (
            <div
                key={i}
                className={className}
                onClick={() => submit(choice)}
            >
                <p className="choice-prefix">
                {i + 1}
                </p>

                <p className="choice-text">
                {choice}
                </p>
            </div>
            );
        })}
        </div>
      ) : (
        <>
        <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="typing-input"
        />
        {mode === "typing" && feedback && (
        <h3 className="typing-feedback">
            {feedback}
        </h3>
        )}

          <button className="btn" onClick={() => submit(input)}>
            Submit
          </button>
        </>
      )}

      {answered && (
        <>

          <button className="btn" onClick={nextQuestion}>
            Next
          </button>
        </>
      )}

      <button className="back-btn" onClick={onExit}>
        Back
      </button>
    </div>
  );
}