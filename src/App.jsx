import { useState } from "react";
import Header from "./Header";
import "./style.css";
import "./game.css";
import KanaSelect from "./kanaSelect.jsx";
import KanaGame from "./kanaGame.jsx"
import KanjiGame from "./kanjiGame.jsx";
import VocabGame from "./vocabGame.jsx";
import ConjugationSelect from "./conjugationSelect.jsx";
import ConjugationGame from "./conjugationGame.jsx";
import ConjugationWheel from "./conjugationWheel.jsx";
/* import GrammarSelect from "./grammarSelect.jsx";
 */
export default function App() {
  const [view, setView] = useState("home");
  const [steps, setSteps] = useState([]);
  const [title, setTitle] = useState("Choose sublevel");
  const [gameMode, setGameMode] = useState(null);
  const [kanaPool, setKanaPool] = useState([]);
  const [conjugationPool, setConjugationPool] = useState([]);

  // New state for Kanji Game configuration
  const [questionType, setQuestionType] = useState("kanji");
  const [answerType, setAnswerType] = useState("reading");
  
  const BASE_PATH = import.meta.env.BASE_URL;
  

  const loadKanji = async (jlpt) => {
    try {
      const res = await fetch(`${BASE_PATH}Data/kanji_data_N${jlpt}.json`);
      const data = await res.json();
      const levels = Object.keys(data.levels);
      setSteps(levels);
    } catch (err) {
      console.error(err);
    }
  };

  const loadVocab = async (jlpt) => {
    try {
      const res = await fetch(`${BASE_PATH}Data/Vocab_data_N${jlpt}.json`);
      const data = await res.json();
      const levels = Object.keys(data.units);
      setSteps(levels);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStepClick = (step) => {
    // Pass the configuration to localStorage so KanjiGame can read it
    localStorage.setItem("questionType", questionType);
    localStorage.setItem("answerType", answerType);

    localStorage.setItem("step", step);
    setView("game");
  };

  const isValidConfig = questionType !== answerType;

  return (
    <>
      <Header />

      <div className="main-container">
        {/* HOME */}
        {view === "home" && (
          <div className="flex-center flex-column">
            <h1>Japanese Quiz</h1>

            <div className="btn" onClick={() => setView("kana")}>
              Hiragana & Katakana
            </div>

            <div className="btn" onClick={() => setView("kanji")}>
              Kanji
            </div>

            <div className="btn" onClick={() => setView("vocab")}>
              Vocabulary
            </div>

            {/* <div className="btn" onClick={() => setView("grammar")}>
              Grammar
            </div> */}

            <div className="btn" onClick={() => setView("conjugation")}>
              Conjugation
            </div>

            <div className="btn" onClick={() => setView("conjugationWheel")}>
              Conjugation Wheel
            </div>

            <a className="btn" href="#">
              High Scores
            </a>
          </div>
        )}

        {/* KANA */}
        {view === "kana" && (
          <KanaSelect
            setView={setView}
            setKanaPool={setKanaPool}
            setGameMode={setGameMode}
          />
        )}

        {/* KANJI LEVEL */}
        {view === "kanji" && (
          <div className="flex-center flex-column">
            <h1>Kanji Level</h1>

            {/* === Question & Answer Type Selection === */}
            <div className="config-section">
                <label><strong>Question shows:</strong></label>
                <div className="config-radio">
                <label>
                  <input
                    type="radio"
                    name="questionType"
                    value="kanji"
                    checked={questionType === "kanji"}
                    onChange={(e) => setQuestionType(e.target.value)}
                  />
                  Kanji
                </label>
                <label>
                  <input
                    type="radio"
                    name="questionType"
                    value="reading"
                    checked={questionType === "reading"}
                    onChange={(e) => setQuestionType(e.target.value)}
                  />
                  Reading
                </label>
                <label>
                  <input
                    type="radio"
                    name="questionType"
                    value="translation"
                    checked={questionType === "translation"}
                    onChange={(e) => setQuestionType(e.target.value)}
                  />
                  Translation
                </label>
                </div>

                <label><strong>Answer options are:</strong></label>
                <div className="config-radio">
                <label>
                  <input
                    type="radio"
                    name="answerType"
                    value="kanji"
                    checked={answerType === "kanji"}
                    onChange={(e) => setAnswerType(e.target.value)}
                  />
                  Kanji
                </label>
                <label>
                  <input
                    type="radio"
                    name="answerType"
                    value="reading"
                    checked={answerType === "reading"}
                    onChange={(e) => setAnswerType(e.target.value)}
                  />
                  Reading
                </label>
                <label>
                  <input
                    type="radio"
                    name="answerType"
                    value="translation"
                    checked={answerType === "translation"}
                    onChange={(e) => setAnswerType(e.target.value)}
                  />
                  Translation
                </label>
                </div>

              {!isValidConfig && (
                <p className="error-msg">Question and Answer types cannot be the same!</p>
              )}
            </div>
            {/* ============================================ */}

            {[5, 4, 3, 2, 1].map((lvl) => (
              <div
                key={lvl}
                className="btn"
                onClick={() => {
                  localStorage.setItem("JLPT", lvl);
                  setTitle(`Choose N${lvl} sublevel`);
                  loadKanji(lvl);
                  setGameMode("kanji");
                  setView("steps");
                }}
              >
                N{lvl}
              </div>
            ))}

            <button className="btn" onClick={() => setView("home")}>
              Back
            </button>
          </div>
        )}

        {/* VOCAB LEVEL */}
        {view === "vocab" && (
          <div className="flex-center flex-column vocab-level">
            <h1>Vocabulary Level</h1>

            {[5, 4, 3, 2, 1].map((lvl) => (
              <div
                key={lvl}
                className="btn"
                onClick={() => {
                  localStorage.setItem("JLPT", lvl);
                  setTitle(`Choose N${lvl} sublevel`);
                  loadVocab(lvl);
                  setGameMode("vocab");
                  setView("steps");
                }}
              >
                N{lvl}
              </div>
            ))}

            <button className="btn" onClick={() => setView("home")}>
              Back
            </button>
          </div>
        )}

        {/* CONJUGATION */}
        {view === "conjugation" && (
          <ConjugationSelect
            setView={setView}
            setConjugationPool={setConjugationPool}
            setGameMode={setGameMode}
          />
        )}

        {/* STEPS */}
        {view === "steps" && (
          <div className="flex-center flex-column">
            <h1>{title}</h1>

            <div className="sub-container">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`btn ${!isValidConfig ? "disabled" : ""}`}
                  onClick={() => isValidConfig && handleStepClick(i + 1)}
                  style={{ pointerEvents: isValidConfig ? "auto" : "none", opacity: isValidConfig ? 1 : 0.6 }}
                >
                  Step {i + 1}
                  <div className="completion-bar">
                    <div className="completion-bar-fill"></div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn" onClick={() => {
              if (gameMode === "kanji") {
                setView("kanji");
              } else if (gameMode === "vocab") {
                setView("vocab");
              }}}>
              Back
            </button>
          </div>
        )}

        {/* GAME */}
        {view === "kanaGame" && (
          <KanaGame
            mode={gameMode}
            kanaPool={kanaPool}
            BASE_PATH={BASE_PATH}
            onExit={() => setView("kana")}
          />
        )}
        {view === "game" && gameMode === "kanji" && (
          <KanjiGame 
            key="kanji" 
            setView={setView} 
            BASE_PATH={BASE_PATH} 
          />)}

        {view === "game" && gameMode === "vocab" && (
          <VocabGame 
            key="vocab" 
            setView={setView} 
            BASE_PATH={BASE_PATH} 
          />)}

          {/* {view === "grammar" && (
            <GrammarSelect
              BASE_PATH={BASE_PATH}
              onExit={() => setView("home")}
            />
          )} */}

          {view === "conjugationGame" && (
          <ConjugationGame
            conjugationPool={conjugationPool}
            mode={gameMode}
            onExit={() => setView("conjugation")}
            BASE_PATH={BASE_PATH}
          />
        )}

        {view === "conjugationWheel" && (
          <ConjugationWheel
            conjugationPool={conjugationPool}
            mode={gameMode}
            BASE_PATH={BASE_PATH}
            onExit={() => setView("home")}
          />
        )}
        
          
      </div>
      <div id="overlay"></div>
    </>
  );
}