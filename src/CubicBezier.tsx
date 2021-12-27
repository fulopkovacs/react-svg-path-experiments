export interface CubicBezierProps {
  points: {
    start: [number, number];
    control1: [number, number];
    control2: [number, number];
    end: [number, number];
  };
}

function CubicBezier(props: CubicBezierProps) {
  return (
    <path
      d={`M ${props.points.start[0]} ${props.points.start[1]} C ${props.points.control1[0]} ${props.points.control1[1]} ${props.points.control2[0]} ${props.points.control2[1]} ${props.points.end[0]} ${props.points.end[1]}`}
      stroke="black"
      fill="transparent"
      strokeWidth="0.3"
    />
  );
}

export default CubicBezier;
