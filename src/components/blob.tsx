export default function Blob({
  type = 'blob1',
  fill = '#3B82F6',
  x,
  y,
  className,
}: {
  type?: string;
  fill?: string;
  x?: string;
  y?: string;
  className?: string;
}) {
  if (type === 'blob1') {
    return (
      <svg
        width="159"
        height="130"
        viewBox="0 0 159 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: y, left: x, zIndex: '1' }}
        className={className}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M72.8129 12.0841C94.5552 11.7648 116.644 -7.97941 134.999 3.68006C154.339 15.9661 161.749 43.3545 157.476 65.8657C153.608 86.2467 131.703 95.6968 115.157 108.21C102.008 118.153 89.2711 128.955 72.8129 129.892C55.4224 130.882 38.2392 125.046 25.3547 113.324C11.8458 101.034 4.60895 83.9986 2.43534 65.8657C-0.088997 44.807 -4.42484 18.3583 12.4273 5.48014C29.1525 -7.30103 51.7655 12.3932 72.8129 12.0841Z"
          fill={fill} // "#3B82F6"
          fillOpacity="0.1"
        />
      </svg>
    );
  } else if (type == 'blob2') {
    return (
      <svg
        width="160"
        height="150"
        viewBox="0 0 160 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: y, left: x, zIndex: '1' }}
        className={className}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M90.0909 5.10133C108.643 6.10232 129.291 -0.723843 143.331 11.4447C157.852 24.03 162.419 45.8061 158.838 64.6852C155.695 81.2603 137.061 87.9114 126.356 100.951C113.221 116.952 110.276 143.829 90.0909 148.427C68.7093 153.297 48.4931 137.275 32.4316 122.345C15.6424 106.737 0.330727 87.6058 0.00664634 64.6852C-0.320711 41.5329 11.4653 18.1457 30.7777 5.37199C47.9207 -5.96677 69.5672 3.99399 90.0909 5.10133Z"
          fill={fill} // "#22C55E"
          fillOpacity="0.1"
        />
      </svg>
    );
  } else if (type == 'blob3') {
    return (
      <svg
        width="120"
        height="128"
        viewBox="0 0 120 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: y, left: x, zIndex: '1' }}
        className={className}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M60.4743 9.80765C79.6379 6.43655 104.404 -8.50101 116.541 6.70813C129.02 22.3474 103.804 42.7945 102.74 62.7744C101.799 80.4392 120.537 98.3559 110.872 113.172C100.949 128.384 78.5973 128.766 60.4743 127.569C43.6219 126.455 27.8362 119.283 16.3223 106.926C5.21 95.0013 -0.851077 79.0468 0.0967454 62.7744C0.995262 47.3484 9.56672 33.6728 21.1826 23.4827C32.02 13.9755 46.2758 12.3053 60.4743 9.80765Z"
          fill={fill} // "#A855F7"
          fillOpacity="0.1"
        />
      </svg>
    );
  } else if (type === 'circle') {
    return (
      <svg
        width="201"
        height="200"
        viewBox="0 0 201 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: y, left: x, zIndex: '1' }}
        className={className}
      >
        <circle
          cx="100.647"
          cy="100"
          r="92"
          stroke={fill} // "#3B82F6"
          strokeOpacity="0.1"
          strokeWidth="16"
        />
      </svg>
    );
  } else {
    <svg
      width="174"
      height="150"
      viewBox="0 0 174 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: y, left: x, zIndex: '100000' }}
      className={className}
    >
      <path
        d="M13.0348 142.5L86.647 15L160.259 142.5H13.0348Z"
        stroke={fill} // "#3B82F6"
        strokeOpacity="0.1"
        strokeWidth="15"
      />
    </svg>;
  }
}
