import { useEffect, useMemo, useState } from "react";

export default function ConjugationWheel({ BASE_PATH, onExit }) {
  const [verbs, setVerbs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedVerb, setSelectedVerb] = useState(null);
  const [selectedConjugation, setSelectedConjugation] = useState("dictionary");
  const [conjugationSearch, setConjugationSearch] = useState("");

    const [formality, setFormality] = useState("plain");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch(
        `${BASE_PATH}Data/Conjugation.json`
      );

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
        verb.verb_kana.toLowerCase().includes(term) ||
        verb.translation
          ?.toLowerCase()
          .includes(term)
      );
    });
  }, [verbs, search]);

  const conjugationOrder = useMemo(() => {
    if (!selectedVerb) return [];

    return Object.entries(selectedVerb.forms)
      .sort((a, b) => a[1].order - b[1].order)
      .map(([key]) => key);
  }, [selectedVerb]);

  const filteredConjugations = useMemo(() => {
    if (!selectedVerb) return [];

    return conjugationOrder.filter((type) =>
      selectedVerb.forms[type].label
        .toLowerCase()
        .includes(
          conjugationSearch.toLowerCase()
        )
    );
  }, [
    selectedVerb,
    conjugationSearch,
    conjugationOrder,
  ]);

  if (!selectedVerb) {
    return <div>Loading...</div>;
  }

  const currentForm = selectedVerb.forms[selectedConjugation];
  const currentIndex = conjugationOrder.indexOf(selectedConjugation);
  const displayForm = currentForm[formality] || currentForm.plain;
  const stemHTML = selectedVerb.display?.root || "";
  const stemMiddle = selectedVerb.display?.middle || "";

  const changeConjugation = (direction) => {
    let next = currentIndex + direction;

    if (next < 0) {
      next = conjugationOrder.length - 1;
    }

    if (next >= conjugationOrder.length) {
      next = 0;
    }

    setSelectedConjugation(
      conjugationOrder[next]
    );
  };

  let startY = 0;

  const handleDragStart = (e) => {
    startY =
      e.clientY ||
      e.touches?.[0]?.clientY;
  };

  const handleDragEnd = (e) => {
    const endY =
      e.clientY ||
      e.changedTouches?.[0]?.clientY;

    const diff = endY - startY;

    if (Math.abs(diff) < 30) return;

    if (diff > 0) {
      changeConjugation(-1);
    } else {
      changeConjugation(1);
    }
  };

  return (
    <div className="flex-column">
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
            onChange={(e) =>
                setSearch(e.target.value)
            }
            className="typing-input"
            />

            {search.trim() !== "" && (
            <div className="wheel-dropdown">
              {filteredVerbs
              .slice(0, 10)
              .map((verb) => (
                <button
                key={verb.id}
                className="wheel-dropdown-item"
                onClick={() => {
                  setSelectedVerb(verb);
                  setSelectedConjugation(
                  "dictionary"
                  );
                  setSearch("");
                }}
                >
                <span
                  dangerouslySetInnerHTML={{
                  __html:
                    verb.verb_furigana ||
                    verb.verb,
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
              setConjugationSearch(
              e.target.value
              )
            }
            className="typing-input"
            />

            {conjugationSearch.trim() !==
            "" && (
            <div className="wheel-dropdown">
                {filteredConjugations.map(
                (type) => (
                    <button
                    key={type}
                    className="wheel-dropdown-item"
                    onClick={() => {
                        setSelectedConjugation(
                        type
                        );

                        setConjugationSearch(
                        ""
                        );
                    }}
                    >
                    {
                        selectedVerb.forms[type]
                        .label
                    }
                    </button>
                )
                )}
            </div>
            )}
        </div>
        {/* EXTRA INFO */}
          <div className="translation-text">
            <h3>{displayForm.translation || selectedVerb.translation}</h3>
          </div>

        {/* PLAIN / POLITE SWITCH */}
        <div className="formality-toggle">
            <button
            className={`formality-btn ${
                formality === "plain"
                ? "active-formality"
                : ""
            }`}
            onClick={() =>
                setFormality("plain")
            }
            >
            Plain
            </button>

            <button
            className={`formality-btn ${
                formality === "polite"
                ? "active-formality"
                : ""
            }`}
            onClick={() =>
                setFormality("polite")
            }
            >
            Polite
            </button>
        </div>
        </div>

        {/* CONJUGATION DISPLAY */}
        <div className="conjugation-lockup">
          {/* STEM */}
          <div className="verb-stem">
            <div
              className="stem-kanji"
              dangerouslySetInnerHTML={{
                __html: stemHTML,
              }}
            />

            <div className="stem-middle">
              {stemMiddle}
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
            onMouseDown={
              handleDragStart
            }
            onMouseUp={handleDragEnd}
            onTouchStart={
              handleDragStart
            }
            onTouchEnd={handleDragEnd}
          >
            {[-2, -1, 0, 1, 2].map(
              (offset) => {
                let index =
                  (currentIndex +
                    offset +
                    conjugationOrder.length) %
                  conjugationOrder.length;

                const type =
                  conjugationOrder[index];

                const form =
                  selectedVerb.forms[
                    type
                  ];

                const display =
                form[formality] ||
                form.plain;

                const ending = (display.ending || "");

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
                    {ending}
                    </div>

                    <div className="slot-label">
                    ({form.label})
                    </div>
                </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      <button className="back-btn" onClick={onExit}>
        Back
      </button>
    </div>
  );
}