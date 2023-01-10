import { Button, Input, Select, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import Layout from '../components/layout';
import {
  Section,
  Sections,
  Subsection,
  SubsectionTitle
} from '../components/section';
import TitleSection from '../components/titleSection';

declare global {
  interface Window {
    WebSocket: typeof WebSocket;
  }
}

const GRADER_URL = process.env.NEXT_PUBLIC_GRADER_URL;

export default function GraderPage() {
  const [ip, setIp] = useState<string>('');
  const [pset, setPset] = useState<number>();
  const [ws, setWs] = useState<WebSocket | null>(null);

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!GRADER_URL) return;

    const ws = new window.WebSocket(GRADER_URL);
    setWs(ws);

    ws.onmessage = (event) => {
      const message: string = event.data;
      setMessages((messages) => [...messages, message]);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  const grade = () => {
    if (!ip || !pset) return;
    setMessages([]);
    if (ws) {
      ws.send(JSON.stringify({ ip, pset }));
    }
  };

  return (
    <Layout title="EE374: Grader" description="EE374 Marabu Grader">
      <Sections>
        <TitleSection title="EE374 Grader" />
        <Section id="grader">
          <Subsection>
            <Text>
              This page allows you to run your code against past graders to help
              you fix your code and make sure your previously implemented
              features are not broken by the addition of new code.
            </Text>
            <Text>
              <b>Warning:</b> This page is only giving you a mock grade for past
              PSETs for your use only. For submissions regarding the current
              week&apos;s PSET, you should check out Gradescope.
            </Text>
          </Subsection>
          {GRADER_URL ? (
            <>
              <Subsection>
                <SubsectionTitle>Parameters</SubsectionTitle>
                <Text>
                  Please input your node IP without including the port number.
                  The grader assumes your node is running on port 18018.
                </Text>
                <Stack maxW="400px">
                  <Input
                    required
                    placeholder="Node IP"
                    value={ip}
                    onChange={(event) => setIp(event.target.value)}
                  />
                  <Select
                    required
                    placeholder="Select PSET"
                    value={pset}
                    onChange={(event) => setPset(parseInt(event.target.value))}
                  >
                    <option value={1}>PSET 1</option>
                  </Select>
                  <Button
                    disabled={!ip || !pset}
                    width="fit-content"
                    onClick={grade}
                  >
                    Run Soft Grader
                  </Button>
                </Stack>
              </Subsection>
              <Subsection>
                <SubsectionTitle>Grader Output</SubsectionTitle>
                {messages.map((message, index) => (
                  <Text key={index}>{message}</Text>
                ))}
              </Subsection>
            </>
          ) : (
            <Subsection>
              <Text>The grader will be available after PSET 1.</Text>
            </Subsection>
          )}
        </Section>
      </Sections>
    </Layout>
  );
}
