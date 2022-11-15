import Layout from '../components/layout';
import TitleSection from '../components/titleSection';

export default function HomePage() {
  return (
    <Layout
      title="EE374: Blockchain Foundations"
      description="Blockchains are a new field of computer science which combines cryptography, distributed systems, and security. In this course, we dive deep into the fundamentals: what are blockchains, how do they work, and why are they secure?"
    >
      <TitleSection />
    </Layout>
  );
}
