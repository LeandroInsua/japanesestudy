import { useState } from "react";

export default function GrammarSelect({ BASE_PATH, onExit }) {
  const levels = ["N5", "N4", "N3", "N2", "N1"];

  const grammarData = {
    N5: {
      beginner: {
        title: "Beginner N5",
        points: [
          "Topic は",
          "possessive の",
          "inclussion も",
          "interrogative か",
          "time に",
          "から　まで",
          '"and" と',
          "towards へ",
          "exclusive も",
          "Accompaniment と",
          "Means/tools で",
          "DO を",
          "Place で",
          "ませんか、ましょう",
          "giving/receiving",
          "もう、まだ",
          "Adjective conjugation",
          
        ],
      },

      intermediate: {
        title: "Intermediate N5",
        points: [
          "とても/あまり",
          "Conjunctionが",
          "どう/どんな",
            "adverbs",
          "subjectが",
          "Cause/Reason から",
          "Positionに",
          '"and"(etc) や',
          "frequency に",
          "comparatives",
          "within (range)",
          "noun/の replacement",
          "want ほしい/たい",
          "purpose に",
          '"some" か',
          "て form",
        ],
      },

      advanced: {
        title: "Advanced N5",
        points: [
          "intransitives Verbs に/を",
          "conjunctions with て",
          "ないで",
          "までに",
          "dictionary form",
          "まえに",
          "た form",
          "Adj/noun なります",
          "と思います/と言います",
          "でしょう",
          "subordinate modifying noun",
          "とき",
          "conditional と",
          "give/receive actions",
          "conditional たら",
          "ても",
        ],
      },
    },

    N4: {},
    N3: {},
    N2: {},
    N1: {},
  };

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedGrammar, setSelectedGrammar] = useState([]);

  const toggleGrammar = (point) => {
    setSelectedGrammar((prev) =>
      prev.includes(point)
        ? prev.filter((item) => item !== point)
        : [...prev, point]
    );
  };

  const toggleGroup = (groupPoints) => {
    const allSelected = groupPoints.every((point) =>
      selectedGrammar.includes(point)
    );

    if (allSelected) {
      setSelectedGrammar((prev) =>
        prev.filter((item) => !groupPoints.includes(item))
      );
    } else {
      setSelectedGrammar((prev) => [
        ...new Set([...prev, ...groupPoints]),
      ]);
    }
  };

  return (
  <div className="flex-center flex-column">
    <h1>Grammar Game</h1>

    {/* LEVEL SELECTION SCREEN */}
    {!selectedLevel && (
      <>
        {levels.map((level) => (
          <button
            key={level}
            className="btn"
            onClick={() => setSelectedLevel(level)}
          >
            {level}
          </button>
        ))}
      </>
    )}

    {/* GRAMMAR SELECTION SCREEN */}
    {selectedLevel && (
      <>
        {/* GAME BUTTON SPACE */}
        <div className="grammar-game-buttons">
          {/* Future game mode buttons go here */}
        </div>

        {/* GRAMMAR GROUPS */}
        <div className="grammar-groups-container">
          {Object.values(grammarData[selectedLevel]).map((group) => {
            const allSelected = group.points.every((point) =>
              selectedGrammar.includes(point)
            );

            return (
              <div className="grammar-group" key={group.title}>
                <div className="grammar-group-header">
                  <h3>{group.title}</h3>
                  <div className="quick-actions">
                  <button
                    onClick={() => toggleGroup(group.points)}
                  >
                    {allSelected ? "None" : "All"}
                  </button>
                  </div>
                </div>

                <div className="grammar-list">
                  {group.points.map((point) => (
                    <label className="grammar-item" key={point}>
                      <input
                        type="checkbox"
                        checked={selectedGrammar.includes(point)}
                        onChange={() => toggleGrammar(point)}
                      />

                      <span>{point}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </>
    )}

    {/* BACK BUTTON */}
    <button className="back-btn" onClick={onExit}>
      Back
    </button>
  </div>
);
}