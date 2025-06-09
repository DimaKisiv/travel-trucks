import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import Navigation from "./components/Shared/Navigation/Navigation";
import Loader from "./components/Shared/Loader/Loader";
import store from "./redux/store";
import styles from "./App.module.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CampersPage = lazy(() => import("./pages/CampersPage/CampersPage"));
const CamperPage = lazy(() => import("./pages/CamperPage/CamperPage"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/campers" element={<CampersPage />} />
            <Route path="/campers/:id" element={<CamperPage />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
