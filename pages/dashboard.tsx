import Meta from '@/components/Meta';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <>
      <Meta
        title="Expenses Dashboard"
        description="Expenses Dashboard. Manage your Expenses here"
      />
      <Layout>
        <h1>Expenses</h1>
      </Layout>
    </>
  );
}
