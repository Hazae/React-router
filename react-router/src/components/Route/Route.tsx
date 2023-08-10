import { ReactNode } from "react";

export interface RouteProps {
  path: string;
  component: ReactNode;
}

// 로직 없는 껍데기
const Route = ({ component }: RouteProps) => {
  return <>{component}</>;
};

export default Route;
