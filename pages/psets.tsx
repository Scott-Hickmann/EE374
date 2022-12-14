import { Link, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

import Layout from '../components/layout';
import {
  Section,
  Sections,
  Subsection,
  SubsectionTitle
} from '../components/section';
import TitleSection from '../components/titleSection';
import { usDate, usTime } from '../utils/date';

type PSETProps = React.PropsWithChildren<{
  softDeadline?: Date;
  hardDeadline: Date;
  link?: string;
}>;

function PSET({ softDeadline, hardDeadline, link, children }: PSETProps) {
  const primaryColor = 'blue.400';

  return (
    <Tr>
      <Td textAlign="center">
        {link ? (
          <Link color={primaryColor} href={link} target="_blank">
            {children}
          </Link>
        ) : (
          <Text>{children}</Text>
        )}
      </Td>
      <Td textAlign="center">
        {softDeadline && (
          <Text>
            {usDate(softDeadline)} ({usTime(softDeadline)})
          </Text>
        )}
      </Td>
      <Td textAlign="center">
        <Text>
          {usDate(hardDeadline)} ({usTime(hardDeadline)})
        </Text>
      </Td>
    </Tr>
  );
}

export default function PSETsPage() {
  return (
    <Layout title="EE374: PSETs" description="EE374 Problem Sets">
      <Sections>
        <TitleSection title="EE374 Problem Sets" />
        <Section id="psets">
          <Subsection>
            <SubsectionTitle>Problem Sets and Theory Exercises</SubsectionTitle>
            <Table>
              <Thead>
                <Tr>
                  <Th textAlign="center">PSET / Exercise</Th>
                  <Th textAlign="center">Soft Deadline</Th>
                  <Th textAlign="center">Hard Deadline</Th>
                </Tr>
              </Thead>
              <Tbody>
                <PSET
                  softDeadline={new Date(2023, 0, 17, 13, 30)}
                  hardDeadline={new Date(2023, 0, 19, 13, 30)}
                  link="/psets/EE374_PSET_1.pdf"
                >
                  Problem Set 1
                </PSET>
                <PSET
                  softDeadline={new Date(2023, 0, 24, 13, 30)}
                  hardDeadline={new Date(2023, 0, 26, 13, 30)}
                >
                  Problem Set 2
                </PSET>
                <PSET
                  softDeadline={new Date(2023, 0, 31, 13, 30)}
                  hardDeadline={new Date(2023, 1, 2, 13, 30)}
                >
                  Problem Set 3
                </PSET>
                <PSET hardDeadline={new Date(2023, 1, 6, 13, 30)}>
                  Theory Exercise 1
                </PSET>
                <PSET hardDeadline={new Date(2023, 1, 13, 13, 30)}>
                  Theory Exercise 2
                </PSET>
                <PSET
                  softDeadline={new Date(2023, 1, 21, 13, 30)}
                  hardDeadline={new Date(2023, 1, 23, 13, 30)}
                >
                  Problem Set 4
                </PSET>
                <PSET
                  softDeadline={new Date(2023, 1, 28, 13, 30)}
                  hardDeadline={new Date(2023, 2, 2, 13, 30)}
                >
                  Problem Set 5
                </PSET>
                <PSET
                  softDeadline={new Date(2023, 2, 7, 13, 30)}
                  hardDeadline={new Date(2023, 2, 9, 13, 30)}
                >
                  Problem Set 6
                </PSET>
                <PSET hardDeadline={new Date(2023, 2, 13, 13, 30)}>
                  Theory Exercise 3
                </PSET>
                <PSET hardDeadline={new Date(2023, 2, 20, 13, 30)}>
                  Theory Exercise 4
                </PSET>
              </Tbody>
            </Table>
          </Subsection>
        </Section>
      </Sections>
    </Layout>
  );
}
