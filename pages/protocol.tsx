import { Center, Link, useColorModeValue } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import fs from 'fs';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import ReactMarkdown, { Components } from 'react-markdown';

import Layout from '../components/layout';
import {
  Section,
  Sections,
  Subsection,
  SubsectionTitle,
  SubsubsectionTitle
} from '../components/section';
import TitleSection from '../components/titleSection';
import { darkTheme, lightTheme } from '../styles/codeThemes';
const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter/dist/esm/prism'),
  { ssr: false }
);

export interface ProtocolPageProps {
  markdown: string;
}

const markdownTheme: Components = {
  h1: ({ children }) => (
    <SubsectionTitle isMarkdown>{children}</SubsectionTitle>
  ),
  h2: ({ children }) => (
    <SubsubsectionTitle isMarkdown>{children}</SubsubsectionTitle>
  ),
  h3: ({ children }) => (
    <SubsubsectionTitle isMarkdown>{children}</SubsubsectionTitle>
  ),
  h4: ({ children }) => (
    <SubsubsectionTitle isMarkdown>{children}</SubsubsectionTitle>
  ),
  h5: ({ children }) => (
    <SubsubsectionTitle isMarkdown>{children}</SubsubsectionTitle>
  ),
  h6: ({ children }) => (
    <SubsubsectionTitle isMarkdown>{children}</SubsubsectionTitle>
  ),
  a: ({ children, ...props }) => (
    <Link color="blue.400" {...props} target="_blank">
      {children}
    </Link>
  ),
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const style = useColorModeValue(lightTheme, darkTheme);
    return !inline && match ? (
      <SyntaxHighlighter style={style} language={match[1]} PreTag="div">
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
};

export default function ProtocolPage({ markdown }: ProtocolPageProps) {
  return (
    <Layout title="EE374: Protocol" description="EE374 Marabu Protocol">
      <Sections>
        <TitleSection title="Marabu Protocol" />
        <Section id="protocol">
          <Center maxW="1424px" width="full">
            <Subsection>
              <ReactMarkdown
                components={ChakraUIRenderer(markdownTheme)}
                skipHtml
                unwrapDisallowed
              >
                {markdown}
              </ReactMarkdown>
            </Subsection>
          </Center>
        </Section>
      </Sections>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ProtocolPageProps> = () => {
  const markdown = fs.readFileSync('content/protocol.md', 'utf8');

  return {
    props: { markdown }
  };
};
