import "./App.css";
import { useState, useEffect } from "react";
import Card from "./common/Card";
import Confetti from "react-confetti";
import winningMatrix from "./utils/winningMatrix";
import star from "./images/star.png";
import ReactAudioPlayer from "react-audio-player";
import winningSound from "./audio/winning.wav";

function App() {
  const [numbers, setNumbers] = useState(generateNumbers()); // Generate random numbers for the game.
  const [coveredSquares, setCoveredSquares] = useState([]); // Array with selected indexes (to check when a user wins)
  const [reward, setReward] = useState(false);
  const [winningPatterns, setWinningPatterns] = useState(winningMatrix);
  const [completedPattenrs, setcompletedPattenrs] = useState([]);
  const [toggle, setToggle] = useState(false);

  function generateNumbers() {
    const numbers = [];

    while (numbers.length < 25) {
      const number = Math.floor(Math.random() * 75) + 1;
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
    return numbers;
  }

  // Add selected indexes to the winning array:
  const handleSquareClick = (index) => {
    const indexInArray = coveredSquares.indexOf(index);

    if (indexInArray !== -1) {
      // The square was already covered, remove it from the array
      setCoveredSquares((prev) => {
        const newArray = [...prev];
        newArray.splice(indexInArray, 1);
        return newArray;
      });
    } else {
      // The square was not covered yet, add it to the array
      setCoveredSquares((prev) => [...prev, index]);
    }
  };

  const checkWinner = () => {
    for (const pattern of winningPatterns) {
      if (pattern.every((square) => coveredSquares.includes(square))) {
        // The player has completed the pattern, show an alert
        setcompletedPattenrs([...completedPattenrs, pattern]);
        setReward(true);
        setWinningPatterns(winningPatterns.filter((p) => p !== pattern));
        setTimeout(() => {
          setReward(false);
        }, 8000);
      }
    }
  };

  useEffect(() => {
    checkWinner();
  }, [coveredSquares]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div
      className={
        toggle
          ? "bg-gradient-to-r from-pink-400 to-yellow-400 h-screen lg:w-screen w-fit px-4 flex flex-col justify-around"
          : "bg-gradient-to-r from-pink-400 to-yellow-400 h-screen lg:max-w-screen px-4 flex flex-col justify-around"
      }
    >
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          class="sr-only peer"
          onClick={() => {
            handleToggle();
            setCoveredSquares([]);
            setReward(false);
            setWinningPatterns(winningMatrix);
            setcompletedPattenrs([]);
          }}
        />
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-green-300 to-blue-400"></div>
        <span class="ml-3 text-sm font-medium">
          {toggle ? "Music Bingo" : "Classic"}
        </span>
      </label>

      {reward && (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <ReactAudioPlayer src={winningSound} autoPlay />
        </>
      )}

      <div className="mx-auto sm:w-3/4 sm:h-3/4 md:w-3/4 lg:w-2/3">
        <table
          className="bg-white rounded -rotate-2 p-4"
          id={reward && "table-spin"}
        >
          <tbody>
            {[0, 1, 2, 3, 4].map((rowIndex) => (
              <tr key={rowIndex}>
                {[0, 1, 2, 3, 4].map((colIndex) => {
                  // We get the exact index of the cell:
                  const index = rowIndex * 5 + colIndex;
                  //The middle square is located at index 12. isMiddleSquare is a boolean:
                  const isMiddleSquare = index === 12;
                  return (
                    <td
                      key={colIndex}
                      className="sm:w-[110px] sm:h-[110px] w-[80px] h-[80px]"
                    >
                      {isMiddleSquare ? (
                        <img
                          src={star}
                          alt="Star"
                          className="mx-auto"
                          id={reward ? "icon" : ""}
                        />
                      ) : (
                        <Card
                          number={numbers[index - (index > 12 ? 1 : 0)]}
                          index={index}
                          onCellClick={() => handleSquareClick(index)}
                          coveredSquares={coveredSquares}
                          completedPattenrs={completedPattenrs.flat()}
                          toggle={toggle}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center p-2 mb-2">
        <button
          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 gap-2 p-2 text-lg rounded-full bg-gradient-to-r from-green-300 to-blue-400"
          onClick={() => {
            setNumbers(generateNumbers());
            setCoveredSquares([]);
            setReward(false);
            setWinningPatterns(winningMatrix);
            setcompletedPattenrs([]);
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default App;
