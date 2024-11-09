import { useState, useEffect } from 'react';
import ResultsModal from './components/ResultsModal';
import EmojiLists from './components/EmojiLists';
import emojis from './data/emojis';
import './styles.css';

export default function App() {
  const [likedEmojis, setLikedEmojis] = useState([]);
  const [passedEmojis, setPassedEmojis] = useState([]);
  const [currentEmojis, setCurrentEmojis] = useState(getRandomEmojis());
  const [showResults, setShowResults] = useState(false);
  const [resultsReady, setResultsReady] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  function handleClick(event) {
    const clickedEmoji = event.target.textContent;

    
    setLikedEmojis((prevLikedEmojis) => [...prevLikedEmojis, clickedEmoji]);

    
    const remainingEmojis = currentEmojis.filter((emoji) => emoji !== clickedEmoji);
    setPassedEmojis((prevPassedEmojis) => [...prevPassedEmojis, ...remainingEmojis]);

    
    setCurrentEmojis(getRandomEmojis());
  }

  function getRandomEmojis() {
    function chooseRandomEmoji() {
      return emojis[Math.floor(Math.random() * emojis.length)];
    }
    return new Array(3).fill('').map(() => chooseRandomEmoji());
  }

  function getResults() {
    setShowResults(true);
  }

  function reset() {
    setLikedEmojis([]);
    setPassedEmojis([]);
    setShowResults(false);
    setResultsReady(false);
  }

  useEffect(() => {
    showResults &&
      setTimeout(() => {
        setResultsReady(true);
      }, 2000);
  }, [showResults]);

  function generateListItems(element) {
    return <li key={crypto.randomUUID()}>{element}</li>;
  }

  useEffect(() => {
   
    setHydrated(true);
  }, []);

  return (
    <div className="wrapper">
      <div className="results-counter">{likedEmojis.length} / 10</div>

      <ResultsModal
        showResults={showResults}
        getResults={getResults}
        resultsReady={resultsReady}
        reset={reset}
        generateListItems={generateListItems}
        likedEmojis={likedEmojis}
      />

      <h1>Emoji Kişilik Testi</h1>

      {hydrated ? (
        <>
          <div className="overall-emojis-container">
            <button onClick={handleClick}>{currentEmojis[0]}</button>
            <button onClick={handleClick}>{currentEmojis[1]}</button>
            <button onClick={handleClick}>{currentEmojis[2]}</button>
          </div>

          <EmojiLists
            likedEmojis={likedEmojis}
            passedEmojis={passedEmojis}
            generateListItems={generateListItems}
          />
        </>
      ) : (
        <p>Emojiler yükleniyor...</p>
      )}
    </div>
  );
}
