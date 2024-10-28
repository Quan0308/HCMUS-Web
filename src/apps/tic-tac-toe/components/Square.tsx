interface SquareProps {
    value: string | null;
    onClick: () => void;
    isWinningSquare: boolean;
    isCurrentSquare: boolean;
    disable: boolean;
}

export default function Square(props: SquareProps) {
    const { isWinningSquare, isCurrentSquare, disable } = props;
    let className = `square ${isCurrentSquare ? 'current-square' : ''}`;
    className += isWinningSquare ? ' winning-square' : '';

    return (
        <button className={className} onClick={props.onClick} disabled={disable}>
            {props.value}
        </button>
    )
}