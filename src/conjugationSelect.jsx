import { useState } from "react";

const conjugationGroups = [
  {
    title: "-te form",
    items: ["te_form"],
    infoKey: "te_form",
  },

  {
    title: "Basic Forms",
    items: [
      "dictionary_form",
      "negative",
      "ta_form",
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
      "ba_form",
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

const conjugationInfo = {
  te_form: {
    title: "-te form",
    content: [
      "Group 1: Remove ます. Replace the last hiragana before ます like this:",
      "い、ち、り → って",
      "び、み、に → んで",
      "き → いて",
      "ぎ → いで",
      "し → して",
      "行きます → いって (irregular in this conjugation)",
      "",
      "Group 2: Replace ます with て.",
      "",
      "Group 3: します → して, きます → きて.",
    ],
  },

  basic_forms: {
    title: "Dictionary / nai / ta / past negative",
    content: [
      "Dictionary form:",
      "Group 1: Remove ます and replace the last hiragana with its 'u' vowel equivalent.",
      "いきます → いく",
      "およぎます → およぐ",
      "さがします → さがす",
      "たちます → たつ",
      "Group 2: Replace ます with る.",
      "たべます → たべる",
      "Group 3: します → する, きます → くる.",
      "",
      "Nai form:",
      "Group 1: Remove ます and replace the last hiragana with its 'a' vowel equivalent.",
      "いきます → いかない",
      "およぎます → およがない",
      "さがします → さがさない",
      "たちます → たたない",
      "Group 2: Replace ます with ない.",
      "たべます → たべない",
      "Group 3:",
      "します → しない",
      "きます → こない.",
      "",
      "Ta form: same as te form, but with て → た and で → だ.",
      "Group 1: Remove ます. Replace the last hiragana before ます like this:",
      "い、ち、り → った",
      "び、み、に → んだ",
      "き → いた",
      "ぎ → いだ",
      "し → した",
      "行きます → いった (irregular in this conjugation)",
      "Group 2: Replace ます with た.",
      "Group 3:",
      "します → して",
      "きます → きて.",
      "",
      "Past negative:",
      "conjugate nai-form, remove い and attach the past ending かった.",
      "いきます -> いかない → いかなかった",
      "たべます → たべない → たべなかった",
    ],
  },

  potential_forms: {
    title: "Potential Forms",
    content: [
      "Expresses ability: 'can do'.",
      "",
      "Group 1:",
      "Replace the final kana with its 'e' vowel equivalent + る.",
      "いきます → いけます / いける",
      "よみます → よめます / よめる",
      "",
      "Group 2:",
      "Replace ます with られる.",
      "たべます → たべられます / たべられる",
      "",
      "Group 3:",
      "します → できます / できる",
      "きます → こられる",
      "",
      "Negative / past forms are made normally from the new verb.",
      "いけない / いけた / いけなかった",
    ],
  },

  volitional: {
    title: "Volitional",
    content: [
      "Expresses intention or suggestion: 'let's do...' / 'I will do...'.",
      "",
      "Group 1:",
      "Replace the final kana with its 'o' vowel equivalent + う.",
      "いきます → いこう",
      "よみます → よもう",
      "",
      "Group 2:",
      "Replace ます with よう.",
      "たべます → たべよう",
      "",
      "Group 3:",
      "します → しよう",
      "きます → こよう",
      "",
      "Negative volitional uses dictionary form + まい.",
      "いくまい",
      "たべるまい",
    ],
  },

  imperative_prohibitive: {
    title: "Imperative / Prohibitive",
    content: [
      "Imperative: direct command form. Often blunt, strong, or only used in specific contexts.",
      "",
      "Group 1:",
      "Replace the final kana with its 'e' vowel equivalent.",
      "いきます → いけ",
      "よみます → よめ",
      "",
      "Group 2:",
      "Replace ます with ろ.",
      "たべます → たべろ",
      "",
      "Group 3:",
      "します → しろ",
      "きます → こい",
      "",
      "Prohibitive:",
      "Dictionary form + な.",
      "いくな",
      "たべるな",
    ],
  },

  passive_forms: {
    title: "Passive Forms",
    content: [
      "Used when something is done to the subject.",
      "",
      "Group 1:",
      "Replace the final kana with its 'a' vowel equivalent + れる.",
      "よみます → よまれる",
      "",
      "Group 2:",
      "Replace ます with られる.",
      "たべます → たべられる",
      "",
      "Group 3:",
      "します → される",
      "きます → こられる",
      "",
      "Negative / past forms conjugate normally.",
    ],
  },

  conditional_ba: {
    title: "Conditional (-ba)",
    content: [
      "Expresses 'if'.",
      "",
      "Group 1:",
      "Replace the final kana with its 'e' vowel equivalent + ば.",
      "いきます → いけば",
      "よみます → よめば",
      "",
      "Group 2:",
      "Replace ます with れば.",
      "たべます → たべれば",
      "",
      "Group 3:",
      "します → すれば",
      "きます → くれば",
      "",
      "Negative conditional:",
      "ない → なければ",
      "いかない → いかなければ",
    ],
  },

  causative_forms: {
    title: "Causative Forms",
    content: [
      "Means 'make/let someone do something'.",
      "",
      "Group 1:",
      "Replace the final kana with its 'a' vowel equivalent + せる.",
      "いきます → いかせる",
      "",
      "Group 2:",
      "Replace ます with させる.",
      "たべます → たべさせる",
      "",
      "Group 3:",
      "します → させる",
      "きます → こさせる",
      "",
      "Negative / past forms conjugate normally.",
    ],
  },

  passive_causative_forms: {
    title: "Passive Causative Forms",
    content: [
      "Means 'be made to do something'.",
      "",
      "Group 1:",
      "Replace the final kana with its 'a' vowel equivalent + される.",
      "いきます → いかされる",
      "",
      "Group 2:",
      "Replace ます with させられる.",
      "たべます → たべさせられる",
      "",
      "Group 3:",
      "します → させられる",
      "きます → こさせられる",
      "",
      "Negative / past forms conjugate normally.",
    ],
  },
};
export default function ConjugationSelect({
  setView,
  setConjugationPool,
  setGameMode,
}) {
  const [selected, setSelected] = useState([]);
  const [popupKey, setPopupKey] = useState(null);

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
      <h1>Conjugation Practice</h1>

        <div className="mode-buttons">
          <button
            type="button"
            className={`btn ${selected.length === 0 ? "disabled" : ""}`}
            onClick={() => startGame("multiple")}
          >
            Multiple Choice
          </button>

          <button
            type="button"
            className={`btn ${selected.length === 0 ? "disabled" : ""}`}
            onClick={() => startGame("typing")}
          >
            Typing
          </button>
        </div>
      
      <div className="conjugation-groups">
        {conjugationGroups.map((group) => (
            <div key={group.title} className="conjugation-group">
            <h3 className="conj-group-header">
              <span>{group.title}</span>

              {group.infoKey && (
                <button
                  type="button"
                  className="conj-info-btn"
                  onClick={() => setPopupKey(group.infoKey)}
                >
                  ?
                </button>
              )}
            </h3>
            

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
        {popupKey && (
          <div className="modal-overlay" onClick={() => setPopupKey(null)}>
            <div
              className="modal-content conj-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setPopupKey(null)}>
                ×
              </button>

              <h3>{conjugationInfo[popupKey].title}</h3>

              {conjugationInfo[popupKey].content.map((line, i) =>
                line ? <p key={i}>{line}</p> : <br key={i} />
              )}
            </div>
          </div>
        )}

      <button className="back-btn" onClick={() => setView("home")}>
        Back
      </button>
    </div>
    </div>
    </div>
  );
}