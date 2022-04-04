interface BackButtonIconProps {
  height: number;
  width: number;
  className: string;
}

export default function BackButtonIcon(props: BackButtonIconProps) {
  const { height, width, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 32 32"
    >
      {/* (<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
      <g
        id="Ellipse_1"
        data-name="Ellipse 1"
        fill="#fff"
        stroke="#4a4a4a"
        strokeWidth="2"
      >
        <circle cx="16" cy="16" r="16" stroke="none" />
        <circle cx="16" cy="16" r="15" fill="none" />
      </g>
      <path
        id="Path_5"
        data-name="Path 5"
        d="M8.414,80.819a1.4,1.4,0,0,1-.991-.411L.416,73.4a1.4,1.4,0,0,1,0-1.982l7.008-7.008a1.4,1.4,0,1,1,1.982,1.982L3.388,72.41l6.018,6.018a1.4,1.4,0,0,1-.992,2.391Z"
        transform="translate(9.979 -56.41)"
        fill="#4a4a4a"
      />
    </svg>
  );
}
