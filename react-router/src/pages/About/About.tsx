import Link from "@components/Link/Link";
import { useRouter } from "@hooks/useRouter";

const About = () => {
  const router = useRouter();

  return (
    <div>
      <h1>About</h1>
      <Link to="/">To Home</Link>
      <button onClick={() => router.push("/")}>home (router.push)</button>
    </div>
  );
};

export default About;
