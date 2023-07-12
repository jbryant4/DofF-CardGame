import classnames from 'classnames';
import { HTMLProps } from 'react';
type OwnProps = { active?: boolean };

type BlueBtnProps = OwnProps & HTMLProps<HTMLDivElement>;
const BlueBtn = ({
  active = false,
  children,
  className: tailWindStyle = '',
  ...props
}: BlueBtnProps) => (
  <div
    {...props}
    className={classnames(
      `border-[3px] border-blue-700 hover:bg-blue-700 hover:text-white px-8 py-4 rounded-full text-14 w-fit max-w-[200px] ${tailWindStyle}`,
      { 'bg-blue-700 text-white': active }
    )}
  >
    {children}
  </div>
);

export default BlueBtn;
