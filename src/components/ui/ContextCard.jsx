const ContextCard = ({
  title,
  subtitle,
  text,
  text2,
  imageUrl,
  className,
  gradientColors = {
    primary: 'bg-purple-700',
    secondary: 'bg-blue-600'
  },
  buttonText = "Lo quiero"
}) => {
  return (
    <div className={`
      backdrop-blur-md
      bg-black/10
        relative overflow-hidden
        border border-white/15 rounded-2xl p-4 md:p-8 h-[80vh] md:h-[550px] md:max-h-none overflow-y-auto md:overflow-visible text-white ${className}`}>

      {/* Efecto de fondo granular - Con colores personalizables */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4">
        <div className={`h-[200px] w-[400px] rounded-full ${gradientColors.primary} opacity-30 blur-[100px]`}></div>
      </div>

      <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4">
        <div className={`h-[150px] w-[300px] rounded-full ${gradientColors.secondary} opacity-25 blur-[80px]`}></div>
      </div>

      {/* Backdrop blur y overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl"></div>

      {/* Contenido existente */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Contenido principal (Grid) */}
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
            <div className="mt-auto pt-6 flex justify-center">
              <a
                href="https://t.me/KremlinTrading_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                {buttonText}
              </a>
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
    </div>
  );
}

export default ContextCard;