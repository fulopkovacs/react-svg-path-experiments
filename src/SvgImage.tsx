import React from "react";
import { ReactNode } from "react";

interface SvgImageProps {
  viewBox: number[];
  children: ReactNode;
  onMouseMove: React.MouseEventHandler<SVGSVGElement>;
  onMouseUp: React.MouseEventHandler<SVGSVGElement>;
}

export type Ref = SVGSVGElement;

const SvgImage = React.forwardRef<Ref, SvgImageProps>((props, ref) => (
  <svg
    id="svg-image"
    viewBox={props.viewBox.join(" ")}
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    onMouseMove={props.onMouseMove}
    onMouseUp={props.onMouseUp}
  >
    {props.children}
  </svg>
));

export default SvgImage;
