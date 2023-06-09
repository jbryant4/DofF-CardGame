import { forwardRef } from 'react';

type OwnProps = React.SVGProps<SVGSVGElement> & { size?: number };

const AttackIcon = forwardRef<SVGSVGElement, OwnProps>(
  ({ size = 100, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      version="1.1"
      {...props}
      ref={ref}
      viewBox="0 0 100 100"
    >
      <g>
        <path d="m83.801 91.102c-0.39844-1-0.60156-2-0.89844-2.8008-0.19922-0.5-0.30078-1-0.5-1.3984-0.19922-0.30078-0.30078-0.5-0.60156-0.60156-0.10156 0-0.19922-0.10156-0.30078-0.10156-0.19922 0-0.30078 0-0.5-0.10156h-0.60156-0.10156c1.1992-1.6992 1.6992-3.5 1.3984-5.3008-0.60156-3.3008-3.6992-5.3008-3.8008-5.3008-0.69922-0.5-1.6992-0.19922-2.1016 0.5-0.5 0.69922-0.19922 1.6992 0.5 2.1016 0 0 2.1016 1.3984 2.5 3.3008 0.19922 1-0.10156 1.8984-0.89844 2.8984-0.10156 0.19922-0.19922 0.30078-0.39844 0.5-0.5 0-1-0.10156-1.6016-0.10156-0.60156 0-1.3008-0.10156-2.1016-0.19922-0.69922-0.10156-1.5-0.19922-2.3984-0.30078-0.80078-0.10156-1.6992-0.30078-2.6992-0.5-0.5-0.10156-0.89844-0.19922-1.3984-0.30078-0.19922 0-0.5-0.10156-0.69922-0.10156-0.19922-0.10156-0.5-0.10156-0.69922-0.19922-1-0.30078-2-0.5-3.1016-0.80078-1-0.39844-2.1016-0.69922-3.1992-1-0.30078-0.10156-0.60156-0.30078-1-0.39844 0.30078-0.19922 0.69922-0.5 1-0.69922 0.60156-0.5 1.1992-1 1.8008-1.5l0.89844-0.69922 0.80078-0.80078 1.6992-1.6016c2.1016-2.3008 4.1016-4.6016 5.8008-7.1016 1.6992-2.5 3.1016-5.1016 4.3984-7.6016 0.60156-1.3008 1.1992-2.5 1.6992-3.8008 0.30078-0.60156 0.5-1.1992 0.69922-1.8984 0.19922-0.60156 0.39844-1.1992 0.60156-1.8008 0.39844-1.1992 0.80078-2.3984 1.1016-3.6016 0.30078-1.1992 0.60156-2.3008 0.80078-3.3984 0.5-2.1992 0.80078-4.1992 1-6 0.19922-1.8008 0.30078-3.3008 0.39844-4.6016 0.10156-2.6016-0.10156-4.1016-0.10156-4.1016s-0.60156 1.3008-1.6992 3.6016c-0.5 1.1016-1.1992 2.5-2 4.1016-0.39844 0.80078-0.80078 1.6016-1.1992 2.5s-0.89844 1.8008-1.3984 2.6992c-1 1.8984-2 3.8984-3.1992 5.8984-0.30078 0.5-0.60156 1-0.89844 1.6016-0.30078 0.5-0.60156 1-0.89844 1.6016-0.60156 1.1016-1.3008 2.1016-2 3.1992-1.3984 2.1016-2.8984 4.3008-4.5 6.3008-1.6016 2.1016-3.3008 4-5.1016 6l-1.4023 1.207-0.69922 0.69922-0.69922 0.60156c-0.5 0.39844-1 0.89844-1.3984 1.3008-0.5 0.39844-1 0.80078-1.5 1.1992-0.89844 0.69922-1.8008 1.3984-2.6992 2-0.89844-0.60156-1.8008-1.3008-2.6992-2-0.5-0.39844-1-0.80078-1.5-1.1992s-1-0.89844-1.3984-1.3008l-0.69922-0.60156-1.0039-0.69922-1.3984-1.3984c-1.8008-1.8984-3.5-3.8984-5.1016-6-1.6016-2.1016-3.1016-4.1992-4.5-6.3008-0.69922-1.1016-1.3984-2.1016-2-3.1992-0.30078-0.5-0.60156-1.1016-0.89844-1.6016-0.30078-0.5-0.60156-1-0.89844-1.6016-1.1992-2.1016-2.1992-4.1016-3.1992-5.8984-0.5-0.89844-0.89844-1.8008-1.3984-2.6992-0.5-0.89844-0.80078-1.6992-1.1992-2.5-0.80078-1.6016-1.3984-2.8984-2-4.1016-1.1016-2.3008-1.6992-3.6016-1.6992-3.6016s-0.19922 1.5-0.10156 4.1016c0 1.3008 0.10156 2.8008 0.39844 4.6016 0.19922 1.8008 0.5 3.8008 1 6 0.19922 1.1016 0.5 2.1992 0.80078 3.3984 0.30078 1.1992 0.69922 2.3008 1.1016 3.6016 0.19922 0.60156 0.39844 1.1992 0.60156 1.8008 0.19922 0.60156 0.5 1.1992 0.69922 1.8984 0.5 1.3008 1.1016 2.5 1.6992 3.8008 1.1992 2.5 2.6016 5.1016 4.3984 7.6016 1.6992 2.5 3.6016 4.8984 5.8008 7.1016l1.6992 1.6016 0.80078 0.80078 0.89844 0.69922c0.60156 0.5 1.1992 1 1.8008 1.5 0.30078 0.19922 0.69922 0.5 1 0.69922-0.30078 0.10156-0.69922 0.30078-1 0.39844-1.1016 0.39844-2.1016 0.69922-3.1992 1-1 0.30078-2.1016 0.5-3.1016 0.80078-0.19922 0.10156-0.5 0.10156-0.69922 0.19922-0.19922 0.10156-0.5 0.10156-0.69922 0.10156-0.5 0.10156-1 0.19922-1.3984 0.30078-0.89844 0.19922-1.8008 0.39844-2.6992 0.5-0.80078 0.10156-1.6016 0.19922-2.3984 0.30078-0.69922 0.10156-1.3984 0.19922-2.1016 0.19922-0.60156 0-1.1016 0.10156-1.6016 0.10156-0.10156-0.19922-0.19922-0.30078-0.39844-0.5-0.80078-1-1-2-0.89844-2.8984 0.39844-1.8984 2.3984-3.3008 2.5-3.3008 0.69922-0.5 0.89844-1.3984 0.5-2.1016-0.5-0.69922-1.3984-0.89844-2.1016-0.5-0.10156 0.10156-3.1992 2.1016-3.8008 5.3008-0.30078 1.8008 0.10156 3.6016 1.3984 5.3008h-0.80078-0.60156-0.60156 0.10156c0.10156 0 0.19922 0.10156 0.30078 0.10156 0.19922 0 0.5 0.10156 0.69922 0.10156h0.60156c0.10156 0 0.19922 0 0.19922-0.10156h0.10156-0.10156c-0.19922 0.10156-0.39844 0.19922-0.69922 0.19922h-0.69922c-0.39844 0-0.80078-0.10156-1.3008-0.19922-0.39844-0.10156-0.80078-0.10156-1.1016-0.19922-0.39844 0-0.89844-0.10156-1.1992 0-0.30078 0-0.69922 0.10156-0.89844 0.30078h0.10156c0.10156 0.10156 0.19922 0.10156 0.30078 0.10156 0.89844 0.39844 1.6992 0.89844 2.6016 1.1992 0.5 0.19922 1 0.30078 1.5 0.30078 0.30078 0 0.60156-0.10156 0.89844-0.30078 0.19922-0.10156 0.39844-0.39844 0.5-0.80078 0.10156-0.19922 0.10156-0.39844 0.10156-0.60156v-0.10156c3.3984 4.6016 2.6016 5.6016 1.5 6.8984-0.5 0.69922-0.39844 1.6016 0.19922 2.1992 0.30078 0.19922 0.60156 0.30078 1 0.30078 0.39844 0 0.89844-0.19922 1.1992-0.60156 2.1016-2.6016 2.1992-5-0.10156-8.6016 0.10156 0 0.19922 0.10156 0.30078 0.10156 0.30078 0.10156 0.60156 0.19922 1 0.30078 0.30078 0.10156 0.69922 0.19922 1.1016 0.30078 0.80078 0.19922 1.6016 0.39844 2.5 0.60156 0.19922 0 0.5 0.10156 0.69922 0.19922 0.19922 0 0.5 0.10156 0.69922 0.10156 0.5 0.10156 1 0.10156 1.5 0.19922 0.5 0.10156 1 0.10156 1.6016 0.19922 0.30078 0 0.5 0.10156 0.80078 0.10156h0.80078 3.6016c1.1992-0.10156 2.5-0.30078 3.8008-0.39844 1.3008-0.19922 2.6016-0.5 4-0.89844 0.69922-0.19922 1.3008-0.39844 2-0.69922 0.69922-0.19922 1.3984-0.39844 2.1016-0.69922 0.69922 0.30078 1.3984 0.5 2.1016 0.69922 0.69922 0.19922 1.3984 0.5 2 0.69922 1.3984 0.30078 2.6992 0.60156 4 0.89844 1.3008 0.10156 2.6016 0.30078 3.8008 0.39844h3.6016 0.80078c0.30078 0 0.60156-0.10156 0.80078-0.10156 0.5-0.10156 1.1016-0.10156 1.6016-0.19922 0.5-0.10156 1-0.10156 1.5-0.19922 0.19922 0 0.5-0.10156 0.69922-0.10156 0.19922-0.10156 0.5-0.10156 0.69922-0.19922 0.89844-0.19922 1.6992-0.39844 2.5-0.60156 0.39844-0.10156 0.69922-0.19922 1.1016-0.30078 0.30078-0.10156 0.69922-0.19922 1-0.30078 0.10156 0 0.19922-0.10156 0.30078-0.10156-2.1992 3.6992-2.1992 6-0.10156 8.6016 0.30078 0.39844 0.69922 0.60156 1.1992 0.60156 0.30078 0 0.69922-0.10156 1-0.30078 0.69922-0.5 0.80078-1.5 0.19922-2.1992-1.1016-1.3008-1.8984-2.3008 1.5-7 0 0.30078 0 0.60156 0.10156 0.80078s0.10156 0.5 0.19922 0.69922c0.10156 0.19922 0.19922 0.39844 0.30078 0.60156v-0.10156c0-0.10156-0.10156-0.30078-0.10156-0.39844-0.10156-0.5-0.19922-0.89844-0.39844-1.3008 0-0.10156-0.10156-0.19922-0.10156-0.19922v-0.10156 0.10156c0.10156 0.19922 0.30078 0.39844 0.39844 0.60156 0.10156 0.19922 0.19922 0.39844 0.30078 0.69922 0.10156 0.30078 0.30078 0.80078 0.5 1.3008 0.19922 0.39844 0.39844 0.80078 0.60156 1.1016 0.30078 0.39844 0.60156 0.80078 0.89844 1.1016 0.30078 0.30078 0.60156 0.39844 1 0.60156v-0.10156c0.37891 0.089843 0.28125-0.011719 0.28125-0.10938z" />
        <path d="m90.602 91.102c-0.30078-0.5-0.5-1.1016-0.69922-1.6992-0.19922-0.39844-0.30078-0.89844-0.5-1.3008-0.10156-0.30078-0.30078-0.60156-0.60156-0.89844-0.30078-0.30078-0.69922-0.60156-1.1992-0.69922-0.30078-0.10547-0.80078-0.10547-1.3008-0.10547 0.19922 0.60156 0.39844 1.3984 0.60156 2.1992 0.30078 1.1992 0.69922 2.3984 1.1992 3.3008 0.19922 0.39844 0.5 0.69922 0.89844 0.89844 0.60156 0.39844 1.3984 0.60156 2.3008 0.39844 0.39844-0.10156 0.80078-0.19922 1.1992-0.30078-0.10156 0-0.19922 0-0.30078-0.10156-0.69922-0.19141-1.1992-0.79297-1.5977-1.6914z" />
        <path d="m86.5 89.301c-0.19922-0.80078-0.39844-1.6992-0.69922-2.3984-0.10156-0.30078-0.30078-0.5-0.60156-0.69922s-0.80078-0.30078-1.3008-0.30078-1 0-1.5 0.10156c0.30078 0.19922 0.5 0.39844 0.60156 0.69922 0.19922 0.39844 0.39844 0.89844 0.5 1.5 0.19922 0.69922 0.39844 1.3984 0.69922 2.1016 0.19922 0.39844 0.39844 0.80078 0.69922 1.1992 0.5 0.69922 1.1992 1.1992 2 1.3984 0.39844 0.10156 0.80078 0.10156 1.1016 0.10156-0.10156-0.10156-0.19922-0.19922-0.30078-0.30078-0.5-0.90234-0.80078-2.2031-1.1992-3.4023z" />
        <path d="m94.102 91.602c-0.39844-0.30078-0.89844-0.89844-1.1992-1.6016l-0.10156-0.10156c-0.10156-0.19922-0.30078-0.5-0.60156-0.80078-0.30078-0.39844-0.69922-0.69922-1.1016-1-0.39844-0.19922-0.80078-0.39844-1.3008-0.5 0.19922 0.5 0.30078 1 0.5 1.5 0.19922 0.60156 0.5 1.1992 0.69922 1.8008 0.30078 0.60156 0.69922 1.1016 1.1992 1.3984 0.10156 0.10156 0.30078 0.10156 0.5 0.19922h0.60156c0.30078 0 0.69922-0.10156 1.1016-0.30078 0.19922-0.10156 0.39844-0.19922 0.60156-0.39844-0.30078 0.003906-0.60156-0.097656-0.89844-0.19531z" />
        <path d="m94 90.602c-0.10156-0.10156-0.19922-0.19922-0.30078-0.30078-0.19922-0.19922-0.39844-0.39844-0.60156-0.5l0.10156 0.10156c0.30078 0.69922 0.69922 1.1992 1 1.5 0.19922 0.19922 0.5 0.39844 0.69922 0.39844-0.19922-0.30078-0.39844-0.60156-0.69922-0.89844 0-0.10156-0.097657-0.20312-0.19922-0.30078z" />
        <path d="m99.699 91.801c0 3.0664-4.5977 3.0664-4.5977 0 0-3.0664 4.5977-3.0664 4.5977 0" />
        <path d="m5.8984 92.5c0.10156 0 0.30078 0.10156 0.39844 0.10156 0.30078 0.10156 0.5 0.19922 0.80078 0.19922h-0.097656c-0.60156-0.5-1.1016-0.80078-1.6016-0.89844-0.30078-0.10156-0.60156-0.10156-0.80078-0.10156 0.30078 0.19922 0.60156 0.39844 1 0.5 0.003906 0.097657 0.20312 0.19922 0.30078 0.19922z" />
        <path d="m16 88.199c-0.69922-0.30078-1.3008-0.60156-2-0.89844-0.39844-0.19922-0.80078-0.30078-1.3008-0.39844-0.80078-0.19922-1.5-0.19922-2.1992 0.10156-0.30078 0.10156-0.60156 0.30078-0.89844 0.5 0.10156 0 0.30078 0.10156 0.39844 0.10156 1 0.5 2 1.1992 3.1016 2 0.69922 0.5 1.5 0.89844 2.1992 1.1992 0.30078 0.10156 0.60156 0.10156 1 0 0.39844-0.19922 0.89844-0.5 1.3008-0.89844 0.39844-0.39844 0.69922-0.89844 0.89844-1.5-0.30078 0.19922-0.69922 0.30078-1.1016 0.19922-0.39844-0.003907-0.89844-0.20703-1.3984-0.40625z" />
        <path d="m10.301 88.5c-0.39844-0.19922-0.80078-0.30078-1.1992-0.30078-0.69922 0-1.3984 0.19922-2 0.69922-0.30078 0.19922-0.60156 0.5-0.80078 0.80078 0.10156 0 0.19922-0.10156 0.30078-0.10156 0.69922-0.10156 1.3984 0.19922 2.1016 0.69922 0.5 0.30078 1 0.69922 1.5 1.1016 0.39844 0.30078 0.69922 0.5 1.1016 0.80078 0.30078 0.19922 0.69922 0.30078 1.1016 0.39844 0.5 0 1 0 1.5-0.30078 0.5-0.19922 0.89844-0.5 1.3008-0.89844-0.69922-0.30078-1.3984-0.69922-2.1016-1.1016-0.90625-0.59766-1.9062-1.2969-2.8047-1.7969z" />
        <path d="m8.5 90.898c-0.60156-0.39844-1.1992-0.60156-1.6992-0.69922-0.30078 0-0.69922 0.10156-1 0.30078-0.30078 0.10156-0.60156 0.39844-0.89844 0.69922-0.10156 0.19922-0.30078 0.39844-0.39844 0.60156 0.30078-0.19922 0.60156-0.19922 0.89844-0.19922 0.5 0.10156 1.1992 0.5 1.8008 0.89844l0.10156 0.10156c0.19922 0.10156 0.60156 0.30078 1 0.39844 0.5 0.19922 1 0.30078 1.6016 0.30078 0.5 0 1-0.10156 1.5-0.30078-0.5-0.30078-0.89844-0.69922-1.3008-1-0.60547-0.39844-1.1055-0.80078-1.6055-1.1016z" />
        <path d="m4.3984 91.801c0 3.0664-4.5977 3.0664-4.5977 0 0-3.0664 4.5977-3.0664 4.5977 0" />
      </g>
    </svg>
  )
);

export default AttackIcon;
