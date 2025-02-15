import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages";
import ChatPage from "./pages/chat";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="c/:id" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
