import React, { FC } from 'react';

interface PropsHeader {
  title: string;
}

const HeaderComponent: FC<PropsHeader> = ({ title }) => {
  return <h2 className="header font-Roboto">{title}</h2>;
};

export default HeaderComponent;
