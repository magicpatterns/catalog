import React, { useRef } from 'react'

interface Coords {
  x: number
  y: number
}

function screenToSvg({
  x: screenX,
  y: screenY,
  svgRef,
}: {
  x: number
  y: number
  svgRef: React.RefObject<SVGSVGElement>
}): Coords {
  const p = svgRef.current!.createSVGPoint()
  p.x = screenX
  p.y = screenY
  // @ts-ignore
  return p.matrixTransform(svgRef.current!.getScreenCTM().inverse())
}

export function DynamicGradient() {
  const svgRef = useRef<SVGSVGElement>(null)

  // const xEase = useEasingAnimation({
  //   start: -300,
  //   end: 1000,
  //   duration: 15000,
  //   loop: true,
  // })

  // const yEase = useEasingAnimation({
  //   start: 1300,
  //   end: -2000,
  //   duration: 15000,
  //   loop: true,
  // })

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="150 0 3000 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        minWidth: '1000px',
      }}
    >
      <g filter="url(#filter0_f_23_83)">
        <path
          d="M-50.9371 1010.23C-539.958 1228.25 -330.928 937.176 -704 872.859L-485.017 -299L554 -56.8848C377.394 83.0596 270.519 134.584 139.275 430.026C8.03143 725.467 -50.9371 1010.23 -50.9371 1010.23Z"
          fill="#B0E0CC"
        />
      </g>
      <g filter="url(#filter1_f_23_83)">
        <path
          d="M1013.54 -312.086C1286.09 -219.551 968.455 284 559.727 201.125C150.999 118.251 68.8309 320.103 -79.5116 329.5C-227.854 338.897 -298.545 -100.5 -138.045 -201L-79.5117 -474L1013.54 -312.086Z"
          fill="#D0D0FA"
        />
      </g>
      <g filter="url(#filter2_f_23_83)">
        <path
          d="M2416.45 597.077C2266.05 668.383 2246.23 728.902 2282.89 859.775L2337.53 979H2805L2789.82 597.077C2700.37 544.622 2629.11 534.867 2416.45 597.077Z"
          fill="#AADEE6"
        />
      </g>
      <g filter="url(#filter3_f_23_83)">
        <path
          d="M2006.59 1087.82C1967.1 1234.7 2029.13 1232.06 2073.81 1296H2602.93L2811 1201.57V911.126L2402.72 833.15C2216.17 829.703 2129.21 884.754 2006.59 1087.82Z"
          fill="#F5C7D1"
        />
      </g>
      <g
        style={{ mixBlendMode: 'overlay' }}
        // transform={`translate(${xEase} ${yEase})`}
      >
        <g filter="url(#filter4_f_23_83)">
          <path
            d="M-150.621 -18.8811C434.475 -46.5023 234.285 -279.034 708.035 -197.911L1202.3 -64.7433C1626.34 28.7988 2015.22 -69.8561 992.656 483.592C587.974 702.62 130.483 737.383 -62.3259 510.113C-318.265 341.363 -504.164 -2.1911 -150.621 -18.8811Z"
            fill="#FFC291"
          />
        </g>
        <g filter="url(#filter5_f_23_83)">
          <path
            d="M1239.65 307.893C1716 -100.931 1959.32 -167.32 2354.43 -20.3465L2980 -215V332.32C1962.57 528.666 1378.07 757.214 260 1801C392.527 1164.09 641.267 844.542 1239.65 307.893Z"
            fill="#A5DCED"
          />
        </g>
        <g filter="url(#filter6_f_23_83)">
          <path
            d="M447.164 576.619C263.394 552.898 205.864 191.029 315.382 -80.1688L1629.57 -201C1629.57 -201 1884.67 -54.9648 1872.58 182.25C1860.49 419.464 1755.31 516.574 1755.31 516.574C1755.31 516.574 1651.34 641.853 1361.17 661.868C1071.01 681.883 630.934 600.341 447.164 576.619Z"
            fill="#F4C6DB"
          />
        </g>
        <g filter="url(#filter7_f_23_83)">
          <path
            d="M2943.82 938C2574.53 842.94 2392.33 763.339 2291 384.553C2325.54 119.269 3055.81 0.0412598 3259.57 -117.281C2894.4 -274.501 2608.78 -415.679 3060.83 -299.072C3334.26 -228.542 3356.57 -173.127 3259.57 -117.281C3579.29 20.3693 3960 170.316 3960 170.316L2943.82 938Z"
            fill="#D7CFF9"
          />
        </g>
        <g filter="url(#filter8_f_23_83)">
          <path
            d="M1348.86 780.097C1641.06 958.428 1510.27 1099.52 1057 1381.88L2309 1464C1959.69 1335.37 1878.35 1213.26 2309 744.134C1934.09 572.675 1723.86 565.104 1348.86 780.097Z"
            fill="#C6DE99"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_23_83"
          x="-1004"
          y="-599"
          width="1858"
          height="1989"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="150"
            result="effect1_foregroundBlur_23_83"
          />
        </filter>
        <filter
          id="filter1_f_23_83"
          x="-529.5"
          y="-774"
          width="1944.71"
          height="1403.65"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="150"
            result="effect1_foregroundBlur_23_83"
          />
        </filter>
        <filter
          id="filter2_f_23_83"
          x="1967"
          y="254"
          width="1138"
          height="1025"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="150"
            result="effect1_foregroundBlur_23_83"
          />
        </filter>
        <filter
          id="filter3_f_23_83"
          x="1794"
          y="633"
          width="1217"
          height="863"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_23_83"
          />
        </filter>
        <filter
          id="filter4_f_23_83"
          x="-546"
          y="-415"
          width="2388"
          height="1280"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_23_83"
          />
        </filter>
        <filter
          id="filter5_f_23_83"
          x="60"
          y="-415"
          width="3120"
          height="2416"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_23_83"
          />
        </filter>
        <filter
          id="filter6_f_23_83"
          x="60"
          y="-401"
          width="2013"
          height="1266"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_23_83"
          />
        </filter>
        <filter
          id="filter7_f_23_83"
          x="2091"
          y="-542"
          width="2069"
          height="1680"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_23_83"
          />
        </filter>
        <filter
          id="filter8_f_23_83"
          x="857"
          y="417"
          width="1652"
          height="1247"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_23_83"
          />
        </filter>
      </defs>
    </svg>
  )
}
