import { useState } from 'react'
import './App.css'
import LanternEffect from './components/LanternEffect';
import Navbar from './components/navbar/Navbar';
import Scene from './components/Scene';

function App() {
  const [count, setCount] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left, // Coordenadas relativas al contenedor
      y: e.clientY - rect.top,
    });
  };

  const style = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'black',
  }

  const imgStyle = {
    width: '100%',
    height: 'auto',
    opacity: 1,
    position: 'relative',
    overflow: 'hidden',
    objectFit: 'cover',
  }
  

  return (
    <>
      <div style={style} id='mouse' onMouseMove={handleMouseMove}>
        {/* <img 
          src="https://img.freepik.com/foto-gratis/ta-prohm-angkor-wat-camboya_335224-1244.jpg?t=st=1732809821~exp=1732813421~hmac=663b24123cc18e1148479e8ce091f0f47f9593f5f177a44e57996da8bbbe39f2&w=996" 
          style={imgStyle} 
          alt="Beautiful Fantasy Wallpaper"
        /> */}
        <Navbar />
        {/* <LanternEffect x={mousePosition.x} y={mousePosition.y} /> */}
        <div className='container bg-slate-900'>
          <Scene />
        </div>
      </div>
    </>
  );
}

export default App
