import { ButtonBorder } from "../buttonBorder";

const TAILWIND_TO_HEX = {
  // Primary colors with their neutral counterparts (darker shade)
  'bg-purple-700': { hex: '#7e22ce', neutral: '#581c87' }, // purple-900
  'bg-emerald-600': { hex: '#059669', neutral: '#065f46' }, // emerald-800
  'bg-orange-600': { hex: '#ea580c', neutral: '#9a3412' }, // orange-800

  // Secondary colors
  'bg-blue-600': { hex: '#6804ffff' },
  'bg-cyan-500': { hex: '#06b6d4' },
  'bg-red-500': { hex: '#ef4444' }
};

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

  const primaryColorData = TAILWIND_TO_HEX[gradientColors.primary] || { hex: '#3f3100', neutral: '#fffdf5' };
  const secondaryColorData = TAILWIND_TO_HEX[gradientColors.secondary] || { hex: '#ffefb5' };

  return (
    <div className={`
      relative overflow-hidden
      border border-white/15 rounded-3xl 
      p-6 md:p-8 
      h-[65vh] md:h-[550px] 
      text-white 
      ${className}`}>

      {/* --- FONDOS Y EFECTOS (Sin cambios funcionales, solo visuales) --- */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4">
        <div className={`h-[200px] w-[400px] rounded-full ${gradientColors.primary} opacity-30 blur-[100px]`}></div>
      </div>
      <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4">
        <div className={`h-[150px] w-[300px] rounded-full ${gradientColors.secondary} opacity-25 blur-[80px]`}></div>
      </div>
      {/* Glassmorphism mejorado: más saturación para viveza */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl backdrop-saturate-150 -z-10"></div>


      {/* --- CONTENIDO Z-10 --- */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Contenedor Flex Mobile: Imagen Arriba, Texto Abajo */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 h-full">

          {/* 1. IMAGEN (Orden visual 1) */}
          <div className="flex-shrink-0 flex justify-center items-center w-full md:w-1/2 md:order-2">
            <img
              src={imageUrl}
              alt={title || 'Context card image'}
              // Aspect ratio cuadrado o 4:3 se ve mejor en cards verticales
              className="w-full max-w-[180px] md:max-w-full aspect-square md:aspect-auto rounded-2xl object-cover shadow-2xl shadow-purple-500/10"
            />
          </div>

          {/* 2. TEXTOS (Orden visual 2) */}
          <div className="flex flex-col w-full md:w-1/2 md:order-1 relative flex-1">

            {/* Grupo de Títulos */}
            <div className="mb-4">
              {/* Tag / Título pequeño (8px de separación con el siguiente) */}
              <h1 className="text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent bg-clip-text mb-2">
                {title || 'Estrategia y Análisis'}
              </h1>

              {/* Título Principal (Leading tight para que no ocupe tanto verticalmente) */}
              <h3 className="text-xl md:text-3xl font-bold text-white leading-tight">
                {subtitle || 'El Núcleo de la Operación'}
              </h3>
            </div>

            {/* Cuerpo de texto (Separado 16px del título) */}
            <div className="space-y-3 text-gray-300 leading-relaxed overflow-y-auto pb-16">
              <p className="text-[12px]">
                {text || 'Nuestro ScienceDivision desarrolla tácticas propias, probadas en escenarios reales.'}
              </p>
              <p className="text-[12px]">
                {text2 || 'Aquí la matemática se convierte en poder de mercado.'}
              </p>
            </div>

            {/* Botón (Empujado al fondo con mt-auto, margen superior mínimo de 32px) */}
            <div className="absolute bottom-0 left-0 w-full">
              <ButtonBorder
                title={buttonText}
                href="https://t.me/KremlinTrading_bot"
                target="_blank"
                rel="noopener noreferrer"
                primaryColor={primaryColorData.hex}
                lightColor={secondaryColorData.hex}
                neutralColor={primaryColorData.neutral}
                className="w-full md:w-auto"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContextCard;