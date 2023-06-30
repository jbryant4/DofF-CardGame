import classnames from 'classnames';
import { HTMLProps } from 'react';
type OwnProps = { active?: boolean; children: string };

type BlueBtnProps = OwnProps & HTMLProps<HTMLDivElement>;
const BlueBtn = ({ active = false, children, ...props }: BlueBtnProps) => (
  <div
    {...props}
    className={classnames(
      'border-[3px] border-blue-700 hover:bg-blue-700 hover:text-white px-8 py-4 rounded-full text-sm max-w-[200px]',
      { 'bg-blue-700 text-white': active }
    )}
  >
    {children}
  </div>
);

export default BlueBtn;
