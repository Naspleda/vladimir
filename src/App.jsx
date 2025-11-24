import { useState, Suspense, lazy } from 'react';
import './App.css'
import LanternEffect from './components/LanternEffect';
import Navbar from './components/navbar/Navbar';
import AnimationIntro from './components/intro/AnimationIntro';

const Layout = lazy(() => import('./components/layout/Layout'));

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <AnimationIntro onComplete={() => setShowIntro(false)} />}
      <Suspense fallback={null}>
        <Layout />
      </Suspense>
    </>
  )
}

export default App
