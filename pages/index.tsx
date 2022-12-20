import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
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
  SubsectionTitleDate,
  TeachingTeamMember
} from '../components/section';
import TitleSection from '../components/titleSection';
import { usDate, usTime } from '../utils/date';

interface SyllabusItem {
  title: string;
  date: Date;
  content: (JSX.Element | string)[];
  type?: 'psetSoft' | 'psetHard' | 'exam' | 'workshop';
}

const softGradingDeadlineMessage =
  'The grader will test your node for you to get feedback. This is not graded.';
const hardGradingDeadlineMessage =
  'The grader will test your node and give you a grade.';

const syllabus: SyllabusItem[] = [
  {
    title: 'Lecture 1: Money',
    date: new Date(2023, 0, 10),
    content: [
      'Administrivia',
      'Money as a social construct',
      'The network model',
      'The non-eclipsing assumption',
      'The gossip protocol'
    ]
  },
  {
    title: 'Workshop 1: TypeScript',
    date: new Date(2023, 0, 11, 16, 30),
    content: [
      'Setting up a TypeScript project',
      'TypeScript basics',
      'Building your project'
    ],
    type: 'workshop'
  },
  {
    title: 'Lecture 2: The Adversary',
    date: new Date(2023, 0, 12),
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
    title: 'Workshop 2: Networking',
    date: new Date(2023, 0, 13, 12, 30),
    content: [
      'TCP/IP socket connections',
      'Establishing a connection',
      'Receiving and parsing data'
    ],
    type: 'workshop'
  },
  {
    title: 'Problem Set 1 Soft Deadline',
    date: new Date(2023, 0, 17, 13, 30),
    content: [softGradingDeadlineMessage],
    type: 'psetSoft'
  },
  {
    title: 'Lecture 3: Primitives',
    date: new Date(2023, 0, 17),
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
    title: 'Problem Set 1 Hard Deadline',
    date: new Date(2023, 0, 19, 13, 30),
    content: [hardGradingDeadlineMessage],
    type: 'psetHard'
  },
  {
    title: 'Lecture 4: Transactions',
    date: new Date(2023, 0, 19),
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
    title: 'Workshop 3: Promises and Events',
    date: new Date(2023, 0, 20, 12, 30),
    content: ['JavaScript promises', 'Async/await', 'Event emitters'],
    type: 'workshop'
  },
  {
    title: 'Problem Set 2 Soft Deadline',
    date: new Date(2023, 0, 24, 13, 30),
    content: [softGradingDeadlineMessage],
    type: 'psetSoft'
  },
  {
    title: 'Lecture 5: Blocks',
    date: new Date(2023, 0, 24),
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
    title: 'Problem Set 2 Hard Deadline',
    date: new Date(2023, 0, 26, 13, 30),
    content: [hardGradingDeadlineMessage],
    type: 'psetHard'
  },
  {
    title: 'Lecture 6: Chains',
    date: new Date(2023, 0, 26),
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
    title: 'Problem Set 3 Soft Deadline',
    date: new Date(2023, 0, 31, 13, 30),
    content: [softGradingDeadlineMessage],
    type: 'psetSoft'
  },
  {
    title: 'Lecture 7: Chain Virtues',
    date: new Date(2023, 0, 31),
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
    title: 'Problem Set 3 Hard Deadline',
    date: new Date(2023, 1, 2, 13, 30),
    content: [hardGradingDeadlineMessage],
    type: 'psetHard'
  },
  {
    title: 'Lecture 8: Attacks',
    date: new Date(2023, 1, 2),
    content: [
      'Healing',
      'Macroeconomic supply',
      'Selfish mining',
      'Mining pools'
    ]
  },
  {
    title: 'Lecture 9: Variable Difficulty, Pools, Wallets',
    date: new Date(2023, 1, 7),
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
    date: new Date(2023, 1, 9),
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
    date: new Date(2023, 1, 14),
    content: ['More information will be posted soon.'],
    type: 'exam'
  },
  {
    title: 'Lecture 11: Light Clients, Backbone Warmup',
    date: new Date(2023, 1, 16),
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
    title: 'Problem Set 4 Soft Deadline',
    date: new Date(2023, 1, 21, 13, 30),
    content: [softGradingDeadlineMessage],
    type: 'psetSoft'
  },
  {
    title: 'Lecture 12: Security in Earnest (I)',
    date: new Date(2023, 1, 21),
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
    title: 'Problem Set 4 Hard Deadline',
    date: new Date(2023, 1, 23, 13, 30),
    content: [hardGradingDeadlineMessage],
    type: 'psetHard'
  },
  {
    title: 'Lecture 13: Security in Earnest (II)',
    date: new Date(2023, 1, 23),
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
    title: 'Problem Set 5 Soft Deadline',
    date: new Date(2023, 1, 28, 13, 30),
    content: [softGradingDeadlineMessage],
    type: 'psetSoft'
  },
  {
    title: 'Lecture 14: Security in Earnest (III)',
    date: new Date(2023, 1, 28),
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
    title: 'Problem Set 5 Hard Deadline',
    date: new Date(2023, 2, 2, 13, 30),
    content: [hardGradingDeadlineMessage],
    type: 'psetHard'
  },
  {
    title: 'Lecture 15: Longest Chain Proof of Stake (I)',
    date: new Date(2023, 2, 2),
    content: [
      "Proof of Work's perils and environmental impact",
      'Proof of Work vs Proof of Stake',
      'Dangers of Proof of Stake',
      'The Proof of Stake equation'
    ]
  },
  {
    title: 'Problem Set 6 Soft Deadline',
    date: new Date(2023, 2, 7, 13, 30),
    content: [softGradingDeadlineMessage],
    type: 'psetSoft'
  },
  {
    title: 'Lecture 16: Longest Chain Proof of Stake (II)',
    date: new Date(2023, 2, 7),
    content: [
      "Proof of Work's perils and environmental impact",
      'Proof of Work vs Proof of Stake',
      'Dangers of Proof of Stake',
      'The Proof of Stake equation'
    ]
  },
  {
    title: 'Problem Set 6 Hard Deadline',
    date: new Date(2023, 2, 9, 13, 30),
    content: [hardGradingDeadlineMessage],
    type: 'psetHard'
  },
  {
    title: 'Lecture 17: BFT Proof of Stake (I)',
    date: new Date(2023, 2, 9),
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
    date: new Date(2023, 2, 14),
    content: ['The Streamlet protocol and its proof of safety']
  },
  {
    title: 'Lecture 19: Proof of Stake Conclusion',
    date: new Date(2023, 2, 16),
    content: ['Final lecture on proof of stake']
  },
  {
    title: 'Final Exam',
    date: new Date(2023, 2, 21),
    content: ['More information will be posted soon.'],
    type: 'exam'
  }
];

