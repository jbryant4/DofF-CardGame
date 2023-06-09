import classNames from 'classnames';

type OwnProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  def?: number;
};

const ShieldIcon = ({ size = 100, ...props }: OwnProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    {...props}
    version="1.1"
    viewBox="0 0 100 100"
  >
    <path d="m88.102 17c0.60156 3.8984 0.89844 7.8008 0.89844 11.898 0 29.801-15.801 55.602-39 68.602-23.199-13-39-38.898-39-68.602 0-4 0.30078-8 0.89844-11.898 0 0 27.398-3.3984 38-14.5 11.5 10.801 38.203 14.5 38.203 14.5z" />
  </svg>
);

export default ShieldIcon;
