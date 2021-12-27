interface CircleProps {
  circle: {
    cx: number;
    cy: number;
    r: number;
  };
  fill?: string;
  keyName: string;
  selectNode?: (e: React.MouseEvent, a: string) => void;
}

function Circle(props: CircleProps) {
  return (
    <circle
      cx={props.circle.cx}
      cy={props.circle.cy}
      r={props.circle.r}
      fill={props.fill || "red"}
      onMouseDown={(event) => props.selectNode(event, props.keyName)}
    />
  );
}

export default Circle;
