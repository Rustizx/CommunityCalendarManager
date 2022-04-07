interface CalendarEventsIconProps {
  height: number;
  width: number;
  className: string;
}

export default function CalendarEventsIcon(props: CalendarEventsIconProps) {
  const { height, width, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 31.18 35.634"
    >
      {/* (<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}

      <path
        id="Path_26"
        data-name="Path 26"
        d="M11.136,2.227V4.454h8.909V2.227a2.227,2.227,0,1,1,4.454,0V4.454h3.341A3.341,3.341,0,0,1,31.18,7.795v3.341H0V7.795A3.341,3.341,0,0,1,3.341,4.454H6.681V2.227a2.227,2.227,0,0,1,4.454,0ZM0,13.363H31.18V32.293a3.342,3.342,0,0,1-3.341,3.341H3.341A3.341,3.341,0,0,1,0,32.293Zm5.568,4.454a1.115,1.115,0,0,0-1.114,1.114v6.681a1.115,1.115,0,0,0,1.114,1.114h6.681a1.117,1.117,0,0,0,1.114-1.114V18.931a1.117,1.117,0,0,0-1.114-1.114Z"
        fill="#fff"
      />
    </svg>
  );
}
