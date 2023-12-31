import { forwardRef } from 'react';

type OwnProps = React.SVGProps<SVGSVGElement> & { size?: number };

const SkullIcon = forwardRef<SVGSVGElement, OwnProps>(
  ({ size = 128, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      version="1.1"
      viewBox="0 0 100 100"
      ref={ref}
      {...props}
    >
      <g>
        <path d="m28.66 82.68 21.34 12.32 21.34-12.32v-14.301l11.441-6.6094v-37.848l-32.781-18.922-32.781 18.922v37.848l11.441 6.6094zm38.871-2.1992-17.531 10.129-17.531-10.129v-9.9102l1.0703 0.62891v5.2891l16.461 9.5117 16.461-9.5117v-5.2891l1.0703-0.62891zm-46.531-54.359 29-16.73 29 16.73v33.457l-16.352 9.4219v5.3008l-12.648 7.3008-12.648-7.3008v-5.3008l-16.352-9.4219z" />
        <path d="m43.699 46.488-8.4375-5.0078-8.4414 5.0078v12.883l8.4414 5.0078 8.4375-5.0078z" />
        <path d="m73.18 59.371v-12.883l-8.4414-5.0078-8.4375 5.0078v12.883l8.4375 5.0078z" />
        <path d="m53.891 68.27v-5.8711l-3.8906-2.9297-3.8906 2.9297v5.8711l3.8906-2.9297z" />
      </g>
    </svg>
  )
);

export default SkullIcon;
