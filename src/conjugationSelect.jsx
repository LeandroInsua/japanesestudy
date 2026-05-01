import { useState } from "react";

const conjugationGroups = [
  {
    title: "-te form",
    items: ["te"],
    infoKey: "te_form",
  },

  {
    title: "Basic Forms",
    items: [
      "dictionary",
      "negative",
      "past",
      "past_negative",
    ],
    infoKey: "basic_forms",
  },

  {
    title: "Potential Forms",
    items: [
      "potential",
      "potential_negative",
      "potential_past",
      "potential_past_negative",
    ],
    infoKey: "potential_forms",
  },

  {
    title: "Volitional",
    items: [
      "volitional",
      "volitional_negative",
    ],
    infoKey: "volitional",
  },

  {
    title: "Imperative / Prohibitive",
    items: [
      "imperative",
      "prohibitive",
    ],
    infoKey: "imperative_prohibitive",
  },

  {
    title: "Passive Forms",
    items: [
      "passive",
      "passive_negative",
      "passive_past",
      "passive_past_negative",
    ],
    infoKey: "passive_forms",
  },

  {
    title: "Conditional (-ba)",
    items: [
      "ba",
      "ba_negative",
    ],
    infoKey: "conditional_ba",
  },

  {
    title: "Causative Forms",
    items: [
      "causative",
      "causative_negative",
      "causative_past",
      "causative_past_negative",
    ],
    infoKey: "causative_forms",
  },

  {
    title: "Passive Causative Forms",
    items: [
      "passive_causative",
      "passive_causative_negative",
      "passive_causative_past",
      "passive_causative_past_negative",
    ],
    infoKey: "passive_causative_forms",
  },
];

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

const conjugationInfo = {
  // KEEP YOUR EXISTING conjugationInfo OBJECT HERE
};

export default function ConjugationSelect({
  setView,
  setConjugationPool,
  setGameMode,
}) {
  const [selected, setSelected] =
    useState([]);

  const [popupKey, setPopupKey] =
    useState(null);

  const toggle = (item) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((x) => x !== item)
        : [...prev, item]
    );
  };

  const startGame = (gameMode) => {
    if (selected.length === 0) return;

    setConjugationPool(selected);
    setGameMode(gameMode);
    setView("conjugationGame");
  };

  return (
    <div className="conjugation-screen">
      <div className="conjugation-wrapper">
        <div className="flex-center flex-column">
          <h1>
            Conjugation Practice
          </h1>

          <div className="mode-buttons">
            <button
              type="button"
              className={`btn ${
                selected.length === 0
                  ? "disabled"
                  : ""
              }`}
              onClick={() =>
                startGame("multiple")
              }
            >
              Multiple Choice
            </button>

            <button
              type="button"
              className={`btn ${
                selected.length === 0
                  ? "disabled"
                  : ""
              }`}
              onClick={() =>
                startGame("typing")
              }
            >
              Typing
            </button>
          </div>

          <div className="conjugation-groups">
            {conjugationGroups.map(
              (group) => (
                <div
                  key={group.title}
                  className="conjugation-group"
                >
                  <h3 className="conj-group-header">
                    <span>
                      {group.title}
                    </span>

                    {group.infoKey && (
                      <button
                        type="button"
                        className="conj-info-btn"
                        onClick={() =>
                          setPopupKey(
                            group.infoKey
                          )
                        }
                      >
                        ?
                      </button>
                    )}
                  </h3>

                  <div className="conjugation-grid">
                    {group.items.map(
                      (item) => (
                        <label
                          key={item}
                          className="conjugation-item"
                        >
                          <input
                            type="checkbox"
                            checked={selected.includes(
                              item
                            )}
                            onChange={() =>
                              toggle(item)
                            }
                          />

                          {
                            conjugationLabels[
                              item
                            ]
                          }
                        </label>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          {popupKey && (
            <div
              className="modal-overlay"
              onClick={() =>
                setPopupKey(null)
              }
            >
              <div
                className="modal-content conj-modal"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                <button
                  className="modal-close"
                  onClick={() =>
                    setPopupKey(null)
                  }
                >
                  ×
                </button>

                <h3>
                  {
                    conjugationInfo[
                      popupKey
                    ].title
                  }
                </h3>

                {conjugationInfo[
                  popupKey
                ].content.map((line, i) =>
                  line ? (
                    <p key={i}>
                      {line}
                    </p>
                  ) : (
                    <br key={i} />
                  )
                )}
              </div>
            </div>
          )}

          <button
            className="back-btn"
            onClick={() =>
              setView("home")
            }
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}