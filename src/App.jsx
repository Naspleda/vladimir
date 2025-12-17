import { useState, Suspense, lazy } from 'react';
import './App.css'
import LanternEffect from './components/LanternEffect';
import Navbar from './components/navbar/Navbar';
import AnimationIntro2 from './components/intro/AnimationIntro2';
import IntroCanvas from './components/intro/IntroCanvas';
import useSceneControls from './store/useSceneControls';

const Layout = lazy(() => import('./components/layout/Layout'));

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const { setKremlinAnimationFinished } = useSceneControls();

  return (
    <>
      {showIntro && (
        <IntroCanvas
          onComplete={() => {
            setShowIntro(false);
            setKremlinAnimationFinished(true);
          }}
        />
      )}
      <Suspense fallback={null}>
        <Layout />
      </Suspense>
    </>
  )
}

export default App
