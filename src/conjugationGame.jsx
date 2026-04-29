import { useEffect, useRef, useState } from "react";

export default function ConjugationGame({
  conjugationPool,
  mode,
  onExit,
  BASE_PATH,
}) {
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
    const allForms = Object.entries(verb)
        .filter(([key, value]) => {
        return (
            key !== "verb" &&
            key !== currentType &&
            typeof value === "string" &&
            value.trim() !== ""
        );
        })
        .map(([_, value]) => value);

    const wrong = allForms
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

    setAnswered(true);
    setCorrectAnswer(correct);
    setSelectedAnswer(answer);

    const isCorrect = answer.trim() === correct.trim();

    if (isCorrect) {
        setScore((s) => s + 1);

        if (mode === "typing") {
        setFeedback("Correct!");
        }
    } else {
        if (mode === "typing") {
        setFeedback(`Wrong! Correct answer: ${correct}`);
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
      <h1>Conjugation Game</h1>

      <div className="hud">
        <span>Score: {score}</span>
      </div>

      <div className="question-card">
        <h2>{current.verb}</h2>

        <p>
          Convert to: <strong>{currentType.replaceAll("_", " ")}</strong>
        </p>
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
        <div className="typing-container">
        <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="typing-input"
        />
        {mode === "typing" && feedback && (
        <p className="typing-feedback">
            {feedback}
        </p>
        )}

          <button className="btn" onClick={() => submit(input)}>
            Submit
          </button>
        </div>
      )}

      {answered && (
        <>
          <p>{feedback}</p>

          <button className="btn" onClick={nextQuestion}>
            Next
          </button>
        </>
      )}

      <button className="btn" onClick={onExit}>
        Back
      </button>
    </div>
  );
}