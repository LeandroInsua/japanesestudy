import { useEffect, useMemo, useState } from "react";

const conjugationLabels = {
  dictionary_form: "Dictionary",
  te_form: "-te",
  ta_form: "Past",
  negative: "Negative",
  past_negative: "Past Negative",
  potential: "Potential",
  potential_negative: "Potential Negative",
  potential_past: "Potential Past",
  potential_past_negative: "Potential Past Negative",
  volitional: "Volitional",
  volitional_negative: "Volitional Negative",
  imperative: "Imperative",
  prohibitive: "Prohibitive",
  passive: "Passive",
  passive_negative: "Passive Negative",
  passive_past: "Passive Past",
  passive_past_negative: "Passive Past Negative",
  ba_form: "Conditional (-ba)",
  ba_negative: "Negative Conditional",
  causative: "Causative",
  causative_negative: "Causative Negative",
  causative_past: "Causative Past",
  causative_past_negative: "Causative Past Negative",
  passive_causative: "Passive Causative",
  passive_causative_negative: "Passive Causative Negative",
  passive_causative_past: "Passive Causative Past",
  passive_causative_past_negative: "Passive Causative Past Negative",
};

const conjugationOrder = Object.keys(conjugationLabels);

export default function ConjugationWheel({ BASE_PATH, onExit }) {
  const [verbs, setVerbs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedVerb, setSelectedVerb] = useState(null);
  const [selectedConjugation, setSelectedConjugation] = useState("dictionary_form");
  const [conjugationSearch, setConjugationSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch(`${BASE_PATH}Data/Conjugation.json`);
      const json = await res.json();
      setVerbs(json);

      if (json.length > 0) {
        setSelectedVerb(json[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredVerbs = useMemo(() => {
    return verbs.filter((verb) => {
      const term = search.toLowerCase();

      return (
        verb.verb.toLowerCase().includes(term) ||
        verb.verb_kana.toLowerCase().includes(term)
      );
    });
  }, [verbs, search]);

  const filteredConjugations = useMemo(() => {
    return conjugationOrder.filter((type) =>
        conjugationLabels[type]
        .toLowerCase()
        .includes(conjugationSearch.toLowerCase())
    );
    }, [conjugationSearch]);

  if (!selectedVerb) {
    return <div>Loading...</div>;
    }

    const currentIndex = conjugationOrder.indexOf(selectedConjugation);

    const changeConjugation = (direction) => {
    let next = currentIndex + direction;

    if (next < 0) {
        next = conjugationOrder.length - 1;
    }

    if (next >= conjugationOrder.length) {
        next = 0;
    }

    setSelectedConjugation(conjugationOrder[next]);
    };

    let startY = 0;

    const handleDragStart = (e) => {
    startY = e.clientY || e.touches?.[0]?.clientY;
    };

    const handleDragEnd = (e) => {
    const endY = e.clientY || e.changedTouches?.[0]?.clientY;

    const diff = endY - startY;

    if (Math.abs(diff) < 30) return;

    if (diff > 0) {
        changeConjugation(-1);
    } else {
        changeConjugation(1);
    }
    };

    return (
    <div className="flex-column s">
        <div className="conjugation-wheel-wrapper">

        <div className="wheel-header">
            <h1>Conjugation Wheel</h1>            
        </div>

        <div className="wheel-top-bar">

        {/* VERB SEARCH */}
        <div className="wheel-search-container">
            <input
            type="text"
            placeholder="Search verb..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="typing-input"
            />

            {search.trim() !== "" && (
            <div className="wheel-dropdown">
                {filteredVerbs.slice(0, 10).map((verb) => (
                <button
                    key={verb.verb}
                    className="wheel-dropdown-item"
                    onClick={() => {
                    setSelectedVerb(verb);
                    setSearch("");
                    }}
                >
                    <span
                    dangerouslySetInnerHTML={{
                        __html: verb.verb_furigana || verb.verb,
                    }}
                    />
                </button>
                ))}
            </div>
            )}
        </div>

        {/* CONJUGATION SEARCH */}
        <div className="wheel-search-container">
            <input
            type="text"
            placeholder="Search conjugation..."
            value={conjugationSearch}
            onChange={(e) =>
                setConjugationSearch(e.target.value)
            }
            className="typing-input"
            />

            {conjugationSearch.trim() !== "" && (
            <div className="wheel-dropdown">
                {filteredConjugations.map((type) => (
                <button
                    key={type}
                    className="wheel-dropdown-item"
                    onClick={() => {
                    setSelectedConjugation(type);
                    setConjugationSearch("");
                    }}
                >
                    {conjugationLabels[type]}
                </button>
                ))}
            </div>
            )}
        </div>

        </div>

        {/* VERB */}
        

        {/* CONJUGATION DISPLAY */}
        <div className="conjugation-lockup">
        {(() => {
            const originalKana = selectedVerb.verb_kana;

            const masuStemKana = originalKana.replace("ます", "");

            const currentKana =
            selectedVerb[`${selectedConjugation}_kana`];

            const currentKanji =
            selectedVerb[selectedConjugation];

            let splitIndex = 0;

            for (
            let i = 0;
            i < Math.min(masuStemKana.length, currentKana.length);
            i++
            ) {
            if (masuStemKana[i] === currentKana[i]) {
                splitIndex++;
            } else {
                break;
            }
            }

            const stemKanji = currentKanji.slice(0, splitIndex);
            const stemKana = currentKana.slice(0, splitIndex);

            const endingKanji = currentKanji.slice(splitIndex);
            const endingKana = currentKana.slice(splitIndex);

            return (
            <>
                {/* STEM */}
                <div className="verb-stem">
                <div className="stem-kanji">
                    {stemKanji}
                </div>
                </div>
                

                {/* SLOT MACHINE */}
                <div
                className="slot-wheel"
                onWheel={(e) => {
                    if (e.deltaY > 0) {
                    changeConjugation(1);
                    } else {
                    changeConjugation(-1);
                    }
                }}
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
                >
                {[-2, -1, 0, 1, 2].map((offset) => {
                    let index =
                    (currentIndex +
                        offset +
                        conjugationOrder.length) %
                    conjugationOrder.length;

                    const type = conjugationOrder[index];

                    const kana =
                    selectedVerb[`${type}_kana`];

                    const kanji =
                    selectedVerb[type];

                    let localSplit = 0;

                    for (
                    let i = 0;
                    i <
                    Math.min(
                        masuStemKana.length,
                        kana.length
                    );
                    i++
                    ) {
                    if (masuStemKana[i] === kana[i]) {
                        localSplit++;
                    } else {
                        break;
                    }
                    }

                    const endingOnly =
                    kanji.slice(localSplit);

                    const endingKanaOnly =
                    kana.slice(localSplit);

                    return (
                    <div
                        key={type}
                        className={`slot-item ${
                        offset === 0
                            ? "active-slot-item"
                            : ""
                        }`}
                    >
                        <div className="slot-ending">
                        {endingOnly}
                        </div>
                        <div className="slot-label">
                        ({conjugationLabels[type]})
                        </div>
                    </div>
                    );
                })}
                </div>
            </>
            );
        })()}
        </div>
        
        </div>
        <button className="back-btn" onClick={onExit}>
            Back
        </button>
    </div>
    
    );
}