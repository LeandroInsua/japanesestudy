import { useEffect, useRef, useState } from "react";

const conjugationLabels = {
  te: "-te Form",

  dictionary: "Dictionary",
  negative: "Negative",
  past: "Past",
  past_negative: "Past Negative",

  potential: "Potential",
  potential_negative: "Potential Negative",
  potential_past: "Potential Past",
  potential_past_negative:
    "Potential Past Negative",

  volitional: "Volitional",
  volitional_negative:
    "Volitional Negative",

  imperative: "Imperative",
  prohibitive: "Prohibitive",

  passive: "Passive",
  passive_negative: "Passive Negative",
  passive_past: "Passive Past",
  passive_past_negative:
    "Passive Past Negative",

  ba: "Conditional (-ba)",
  ba_negative:
    "Negative Conditional",

  causative: "Causative",
  causative_negative:
    "Causative Negative",
  causative_past: "Causative Past",
  causative_past_negative:
    "Causative Past Negative",

  passive_causative:
    "Passive Causative",
  passive_causative_negative:
    "Passive Causative Negative",
  passive_causative_past:
    "Passive Causative Past",
  passive_causative_past_negative:
    "Passive Causative Past Negative",
};

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
  const correctSound = useRef(null);
  const [formality, setFormality] = useState("plain");

  /* EFFECTS */
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      nextQuestion();
    }
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

      const index =
        Number(e.key) - 1;

      if (
        index >= 0 &&
        index < choices.length
      ) {
        submit(choices[index]);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    choices,
    mode,
    answered,
    input,
    current,
  ]);

  useEffect(() => {
    if (
      mode === "typing" &&
      inputRef.current
    ) {
      inputRef.current.focus();
    }
  }, [current, mode]);

  useEffect(() => {
    correctSound.current =
      new Audio(
        `${BASE_PATH}Audio/correct.wav`
      );
  }, [BASE_PATH]);

  useEffect(() => {
    if (
      mode !== "multiple" ||
      !current ||
      !currentType
    ) {
      return;
    }

    const correctData =
      current.forms[currentType]?.[formality] ||
      current.forms[currentType]?.plain;

    const correct =
      correctData?.full || "";

    const allForms = [];

    Object.entries(current.forms).forEach(
      ([formKey, formValue]) => {
        const formData =
          formValue[formality] ||
          formValue.plain;

        if (!formData?.full) return;

        if (
          formKey === currentType &&
          formData.full === correct
        ) {
          return;
        }

        allForms.push(formData.full);
      }
    );

    const uniqueForms = [
      ...new Set(allForms),
    ].filter(
      (value) => value !== correct
    );

    const wrong = uniqueForms
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setChoices(
      [correct, ...wrong].sort(
        () => Math.random() - 0.5
      )
    );
  }, [
    formality,
    current,
    currentType,
    mode,
  ]);

  const loadData = async () => {
    try {
      const res = await fetch(
        `${BASE_PATH}Data/Conjugation.json`
      );

      const json = await res.json();

      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  const randomItem = (arr) =>
    arr[
      Math.floor(
        Math.random() * arr.length
      )
    ];

  const getDisplayForm = (
    verb,
    type
  ) => {
    const form =
      verb.forms?.[type];

    if (!form) return null;

    return (
      form[formality] ||
      form.plain
    );
  };

  const isAnswerCorrect = (
    answer,
    type
  ) => {
    const normalizedInput =
      answer.trim();

    const form =
      current.forms?.[type];

    if (!form) return false;

    let acceptedForm = null;

    if (formality === "polite") {
      acceptedForm =
        form.polite ||
        form.plain;
    } else {
      acceptedForm =
        form.plain;
    }

    if (!acceptedForm)
      return false;

    const acceptedAnswers = [
      acceptedForm.full,
      acceptedForm.kana,
    ].filter(Boolean);

    return acceptedAnswers.includes(
      normalizedInput
    );
  };

  const nextQuestion = () => {
    const verb =
      randomItem(data);

    const type =
      randomItem(
        conjugationPool
      );

    setAnswered(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setFeedback("");

    setCurrent(verb);
    setCurrentType(type);

    const basicForms = [
      "dictionary",
      "negative",
      "past",
      "past_negative",
    ];

    let correctForm = null;

    if (
      basicForms.includes(type)
    ) {
      correctForm =
        verb.forms?.[type]
          ?.plain;
    } else {
      correctForm =
        verb.forms?.[type]?.[
          formality
        ] ||
        verb.forms?.[type]
          ?.plain;
    }

    const correct =
      correctForm?.full;

    const correctKana =
      correctForm?.kana;

    if (mode === "multiple") {
      const correctData =
        verb.forms[type]?.[formality] ||
        verb.forms[type]?.plain;

      const correct =
        correctData?.full || "";

      const allForms = [];

      Object.entries(verb.forms).forEach(
        ([formKey, formValue]) => {
          const formData =
            formValue[formality] ||
            formValue.plain;

          if (!formData?.full) return;

          // exclude current answer
          if (
            formKey === type &&
            formData.full === correct
          ) {
            return;
          }

          allForms.push(formData.full);
        }
      );

      // remove duplicates
      const uniqueForms = [
        ...new Set(allForms),
      ].filter(
        (value) => value !== correct
      );

      const wrong = uniqueForms
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      setChoices(
        [correct, ...wrong].sort(
          () => Math.random() - 0.5
        )
      );
    }

    setInput("");
    setFeedback("");
  };

  const submit = (
    answer
  ) => {
    if (answered) return;

    const form =
      getDisplayForm(
        current,
        currentType
      );

    const correct =
      form?.full;

    const correctKana =
      form?.kana;

    setAnswered(true);

    setCorrectAnswer(
      correct
    );

    setSelectedAnswer(
      answer
    );

    const isCorrect =
      isAnswerCorrect(
        answer,
        currentType
      );

    if (isCorrect) {
      setScore(
        (s) => s + 1
      );

      if (
        correctSound.current
      ) {
        correctSound.current.pause();

        correctSound.current.currentTime =
          0;

        correctSound.current
          .play()
          .catch(() => {});
      }

      if (
        mode ===
        "typing"
      ) {
        setFeedback(
          "Correct!"
        );
      }
    } else {
      if (
        mode ===
        "typing"
      ) {
        setFeedback(
          `Wrong! Correct answer: ${correct} (${correctKana})`
        );
      }
    }
  };

  if (!current)
    return (
      <div>Loading...</div>
    );

  return (
    <div className="flex-center flex-column">
      <div className="conjugation-hud">
        <span>
          Score: {score}
        </span>

        <h1>
          Conjugation Game
        </h1>
      </div>

      <div className="formality-toggle">
        <label className="formality-option">
          <input
            type="radio"
            name="formality"
            checked={formality === "plain"}
            onChange={() =>
              setFormality("plain")
            }
          />

          Plain
        </label>

        <label className="formality-option">
          <input
            type="radio"
            name="formality"
            checked={formality === "polite"}
            onChange={() =>
              setFormality("polite")
            }
          />

          Polite
        </label>
      </div>

      <div className="question-card">
        <h2
          dangerouslySetInnerHTML={{
            __html:
              current.verb_furigana ||
              current.verb,
          }}
        />

        <h3>
          Convert to:{" "}
          <strong>
            {
              conjugationLabels[
                currentType
              ]
            }
          </strong>
        </h3>
      </div>

      {mode ===
      "multiple" ? (
        <div className="answers">
          {choices.map(
            (
              choice,
              i
            ) => {
              let className =
                "choice-container";

              if (
                answered
              ) {
                if (
                  choice ===
                  correctAnswer
                ) {
                  className +=
                    " correct";
                } else if (
                  choice ===
                  selectedAnswer
                ) {
                  className +=
                    " incorrect";
                }
              }

              return (
                <div
                  key={i}
                  className={
                    className
                  }
                  onClick={() =>
                    submit(
                      choice
                    )
                  }
                >
                  <p className="choice-prefix">
                    {i + 1}
                  </p>

                  <p className="choice-text">
                    {choice}
                  </p>
                </div>
              );
            }
          )}
        </div>
      ) : (
        <>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
            className="typing-input"
          />

          {mode ===
            "typing" &&
            feedback && (
              <h3 className="typing-feedback">
                {feedback}
              </h3>
            )}

          <button
            className="btn"
            onClick={() =>
              submit(input)
            }
          >
            Submit
          </button>
        </>
      )}

      {answered && (
        <button
          className="btn"
          onClick={
            nextQuestion
          }
        >
          Next
        </button>
      )}

      <button className="back-btn" onClick={onExit}>
        Back
      </button>
    </div>
  );
}