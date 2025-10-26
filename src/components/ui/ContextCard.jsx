const ContextCard = ({ title, subtitle, text, text2, imageUrl, className, backgroundClass }) => {
  // Clase de fondo por defecto
  const defaultBg = "bg-[radial-gradient(120%_90%_at_0%_100%,rgba(217,70,239,0.25),transparent_60%),radial-gradient(80%_80%_at_100%_40%,rgba(34,211,238,0.45),transparent_60%),linear-gradient(180deg,#0b0b10_0%,#020617_100%)]";
  
  return (
    <div className={`
      ${backgroundClass || defaultBg}
      backdrop-blur-3xl 
      backdrop-saturate-150
      before:absolute before:inset-0 before:bg-black/20 before:backdrop-blur-lg before:rounded-2xl before:-z-10
      relative
      border border-white/15 rounded-2xl p-4 md:p-8 h-[550px] md:max-h-none text-white ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center relative z-10">
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