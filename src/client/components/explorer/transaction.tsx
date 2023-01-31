import { Stack, Text } from '@chakra-ui/react';
import { trpc } from 'client/trpc';
import { TransactionOutput } from 'common/transaction';

import { Amount } from './amount';
import { AddressLink } from './objectLink';

interface TransactionOutputComponentProps {
  output: TransactionOutput;
}

function TransactionOutputComponent({
  output
}: TransactionOutputComponentProps) {
  return (
    <Text>
      Output paying <AddressLink id={output.pubkey} /> the amount of{' '}
      <Amount amount={output.value} />
    </Text>
  );
}

export interface TransactionComponentProps {
  id: string;
}

export function TransactionComponent({ id }: TransactionComponentProps) {
  const { data: transaction } = trpc.transactions.getById.useQuery(id);

  if (!transaction) return null;

  return (
    <Stack>
      <Text>{transaction.id}</Text>
      {transaction.outputs.map((output, index) => (
        <TransactionOutputComponent
          key={index}
          output={transaction.outputs[0]}
        />
      ))}
    </Stack>
  );
}
