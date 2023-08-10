import { type ReactNode, type MouseEvent } from "react";
import { useRouter } from "@hooks/useRouter";

interface LinkProps {
  children: ReactNode;
  to: string;
}

// a 태그의 기본 동작을 막고, path 상태 업데이트
const Link = ({ to, children }: LinkProps) => {
  const router = useRouter();

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // 현재 Path를 to로 변경
    router.push(to);
  };

  return (
    <a onClick={handleLinkClick} href={to}>
      {children}
    </a>
  );
};

export default Link;
