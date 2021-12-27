import { CubicBezierProps } from "./CubicBezier";
import Circle from "./Circle";

interface CubicBezierControlProps extends CubicBezierProps {
  radius: number;
  selectNode: (event: React.MouseEvent, a: string) => void;
}

function CubicBezierControl(props: CubicBezierControlProps) {
  const circles = Object.entries(props.points).map(([key, [cx, cy]]) => (
    <Circle
      key={key}
      keyName={key}
      circle={{ cx, cy, r: props.radius }}
      fill="blue"
      selectNode={props.selectNode}
    />
  ));
  return (
    <g>
      <path
        className="control cubic"
        d={`M ${props.points.start[0]} ${props.points.start[1]} L ${props.points.control1[0]} ${props.points.control1[1]}}`}
      />
      <path
        className="control cubic"
        d={`M ${props.points.end[0]} ${props.points.end[1]} L ${props.points.control2[0]} ${props.points.control2[1]}}`}
      />
      {circles}
    </g>
  );
}

export default CubicBezierControl;
