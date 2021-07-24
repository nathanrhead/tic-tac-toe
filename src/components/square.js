// React component 1 of 3: a "controlled component" (by the Board component)
export default function Square(props) {
  let winIndex = null;
  if (props.winner) {
    const winner = props.winner[1];
    for (let i = 0; i < winner.length; i++) {
      if (props.index === winner[i]) winIndex = 'winner';
    }
  }

  return (
    <button
      className="square"
      id={winIndex}
      tabIndex="0"
      index={props.index}
      winner={props.winner}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
