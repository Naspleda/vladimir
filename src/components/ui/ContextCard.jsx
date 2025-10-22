const ContextCard = ({ title, subtitle, text, text2, imageUrl, className }) => {
  return (
    <div className={`bg-black/30 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 md:p-8 max-h-[450px] md:max-h-none text-white ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
          {/* Columna izquierda - Texto */}
          <div className="space-y-2 md:space-y-4 order-1 md:order-1">
            <h1 className="text-lg md:text-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent block bg-clip-text font-extrabold">
              {title || 'Estrategia y analisis'}
            </h1>
            <h3 className="text-xl md:text-4xl font-semibold bg-white text-transparent block bg-clip-text leading-tight">
              {subtitle || 'El núcleo de la operación'}
            </h3>
            <div className="space-y-2">
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                {text || 'Texto'}
              </p>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                {text2 || 'Texto adicional'}
              </p>
            </div>
          </div>
          
          {/* Columna derecha - Imagen */}
          <div className="flex justify-center items-center order-2 md:order-2">
            <img 
              src={imageUrl}
              alt={title || 'Context card image'}
              className="w-full max-w-[200px] md:max-w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
  );
}

export default ContextCard;