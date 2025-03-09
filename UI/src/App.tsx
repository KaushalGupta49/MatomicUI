import { Slider } from "./Components/ts/Slider";

export default function App() {
  return (
    <>
      <Slider />
      <Slider min={1} max={100} step={100} value={10} />
    </>
  );
}
