interface DonationsIconProps {
  height: number;
  width: number;
  className: string;
}

export default function DonationsIcon(props: DonationsIconProps) {
  const { height, width, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 37.655 33.478"
    >
      {/* (<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}

      <path
        id="Path_24"
        data-name="Path 24"
        d="M37.152,21.989a2.609,2.609,0,0,0-3.657-.554L25.669,27.2H17.783a1,1,0,0,1-.987-1.046,1.043,1.043,0,0,1,.987-1.046H22.9a2.223,2.223,0,0,0,2.182-1.741,2.1,2.1,0,0,0-2.068-2.444H12.5a7.819,7.819,0,0,0-4.846,1.716l-3.04,2.468L.987,25.049A1.1,1.1,0,0,0,0,26.154V32.43a1.042,1.042,0,0,0,.987,1.047h22.63a6.852,6.852,0,0,0,4.034-1.325l8.834-6.507A2.542,2.542,0,0,0,37.152,21.989ZM18.262,11.443a9.922,9.922,0,0,1-1.726-.517l-.32-.111a1.537,1.537,0,0,0-2,.9,1.6,1.6,0,0,0,.954,2l.3.108a16.167,16.167,0,0,0,1.791.543v.8a1.569,1.569,0,1,0,3.137,0v-.68A3.579,3.579,0,0,0,23.416,11.5c.568-3.273-2.543-4.162-4.212-4.639l-.346-.12c-1.72-.488-1.622-.7-1.576-.967.076-.442,1-.658,2.106-.483a7.879,7.879,0,0,1,1.285.355A1.569,1.569,0,0,0,21.7,2.679,12.437,12.437,0,0,0,20.4,2.3V1.569a1.569,1.569,0,1,0-3.137,0v.688A3.85,3.85,0,0,0,14.13,5.239c-.5,3.235,2.655,4.163,3.845,4.516l.425.123c2.07.593,2.037.777,1.984,1.088C20.309,11.41,19.387,11.626,18.262,11.443Z"
        fill="#fff"
      />
    </svg>
  );
}