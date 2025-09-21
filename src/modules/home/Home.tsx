import { FC, Suspense } from "react";
import Blog from "./Blog/Blog";
import Cover from "./Cover/Cover";
import Contact from "./Contact/Contact";

type HomeProps = {
  category?: string;
};

const Home: FC<HomeProps> = ({ category }) => {
  return (
    <main
      id="home"
      tabIndex={-1}
      className="relative flex w-full max-w-[1440px] flex-col items-center focus:outline-none"
    >
      <Cover />
      <Suspense
        fallback={
          <div className="flex w-full items-center justify-center min-h-[940px]">
            <p className="text-primary-300 ">Carregando...</p>
          </div>
        }
      >
        <Blog {...{ category }} />
      </Suspense>
      <Contact />
    </main>
  );
};

export default Home;
