import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Link,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react';

import Layout from '../components/layout';
import {
  Section,
  Sections,
  SectionTitle,
  SubectionText,
  Subsection,
  SubsectionTitle,
  TeachingTeamMember
} from '../components/section';
import TitleSection from '../components/titleSection';

interface SyllabusItem {
  title: string;
  content: (JSX.Element | string)[];
}

const syllabus: SyllabusItem[] = [
  {
    title: 'Lecture 1: Money',
    content: [
      'Administrivia',
      'Money as a social construct',
      'The network model',
      'The non-eclipsing assumption',
      'The gossip protocol'
    ]
  },
  {
    title: 'Lecture 2: The Adversary',
    content: [
      'The adversary A',
      'The security parameter κ',
      'The honest protocol Π',
      'The adversarial model',
      'Probabilistic polynomial-time adversaries',
      'Negligible functions',
      'Game-based security',
      'Security proofs by computation reduction',
      'Proofs by contradiction and forward proofs'
    ]
  },
  {
    title: 'Lecture 3: Primitives',
    content: [
      'The hash function: H',
      'Preimage resistance, second preimage resistance, collision resistance',
      'Collision resistance implies preimage resistance',
      'Preimage resistance implies second preimage resistance',
      'Public/private keys',
      'Signature schemes',
      'Signature correctness',
      'Existential unforgeability',
      'Ledgers'
    ]
  },
  {
    title: 'Lecture 4: Transactions',
    content: [
      'Transactions',
      'Inputs and outputs',
      'The transaction graph',
      'Change',
      'Multiple inputs',
      'Multiple outputs',
      'The UTXO model',
      'The law of conservation',
      'Verifying a transaction'
    ]
  },
  {
    title: 'Lecture 5: Blocks',
    content: [
      'Views in disagreement',
      'Double spending',
      'The network delay Δ',
      "Simple ideas don't work!",
      'Rare events',
      'Blocks',
      'Proof-of-work',
      'The mining target T',
      'The proof-of-work equation',
      'The mining algorithm',
      'Block freshness',
      'The genesis block G',
      'Chains'
    ]
  },
  {
    title: 'Lecture 6: Chains',
    content: [
      'Hash chains',
      'The number n of parties',
      'The number t of adversarial parties',
      'The hashing power q',
      'Rare events are irregular',
      'Convergence opportunities and periods of silence',
      'The honest majority assumption',
      'The longest chain rule',
      'Coinbase',
      'Fees',
      'Mempools'
    ]
  },
  {
    title: 'Lecture 7: Chain Virtues',
    content: [
      'Temporary forks',
      'Convergence',
      'The Nakamoto race',
      'Chain Growth, Common Prefix, Chain Quality',
      'Censorship',
      'Majority attacks'
    ]
  },
  {
    title: 'Lecture 8: Attacks',
    content: [
      'Healing',
      'Macroeconomic supply',
      'Selfish mining',
      'Mining pools'
    ]
  },
  {
    title: 'Lecture 9: Variable Difficulty, Pools, Wallets',
    content: [
      'CPU, GPU, ASIC mining',
      'Incentive compatibility',
      'Block size limits',
      'Transaction prioritization by fees',
      'Macroeconomic policy, reward adjustment',
      'The difficulty adjustment equation Τ_{j+1} = T_{j} (t_2 - t_1) / (mη)',
      'Mining pools, the light PoW equation: H(B) ≤ 2^z T',
      'The pooled mining protocol',
      'Cold, hot, and hardware wallets',
      'Wallet seeds, deterministic wallets'
    ]
  },
  {
    title: 'Lecture 10: Accounts and Balances, Merkle Trees',
    content: [
      'The account model',
      'Transactions in the account model',
      'Balances',
      'Nonces',
      'The generic transition function δ',
      'Blockchain as a State Machine Replication mechanism',
      'UTXO vs accounts',
      'The file storage problem',
      'The Merkle Tree: compress, prove, verify',
      'Proofs of inclusion, succinctness',
      'Merkle Tree security proof by reduction from collision-resistant hashes'
    ]
  },
  {
    title: 'Midterm Exam',
    content: ['More information will be posted soon.']
  },
  {
    title: 'Lecture 11: Light Clients, Backbone Warmup',
    content: [
      'The problem of scalability in blockchains: Scaling computation, communication, and storage',
      'From x-bar to x using Merkle Trees',
      'The Simple Payment Verification (SPV) protocol',
      'The header chain',
      'Miners, Full Nodes, Light Nodes',
      'Chain virtues for light nodes',
      'Privacy concerns for light nodes',
      'Random Oracles, formally',
      'The synchrony assumption Δ = 1'
    ]
  },
  {
    title: 'Lecture 12: Security in Earnest (I)',
    content: [
      'The Environment and the Execution',
      'The Rushing Adversary',
      'The Sybil Adversary',
      'The Network model, the gossiping model',
      'The Non-Eclipsing Assumption',
      'The honest backbone protocol',
      'Maintaining, adopting, and having chains',
      'Proof-of-work',
      'The q-bounded Random Oracle',
      'The Static Difficulty assumption',
      'Chain validation; the δ* function',
      'Successful rounds',
      'Convergence opportunities',
      'Formal definition of Chain Virtues',
      'Common Prefix, the parameter k',
      'Chain Quality, the parameters μ and ℓ',
      'Chain Growth, the parameters τ and s',
      'The formal honest majority assumption: t < (1 - δ)(n - t)',
      'The honest advantage δ',
      'Convergence Opportunities are useful: The Pairing Lemma and its proof'
    ]
  },
  {
    title: 'Lecture 13: Security in Earnest (II)',
    content: [
      'Ledger Safety and Liveness, formally. The liveness parameter u.',
      'Proof of Safety from Common Prefix',
      'Proof of Liveness from Chain Quality and Chain Growth; u = max((ℓ + k) / τ, s)',
      'The Chain Growth Lemma and its proof',
      'The successful round indicator X',
      'The convergence opportunity indicator Y',
      'The adversarial success indicator Z',
      'The expectations of X, Y, and Z',
      "Bernoulli's inequality",
      'Lower and upper bounds on the expectation of X',
      'Lower bounds on the expectation of Y',
      'Good things converge: The Chernoff bound',
      'The world is good, usually: Typical executions',
      'The Chernoff duration λ',
      'The Chernoff error ε',
      'Proof of Typicality Theorem',
      'The Balancing Equation: 3ε + 3f ≤ δ',
      'A plot of X, Y, and Z with 3f, 3ε and δ'
    ]
  },
  {
    title: 'Lecture 14: Security in Earnest (III)',
    content: [
      'Reminder of bounds on the expectations of X and Y',
      'Upper bound on the expectation of Z',
      'Typical bounds, and proof that Z ≤ Y',
      'Chains grow: The Chain Growth theorem and its proof',
      'The Patience Lemma and its proof',
      'The Common Prefix theorem and its proof',
      'Discussion on the relationship between ε and λ',
      "You can't have it all: Discussion on the parametrization options for ε, f, δ"
    ]
  },
  {
    title: 'Lecture 15: Longest Chain Proof of Stake (I)',
    content: [
      "Proof of Work's perils and environmental impact",
      'Proof of Work vs Proof of Stake',
      'Dangers of Proof of Stake',
      'The Proof of Stake equation'
    ]
  },
  {
    title: 'Lecture 16: Longest Chain Proof of Stake (II)',
    content: [
      "Proof of Work's perils and environmental impact",
      'Proof of Work vs Proof of Stake',
      'Dangers of Proof of Stake',
      'The Proof of Stake equation'
    ]
  },
  {
    title: 'Lecture 17: BFT Proof of Stake (I)',
    content: [
      'Everything is a Race and Nakamoto Always Wins',
      'Verifiable Random Functions',
      'VRF correctness',
      'The unpredictability game',
      'Towards instant finality'
    ]
  },
  {
    title: 'Lecture 18: BFT Proof of Stake (II)',
    content: ['The Streamlet protocol and its proof of safety']
  },
  {
    title: 'Final Exam',
    content: ['More information will be posted soon.']
  }
];

