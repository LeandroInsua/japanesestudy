import { useState } from "react";

const conjugationGroups = [
  {
    title: "-te form",
    items: ["te_form"],
  },

  {
    title: "Basic Forms",
    items: [
      "dictionary_form",
      "negative",
      "ta_form",
      "past_negative",
    ],
  },

  {
    title: "Potential Forms",
    items: [
      "potential",
      "potential_negative",
      "potential_past",
      "potential_past_negative",
    ],
  },

  {
    title: "Volitional",
    items: [
      "volitional",
      "volitional_negative",
    ],
  },

  {
    title: "Imperative / Prohibitive",
    items: [
      "imperative",
      "prohibitive",
    ],
  },

  {
    title: "Passive Forms",
    items: [
      "passive",
      "passive_negative",
      "passive_past",
      "passive_past_negative",
    ],
  },

  {
    title: "Conditional (-ba)",
    items: [
      "ba_form",
      "ba_negative",
    ],
  },

  {
    title: "Causative Forms",
    items: [
      "causative",
      "causative_negative",
      "causative_past",
      "causative_past_negative",
    ],
  },

  {
    title: "Passive Causative Forms",
    items: [
      "passive_causative",
      "passive_causative_negative",
      "passive_causative_past",
      "passive_causative_past_negative",
    ],
  },
];

export default function ConjugationSelect({
  setView,
  setConjugationPool,
  setGameMode,
}) {
  const [selected, setSelected] = useState([]);
  const [mode, setMode] = useState("multiple");

  const toggle = (item) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((x) => x !== item)
        : [...prev, item]
    );
  };

  const startGame = () => {
    if (selected.length === 0) return;

    setConjugationPool(selected);
    setGameMode(mode);
    setView("conjugationGame");
  };

  return (
    <div className="conjugation-screen">
        <div className="conjugation-wrapper">
    <div className="flex-center flex-column">
      <h1>Conjugation Practice</h1>

      <div className="conjugation-groups">
        {conjugationGroups.map((group) => (
            <div key={group.title} className="conjugation-group">
            <h3>{group.title}</h3>

            <div className="conjugation-grid">
                {group.items.map((item) => (
                <label key={item} className="conjugation-item">
                    <input
                    type="checkbox"
                    checked={selected.includes(item)}
                    onChange={() => toggle(item)}
                    />

                    {item.replaceAll("_", " ")}
                </label>
                ))}
            </div>
            </div>
        ))}
        </div>

      <div className="config-section">
        <h3>Game Mode</h3>

        <div className="config-radio">
          <label>
            <input
              type="radio"
              checked={mode === "multiple"}
              onChange={() => setMode("multiple")}
            />
            Multiple Choice
          </label>

          <label>
            <input
              type="radio"
              checked={mode === "typing"}
              onChange={() => setMode("typing")}
            />
            Typing
          </label>
        </div>
      </div>

      <button
        className={`btn ${selected.length === 0 ? "disabled" : ""}`}
        onClick={startGame}
      >
        Start
      </button>

      <button className="btn" onClick={() => setView("home")}>
        Back
      </button>
    </div>
    </div>
    </div>
  );
}