import { TransactionComponent } from 'client/components/explorer/transaction';
import { ExplorerLayout } from 'client/components/layout';
import { useRouter } from 'next/router';

export default function TransactionPage() {
  const router = useRouter();

  return (
    <ExplorerLayout>
      <h1>EE374 Explorer TX</h1>
      {router.query.id !== undefined && (
        <TransactionComponent id={String(router.query.id)} />
      )}
    </ExplorerLayout>
  );
}
