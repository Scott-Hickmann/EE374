import {
  Link,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import Layout from 'client/components/layout';
import {
  Section,
  Sections,
  Subsection,
  SubsectionTitle
} from 'client/components/section';
import TitleSection from 'client/components/titleSection';

type ExamProps = React.PropsWithChildren<{
  link?: string;
  solutionsLink?: string;
}>;

function Exam({ link, solutionsLink, children }: ExamProps) {
  const primaryColor = 'blue.400';

  return (
    <Tr>
      <Td textAlign="center">
        <Stack spacing={2}>
          {link ? (
            <Link color={primaryColor} href={link} target="_blank">
              {children}
            </Link>
          ) : (
            <Text>{children}</Text>
          )}
          {solutionsLink ? (
            <Link color={primaryColor} href={solutionsLink} target="_blank">
              {children} Solutions
            </Link>
          ) : null}
        </Stack>
      </Td>
    </Tr>
  );
}

export default function PSETsPage() {
  return (
    <Layout title="EE374: PSETs" description="EE374 Exams">
      <Sections>
        <TitleSection title="EE374 Exams" />
        <Section id="psets">
          <Subsection>
            <SubsectionTitle>Exams and Practice</SubsectionTitle>
            <Table>
              <Thead>
                <Tr>
                  <Th textAlign="center">Exam</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Exam
                  link="/midterm/EE_374_Practice_Midterm.pdf"
                  solutionsLink="/midterm/EE_374_Practice_Midterm_Solutions.pdf"
                >
                  Practice Midterm
                </Exam>
              </Tbody>
            </Table>
          </Subsection>
        </Section>
      </Sections>
    </Layout>
  );
}
