import * as React from "react";
import MuiSlider, { type SliderProps as MuiSliderProps } from "@mui/material/Slider";

type SliderProps = MuiSliderProps;

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>((props, ref) => (
  <MuiSlider ref={ref} valueLabelDisplay="auto" {...props} />
));
Slider.displayName = "Slider";

export { Slider };
