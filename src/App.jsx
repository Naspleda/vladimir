import { useState, useEffect } from 'react';
import './App.css'
import LanternEffect from './components/LanternEffect';
import Navbar from './components/navbar/Navbar';
import IntroVideo from './components/intro/IntroVideo';

import Layout from './components/layout/Layout';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* {showIntro && <IntroVideo onComplete={() => setShowIntro(false)} />} */}
      <Layout />
    </>
  )
}

export default App
