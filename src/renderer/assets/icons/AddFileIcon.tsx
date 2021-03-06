interface AddFileIconProps {
  height: number;
  width: number;
  className: string;
}

export default function AddFileIcon(props: AddFileIconProps) {
  const { height, width, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 200 200"
    >
      {/* (<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
      <path
        id="Path_2"
        data-name="Path 2"
        d="M0,22.222A22.221,22.221,0,0,1,22.222,0H77.778V44.444A11.1,11.1,0,0,0,88.889,55.556h44.444v13.4a61.154,61.154,0,0,0-18.854,108.576,26.5,26.5,0,0,1-3.368.243H22.222A22.232,22.232,0,0,1,0,155.556ZM88.889,44.444V0l44.444,44.444ZM100,127.778a50,50,0,1,1,50,50A50.013,50.013,0,0,1,100,127.778Zm55.556-22.535a5.556,5.556,0,1,0-11.111,0V121.91H127.778a5.785,5.785,0,0,0-5.556,5.556,5.38,5.38,0,0,0,5.556,5.556h16.667v16.667a5.556,5.556,0,0,0,11.111,0V133.021h16.667a5.38,5.38,0,0,0,5.556-5.556,5.785,5.785,0,0,0-5.556-5.556H155.556Z"
        fill="#fff"
      />
    </svg>
  );
}
