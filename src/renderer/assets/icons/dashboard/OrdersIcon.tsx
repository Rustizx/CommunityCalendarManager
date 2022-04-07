interface OrdersIconProps {
  height: number;
  width: number;
  className: string;
}

export default function OrdersIcon(props: OrdersIconProps) {
  const { height, width, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 28.055 37.406"
    >
      {/* (<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
      <path
        id="Path_22"
        data-name="Path 22"
        d="M28.055,9.352H18.7V0ZM18.7,11.689h9.352V33.9a3.507,3.507,0,0,1-3.507,3.507H3.507A3.507,3.507,0,0,1,0,33.9V3.507A3.507,3.507,0,0,1,3.507,0H16.365V9.352A2.335,2.335,0,0,0,18.7,11.689ZM4.676,6.429a.589.589,0,0,0,.584.584H11.1a.587.587,0,0,0,.584-.584V5.26a.588.588,0,0,0-.584-.584H5.26a.589.589,0,0,0-.584.584Zm.584,5.26H11.1a.586.586,0,0,0,.584-.584V9.936a.586.586,0,0,0-.584-.584H5.26a.588.588,0,0,0-.584.584V11.1A.588.588,0,0,0,5.26,11.689Zm9.169,11.456-.468-.117c-1.666-.511-1.629-.811-1.571-1.074.1-.571,1.212-.71,2.211-.557a7.552,7.552,0,0,1,1.285.354,1.462,1.462,0,0,0,.959-2.762A11.918,11.918,0,0,0,15.49,18.6v-.485a1.461,1.461,0,1,0-2.922,0v.438a3.623,3.623,0,0,0-3.055,2.9c-.541,3.13,2.425,4,3.691,4.372l.425.123c2.139.612,2.1.818,2.04,1.189-.1.571-1.212.712-2.214.557a10.252,10.252,0,0,1-1.729-.514l-.326-.119a1.462,1.462,0,0,0-.973,2.758l.312.11a15.228,15.228,0,0,0,1.831.549v.494a1.461,1.461,0,1,0,2.922,0V30.52a3.608,3.608,0,0,0,3.056-2.881C19.09,24.475,16.058,23.605,14.429,23.145Z"
        fill="#fff"
      />
    </svg>
  );
}