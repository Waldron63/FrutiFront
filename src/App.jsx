import { HashRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutesP";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
