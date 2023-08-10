import Link from "@components/Link/Link";
import { useRouter } from "@hooks/useRouter";

const Root = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Root</h1>
      <Link to="/about">To About</Link>
      <button onClick={() => router.push("/about")}>about (router.push)</button>
    </div>
  );
};

export default Root;
