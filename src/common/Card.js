import React, { useState, useEffect } from "react";
import famousSongs from "../utils/famousSongs";

const Card = ({
  number,
  index,
  onCellClick,
  coveredSquares,
  completedPattenrs,
  toggle,
}) => {
  const [crossNumber, setCrossNumber] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState(false);

  const clickedNumber = () => {
    setCrossNumber(!crossNumber);
    onCellClick();
  };

  // If new game, set all cells to default:
  useEffect(() => {
    if (!coveredSquares.length) {
      setCrossNumber(false);
      setWinnerIndex(false);
    }
    if (completedPattenrs.includes(index)) {
      setWinnerIndex(true);
    }
  }, [coveredSquares, completedPattenrs]);

  return (
    <div
      className={
        winnerIndex
          ? "flex flex-col h-full justify-between ease-in-out duration-500 bg-green-200 z-5 rounded-lg"
          : "flex flex-col h-full justify-between"
      }
    >
      <div className="flex flex-row-reverse p-1">
        <p
          className={
            crossNumber
              ? "ease-in-out duration-300 text-xs opacity-25"
              : "text-xs"
          }
        >
          {index}
        </p>
      </div>
      <div
        onClick={clickedNumber}
        className={
          crossNumber
            ? "ease-in-out duration-300 opacity-25 line-through h-full"
            : "h-full"
        }
      >
        {toggle ? (
          <div className="w-[60px] sm:w-auto">
            <p className="text-[8px] w-full sm:text-base font-semibold text-center">
              {famousSongs[number].song}
            </p>
            <p class="text-[6px] w-full sm:text-xs text-center">
              {famousSongs[number].artist}
            </p>
          </div>
        ) : (
          <p className="font-bold text-lg">{number}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
