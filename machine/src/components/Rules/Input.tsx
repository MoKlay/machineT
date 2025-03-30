import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: () => boolean
}

export default function Input({
  value,
  style,
  onChange,
  error,
  onAnimationEnd,
  onBlur,
  ...props
}: InputProps) {
  const [errorAnim, setError] = useState(false)
  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder=""
        onChange={onChange}
        style={style}
        onBlur={(e) => {
          if (error) setError(error())
          if (onBlur) onBlur(e)
        }}
        onAnimationEnd={(e) => {
          setError(false)
          if (onAnimationEnd) onAnimationEnd(e)
        }}
        className={errorAnim && value != '' ? 'error' : ''}
        {...props}
      />
    </div>
  );
}
