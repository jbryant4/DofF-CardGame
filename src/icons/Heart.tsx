import { forwardRef } from 'react';

type OwnProps = React.SVGProps<SVGSVGElement> & { size?: number };

const HeartIcon = forwardRef<SVGSVGElement, OwnProps>(
  ({ size = 100, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      version="1.1"
      viewBox="0 0 100 100"
    >
      <path d="m73.23 1.9219c-5.5781 0-11.23 2.3477-16.191 7.2695l-7.0391 6.5781-7.0781-6.5781c-5.4609-4.6914-11.23-7.0391-16.77-7.0391-6.2695 0-12.27 3-17.23 9-9.3477 11.27-9.3477 28.27 0 39.5l41.195 47.426 40.922-47.422c9.3477-11.27 9.3477-28.27 0-39.5-5-6.0391-11.348-9.2344-17.809-9.2344z" />
    </svg>
  )
);

export default HeartIcon;
