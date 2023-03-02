import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignUp from './pages/LoginSignUp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
