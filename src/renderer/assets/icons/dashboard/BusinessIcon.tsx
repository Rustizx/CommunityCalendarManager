interface BusinessesIconProps {
  height: number;
  width: number;
  className: string;
}

export default function BusinessesIcon(props: BusinessesIconProps) {
  const { height, width, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 27.271 36.361"
    >
      {/* (<!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}

      <path
        id="Path_20"
        data-name="Path 20"
        d="M23.862,0a3.409,3.409,0,0,1,3.409,3.409V32.952a3.41,3.41,0,0,1-3.409,3.409H17.044V30.679a3.409,3.409,0,0,0-6.818,0v5.681H3.409A3.409,3.409,0,0,1,0,32.952V3.409A3.409,3.409,0,0,1,3.409,0ZM4.545,19.317a1.138,1.138,0,0,0,1.136,1.136H7.954A1.14,1.14,0,0,0,9.09,19.317V17.044a1.14,1.14,0,0,0-1.136-1.136H5.681a1.138,1.138,0,0,0-1.136,1.136ZM12.5,15.908a1.14,1.14,0,0,0-1.136,1.136v2.273A1.14,1.14,0,0,0,12.5,20.453h2.273a1.14,1.14,0,0,0,1.136-1.136V17.044a1.14,1.14,0,0,0-1.136-1.136Zm5.681,3.409a1.14,1.14,0,0,0,1.136,1.136h2.273a1.14,1.14,0,0,0,1.136-1.136V17.044a1.14,1.14,0,0,0-1.136-1.136H19.317a1.14,1.14,0,0,0-1.136,1.136Zm-12.5-12.5A1.138,1.138,0,0,0,4.545,7.954v2.273a1.138,1.138,0,0,0,1.136,1.136H7.954A1.14,1.14,0,0,0,9.09,10.226V7.954A1.14,1.14,0,0,0,7.954,6.818Zm5.681,3.409A1.14,1.14,0,0,0,12.5,11.363h2.273a1.14,1.14,0,0,0,1.136-1.136V7.954a1.14,1.14,0,0,0-1.136-1.136H12.5a1.14,1.14,0,0,0-1.136,1.136Zm7.954-3.409A1.14,1.14,0,0,0,18.18,7.954v2.273a1.14,1.14,0,0,0,1.136,1.136h2.273a1.14,1.14,0,0,0,1.136-1.136V7.954a1.14,1.14,0,0,0-1.136-1.136Z"
        fill="#fff"
      />
    </svg>
  );
}
