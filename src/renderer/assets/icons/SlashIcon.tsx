interface SlashIconProps {
  height: number;
  width: number;
  className: string;
}

export default function SlashIcon(props: SlashIconProps) {
  const { height, width, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 8.894 16.447"
    >
      <line
        id="Line_3"
        data-name="Line 3"
        x1="8"
        y2="16"
        transform="translate(0.447 0.224)"
        fill="none"
        stroke="rgba(112,112,112,0.5)"
        strokeWidth="1"
      />
    </svg>
  );
}
