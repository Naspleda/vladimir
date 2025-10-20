const ContextCard = ({ title, subtitle, text, text2, imageUrl, className }) => {
  return (
    <div className={`bg-black/30 backdrop-blur-2xl border border-white/15 rounded-2xl p-[3rem] lg:p-[5rem] text-white ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Columna izquierda - Texto */}
          <div className="space-y-2">
            <h1 className="text-1xl lg:text-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent inline-block bg-clip-text font-extrabold py-2">
              {title || 'ScienceDivision'}
            </h1>
            <h3 className="text-2xl lg:text-5xl font-semibold bg-white text-transparent inline-block bg-clip-text">
              {subtitle || 'El cerebro detrás de la máquina'}
            </h3>
            <p className="text-sm lg:text-xl text-white/80">
              {text || 'Texto'}
            </p>
            <p className="text-sm lg:text-xl text-white/80">
              {text2 || 'Texto adicional'}
            </p>
          </div>
          
          {/* Columna derecha - Imagen */}
          <div className="flex justify-center items-center">
            <img 
              src={imageUrl}
              alt={title || 'Context card image'}
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
  );
}

export default ContextCard;
