import ClampText from "./Clamp";

export default function App() {
  return (
    <div className="p-6">
      <ClampText minSize={14} maxSize={20}>
        This text scales from 14px to 20px.
      </ClampText>
      <ClampText minSize={16} maxSize={32}>
        This text scales from 16px to 32px.
      </ClampText>
      <ClampText minSize={18} maxSize={40}>
        This text scales from 18px to 40px.
      </ClampText>

      <ClampText minSize={16} maxSize={32} scale={3}>
        Faster scaling (3vw).
      </ClampText>
      <ClampText minSize={16} maxSize={32} scale={1}>
        Slower scaling (1vw).
      </ClampText>
    </div>
  );
}
