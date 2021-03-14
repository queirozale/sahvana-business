import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';
import dynamic from 'next/dynamic';

const DynamicSignIn = dynamic(
  () => import('../components/signin/signin'),
  { loading: () => <p>Loading ...</p>, ssr: false }
)

const IndexPage: NextPage = () => {
  const [ session, loading ] = useSession()
   return (
    <div>
      <DynamicSignIn />
    </div>
  );
};

export default IndexPage;
