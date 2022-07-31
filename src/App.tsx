import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Alert from "./Ui/components/layout/Alert";
import Footer from "./Ui/components/layout/Footer";
import NavBar from "./Ui/components/layout/NavBar";

import About from "./Ui/pages/About";
import Home from "./Ui/pages/Home";
import NotFound from "./Ui/pages/NotFound";

function App() {
  return (
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <NavBar title="Option Alert" />

            <main className="container mx-auto px-3 pb-12">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
  );
}

export default App;
