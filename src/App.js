import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [numberRandom, setNumberRandom] = useState(-1);
  const [numberUser, setNumberUser] = useState(0);
  const [nameUser, setNameUser] = useState(``);
  const [points, setPoints] = useState(10);
  const [score, setScore] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [clue, setClue] = useState(`Start guessing... `);
  const [theme, setTheme] = useState(false);
  const [loadingName, setLoadingName] = useState(false);
  const [allScores, setAllScores] = useState(false);
  const [myScore, setMyScore] = useState(``);
  const [userPlaying, setUserPlaying] = useState(``);

  const API_URL = process.env.REACT_APP_API_URL;

  //console.log(`api url`, API_URL);

  const numberToGuessRandom = () => {
    const numberToGuess = Math.floor(Math.random() * (21 - 1)) + 1;

    setNumberRandom(numberToGuess);

    // console.log(`soy el numero a adivinar`, numberToGuess);
  };

  const handleNumberUser = (e) => {
    setNumberUser(Number(e.target.value));
  };

  const handleNameUser = (e) => {
    setNameUser(e.target.value);
  };

  const handleSubmitName = (e) => {
    e.preventDefault();

    setLoadingName(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (numberRandom === numberUser) {
      setCorrectAnswer(true);
      numberToGuessRandom();
      setScore(score + points);
      setPoints(10);
      setAciertos(aciertos + 1);
      setTheme(true);
      setClue(`BINGO!!`);

      setTimeout(() => {
        setTheme(false);
        setClue(`Start guessing... `);
        setNumberUser(``);
      }, 3000);
    }

    if (numberRandom !== numberUser) {
      setPoints(points - 1);
      if (numberRandom > numberUser) {
        setClue(`⬇ Too low!`);
      } else {
        setClue(`⬆ Too hight!`);
      }
    }
  };

  useEffect(() => {
    numberToGuessRandom();
    axios
      .get(`${API_URL}/users`)
      .then((response /* console.log(`soy la response del users`, response.data)) */) =>
        setAllScores(response.data)
      )
      .catch((error) => console.log(error));

    let scoreUpdate = {
      userName: nameUser,
      score: score,
    };

    axios
      .post(`${API_URL}/scores`, scoreUpdate)
      .then((response) => setMyScore(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let userPlay = {
      userName: nameUser,
      score: score,
    };

    axios
      .post(`${API_URL}/user-playing`, userPlay)
      .then((response /* console.log(`soy la response del users`, response.data)) */) =>
        setUserPlaying(response.data)
      )
      .catch((error) => console.log(error));
  }, [loadingName]);

  useEffect(() => {
    let scoreUpdate = {
      userName: nameUser,
      score: score,
    };

    axios
      .post(`${API_URL}/scores`, scoreUpdate)
      .then((response) => setMyScore(response.data))
      .catch((error) => console.log(error));

    axios
      .post(`${API_URL}/user-playing`, scoreUpdate)
      .then((response /* console.log(`soy la response del users`, response.data)) */) =>
        setUserPlaying(response.data)
      )
      .catch((error) => console.log(error));

    setTimeout(() => {
      axios
        .get(`${API_URL}/users`)
        .then((response /* console.log(`soy la response del users`, response.data)) */) =>
          setAllScores(response.data)
        )
        .catch((error) => console.log(error));
    }, 1000);
  }, [score]);

  if (loadingName == false) {
    return (
      <>
        <div className='theme-black-name'>
          <header className='header-name'>
            <div className='div-upper-name'>
              <h1 className='your-name-name'>What's your name?</h1>
              <form onSubmit={handleSubmitName}>
                <input
                  type='text'
                  className='guess-name'
                  name='numberUser'
                  value={nameUser}
                  placeholder='Write your name'
                  onChange={handleNameUser}
                />
                <button className='btn-name check'>Start!</button>
              </form>
            </div>
            <h1 className='guess-number-name'>Guess the Number!</h1>
            <div className='number'>?</div>
          </header>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={theme ? `green` : `black`}>
          <header className='header-guess'>
            <h1 className='your-name-guess'>Welcome {nameUser}</h1>
            <h1 className='guessNumber'>Guess the Number!</h1>
            <p className='between'>(Between 1 and 20)</p>
            {/*             <button class='btn again' type='submit'>
              Level!
            </button> */}
            <div className='number'>?</div>
          </header>
          <main>
            <section className='left'>
              <p className='label-highscore'>
                🥇 Highscore: <span className='highscore'></span>
              </p>
              {allScores.map((user) => (
                <>
                  <h4 className='users-scores'>
                    {user.username} {user.score}
                  </h4>
                </>
              ))}
              {allScores[3].score > userPlaying.score ? (
                <h4 className='user-playing'>
                  {userPlaying.username} {userPlaying.score}
                </h4>
              ) : (
                <></>
              )}
            </section>
            <section className='central'>
              <form onSubmit={handleSubmit}>
                <input
                  type='number'
                  className='guess'
                  name='numberUser'
                  value={numberUser}
                  onChange={handleNumberUser}
                />
                <button className='btn check'>Check!</button>
              </form>
            </section>
            <section className='right'>
              <p className='message'>{clue}</p>
              <p className='label-score'>
                ⚡ Score: <span className='score'>{points}</span>
              </p>
              <p className='label-score'>
                💯 Total Score: <span className='score'>{score}</span>
              </p>
            </section>
            <section className='down'>
              <p className='label-highscore'>
                🥇 Highscore: <span className='highscore'></span>
              </p>
              {allScores.map((user) => (
                <>
                  <h4 className='users-scores'>
                    {user.username} {user.score}
                  </h4>
                </>
              ))}
              {allScores[3].score > userPlaying.score ? (
                <h4 className='user-playing'>
                  {userPlaying.username} {userPlaying.score}
                </h4>
              ) : (
                <></>
              )}
            </section>
          </main>
        </div>
      </>
    );
  }
}

export default App;
