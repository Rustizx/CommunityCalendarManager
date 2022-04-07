interface UnlockIconProps {
  height: number;
  className: string;
}

export default function UnlockIcon(props: UnlockIconProps) {
  const { height, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1"
      height={height}
      className={className}
      viewBox="0 0 1 42.904"
    >
      <path
        id="Path_18"
        data-name="Path 18"
        d="M0,41.9V0"
        transform="translate(0.5 0.5)"
        fill="none"
        stroke="rgba(255,255,255,0.47)"
        strokeLinecap="round"
        strokeWidth="1"
      />
    </svg>
  );
}
