import type { ReactNode } from 'react';

type TAuthBlock = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => ReactNode;

const AuthBlock: TAuthBlock = ({ title, children }) => {
  return (
    <div className="formBlock">
      <h1 className="text text_type_main-medium mb-6">{title}</h1>
      {children}
    </div>
  );
};
export default AuthBlock;
