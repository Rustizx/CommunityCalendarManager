interface ClubsIconProps {
  height: number;
  width: number;
  className: string;
}

export default function ClubsIcon(props: ClubsIconProps) {
  const { height, width, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 39.854 31.884"
    >
      {/* (<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}

      <path
        id="Path_21"
        data-name="Path 21"
        d="M19.921,19.927a6.477,6.477,0,1,0-6.42-6.476A6.43,6.43,0,0,0,19.921,19.927Zm3.114,1.993H16.82a8.588,8.588,0,0,0-8.849,8.3,1.715,1.715,0,0,0,1.769,1.663H30.115a1.715,1.715,0,0,0,1.769-1.663A8.588,8.588,0,0,0,23.035,21.92ZM31.884,9.964A4.982,4.982,0,1,0,26.9,4.982,4.982,4.982,0,0,0,31.884,9.964ZM11.452,13.451a8.3,8.3,0,0,1,.1-.991,4.51,4.51,0,0,0-2.217-.5H5.485A5.656,5.656,0,0,0,0,17.766a1.133,1.133,0,0,0,1.1,1.164H13.521A8.388,8.388,0,0,1,11.452,13.451ZM7.971,9.964A4.982,4.982,0,1,0,2.989,4.982,4.982,4.982,0,0,0,7.971,9.964Zm26.4,1.993H30.517a5.193,5.193,0,0,0-2.233.513,8.531,8.531,0,0,1,.1.981,8.4,8.4,0,0,1-2.065,5.48H38.755a1.134,1.134,0,0,0,1.1-1.164A5.654,5.654,0,0,0,34.368,11.956Z"
        fill="#fff"
      />
    </svg>
  );
}
