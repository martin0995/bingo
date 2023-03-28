const winningMatrix = [
  // Horizontal lines
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  // Vertical lines
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  // Diagonal lines
  [0, 6, 18, 24],
  [4, 8, 16, 20],
];

export default winningMatrix;
