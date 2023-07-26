import React, { FC, ReactNode } from 'react';

type TabProps = {
  title: string;
  children: ReactNode;
};

const Tab: FC<TabProps> = ({ title, children }) => {
  return (
    <div>
      <h3>{title}</h3>
      <ul>{children}</ul>
    </div>
  );
};

export default Tab;
