import { useState, createContext, useEffect, type ReactNode } from "react";

interface RouterContextValue {
  currentPath: string;
  changePath: (to: string) => void;
}

export const RouterContext = createContext<RouterContextValue | null>(null);

interface RouterProps {
  children: ReactNode;
}

const Router = ({ children }: RouterProps) => {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname
  );

  useEffect(() => {
    // PopStateEvent 인터페이스: Returns a copy of the information that was provided to pushState() or replaceState().
    const handleCurrentPathChange = (e: PopStateEvent) => {
      // 옵셔널 체이닝으로 e.state에 있는 path 리턴값 관리
      //   ?? 연산자는 전자가 null이라면 후자를 반환하고 그렇지 않으면 전자를 리턴
      setCurrentPath(e.state?.path ?? "/");
    };

    window.addEventListener("popstate", handleCurrentPathChange);

    return () => {
      window.removeEventListener("popstate", handleCurrentPathChange);
    };
  }, []);

  const changePath = (to: string) => {
    // 브라우저 주소를 바꿈. 첫번째 인자가 popState event에서 state를 꺼내감
    window.history.pushState({ path: to }, "", to);
    // rerender를 위한 path 상태 업데이트
    setCurrentPath(to);
  };

  const contextValue: RouterContextValue = {
    currentPath,
    changePath,
  };

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};
