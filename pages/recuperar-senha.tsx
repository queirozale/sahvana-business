import { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/client';
import dynamic from 'next/dynamic';

const DynamicRecoveryPassword = dynamic(
  () => import('../components/signin/recovery-password'),
  { loading: () => <p>Loading ...</p>, ssr: false }
)

const RecoveryPassword: NextPage = () => {
  const [ session, loading ] = useSession()
   return (
    <div>
      <DynamicRecoveryPassword />
    </div>
  );
};

export default RecoveryPassword;
