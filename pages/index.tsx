import { chakra, Link, SimpleGrid, useColorModeValue } from '@chakra-ui/react';

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

const syllabus = [
  <>Administrivia, money, network/adversarial model, gossip</>,
  <>Commitments, hashes, public/private keys, signatures, transactions, UTXO</>,
  <>
    Blocks, chains, proof-of-work, longest chain, mempool, blockchain properties
  </>,
  <>Rewards, fees, censorship, selfish mining, macroeconomics, pools</>,
  <>Wallets, accounts, balances, nonces, transition functions</>,
  <>
    <chakra.span fontWeight="bold">Midterm.</chakra.span> Light clients, merkle
    trees, authenticated data structures, SPV
  </>,
  <>Chain growth, chain quality, common prefix, synchrony, rounds</>,
  <>Proofs of blockchain properties. Proof-of-stake. Longest chain vs BFT.</>,
  <>BFT protocols, fast confirmation, finality, accountability.</>,
  <>
    Availability-finality dilemma, Ethereum 2.0. Finality and accountability
    gadgets.
  </>
] as const;

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
              Tuesday, Thursday 1:30-2:50PM
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
              they work, and why are they secure?
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
        {syllabus.map((content, index) => (
          <Subsection key={index}>
            <SubsectionTitle color={section2SubsectionTitleColor}>
              Week {index + 1}
            </SubsectionTitle>
            <SubectionText>{content}</SubectionText>
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
