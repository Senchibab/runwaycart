const Caption = () => {
  return (
    <svg
      width="100%"
      height="80"
      viewBox="0 0 600 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Where style meets your cart"
      className="caption-svg"
    >
      <defs>
        <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="4"
            floodColor="#cfd8f5"
            floodOpacity="0.25"
          />
        </filter>
      </defs>
      <text
        x="50%"
        y="50%"
        fill="#cfd8f5"
        fontFamily="Inter, Segoe UI, Helvetica Neue, sans-serif"
        fontSize="28"
        fontWeight="800"
        textAnchor="start"
        dominantBaseline="middle"
        letterSpacing="1.8"
        filter="url(#textShadow)"
      >
        Style your cart now
      </text>
    </svg>
  );
};

export default Caption;
