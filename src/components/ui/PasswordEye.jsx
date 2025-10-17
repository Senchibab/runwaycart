export function PasswordEyeOpen({ size = 20, color = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="#abbbdd"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3.5" fill="#111a2b" />
    </svg>
  );
}

export function PasswordEyeClosed({ size = 20, color = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="#abbbdd"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.06 10.06 0 0112 20c-5 0-9.27-3.11-11-8a11.95 11.95 0 015.47-6.48" />
      <path d="M9.47 4.52A10.05 10.05 0 0123 12c-.82 2.31-2.35 4.27-4.3 5.67M1 1l22 22" />
    </svg>
  );
}




