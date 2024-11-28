import { useState } from 'react'
import './App.css'
import LanternEffect from './components/LanternEffect';

function App() {
  const [count, setCount] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left - 50, // Ajusta para centrar el círculo
      y: e.clientY - rect.top - 50,  // Ajusta para centrar el círculo
    });
  };

  const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'black',
  }

  const imgStyle = {
    width: '100%',
    height: 'auto',
    opacity: 0.1,
    position: 'relative',
  }
  

  return (
    <>
      <div style={style} id='mouse' onMouseMove={handleMouseMove}>
        <img 
          src="https://gecdesigns.com/_next/image?url=https%3A%2F%2Fasset.gecdesigns.com%2Fimg%2Fwallpapers%2Fbeautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp&w=3840&q=75" 
          style={imgStyle} 
          alt="Beautiful Fantasy Wallpaper"
        />
        <LanternEffect x={mousePosition.x} y={mousePosition.y} />
      </div>
    </>
  );
}

export default App
