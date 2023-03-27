import CircularProgress from "@mui/material/CircularProgress";

type LoadingProps = {
  style?: JSX.Element;
};
export default function Loading({ style }: LoadingProps) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        ...style,
      }}
    >
      <CircularProgress />
    </div>
  );
}