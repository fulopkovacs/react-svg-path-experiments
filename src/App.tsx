import React, { useEffect } from "react";
import SvgImage from "./SvgImage";
import QuadraticBezier from "./QuadraticBezier";
import { QuadraticBezierProps } from "./QuadraticBezier";
import QuadraticBezierControl from "./QuadraticBezierControl";

function App() {
  const [quadraticBezierData, setQuadraticBezierData] =
    React.useState<QuadraticBezierProps>({
      points: { start: [1, 5], end: [7, 5], control: [3, 1] },
    });

  const [selectedPoint, setSelectedPoint] = React.useState<"start" | "end" | "control" | null>(
    null
  );

  const [offset, setOffset] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const svgRef = React.createRef<SVGSVGElement>();

  let ctm: DOMMatrix | null;

  useEffect(() => {
    if (svgRef.current) ctm = svgRef.current.getScreenCTM();
  });

  function handleMouseUp() {
    setOffset({ x: 0, y: 0 });
    setSelectedPoint(null)
  }

  function handleMouseMove(event: React.MouseEvent) {
    if (selectedPoint) {
      ctm = svgRef.current!.getScreenCTM();
      if (ctm) {
        let newSVGCoordinatesX = (event.clientX - ctm.e) / ctm.a;
        let newSVGCoordinatesY = (event.clientY - ctm.f) / ctm.d;
        setQuadraticBezierData({points: Object.assign(quadraticBezierData.points, {[selectedPoint]: [newSVGCoordinatesX + offset.x, newSVGCoordinatesY + offset.y]})})
      }
    }
  }

  function selectNode(event: React.MouseEvent, keyName: "start"| "end"| "control") {
    setSelectedPoint(keyName);

    if (ctm) {

      let clickInSVGCoordinatesX = (event.clientX - ctm.e) / ctm.a;
      let clickInSVGCoordinatesY = (event.clientY - ctm.f) / ctm.d;
      setOffset({
        x: quadraticBezierData.points[keyName][0] - clickInSVGCoordinatesX,
        y: quadraticBezierData.points[keyName][1] - clickInSVGCoordinatesY,
      });
    }
  }

  return (
    <div className="App">
      <h1>Quadratic Bézier-curve</h1>
      <SvgImage
        ref={svgRef}
        viewBox={[0, 0, 10, 10]}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <QuadraticBezier points={quadraticBezierData.points} />
        <QuadraticBezierControl
          points={quadraticBezierData.points}
          radius={0.5}
          selectNode={selectNode}
        />
      </SvgImage>
    </div>
  );
}

export default App;
