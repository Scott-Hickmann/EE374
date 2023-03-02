import { ExplorerLayout } from 'client/components/layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ChainComponent = dynamic(
  () => import('client/components/explorer/chain'),
  {
    ssr: false
  }
);

export default function TreePage() {
  const router = useRouter();

  const height = parseInt(String(router.query.height));

  return (
    <ExplorerLayout>
      {isNaN(height) ? null : <ChainComponent tipHeight={height} />}
    </ExplorerLayout>
  );
}
