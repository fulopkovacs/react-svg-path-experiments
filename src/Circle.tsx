interface CircleProps {
  circle: {
    cx: number;
    cy: number;
    r: number;
  };
  keyName: "start" | "end" | "control";
  selectNode: (e:React.MouseEvent, a:"start"|"end"|"control")=> void;
}

function Circle(props: CircleProps) {
  return (
    <circle
      cx={props.circle.cx}
      cy={props.circle.cy}
      r={props.circle.r}
      fill="red"
      onMouseDown={(event)=> props.selectNode(event, props.keyName)}
    />
  );
}

export default Circle;
