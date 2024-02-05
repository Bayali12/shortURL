import type { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

type PrivateRoutesProps = {
  isAuthenticated: boolean;
  redirectPath: string;
};

export const PrivateRoutes: FC<PrivateRoutesProps> = ({
  isAuthenticated,
  redirectPath,
}) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};
