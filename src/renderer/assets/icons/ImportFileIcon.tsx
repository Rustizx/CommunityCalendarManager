interface ImportFileIconProps {
  height: number;
  width: number;
  className: string;
}

export default function ImportFileIcon(props: ImportFileIconProps) {
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
        id="Path_1"
        data-name="Path 1"
        d="M150,0V50h50ZM137.5,50V0H68.75A18.752,18.752,0,0,0,50,18.75V112.5h68.008L102.762,97.254A9.375,9.375,0,0,1,116.02,84l31.25,31.25a9.373,9.373,0,0,1,0,13.258l-31.25,31.25a9.373,9.373,0,0,1-13.258,0A9.179,9.179,0,0,1,100,153.125a9.309,9.309,0,0,1,2.746-6.629l15.261-15.246H50v50A18.755,18.755,0,0,0,68.75,200h112.5A18.75,18.75,0,0,0,200,181.25V62.5H150.352A12.567,12.567,0,0,1,137.5,50ZM9.375,112.5a9.375,9.375,0,0,0,0,18.75H50V112.5Z"
        fill="#fff"
      />
    </svg>
  );
}
