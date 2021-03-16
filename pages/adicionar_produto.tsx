import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';
import dynamic from 'next/dynamic';

const DynamicSignUp = dynamic(
  () => import('../components/Products/AddProduct'),
  { loading: () => <p>Loading ...</p>, ssr: false }
)

const SignUpPage: NextPage = () => {
  const [ session, loading ] = useSession()
   return (
    <div>
      <DynamicSignUp />
    </div>
  );
};

export default SignUpPage;
