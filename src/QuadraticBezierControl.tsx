import Circle from "./Circle";
import { QuadraticBezierProps } from "./QuadraticBezier";

interface QuadraticBezierControlProps extends QuadraticBezierProps {
  radius: number;
  selectNode: (event: React.MouseEvent, a:"start" | "end" | "control") => void
}

function QuadraticBezierControl(props: QuadraticBezierControlProps) {
  const circles = Object.entries(props.points).map(([key, [cx, cy]]) => (
  <Circle key={key} keyName={key} circle={{ cx, cy, r: props.radius }} selectNode={props.selectNode}/>
  ));
  return <g>{circles}</g>;
}

export default QuadraticBezierControl;
