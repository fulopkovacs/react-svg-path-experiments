import Circle from "./Circle";
import { QuadraticBezierProps } from "./QuadraticBezier";

interface QuadraticBezierControlProps extends QuadraticBezierProps {
  radius: number;
  selectNode: (event: React.MouseEvent, a: string) => void;
}

function QuadraticBezierControl(props: QuadraticBezierControlProps) {
  const circles = Object.entries(props.points).map(([key, [cx, cy]]) => (
    <Circle
      key={key}
      keyName={key}
      circle={{ cx, cy, r: props.radius }}
      selectNode={props.selectNode}
    />
  ));
  return (
    <g>
      <path
        className="control quadratic"
        d={`M ${props.points.start[0]} ${props.points.start[1]} L ${props.points.control[0]} ${props.points.control[1]}}`}
      />
      <path
        className="control quadratic"
        d={`M ${props.points.end[0]} ${props.points.end[1]} L ${props.points.control[0]} ${props.points.control[1]}}`}
      />
      {circles}
    </g>
  );
}

export default QuadraticBezierControl;
