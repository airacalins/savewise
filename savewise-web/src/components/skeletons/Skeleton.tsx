import { Skeleton as MuiSkeleton } from "@mui/material";

interface SkeletontProps {
  height?: number;
}

export const Skeleton: React.FC<SkeletontProps> = ({ height = 32 }) => {
  return <MuiSkeleton variant="rounded" sx={{ fontSize: `${height}px` }} />;
};
