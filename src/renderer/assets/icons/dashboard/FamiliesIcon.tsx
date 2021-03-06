interface FamiliesIconProps {
  height: number;
  width: number;
  className: string;
}

export default function FamiliesIcon(props: FamiliesIconProps) {
  const { height, width, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 42.237 33.812"
    >
      {/* (<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}

      <path
        id="Path_11"
        data-name="Path 11"
        d="M41.168,10.831a2.092,2.092,0,0,1,.766,2.873,2.01,2.01,0,0,1-2.813.766L21.066,4.531,3.132,14.469A2.092,2.092,0,0,1,.258,13.7a2.113,2.113,0,0,1,.821-2.873L20.1.266a2.1,2.1,0,0,1,2.047,0ZM18.424,13.208a2.68,2.68,0,0,1,2.642-2.642,2.642,2.642,0,0,1,0,5.283A2.68,2.68,0,0,1,18.424,13.208ZM6.8,19.548a2.68,2.68,0,0,1,2.642-2.642,2.642,2.642,0,1,1,0,5.283A2.68,2.68,0,0,1,6.8,19.548Zm28.529,0a2.6,2.6,0,0,1-2.642,2.642,2.642,2.642,0,0,1,0-5.283A2.6,2.6,0,0,1,35.33,19.548Zm-20.353,12.9-1.836-3.3V31.7a2.074,2.074,0,0,1-2.113,2.113H7.858A2.15,2.15,0,0,1,5.745,31.7V29.157l-1.715,3.3a1.586,1.586,0,0,1-2.791-1.506L3.74,26.3a5.817,5.817,0,0,1,5.115-3.058h1.294a5.818,5.818,0,0,1,3,.832l2.212-4.114a5.881,5.881,0,0,1,5.118-3.117h1.294a5.881,5.881,0,0,1,5.118,3.117L29.1,24.078a5.818,5.818,0,0,1,3-.832H33.4A5.825,5.825,0,0,1,38.513,26.3l2.5,4.643a1.584,1.584,0,1,1-2.787,1.506l-1.836-3.3V31.7a2.074,2.074,0,0,1-2.113,2.113H31.1A2.15,2.15,0,0,1,28.99,31.7V29.157l-1.717,3.3a1.586,1.586,0,0,1-2.146.641,1.537,1.537,0,0,1-.641-2.146l2.4-4.458a1.346,1.346,0,0,1-.284-.376l-1.836-3.3v3.6a2.074,2.074,0,0,1-2.113,2.113h-3.17a2.15,2.15,0,0,1-2.113-2.113v-3.6l-1.717,3.3c-.132.145-.172.271-.284.376l2.4,4.458a1.584,1.584,0,0,1-2.787,1.506Z"
        transform="translate(0.008 0)"
        fill="#fff"
      />
    </svg>
  );
}
