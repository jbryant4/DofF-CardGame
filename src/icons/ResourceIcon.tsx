import { forwardRef } from 'react';

type OwnProps = React.SVGProps<SVGSVGElement> & { size?: number };

const ResourceIcon = forwardRef<SVGSVGElement, OwnProps>(
  ({ size = 128, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      ref={ref}
      version="1.1"
      viewBox="0 0 100 100"
    >
      <g>
        <path d="m68.312 32.816-17.121 12.566v18.93l17.121-12.562z" />
        <path d="m32.719 56.438c-3.4961-2.3945-7.4805 1.5898-4.4414 4.5547l11.641 11.309c-0.83203 0.76953-2.1562 1.0078-3.25-0.035156l-10.047-9.5547c-2.9219-2.8516-1.8594-6.582 0.58594-8.457l-0.007812-16.934c0-4.2383-6.3594-4.2383-6.3594 0v28.449c-0.074219 1.9688 0.73047 4.0117 2.7656 5.6641l12.121 11.785v6.1328h12.473v-16.32c-0.10547-3.0469-0.76953-6.1445-2.9062-7.6719-1.793-1.2734-10.469-7.4805-12.574-8.9219z" />
        <path d="m50 17.625-17.488 12.836 17.488 12.84 17.484-12.84z" />
        <path d="m31.691 51.75 17.117 12.562v-18.93l-17.117-12.566z" />
        <path d="m72.805 37.32v16.934c2.4297 1.8789 3.4922 5.6055 0.57812 8.457l-10.051 9.5547c-1.0938 1.043-2.418 0.80859-3.25 0.035156l11.641-11.309c3.0391-2.9648-0.94531-6.9531-4.4414-4.5547-2.0508 1.4062-9.4023 6.75-12.703 9.0625-2.0938 1.4688-2.6719 4.5664-2.7695 7.5352v16.32h12.461v-6.1289l12.129-11.789c2.0391-1.6523 2.8398-3.6953 2.7656-5.6641l0.007813-28.449c-0.003906-4.2422-6.3672-4.2422-6.3672-0.003907z" />
      </g>
    </svg>
  )
);

export default ResourceIcon;