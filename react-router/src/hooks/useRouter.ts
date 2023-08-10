import { useContext } from "react";
import { RouterContext } from "@components/Router/Router";

type useRouterHookResult = {
  push: (path: string) => void;
  pathname: string;
};

export const useRouter = (): useRouterHookResult => {
  const value = useContext(RouterContext);
  if (value === null) throw new Error("Router 컴포넌트 내부에서 호출하세요!");

  const { currentPath, changePath } = value;

  const pathname = currentPath;
  const push = (path: string) => {
    changePath(path);
  };

  return {
    push,
    pathname,
  };
};
