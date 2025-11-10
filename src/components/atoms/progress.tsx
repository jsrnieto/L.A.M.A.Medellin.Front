import * as React from "react";
import LinearProgress, { type LinearProgressProps } from "@mui/material/LinearProgress";

type ProgressProps = LinearProgressProps;

const Progress = React.forwardRef<HTMLSpanElement, ProgressProps>((props, ref) => (
  <LinearProgress ref={ref} variant={props.value != null ? "determinate" : "indeterminate"} {...props} />
));
Progress.displayName = "Progress";

export { Progress };
