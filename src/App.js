import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClockApp from "./ClockApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClockApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;