interface HomeIconProps {
  height: number;
  width: number;
  className: string;
}

export default function HomeIcon(props: HomeIconProps) {
  const { height, width, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 20.745 18.441"
    >
      {/* (<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}

      <path
        id="Path_10"
        data-name="Path 10"
        d="M20.739,9.2a1.164,1.164,0,0,1-1.153,1.156H18.434l.025,5.766a2.589,2.589,0,0,1-.018.292V17A1.44,1.44,0,0,1,17,18.441h-.576c-.04,0-.079-.032-.119,0-.05-.029-.1,0-.151,0H14.119A1.44,1.44,0,0,1,12.678,17v-3.17a1.151,1.151,0,0,0-1.153-1.153H9.22a1.151,1.151,0,0,0-1.153,1.153V17a1.44,1.44,0,0,1-1.441,1.441H4.614c-.054,0-.108,0-.162-.007s-.086.007-.13.007H3.746A1.441,1.441,0,0,1,2.305,17V12.966c0-.032,0-.068,0-.1V10.359H1.154A1.142,1.142,0,0,1,0,9.2a1.17,1.17,0,0,1,.361-.864L9.6.289A1.038,1.038,0,0,1,10.387,0a1.212,1.212,0,0,1,.76.253l9.2,8.085a.978.978,0,0,1,.4.864Z"
        fill="rgba(0,0,0,0.5)"
        opacity="0.5"
      />
    </svg>
  );
}
