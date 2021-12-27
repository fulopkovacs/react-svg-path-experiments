import React, { useEffect } from "react";
import SvgImage from "./SvgImage";
import QuadraticBezier from "./QuadraticBezier";
import { QuadraticBezierProps } from "./QuadraticBezier";
import QuadraticBezierControl from "./QuadraticBezierControl";
import CubicBezier, { CubicBezierProps } from "./CubicBezier";
import CubicBezierControl from "./CubicBezierControl";

function App() {
  const [quadraticBezierData, setQuadraticBezierData] =
    React.useState<QuadraticBezierProps>({
      points: { start: [1, 5], end: [7, 5], control: [3, 1] },
    });

  const [cubicBezierData, setCubicBezierData] =
    React.useState<CubicBezierProps>({
      points: {
        start: [1, 6],
        end: [7, 3],
        control1: [4, 1],
        control2: [4, 7],
      },
    });

  const [selectedPoint, setSelectedPoint] = React.useState<{
    type: string;
    node: string;
  } | null>(null);

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
    setSelectedPoint(null);
  }

  function handleMouseMove(event: React.MouseEvent) {
    if (selectedPoint) {
      ctm = svgRef.current!.getScreenCTM();
      if (ctm) {
        let newSVGCoordinatesX = (event.clientX - ctm.e) / ctm.a;
        let newSVGCoordinatesY = (event.clientY - ctm.f) / ctm.d;
        let fn =
          selectedPoint.type === "quadratic"
            ? setQuadraticBezierData
            : setCubicBezierData;

        let data =
          selectedPoint.type === "quadratic"
            ? quadraticBezierData.points
            : cubicBezierData.points;
        fn({
          points: Object.assign(data, {
            [selectedPoint.node]: [
              newSVGCoordinatesX + offset.x,
              newSVGCoordinatesY + offset.y,
            ],
          }),
        });
      }
    }
  }

  function selectQuadraticBezierNode(event: React.MouseEvent, keyName: string) {
    setSelectedPoint({ type: "quadratic", node: keyName });

    if (ctm) {
      let clickInSVGCoordinatesX = (event.clientX - ctm.e) / ctm.a;
      let clickInSVGCoordinatesY = (event.clientY - ctm.f) / ctm.d;
      setOffset({
        x: quadraticBezierData.points[keyName][0] - clickInSVGCoordinatesX,
        y: quadraticBezierData.points[keyName][1] - clickInSVGCoordinatesY,
      });
    }
  }

  function selectCubicBezierNode(event: React.MouseEvent, keyName: string) {
    setSelectedPoint({ type: "cubic", node: keyName });
    if (ctm) {
      let clickInSVGCoordinatesX = (event.clientX - ctm.e) / ctm.a;
      let clickInSVGCoordinatesY = (event.clientY - ctm.f) / ctm.d;
      setOffset({
        x: cubicBezierData.points[keyName][0] - clickInSVGCoordinatesX,
        y: cubicBezierData.points[keyName][1] - clickInSVGCoordinatesY,
      });
    }
  }

  return (
    <div className="App">
      <h1>Quadratic and Cubic Bézier-curves</h1>
      <SvgImage
        ref={svgRef}
        viewBox={[0, 0, 10, 10]}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <QuadraticBezier points={quadraticBezierData.points} />
        <CubicBezier points={cubicBezierData.points} />
        <QuadraticBezierControl
          points={quadraticBezierData.points}
          radius={0.5}
          selectNode={selectQuadraticBezierNode}
        />
        <CubicBezierControl
          points={cubicBezierData.points}
          radius={0.5}
          selectNode={selectCubicBezierNode}
        />
      </SvgImage>
    </div>
  );
}

export default App;
