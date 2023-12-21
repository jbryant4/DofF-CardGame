import classnames from 'classnames';
import React, { HTMLProps } from 'react';

interface BlueBtnProps extends HTMLProps<HTMLDivElement> {
  active?: boolean;
  disable?: boolean;
}

const BlueBtn: React.FC<BlueBtnProps> = ({
  active = false,
  children,
  className: tailWindStyle = '',
  ...props
}: BlueBtnProps) => (
  <div
    {...props}
    className={classnames(
      `border-[3px] border-blue-700 hover:bg-blue-700 hover:text-white px-8 py-4 h-auto rounded-full text-14 w-fit max-w-[200px] ${tailWindStyle}`,
      { 'bg-blue-700 text-white': active }
    )}
  >
    {children}
  </div>
);

export default BlueBtn;
