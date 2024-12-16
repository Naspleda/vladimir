function App() {
    const [count, setCount] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
    const [darkMode, setDarkMode] = useState(false);
  
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    }, []);
  
    const toggleDarkMode = () => {
      if (darkMode) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      setDarkMode(!darkMode);
    };
  
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
      overflow: 'auto',
    }
  
    const imgStyle = {
      width: '100vw',
      height: 'auto',
      opacity: 1,
      position: 'relative',
      overflow: 'hidden',
      objectFit: 'cover',
    }
    
    const rr = {
      // backgroundColor: 'gray',
    }
  
    return (
      <>
      
        <div style={style} id='mouse' onMouseMove={handleMouseMove}>
          {/* <img 
            src="https://img.freepik.com/foto-gratis/ta-prohm-angkor-wat-camboya_335224-1244.jpg?t=st=1732809821~exp=1732813421~hmac=663b24123cc18e1148479e8ce091f0f47f9593f5f177a44e57996da8bbbe39f2&w=996" 
            style={imgStyle} 
            alt="Beautiful Fantasy Wallpaper"
          /> */}
          {/* <LanternEffect x={mousePosition.x} y={mousePosition.y}> */}
          <div className='container mx-auto my-auto'>
            <Navbar />
          </div>
  
          <AuroraBackgroundDemo></AuroraBackgroundDemo>
  
          <div className="container mx-auto my-auto">
            {/* <button
              onClick={toggleDarkMode}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button> */}
         
            <div className="container columns-3 mx-auto" style={{ display: 'flex', maxWidth: '100vw' }}>
              <div className='break-inside-avoid-column mx-auto'>
                <ThreeDCardDemo title="titulo"></ThreeDCardDemo>
              </div>
              <div className='break-inside-avoid-column mx-auto'>
                <ThreeDCardDemo></ThreeDCardDemo>
              </div>
              <div className='break-inside-avoid-column mx-auto'>
                <ThreeDCardDemo></ThreeDCardDemo>
              </div>
            </div>
          {/* </LanternEffect> */}
        </div>
        </div>
      </>
    );
  }