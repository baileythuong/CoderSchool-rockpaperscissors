import React, { useState } from "react";
import "./App.css";

import ChoiceCard from "./components/ChoiceCard";
import NavBar from "./components/NavBar";

export const CHOICES = {
  scissors: {
    name: "scissors",
    url: "https://mrvb.nl/images/scissors.png"
  },
  paper: {
    name: "paper",
    url: "https://mrvb.nl/images/paper.png"
  },
  rock: {
    name: "rock",
    url: "https://mrvb.nl/images/rock.png"
  }
};

const defaultImg = {
  url:
    "https://andygrunwald.com/img/posts/playing-rock-paper-scissors-with-500-people/game-rules.png"
};

function App() {
  const [result, setResult] = useState("Start");
  const [gameHistory, setGameHistory] = useState([]);
  const [player, setPlayer] = useState(defaultImg);
  const [computer, setComputer] = useState(defaultImg);

  const roundOut = (pChoice, cChoice) => {
    if (pChoice === cChoice) return "TIE";
    else if (pChoice === "rock")
      return cChoice === "scissors" ? "WIN" : "LOSE";
    else if (pChoice === "paper")
      return cChoice === "rock" ? "WIN" : "LOSE";
    else if (pChoice === "scissors")
      return cChoice === "paper" ? "WIN" : "LOSE";
  };

  const randomComputersChoice = choices => {
    const listOfChoices = Object.keys(choices);
    const computersChoice = Math.floor(
      Math.random(listOfChoices.length) * listOfChoices.length
    ); // index of list
    return listOfChoices[computersChoice];
  };

  const onPlayerChoice = playersChoice => {
    console.log(playersChoice);
    const computersChoice = randomComputersChoice(CHOICES);
    console.log(computersChoice);
    const result = roundOut(playersChoice, computersChoice);
    console.log(result);
    setResult(result);
    setGameHistory(result);
    setGameHistory(gameHistory);
    gameHistory.push(result);
    setPlayer(CHOICES[playersChoice]);
    setComputer(CHOICES[computersChoice]);
  };

  const classColor = (target, res) => {
    console.log(res);

    if (res === "TIE") return "black";
    else if (res === "WIN") return target === "player" ? "winner" : "loser";
    else if (res === "LOSE")
      return target === "computer" ? "winner" : "loser";
  };

  return (
    <div className="App">
      <div className="navigation-bar">
        <NavBar />
      </div>
      <div className="container justify-content-start pb-4">
            <button
              className="btn btn-lg btn-warning mx-2"
              onClick={() => onPlayerChoice("rock")}
            >
              Rock
            </button>
            <button
              className="btn btn-lg btn-warning mx-2"
              onClick={() => onPlayerChoice("paper")}
            >
              Paper
            </button>
            <button
              className="btn btn-lg btn-warning mx-2"
              onClick={() => onPlayerChoice("scissors")}
            >
              Scissors
            </button>
          </div>
      <div className="container d-flex justify-content-center">
        <div className="row">
        <div className="col">
            <ChoiceCard
              title={"Player"}
              imgURL={player && player.url}
              winner={classColor("player", result)}
            />
          </div>
          <div className="col px-3 text-center my-5">
            <h1>{result}</h1>
          </div>
          <div className="col">
            <ChoiceCard
              title="Computer"
              imgURL={computer && computer.url}
              winner={classColor("computer", result)}
            />
          </div>
          <div className="col pull-right pl-4">
            <h2>History</h2>
            <ul>
              {gameHistory.map(result => {
                return <li>{result}</li>;
              })}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
