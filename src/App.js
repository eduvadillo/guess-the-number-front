import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [numberRandom, setNumberRandom] = useState(-1);
  const [numberUser, setNumberUser] = useState(``);
  const [nameUser, setNameUser] = useState();
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
  const [timmer, setTimmer] = useState(false);
  const [seconds, setSeconds] = useState(55);
  const [howNumbers, setHowNumbers] = useState(21);
  const [level, setLevel] = useState(1);
  const [randomAgain, setRandomAgain] = useState(false);
  const [level2, setlevel2] = useState(true);
  const [level3, setlevel3] = useState(false);
  const [level4, setlevel4] = useState(false);
  const [level5, setlevel5] = useState(false);
  const [level6, setlevel6] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const [counter, setCounter] = useState(false);

  useEffect(() => {
    if (counter > 0 && timmer) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
    if (counter === 0 && timmer) {
      setCorrectAnswer(true);
      numberToGuessRandom();
      setScore(score + points);
      setPoints(10);
      setAciertos(aciertos + -1);
      setScore(score / 2);
      setCounter(false);
      setTheme(`red`);
      setClue(`YOU LOSE!`);

      setTimeout(() => {
        setTheme(true);
        setClue(`Start guessing... `);
        setNumberUser(``);
        setCounter(60);
      }, 3000);
    }
  }, [counter]);

  //console.log(`api url`, API_URL);

  const numberToGuessRandom = () => {
    const numberToGuess = Math.floor(Math.random() * (howNumbers - 1)) + 1;
    setNumberRandom(numberToGuess);
    console.log(`soy el numero a acertar`, numberToGuess);
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
    setCounter(60);
    setTimmer(true);
  };

  useEffect(() => {
    if (aciertos === 3 && level2) {
      setTimmer(false);
      setCounter(false);
      setCorrectAnswer(true);
      setScore(score + points);
      setPoints(10);
      setTheme(`green`);
      setClue(`BINGO!!`);
      setSeconds(55);
      setLevel(level + 1);
      setCounter(60);
      setlevel2(false);
      setTimeout(() => {
        setTheme(true);
        setClue(`Start guessing... `);
        setNumberUser(``);
        numberToGuessRandom();
        setTimmer(true);
        setCounter(60);
        setRandomAgain(false);
        setlevel3(true);
        console.log(`aqui esta llegando?`, howNumbers);
      }, 3000);
    }
    if (aciertos === 6 && level3) {
      setTimmer(false);
      setCounter(false);
      setCorrectAnswer(true);
      setScore(score + points);
      setPoints(10);
      setTheme(`green`);
      setClue(`BINGO!!`);
      setSeconds(55);
      setLevel(level + 1);
      setCounter(60);
      setTimeout(() => {
        setTheme(true);
        setClue(`Start guessing... `);
        setNumberUser(``);
        numberToGuessRandom();
        setTimmer(true);
        setCounter(60);
        setRandomAgain(false);
        setlevel3(false);
        setlevel4(true);
        console.log(`llega a los aciertos 5 para random grande`, howNumbers);
      }, 3000);
    }
    if (aciertos === 9 && level4) {
      setAciertos(aciertos + 1);
      setTimmer(false);
      setCounter(false);
      setCorrectAnswer(true);
      setScore(score + points);
      setPoints(10);
      setTheme(`green`);
      setClue(`BINGO!!`);
      setSeconds(55);
      setLevel(level + 1);
      setCounter(60);
      setTimeout(() => {
        setTheme(true);
        setClue(`Start guessing... `);
        setNumberUser(``);
        numberToGuessRandom();
        setTimmer(true);
        setCounter(60);
        setRandomAgain(false);
        setlevel4(false);
        setlevel5(true);

        console.log(`aqui esta llegando al de 8?`, howNumbers);
      }, 3000);
    }
    if (aciertos === 13 && level5) {
      setTimmer(false);
      setCounter(false);
      setCorrectAnswer(true);
      setScore(score + points);
      setPoints(10);
      setTheme(`green`);
      setClue(`BINGO!!`);
      setSeconds(55);
      setLevel(level + 1);
      setCounter(60);
      setTimeout(() => {
        setTheme(true);
        setClue(`Start guessing... `);
        setNumberUser(``);
        numberToGuessRandom();
        setTimmer(true);
        setCounter(60);
        setRandomAgain(false);
        setlevel5(false);
        setlevel6(true);
        console.log(`llega a los aciertos 12 para random grande`, howNumbers);
      }, 3000);
    }
  }, [randomAgain]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`soy el numero de aciertos`, aciertos);
    console.log(`soy el numero de nivel`, level);

    if (numberRandom === numberUser) {
      if (aciertos !== 3 && level2) {
        setTimmer(false);
        setCounter(false);
        setAciertos(aciertos + 1);
        setCorrectAnswer(true);
        setScore(score + points);
        setPoints(10);
        setSeconds(seconds - 5);

        setTheme(`green`);
        setClue(`BINGO!!`);
        setTimeout(() => {
          setTheme(true);
          setClue(`Start guessing... `);
          setNumberUser(``);
          numberToGuessRandom();
          setTimmer(true);
          setCounter(seconds);
          console.log(`aqui si que llega al diferente a 2 `, howNumbers);
        }, 3000);
      } else {
        if (aciertos === 3) {
          setHowNumbers(300);
          setRandomAgain(true);
          console.log(`esta pasando`, howNumbers);
        }
      }
      if (aciertos !== 6 && level3) {
        setTimmer(false);
        setCounter(false);
        setAciertos(aciertos + 1);
        setCorrectAnswer(true);
        setScore(score + points);
        setPoints(10);
        setSeconds(seconds - 5);

        setTheme(`green`);
        setClue(`BINGO!!`);
        setTimeout(() => {
          setTheme(true);
          setClue(`Start guessing... `);
          setNumberUser(``);
          numberToGuessRandom();
          setTimmer(true);
          setCounter(seconds);
          console.log(`aqui si que llega al diferente a 5 `, howNumbers);
        }, 3000);
      } else {
        if (aciertos === 6) {
          setHowNumbers(600);
          setRandomAgain(false);
          console.log(`esta pasando lo del 5`, howNumbers);
        }
      }
      if (aciertos !== 9 && level4) {
        console.log(`**************aciertos 8************`);
        setTimmer(false);
        setCounter(false);
        setAciertos(aciertos + 1);
        setCorrectAnswer(true);
        setScore(score + points);
        setPoints(10);
        setSeconds(seconds - 5);

        setTheme(`green`);
        setClue(`BINGO!!`);
        setTimeout(() => {
          setTheme(true);
          setClue(`Start guessing... `);
          setNumberUser(``);
          numberToGuessRandom();
          setTimmer(true);
          setCounter(seconds);
          console.log(`aqui si que llega `, howNumbers, `vamos a ver el level4`, level4);
        }, 3000);
      } else {
        if (aciertos === 9) {
          setHowNumbers(1200);
          setRandomAgain(true);
          console.log(`esta pasando lo del nivel 4 para 5`, howNumbers);
        }
      }
      if (aciertos !== 13 && level5) {
        console.log(`**************aciertos 12************`);
        setAciertos(aciertos + 1);
        setTimmer(false);
        setCounter(false);
        setCorrectAnswer(true);
        setScore(score + points);
        setPoints(10);
        setSeconds(seconds - 5);

        setTheme(`green`);
        setClue(`BINGO!!`);
        setTimeout(() => {
          setTheme(true);
          setClue(`Start guessing... `);
          setNumberUser(``);
          numberToGuessRandom();
          setTimmer(true);
          setCounter(seconds);
          console.log(`aqui si que llega `, howNumbers);
        }, 3000);
      } else {
        if (aciertos === 13) {
          setHowNumbers(2400);
          setRandomAgain(true);
          console.log(`esta pasando`, howNumbers);
        }
      }
      if (level6) {
        console.log(`**************level6************`);
        /* setAciertos(aciertos + 1); */
        setTimmer(false);
        setCounter(false);
        setCorrectAnswer(true);
        setScore(score + points);
        setPoints(10);
        setSeconds(seconds - 5);

        setTheme(`green`);
        setClue(`BINGO!!`);
        setTimeout(() => {
          setTheme(true);
          setClue(`Start guessing... `);
          setNumberUser(``);
          numberToGuessRandom();
          setTimmer(true);
          setCounter(seconds);
          console.log(`aqui si que llega  desde el level 6!!!`, howNumbers);
        }, 3000);
      }
    }

    console.log(`counter`, counter);

    if (numberRandom !== numberUser) {
      setPoints(points - 1);
      if (points !== 1) {
        if (numberRandom > numberUser) {
          setClue(`⬇ Too low!`);
          setNumberUser(``);
        } else {
          setClue(`⬆ Too high!`);
          setNumberUser(``);
        }
      } else {
        setTimmer(false);
        setCorrectAnswer(true);
        numberToGuessRandom();
        setScore(score + points);
        setPoints(10);
        setAciertos(aciertos + -1);
        setScore(score / 2);
        setTheme(`red`);
        setClue(`YOU LOSE!`);

        setTimeout(() => {
          setTheme(true);
          setClue(`Start guessing... `);
          setNumberUser(``);
          setTimmer(true);
          setCounter(60);
        }, 3000);
      }
    }

    /* if (points === 0 || counter === 0) {
      setTimmer(false);
      setCorrectAnswer(true);
      numberToGuessRandom();
      setScore(score + points);
      setPoints(10);
      setAciertos(aciertos + -1);
      setScore(score / 2);
      setTheme(`red`);
      setClue(`YOU LOSE!`);

      setTimeout(() => {
        setTheme(true);
        setClue(`Start guessing... `);
        setNumberUser(``);
        setTimmer(true);
        setCounter(60);
      }, 3000);
    } */
  };

  useEffect(() => {
    /*     let scoreUpdate = {
      userName: nameUser,
      score: score,
    };

    axios
      .post(`${API_URL}/scores`, scoreUpdate)
      .then((response) => setMyScore(response.data))
      .catch((error) => console.log(error)); */
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((response /* console.log(`soy la response del users`, response.data)) */) =>
        setAllScores(response.data)
      )
      .catch((error) => console.log(error));

    let userPlay = {
      userName: nameUser,
      score: score,
    };

    axios
      .post(`${API_URL}/user-home`, userPlay)
      .then((response /* console.log(`soy la response del users`, response.data)) */) =>
        setUserPlaying(response.data)
      )
      .catch((error) => console.log(error));

    numberToGuessRandom();
  }, [loadingName]);

  useEffect(() => {
    let scoreUpdate = {
      userName: nameUser,
      score: score,
    };

    axios
      .post(`${API_URL}/user-playing`, scoreUpdate)
      .then((response /* console.log(`soy la response del users`, response.data)) */) =>
        // console.log(`soy la response de USER PLAYING `, response)
        setUserPlaying(response.data)
      )
      .catch((error) => console.log(error));

    axios
      .post(`${API_URL}/scores`, scoreUpdate)
      .then((response) => setMyScore(response.data))
      .catch((error) => console.log(error));

    setTimeout(() => {
      axios
        .get(`${API_URL}/users`)
        .then(
          (response /* console.log(`soy la response del users`, response.data)) */) =>
            setAllScores(response.data),
          console.log(allScores)
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
          <div className='down-name'>
            <h1 className='rules-name'>Write one number and check</h1>
            <h1 className='rules-name'> See the clue</h1>
            <h1 className='rules-name'>Guess the number, you have 10 tries to get it right</h1>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={theme === `green` ? `green` : theme === `red` ? `red` : `black`}>
          <header className='header-guess'>
            <h1 className='your-name-guess'>Welcome {nameUser}</h1>
            <h1 className='guessNumber'>Guess the Number!</h1>
            <button class='btn again'>{counter}</button>
            <button class='btn again2'>{level}</button>
            <p className='between'>(Between 1 and {howNumbers})</p>
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
                  className='guess-central'
                  name='numberUser'
                  value={numberUser}
                  onChange={handleNumberUser}
                />
                <button className='btn check-central'>Check!</button>
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