export default function HomePage() {
  const section1SubsectionTitleColor = 'gray.400';
  const section2SubsectionTitleColor = 'blue.400';

  return (
    <Layout
      title="EE374: Blockchain Foundations"
      description="Blockchains are a new field of computer science which combines cryptography, distributed systems, and security. In this course, we dive deep into the fundamentals: what are blockchains, how do they work, and why are they secure?"
    >
      <Sections>
        <TitleSection />
        <Section id="logistic">
          <SectionTitle>Logistics and Details</SectionTitle>
          <Subsection>
            <SubsectionTitle color={section1SubsectionTitleColor}>
              Meeting Times
            </SubsectionTitle>
            <SubectionText>
              Tuesday, Thursday 1:30-2:50 PM
              <br />
              Gates B12
            </SubectionText>
          </Subsection>
          <Subsection>
            <SubsectionTitle color={section1SubsectionTitleColor}>
              Course Description
            </SubsectionTitle>
            <SubectionText>
              Blockchains are a new field of computer science which combines
              cryptography, distributed systems, and security. In this course,
              we dive deep into the fundamentals: what are blockchains, how do
              they work, and why are they secure? <br />
              While in the EE department, this course also counts as a CS
              elective.
            </SubectionText>
          </Subsection>
          <Subsection>
            <SubsectionTitle color={section1SubsectionTitleColor}>
              Prerequisites
            </SubsectionTitle>
            <SubectionText>
              CS106A, CS106B, or CS106X, or relevant programming experience
              <br />
              CS103, or CS103B or related course on discrete math
              <br />
              CS109, MATH151, STATS116, or EE178 or related course on
              probability
            </SubectionText>
          </Subsection>
          <Subsection>
            <SubsectionTitle color={section1SubsectionTitleColor}>
              Questions or Concerns?
            </SubsectionTitle>
            <SubectionText>
              Please reach out to{' '}
              <Link
                color={section2SubsectionTitleColor}
                href="mailto:dionyziz@stanford.edu"
              >
                dionyziz@stanford.edu
              </Link>{' '}
              if you have any questions or concerns!
            </SubectionText>
          </Subsection>
        </Section>
      </Sections>
      <Section id="syllabus" bg={useColorModeValue('gray.200', 'gray.700')}>
        <SectionTitle>Syllabus</SectionTitle>
        {syllabus.map(({ title, content }, index) => (
          <Subsection key={index}>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton borderRadius="md">
                  <SubsectionTitle color={section2SubsectionTitleColor}>
                    {title}
                  </SubsectionTitle>
                  <AccordionIcon color={section2SubsectionTitleColor} />
                </AccordionButton>
                <AccordionPanel>
                  {content.map((item, index) => (
                    <SubectionText key={index}>• {item}</SubectionText>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Subsection>
        ))}
      </Section>
      <Section id="team" bg="blue.500" color="white">
        <SectionTitle>Teaching Team</SectionTitle>
        <SimpleGrid
          width="full"
          justifyItems="center"
          columns={2}
          spacing={{ base: 8, md: 10 }}
        >
          <TeachingTeamMember
            name="Dr. Dionysis Zindros"
            workRole="Instructor"
            src="/images/dionysis.png"
            alt="Dionysis Zindros"
          />
          <TeachingTeamMember
            name="Prof. David Tse"
            workRole="Instructor"
            src="/images/david.png"
            alt="David Tse"
          />
          <TeachingTeamMember
            name="Scott Hickmann"
            workRole="Teaching Assistant"
            src="/images/scott.png"
            alt="Scott Hickmann"
          />
          <TeachingTeamMember
            name="Kenan Hasanaliyev"
            workRole="Teaching Assistant"
            src="/images/kenan.png"
            alt="Dionysis Zindros"
          />
        </SimpleGrid>
      </Section>
    </Layout>
  );
}
