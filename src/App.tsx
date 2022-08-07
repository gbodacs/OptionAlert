import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Alert from "./Ui/components/layout/Alert";
import Footer from "./Ui/components/layout/Footer";
import NavBar from "./Ui/components/layout/NavBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import About from "./Ui/pages/About";
import AddNew from "./Ui/pages/AddNew";
import NotFound from "./Ui/pages/NotFound";
import Settings from "./Ui/pages/Settings";
import AlertList from "./Ui/pages/AlertList";

function App() {
  return (
        <>
          <Router>
            <div className="flex flex-col justify-between">
              <NavBar title="Option Alert" />

              <main className="container mx-auto px-3 pb-12">
                <Routes>
                  <Route path="/" element={<AddNew />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/alertlist" element={<AlertList />} />
                  <Route path="/notfound" element={<NotFound />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </Router>
          <ToastContainer />
        </>
  );
}

export default App;
