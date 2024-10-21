import Square from "./Square.tsx";

interface BoardProps {
    squares: string[];
    onClick: (i: number) => void;
    size: number;
    winningLine : number[] | null;
    currentSquare: number | null;
    winner: string | null;
}

export default function Board(props: BoardProps) {
    const { size, squares, onClick, winningLine, currentSquare, winner } = props;
    const board = [];
    const renderSquare = (i: number) => {
        const isWiningSquare = winningLine ? winningLine.includes(i) : false;
        const isCurrentSquare = currentSquare === i;
        return (
           <Square value={squares[i]} onClick={() => onClick(i)} isWinningSquare={isWiningSquare} isCurrentSquare={isCurrentSquare} disable={!!winner}/>
        );
    }


    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(renderSquare(i * size + j));
        }
        board.push(<div key={`row ${i}`} className="board-row">{row}</div>);
    }

    return (
        <div>
            {board}
        </div>
    );
}