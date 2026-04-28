import { useState } from "react";
import Header from "./Header";
import "./style.css";
import "./game.css";
import KanaGame from "./kanaGame.jsx"
import KanjiGame from "./kanjiGame.jsx";
import VocabGame from "./vocabGame.jsx";

export default function App() {
  const [view, setView] = useState("home");
  const [steps, setSteps] = useState([]);
  const [title, setTitle] = useState("Choose sublevel");
  const [gameMode, setGameMode] = useState(null);

  // New state for Kanji Game configuration
  const [questionType, setQuestionType] = useState("kanji");
  const [answerType, setAnswerType] = useState("reading");
  
  const BASE_PATH = import.meta.env.BASE_URL;
  

  // Kana Groups Data
const kanaGroups = {
  hiragana: [
    { id: "vowels", label: "あいうえお", romaji: "a i u e o" },
    { id: "k", label: "かきくけこ", romaji: "ka ki ku ke ko" },
    { id: "s", label: "さしすせそ", romaji: "sa shi su se so" },
    { id: "t", label: "たちつてと", romaji: "ta chi tsu te to" },
    { id: "n", label: "なにぬねの", romaji: "na ni nu ne no" },
    { id: "h", label: "はひふへほ", romaji: "ha hi fu he ho" },
    { id: "m", label: "まみむめも", romaji: "ma mi mu me mo" },
    { id: "y", label: "やゆよ", romaji: "ya yu yo" },
    { id: "r", label: "らりるれろ", romaji: "ra ri ru re ro" },
    { id: "w", label: "わをん", romaji: "wa wo n" },
  ],

  hiraganaAlt: [
    { id: "g", label:"がぎぐげご", romaji: "ga gi gu ge go" },
    { id: "z", label: "ざじずぜぞ", romaji: "za ji zu ze zo" },
    { id: "d", label: "だぢづでど", romaji: "da ji zu de do" },
    { id: "b", label: "ばびぶべぼ", romaji: "ba bi bu be bo" },
    { id: "p", label: "ぱぴぷぺぽ", romaji: "pa pi pu pe po" },
    { id: "ky", label: "きゃ きゅ きょ", romaji: "kya kyu kyo" },
    { id: "gy", label: "ぎゃ ぎゅ ぎょ", romaji: "gya gyu gyo" },
    { id: "sy", label: "しゃ しゅ しょ", romaji: "sha shu sho" },
    { id: "zy", label: "じゃ じゅ じょ", romaji: "ja ju jo" },
    { id: "ty", label: "ちゃ ちゅ ちょ", romaji: "cha chu cho" },
    { id: "ny", label: "にゃ にゅ にょ", romaji: "nya nyu nyo" },
    { id: "hy", label: "ひゃ ひゅ ひょ", romaji: "hya hyu hyo" },
    { id: "by", label: "びゃ びゅ びょ", romaji: "bya byu byo" },
    { id: "py", label: "ぴゃ ぴゅ ぴょ", romaji: "pya pyu pyo" },
    { id: "my", label: "みゃ みゅ みょ", romaji: "mya myu myo" },
    { id: "ry", label: "りゃ りゅ りょ", romaji: "rya ryu ryo" },
  ],

  katakana: [
    { id: "vowels", label: "ア イ ウ エ オ", romaji: "a i u e o" },
    { id: "k",      label: "カ キ ク ケ コ", romaji: "ka ki ku ke ko" },
    { id: "s",      label: "サ シ ス セ ソ", romaji: "sa shi su se so" },
    { id: "t",      label: "タ チ ツ テ ト", romaji: "ta chi tsu te to" },
    { id: "n",      label: "ナ ニ ヌ ネ ノ", romaji: "na ni nu ne no" },
    { id: "h",      label: "ハ ヒ フ ヘ ホ", romaji: "ha hi fu he ho" },
    { id: "m",      label: "マ ミ ム メ モ", romaji: "ma mi mu me mo" },
    { id: "y",      label: "ヤ ユ ヨ",     romaji: "ya yu yo" },
    { id: "r",      label: "ラ リ ル レ ロ", romaji: "ra ri ru re ro" },
    { id: "w",      label: "ワ ヲ ン",     romaji: "wa wo n" },
    
  ],
  katakanaAlt: [
  { id: "g",  label: "ガ ギ グ ゲ ゴ", romaji: "ga gi gu ge go" },
  { id: "z",  label: "ザ ジ ズ ゼ ゾ", romaji: "za ji zu ze zo" },
  { id: "d",  label: "ダ ヂ ヅ デ ド", romaji: "da ji zu de do" },
  { id: "b",  label: "バ ビ ブ ベ ボ", romaji: "ba bi bu be bo" },
  { id: "p",  label: "パ ピ プ ペ ポ", romaji: "pa pi pu pe po" },
  { id: "ky", label: "キャ キュ キョ", romaji: "kya kyu kyo" },
  { id: "gy", label: "ギャ ギュ ギョ", romaji: "gya gyu gyo" },
  { id: "sy", label: "シャ シュ ショ", romaji: "sha shu sho" },
  { id: "zy", label: "ジャ ジュ ジョ", romaji: "ja ju jo" },
  { id: "ty", label: "チャ チュ チョ", romaji: "cha chu cho" },
  { id: "ny", label: "ニャ ニュ ニョ", romaji: "nya nyu nyo" },
  { id: "hy", label: "ヒャ ヒュ ヒョ", romaji: "hya hyu hyo" },
  { id: "by", label: "ビャ ビュ ビョ", romaji: "bya byu byo" },
  { id: "py", label: "ピャ ピュ ピョ", romaji: "pya pyu pyo" },
  { id: "my", label: "ミャ ミュ ミョ", romaji: "mya myu myo" },
  { id: "ry", label: "リャ リュ リョ", romaji: "rya ryu ryo" },
  ]
  };



  const [selectedHiragana, setSelectedHiragana] = useState([]);
  const [selectedKatakana, setSelectedKatakana] = useState([]);

  const toggleGroup = (type, groupId) => {
    if (type === "hiragana") {
      setSelectedHiragana(prev =>
        prev.includes(groupId)
          ? prev.filter(g => g !== groupId)
          : [...prev, groupId]
      );
    } else {
      setSelectedKatakana(prev =>
        prev.includes(groupId)
          ? prev.filter(g => g !== groupId)
          : [...prev, groupId]
      );
    }
  };

  const selectAll = (type) => {
    if (type === "hiragana") {
      const allIds = [
        ...kanaGroups.hiragana.map(g => g.id),
        ...kanaGroups.hiraganaAlt.map(g => g.id),
      ];
      setSelectedHiragana(allIds);
    } else {
      const allIds = [
        ...kanaGroups.katakana.map(g => g.id),
        ...kanaGroups.katakanaAlt.map(g => g.id),
      ];
      setSelectedKatakana(allIds);
    }
  };

  const clearAll = (type) => {
    if (type === "hiragana") {
      setSelectedHiragana([]);
    } else {
      setSelectedKatakana([]);
    }
  };

  const [kanaPool, setKanaPool] = useState([]);
  const buildKanaPool = () => {
    const allGroups = [
      ...kanaGroups.hiragana,
      ...kanaGroups.hiraganaAlt,
      ...kanaGroups.katakana,
      ...kanaGroups.katakanaAlt
    ];

    return allGroups
      .filter(group =>
        selectedHiragana.includes(group.id) ||
        selectedKatakana.includes(group.id)
      )
      .flatMap(group => {
        const kanaArray = group.label.includes(" ")
          ? group.label.split(" ")        // for きゃ きゅ きょ
          : group.label.split("");       // for あいうえお

        const romajiArray = group.romaji.split(" ");

        return kanaArray.map((kana, i) => ({
          kana,
          romaji: romajiArray[i]
        }));
      });
  };

  const startKanaGame = (mode) => {
    const pool = buildKanaPool();
    if (pool.length === 0) return;

    setKanaPool(pool);
    setGameMode(mode);
    setView("kanaGame");
  };
  
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

            <a className="btn" href="#">
              High Scores
            </a>
          </div>
        )}

        {/* KANA */}
        {view === "kana" && (
          <div className="kana-screen">
            <div className="kana-wrapper">
            <h1>Choose the Kana to practice</h1>

            <div className="kana-columns">

              {/* HIRAGANA */}
              <div className="kana-panel">
                <h3>Hiragana ・ ひらがな</h3>

                {kanaGroups.hiragana.map((group) => (
                  <div
                    key={group.id}
                    className="kana-row"
                    onClick={() => toggleGroup("hiragana", group.id)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedHiragana.includes(group.id)}
                      readOnly
                    />
                    <span className="kana-text">{group.romaji}</span>
                  </div>
                ))}

                {/* DROPDOWN */}
                <details className="kana-dropdown">
                  <summary>Alternative characters (ga · ba · kya..)</summary>

                  {kanaGroups.hiraganaAlt.map((group) => (
                    <div
                      key={group.id}
                      className="kana-row nested"
                      onClick={() => toggleGroup("hiragana", group.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedHiragana.includes(group.id)}
                        readOnly
                      />
                      <span className="kana-text">{group.romaji}</span>
                    </div>
                  ))}
                </details>

                <div className="quick-actions">
                  <button onClick={() => selectAll("hiragana")}>All</button>
                  <button onClick={() => clearAll("hiragana")}>None</button>
                </div>
              </div>

              {/* KATAKANA */}
              <div className="kana-panel">
                <h3>Katakana ・ カタカナ</h3>

                {kanaGroups.katakana.map((group) => (
                  <div
                    key={group.id} 
                    className="kana-row"
                    onClick={() => toggleGroup("katakana", group.id)}
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedKatakana.includes(group.id)}
                      />
                    </label>
                    <span className="kana-text">{group.romaji}</span>
                  </div>
                ))}

                <details className="kana-dropdown">
                  <summary>Alternative characters (ga · ba · kya..)</summary>

                  {kanaGroups.katakanaAlt.map((group) => (
                    <div
                      key={group.id}
                      className="kana-row nested"
                      onClick={() => toggleGroup("katakana", group.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedKatakana.includes(group.id)}
                        readOnly
                      />
                      <span className="kana-text">{group.romaji}</span>
                    </div>
                  ))}
                </details>

                <div className="quick-actions">
                  <button onClick={() => selectAll("katakana")}>All</button>
                  <button onClick={() => clearAll("katakana")}>None</button>
                </div>
              </div>

            </div>

            <div className="button-group">
              <button
                className="btn start-btn"
                onClick={() => startKanaGame("multiple")}
                disabled={selectedHiragana.length === 0 && selectedKatakana.length === 0}
              >
                Multiple Choice
              </button>

              <button
                className="btn start-btn"
                onClick={() => startKanaGame("typing")}
                disabled={selectedHiragana.length === 0 && selectedKatakana.length === 0}
              >
                Typing
              </button>

              <button className="btn" onClick={() => setView("home")}>
                Back
              </button>
            </div>
          </div>
          </div>
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
              if(gameMode === "kanji"){
                setView("kanji")}
              else if (gameMode === "vocab"){
                setView("vocab")
              } else if (gameMode === "kana"){
                setView("kana")
              }}}>
              Back
            </button>
          </div>
        )}

        {/* GAME */}
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
      </div>
      
      {view === "kanaGame" && (
        <KanaGame
          mode={gameMode}
          kanaPool={kanaPool}
          onExit={() => setView("kana")}
        />
      )}

      <div id="overlay"></div>
    </>
  );
}