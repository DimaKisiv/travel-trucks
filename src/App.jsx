import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import Navigation from './components/Navigation/Navigation';
import store from './redux/store';
import styles from './App.module.css'; // Import CSS module for main layout

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CampersPage = lazy(() => import('./pages/CampersPage/CampersPage'));
const CamperPage = lazy(() => import('./pages/CamperPage/CamperPage'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <main className={styles.main}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/campers" element={<CampersPage />} />
              <Route path="/campers/:id" element={<CamperPage />} />
            </Routes>
          </Suspense>
        </main>
      </Router>
    </Provider>
  );
}

export default App;