import * as constants from 'constants';
import { forwardRef } from 'react';
import { PreReq } from '~/models/Card';

type Stat = 'hp' | 'atk' | 'hp';
type OwnProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  stat?: Stat;
  value?: number;
};

const getIconToUse = (stat: Stat) => {};

const CornerStatIcon = forwardRef<SVGSVGElement, OwnProps>(
  ({ size = 128, stat = 'hp', value = 7, ...props }, ref) => {
    const IconToUse = getIconToUse(stat);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        {...props}
        ref={ref}
        version="1.1"
        viewBox="0 0 100 100"
      >
        <path d="m78.402 78.215c0-31.301-25.379-56.617-56.617-56.617v56.617z" />
      </svg>
    );
  }
);

export default CornerStatIcon;
