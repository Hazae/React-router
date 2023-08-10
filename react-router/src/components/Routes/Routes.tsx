import { isValidElement, type ReactNode } from "react";
import { useRouter } from "@hooks/useRouter";
import { RouteProps } from "@components/Route/Route";

interface RoutesProps {
  children: ReactNode[];
}

// 자식 컴포넌트를 찾아간다.
// 지정한 path와 현재 경로가 같을 때 컴포넌트를 렌더링한다.
const Routes = ({ children }: RoutesProps) => {
  const { pathname: currentPath } = useRouter();
  // console.log(children);
  const childArray = Array.isArray(children) ? children : [children];

  const currentRenderComponent = (childComponent: ReactNode): boolean => {
    // isValidElement, type predicate 되어있음. 이 안에서는 props 접근 가능!
    // 제네릭을 넣으면 props 타입 지정도 가능!
    if (!isValidElement<RouteProps>(childComponent)) return false;
    // Route 컴포넌트가 아닌 경우 path는 undefined?
    return childComponent.props.path === currentPath;
  };

  return <>{childArray.find(currentRenderComponent)}</>;
};

export default Routes;