export default function HomePage() {
  const section1SubsectionTitleColor = 'gray.400';
  const primaryColor = 'blue.400';

  const colors = {
    psetSoft: 'orange.400',
    psetHard: 'red.400',
    exam: 'green.500',
    workshop: 'purple.400'
  } as const;

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
              You will learn both the theory behind blockchains and how to
              implement them in practice. The lectures, as well as the midterm
              and final, will dive deep into the robust construction of
              proof-of-work and proof-of-stake blockchains. The problem sets
              will focus on the implementation of a blockchain node from
              scratch.
              <br />
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
              <Link color={primaryColor} href="mailto:dionyziz@stanford.edu">
                dionyziz@stanford.edu
              </Link>{' '}
              if you have any questions or concerns!
            </SubectionText>
          </Subsection>
        </Section>
      </Sections>
      <Section id="syllabus" bg={useColorModeValue('gray.200', 'gray.700')}>
        <SectionTitle>Syllabus</SectionTitle>
        {syllabus.map(({ title, date, content, type }, index) => {
          const color = type ? colors[type] : primaryColor;
          return (
            <Subsection key={index}>
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton borderRadius="md">
                    <HStack spacing={4} textAlign="start">
                      <SubsectionTitle color={color}>{title}</SubsectionTitle>
                      <SubsectionTitleDate
                        display={{ base: 'none', lg: 'initial' }}
                      >
                        {usDate(date)}
                        {date.getHours() !== 0 ? ` (${usTime(date)})` : ''}
                      </SubsectionTitleDate>
                    </HStack>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <SubsectionTitleDate
                      display={{ base: 'initial', lg: 'none' }}
                    >
                      {usDate(date)}
                      {date.getHours() !== 0 ? ` (${usTime(date)})` : ''}
                    </SubsectionTitleDate>
                    {content.map((item, index) => (
                      <SubectionText key={index}>• {item}</SubectionText>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Subsection>
          );
        })}
      </Section>
      <Section id="team" bg="blue.500" color="white">
        <SectionTitle>Teaching Team</SectionTitle>
        <SimpleGrid
          width="full"
          justifyItems="center"
          columns={2}
          spacing={{ sm: 8, md: 10 }}
        >
          <TeachingTeamMember
            name="Dr. Dionysis Zindros"
            workRole="Instructor"
            email="dionyziz@stanford.edu"
            officeHoursDate={
              <>
                Tue 3:00pm - 4:00pm
                <br />
                Wed 10:00am - 11:00am
              </>
            }
            src="/images/dionysis.png"
            alt="Dionysis Zindros"
          />
          <TeachingTeamMember
            name="Prof. David Tse"
            workRole="Instructor"
            email="dntse@stanford.edu"
            officeHoursDate="Upon email request"
            src="/images/david.png"
            alt="David Tse"
          />
          <TeachingTeamMember
            name="Scott Hickmann"
            workRole="Teaching Assistant"
            email="hickmann@stanford.edu"
            officeHoursDate="Wed 4:30pm - 5:30pm"
            src="/images/scott.png"
            alt="Scott Hickmann"
          />
          <TeachingTeamMember
            name="Kenan Hasanaliyev"
            workRole="Teaching Assistant"
            email="kenanhas@stanford.edu"
            officeHoursDate="Mon 5:30pm - 6:30pm"
            src="/images/kenan.png"
            alt="Dionysis Zindros"
          />
        </SimpleGrid>
      </Section>
    </Layout>
  );
}
