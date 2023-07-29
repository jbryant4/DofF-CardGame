import { forwardRef } from 'react';

type OwnProps = React.SVGProps<SVGSVGElement> & { size?: number; hp: number };

const HeartIcon = forwardRef<SVGSVGElement, OwnProps>(
  ({ size = 128, hp, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      ref={ref}
      version="1.1"
      viewBox="0 0 100 100"
      className="text-30 text-black"
    >
      {hp > 0 ? (
        <>
          <defs>
            <radialGradient
              id="grad1"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" style={{ stopColor: 'red', stopOpacity: 1 }} />
              <stop
                offset="100%"
                style={{ stopColor: 'darkred', stopOpacity: 1 }}
              />
            </radialGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
              <feOffset dx="0" dy="9" result="offsetblur" />
              <feFlood floodColor="darkred" floodOpacity="0.5" />
              <feComposite in2="offsetblur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            fill="url(#grad1)"
            d="m87.234 16.777c-10.246-10.246-26.863-10.336-37.215-0.28125-10.363-10.082-26.996-9.9961-37.25 0.26172-5.0117 5.0078-7.7695 11.672-7.7695 18.758s2.7578 13.746 7.7695 18.758l37.234 37.234 37.23-37.23c5.0078-5.0078 7.7656-11.668 7.7656-18.75 0-7.082-2.7578-13.742-7.7656-18.75z"
            filter="url(#shadow)"
          />
        </>
      ) : (
        <g>
          <path
            fill="none"
            stroke="red"
            strokeWidth={4}
            d="m52.398 77.301-15.098-19.602 19.199-15.699-9.8008-10.102 2.3008-13.898c-4.8984-5.8008-11.699-11.801-19-11.801-15 0-27.102 13.801-27.102 30.902 0 10.102 6.3984 19.898 10.801 24.699 7.3984 8.1992 30.199 27.699 35.301 32z"
          />
          <path
            fill="none"
            stroke="red"
            strokeWidth={4}
            d="m70 6.1992c-7 0-13.199 5.5-18 11.102l-2.3008 13.699 11 11.398-19.5 15.801 14.199 18.398-3.3984 16.301c6.6016-5.6992 27.301-23.5 34.301-31.199 4.3008-4.8008 10.801-14.602 10.801-24.699 0-17-12.102-30.801-27.102-30.801z"
          />
        </g>
      )}
    </svg>
  )
);

export default HeartIcon;
