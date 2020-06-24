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
        if(squares[a] == 'O')
            return 10;
        else if(squares[a] == 'X')
            return -10;
      }
    }
    return null;
}

function minimax(squares, depth, isMaximising) {
    let score = evaluate(squares);

    if(score == 10 ){
        return score - depth;
    }
    if(score == -10) {
        return score + depth;
    }

    if(!isMovesLeft)
        return 0;

    if(isMaximising){
        let best = -Infinity;
        for(let i = 0; i< squares.length; i++) {
            if(!squares[i])
            {
                squares[i] = 'O';
                let score = minimax(squares, depth+1, false);
                squares[i] = null;
                best = Math.max(score, best);
            }
        }

        return best;
    }

    else{
        let best = Infinity;
        for(let i = 0; i< squares.length; i++) {
            if(!squares[i])
            {
                squares[i] = 'X';
                let score = minimax(squares, depth+1, true);
                squares[i] = null;
                best = Math.min(score, best);
            }
        }
        return best;
    }
}

export function findBestMove(squares) {
    let bestScore = -Infinity;
    let movPos = null;
    //bestVal = minimax(squares, 0, false)
    for(let i=0; i<squares.length; i++) {
        if(!squares[i]){
            squares[i] = 'O';
            let moveVal = minimax(squares, 0, false);
            squares[i] = null;
            if(moveVal > bestScore)
            {
                movPos = i;
                bestScore = moveVal;
            }
        }
    }
    return movPos;
    //console.log(bestScore + " " + movPos);
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