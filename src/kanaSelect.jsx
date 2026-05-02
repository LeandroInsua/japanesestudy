import { useState } from "react";

export default function KanaSelect({
  setView,
  setKanaPool,
  setGameMode,
}) {
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
      { id: "k", label: "カ キ ク ケ コ", romaji: "ka ki ku ke ko" },
      { id: "s", label: "サ シ ス セ ソ", romaji: "sa shi su se so" },
      { id: "t", label: "タ チ ツ テ ト", romaji: "ta chi tsu te to" },
      { id: "n", label: "ナ ニ ヌ ネ ノ", romaji: "na ni nu ne no" },
      { id: "h", label: "ハ ヒ フ ヘ ホ", romaji: "ha hi fu he ho" },
      { id: "m", label: "マ ミ ム メ モ", romaji: "ma mi mu me mo" },
      { id: "y", label: "ヤ ユ ヨ", romaji: "ya yu yo" },
      { id: "r", label: "ラ リ ル レ ロ", romaji: "ra ri ru re ro" },
      { id: "w", label: "ワ ヲ ン", romaji: "wa wo n" },
    ],

    katakanaAlt: [
      { id: "g", label: "ガ ギ グ ゲ ゴ", romaji: "ga gi gu ge go" },
      { id: "z", label: "ザ ジ ズ ゼ ゾ", romaji: "za ji zu ze zo" },
      { id: "d", label: "ダ ヂ ヅ デ ド", romaji: "da ji zu de do" },
      { id: "b", label: "バ ビ ブ ベ ボ", romaji: "ba bi bu be bo" },
      { id: "p", label: "パ ピ プ ペ ポ", romaji: "pa pi pu pe po" },
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
    ],
  };

  const [selectedHiragana, setSelectedHiragana] = useState([]);
  const [selectedKatakana, setSelectedKatakana] = useState([]);

  const toggleGroup = (type, groupId) => {
    if (type === "hiragana") {
      setSelectedHiragana((prev) =>
        prev.includes(groupId)
          ? prev.filter((g) => g !== groupId)
          : [...prev, groupId]
      );
    } else {
      setSelectedKatakana((prev) =>
        prev.includes(groupId)
          ? prev.filter((g) => g !== groupId)
          : [...prev, groupId]
      );
    }
  };

  const selectAll = (type) => {
    if (type === "hiragana") {
      setSelectedHiragana([
        ...kanaGroups.hiragana.map((g) => g.id),
        ...kanaGroups.hiraganaAlt.map((g) => g.id),
      ]);
    } else {
      setSelectedKatakana([
        ...kanaGroups.katakana.map((g) => g.id),
        ...kanaGroups.katakanaAlt.map((g) => g.id),
      ]);
    }
  };

  const clearAll = (type) => {
    if (type === "hiragana") {
      setSelectedHiragana([]);
    } else {
      setSelectedKatakana([]);
    }
  };

  const buildKanaPool = () => {
    const selectedGroups = [
      ...kanaGroups.hiragana.filter((group) =>
        selectedHiragana.includes(group.id)
      ),

      ...kanaGroups.hiraganaAlt.filter((group) =>
        selectedHiragana.includes(group.id)
      ),

      ...kanaGroups.katakana.filter((group) =>
        selectedKatakana.includes(group.id)
      ),

      ...kanaGroups.katakanaAlt.filter((group) =>
        selectedKatakana.includes(group.id)
      ),
    ];

    return selectedGroups.flatMap((group) => {
      const kanaArray = group.label.includes(" ")
        ? group.label.split(" ")
        : group.label.split("");

      const romajiArray = group.romaji.split(" ");

      return kanaArray.map((kana, i) => ({
        kana,
        romaji: romajiArray[i],
      }));
    });
  };

  const handleStart = (mode) => {
    const pool = buildKanaPool();

    if (pool.length === 0) return;

    setKanaPool(pool);
    setGameMode(mode);
    setView({ screen: "kanaGame" })
  };

  return (
    <div className="kana-screen">
      <div className="kana-wrapper">
        <h1>Choose the Kana to practice</h1>
            <div className="kana-columns">
              <div className="game-choice">
                <button
                  className="btn"
                  onClick={() => handleStart("multiple")}
                  disabled={
                  selectedHiragana.length === 0 &&
                  selectedKatakana.length === 0
                  }
              >
                  Multiple Choice
              </button>

              <button
                  className="btn"
                  onClick={() => handleStart("typing")}
                  disabled={
                  selectedHiragana.length === 0 &&
                  selectedKatakana.length === 0
                  }
              >
                  Typing
              </button>
            </div>

            {/* HIRAGANA */}
            <div className="kana-panel">
                <h3>Hiragana ・ ひらがな</h3>

                <div className="quick-actions">
                <button onClick={() => selectAll("hiragana")}>All</button>
                <button onClick={() => clearAll("hiragana")}>None</button>
                </div>

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

                    <span className="kana-text">
                    <span className="default-text">{group.romaji}</span>
                    <span className="hover-text">{group.label}</span>
                    </span>
                </div>
                ))}

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

                    <span className="kana-text">
                        <span className="default-text">{group.romaji}</span>
                        <span className="hover-text">{group.label}</span>
                    </span>
                    </div>
                ))}
                </details>
            </div>

            {/* KATAKANA */}
            <div className="kana-panel">
                <h3>Katakana ・ カタカナ</h3>
                
                <div className="quick-actions">
                <button onClick={() => selectAll("katakana")}>All</button>
                <button onClick={() => clearAll("katakana")}>None</button>
                </div>


                {kanaGroups.katakana.map((group) => (
                <div
                    key={group.id}
                    className="kana-row"
                    onClick={() => toggleGroup("katakana", group.id)}
                >
                    <input
                    type="checkbox"
                    checked={selectedKatakana.includes(group.id)}
                    readOnly
                    />

                    <span className="kana-text">
                    <span className="default-text">{group.romaji}</span>
                    <span className="hover-text">{group.label}</span>
                    </span>
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

                    <span className="kana-text">
                        <span className="default-text">{group.romaji}</span>
                        <span className="hover-text">{group.label}</span>
                    </span>
                    </div>
                ))}
                </details>
            </div>

            </div>

            <div className="button-group">
            

            <button className="btn" onClick={() => setView({ screen: "home" })}>
                Back
            </button>
            </div>

      </div>
    </div>
  );
}