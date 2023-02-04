import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouting from "./AppRouting";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* ----------for beautiful alert container */}
        <ToastContainer position="top-left" limit={10} />
        <Header />
        <AppRouting />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
