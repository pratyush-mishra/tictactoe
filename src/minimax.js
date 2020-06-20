function isMovesLeft(squares) {
    for(let i = 0; i< squares.length; i++){
        if(!squares[i])
            return true;
    }

    return false;
}

function evaluate(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        if(squares[a] == 'X')
            return 10;
        else if(squares[a] == 'O')
            return -10;
      }
    }
    return null;
}

function minimax(squares, depth, xIsNext) {
    let score = evaluate(squares);

    if(score == 10 ){
        console.log(score-depth);
        return score - depth;
    }
    if(score == -10) {
        console.log(score-depth);
        return score + depth;
    }

    if(!isMovesLeft)
        return 0;

    if(xIsNext){
        let best = -Infinity;
        for(let i = 0; i< squares.length; i++) {
            if(!squares[i])
            {
                squares[i] = 'X';
                best = Math.max(best, minimax(squares, depth+1, !xIsNext))
                squares[i] = null;
            }
        }

        return best;
    }

    else{
        let best = Infinity;
        for(let i = 0; i< squares.length; i++) {
            if(!squares[i])
            {
                squares[i] = 'O';
                best = Math.min(best, minimax(squares, depth+1, !xIsNext))
                squares[i] = null;
            }
        }
        return best;
    }
}

export function findBestMove(squares) {
    let bestVal = Infinity;
    let movPos = null;
    for(let i=0; i<squares.length; i++) {
        if(!squares[i]){
            squares[i] = 'O';
            let moveVal = minimax(squares, 0, true);
            squares[i] = null;
            if(moveVal < bestVal)
            {
                movPos = i;
                bestVal = moveVal;
            }
        }
    }
    return movPos;
    //console.log("Best move is " + movPos + " " + bestVal);
}


//const squares = Array(9).fill(null);
//squares[0] = 'O';
//squares[1] = 'O';
//squares[2] = 'X';
//squares[3] = 'O';
//squares[4] = 'X';
//squares[6] = 'O';
//squares[8] = 'X';
//findBestMove(squares);