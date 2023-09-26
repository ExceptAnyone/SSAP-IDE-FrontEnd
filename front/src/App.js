import "./App.css";
import Chat from "./components/chat/Chat";

function App() {
  // test 컨테이너ID
  const roomId =
    "aa0cea7dcd81cbea0fe690aa72b8520b6dfce49e35e418c0a0c32f88f24a1056";

  return (
    <div className="App">
      <Chat roomId={roomId} />
    </div>
  );
}

export default App;
