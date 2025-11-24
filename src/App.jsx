import { useState, useEffect } from 'react';
import './App.css'
import LanternEffect from './components/LanternEffect';
import Navbar from './components/navbar/Navbar';
import AnimationIntro from './components/intro/AnimationIntro';

import Layout from './components/layout/Layout';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <AnimationIntro onComplete={() => setShowIntro(false)} />}
      <Layout />
    </>
  )
}

export default App
