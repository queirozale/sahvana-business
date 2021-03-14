import Header from "../components/Header/Header";
import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client'

const IndexPage: NextPage = () => {
  const [ session, loading ] = useSession();

  if (session) {
    return (
      <div>
        <Header />
        <h1>Home page do usuário</h1>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <h1>Home page genérica</h1>
      </div>
    );
  }
};

export default IndexPage;