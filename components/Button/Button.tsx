import React from 'react'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  isLoading?: boolean
  strokeColor?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  type,
  className,
  isLoading,
  strokeColor,
  children,
  onClick,
}) => {
  return (
    <button onClick={onClick} type={type} className={className} disabled={isLoading}>
      {isLoading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="24px"
          height="24px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx={50}
            cy={50}
            fill="none"
            stroke={strokeColor}
            strokeWidth={10}
            r={35}
            strokeDasharray="164.93361431346415 56.97787143782138"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
            />
          </circle>
        </svg>
      )}
      &ensp;
      <span>{children}</span>
    </button>
  )
}

Button.defaultProps = {
  strokeColor: '#fff',
}

export default Button
