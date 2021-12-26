export interface QuadraticBezierProps {
  points: {
    start: [number, number];
    control: [number, number];
    end: [number, number];
  };
}

function QuadraticBezier(props: QuadraticBezierProps) {
  return (
    <path
      className="svg-output"
      d={`M ${props.points.start[0]} ${props.points.start[1]} Q ${props.points.control[0]} ${props.points.control[1]} ${props.points.end[0]} ${props.points.end[1]}`}
      stroke="black"
      fill="transparent"
      strokeWidth="0.3"
    />
  );
}

export default QuadraticBezier;
