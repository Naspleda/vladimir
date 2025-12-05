import PropTypes from "prop-types";

export function ButtonBorder({
  title,
  primaryColor = "#3f3100",
  lightColor = "#ffefb5",
  neutralColor = "#fffdf5",
  innerBgColor = "#000000",
  textColor = "#C0A080",
  hoverTextColor = "#001f4c",
  className = "",
  ...rest
}) {
  // CSS variables para usar con Tailwind (arbitrary values)
  const style = {
    "--primary": primaryColor,
    "--light": lightColor,
    "--neutral": neutralColor,
    "--inner": innerBgColor,
    "--text": textColor,
    "--hover": hoverTextColor,
  };

  if (rest.href) {
    return (
      <a
        style={style}
        className={`relative inline-flex h-12 w-24 overflow-hidden rounded-2xl p-[1px]
                    focus:outline-none focus:ring-2 focus:ring-slate-400
                    focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
        {...rest}
      >
        {/* Borde animado */}
        <span
          className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]
                     bg-[conic-gradient(from_90deg_at_50%_50%,var(--neutral)_0%,var(--primary)_50%,var(--light)_100%)]"
        />
        {/* Interior */}
        <span
          className="inline-flex h-full w-full items-center justify-center
                     rounded-2xl px-3 py-1 text-sm font-medium backdrop-blur-3xl
                     transition-all duration-200
                     bg-[var(--inner)] text-[color:var(--text)]
                     hover:bg-transparent hover:text-[color:var(--hover)]"
        >
          {title}
        </span>
      </a>
    );
  }

  return (
    <button
      type="button"
      style={style}
      className={`relative inline-flex h-12 w-24 overflow-hidden rounded-2xl p-[1px]
                  focus:outline-none focus:ring-2 focus:ring-slate-400
                  focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
      {...rest}
    >
      {/* Borde animado */}
      <span
        className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]
                   bg-[conic-gradient(from_90deg_at_50%_50%,var(--neutral)_0%,var(--primary)_50%,var(--light)_100%)]"
      />
      {/* Interior */}
      <span
        className="inline-flex h-full w-full items-center justify-center
                   rounded-2xl px-3 py-1 text-sm font-medium backdrop-blur-3xl
                   transition-all duration-200
                   bg-[var(--inner)] text-[color:var(--text)]
                   hover:bg-transparent hover:text-[color:var(--hover)]"
      >
        {title}
      </span>
    </button>
  );
}

ButtonBorder.propTypes = {
  title: PropTypes.string.isRequired,
  primaryColor: PropTypes.string,
  lightColor: PropTypes.string,
  neutralColor: PropTypes.string,
  innerBgColor: PropTypes.string,
  textColor: PropTypes.string,
  hoverTextColor: PropTypes.string,
  className: PropTypes.string,
};
