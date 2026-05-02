import { useState } from "react";

export default function GrammarSelect({
  BASE_PATH,
  onExit,
  setView,
  setGrammarConfig,
  initialLevel,
}) {
  const levels = ["N5", "N4", "N3", "N2", "N1"];

  const grammarData = {
    N5: {
      beginner: {
        title: "Beginner N5",
        points: [
          {
            key: "topic_wa",
            label: "Topic は"
          },
          {
            key: "possessive_no",
            label: "Possessive の"
          },
          {
            key: "inclusion_mo",
            label: "Inclusion も"
          },
          {
            key: "interrogative_ka",
            label: "Interrogative か"
          },
          {
            key: "time_ni",
            label: "Time に"
          },
          {
            key: "kara_made",
            label: "から まで"
          },
          {
            key: "and_to",
            label: "\"and\" と"
          },
          {
            key: "towards_e",
            label: "Towards へ"
          },
          {
            key: "exclusive_mo",
            label: "Exclusive も"
          },
          {
            key: "accompaniment_to",
            label: "Accompaniment と"
          },
          {
            key: "means_de",
            label: "Means/tools で"
          },
          {
            key: "direct_object_o",
            label: "DO を"
          },
          {
            key: "place_de",
            label: "Place で"
          },
          {
            key: "invitation_mashou",
            label: "ませんか、ましょう"
          },
          {
            key: "giving_receiving",
            label: "Giving/receiving"
          },
          {
            key: "mou_mada",
            label: "もう、まだ"
          },
          {
            key: "adjective_conjugation",
            label: "Adjective conjugation"
          }
        ]
      },
      intermediate: {
        title: "Intermediate N5",
        points: [
          {
            key: "totemo_amari",
            label: "とても/あまり"
          },
          {
            key: "conjunction_ga",
            label: "Conjunction が"
          },
          {
            key: "dou_donna",
            label: "どう/どんな"
          },
          {
            key: "adverbs",
            label: "Adverbs"
          },
          {
            key: "subject_ga_adj",
            label: "Subject が + adjective"
          },
          {
            key: "reason_kara",
            label: "Cause/Reason から"
          },
          {
            key: "position_ni",
            label: "Position に"
          },
          {
            key: "ya_particle",
            label: "\"and\" (etc) や"
          },
          {
            key: "frequency_ni_kai",
            label: "～に～回"
          },
          {
            key: "comparison_yori_houga",
            label: "より、のほうが"
          },
          {
            key: "range_no_naka_de",
            label: "(の中)で"
          },
          {
            key: "no_replacing_noun",
            label: "の replacing noun"
          },
          {
            key: "hoshii_tai",
            label: "ほしい/たい"
          },
          {
            key: "purpose_ni",
            label: "Purpose に"
          },
          {
            key: "some_ka",
            label: "\"Some\" か"
          },
          {
            key: "teimasu_moii_waikemasen",
            label: "ています/もいい/はいけません"
          }
        ]
      },
      advanced: {
        title: "Advanced N5",
        points: [
          {
            key: "intransitive_ni_wo",
            label: "Intransitive verbs に/を"
          },
          {
            key: "conjunctions_te",
            label: "Conjunctions with て"
          },
          {
            key: "naide_nakutemo_nakereba",
            label: "ないで、なくても、なければ"
          },
          {
            key: "dictionary_form",
            label: "Dictionary form"
          },
          {
            key: "made_ni",
            label: "までに"
          },
          {
            key: "mae_ni",
            label: "まえに"
          },
          {
            key: "takotoga_taritari",
            label: "たことが、たり～たり"
          },
          {
            key: "contrast_wa",
            label: "Contrast は"
          },
          {
            key: "adj_noun_narimasu",
            label: "Adj/noun なります"
          },
          {
            key: "to_omoimasu_toiimasu",
            label: "と思います/と言います"
          },
          {
            key: "deshou",
            label: "でしょう"
          },
          {
            key: "subordinate_modifying_noun",
            label: "Subordinate modifying noun"
          },
          {
            key: "toki",
            label: "とき"
          },
          {
            key: "conditional_to",
            label: "Conditional と"
          },
          {
            key: "give_receive_actions",
            label: "Give/receive actions"
          },
          {
            key: "conditional_tara",
            label: "Conditional たら"
          },
          {
            key: "even_if_temo",
            label: "Even if ても"
          }
        ]
      }
    },
    N4: {},
    N3: {},
    N2: {},
    N1: {},
  };

  const [selectedLevel, setSelectedLevel] = useState(initialLevel || null);
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
          <div className="grammar-game-buttons">
            <button
              className="btn"
              onClick={() => {
                setGrammarConfig({
                  level: selectedLevel,
                  grammar: selectedGrammar,
                });

                setView({
                  screen: "grammarFillBlanks",
                  level: selectedLevel,
                });
              }}
            >
              Fill in the Blank
            </button>
          </div>
        </div>

        {/* GRAMMAR GROUPS */}
        <div className="grammar-groups-container">
          {Object.values(grammarData[selectedLevel]).map((group) => {
            const allSelected = group.points.every((point) =>
              selectedGrammar.includes(point.key)
            );

            return (
              <div className="grammar-group" key={group.title}>
                <div className="grammar-group-header">
                  <h3>{group.title}</h3>
                  <div className="quick-actions">
                  <button
                    onClick={() => toggleGroup(group.points.map((p) => p.key))}
                  >
                    {allSelected ? "None" : "All"}
                  </button>
                  </div>
                </div>

                <div className="grammar-list">
                  {group.points.map((point) => (
                    <label className="grammar-item" key={point.key}>
                      <input
                        type="checkbox"
                        checked={selectedGrammar.includes(point.key)}
                        onChange={() => toggleGrammar(point.key)}
                      />
                      <span>{point.label}</span>
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
    <button className="btn" onClick={() => setView({ screen: "home" })}>
      Back
  </button>
  </div>
);
}