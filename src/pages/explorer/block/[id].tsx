import { BlockComponent } from 'client/components/explorer/block';
import { ExplorerLayout } from 'client/components/layout';
import { useRouter } from 'next/router';

export default function TransactionPage() {
  const router = useRouter();

  return (
    <ExplorerLayout>
      <h1>EE374 Explorer TX</h1>
      {router.query.id !== undefined && (
        <BlockComponent id={String(router.query.id)} />
      )}
    </ExplorerLayout>
  );
}