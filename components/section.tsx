import { Box, chakra, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

export type SectionsProps = React.PropsWithChildren<unknown>;
export type SectionProps = React.PropsWithChildren<{
  id: string;
  bg?: string;
  color?: string;
}>;
export type SubsectionProps = React.PropsWithChildren<unknown>;
export type SectionTitleProps = React.PropsWithChildren<unknown>;
export type SubsectionTitleProps = React.PropsWithChildren<{
  color?: string;
}>;
export type SubsectionTextProps = React.PropsWithChildren<unknown>;
export interface TeachingTeamMemberProps {
  name: string;
  workRole: string;
  src: string;
  alt: string;
}

export function Sections({ children }: SectionsProps) {
  return <VStack spacing={0}>{children}</VStack>;
}

export function Section({ id, bg, color, children }: SectionProps) {
  return (
    <Box width="full">
      <chakra.div id={id} height={0} mt={-16} pb={16}>
        &nbsp;
      </chakra.div>
      <VStack bg={bg} color={color} p={{ base: 8, md: 10 }} spacing={6}>
        {children}
      </VStack>
    </Box>
  );
}

export function Subsection({ children }: SubsectionProps) {
  return (
    <Stack width="full" spacing={2}>
      {children}
    </Stack>
  );
}

export function SectionTitle({ children }: SectionTitleProps) {
  return <Heading fontSize="4xl">{children}</Heading>;
}

export function SubsectionTitle({ color, children }: SubsectionTitleProps) {
  return (
    <Heading fontSize="3xl" color={color}>
      {children}
    </Heading>
  );
}

export function SubectionText({ children }: SubsectionTextProps) {
  return <Text>{children}</Text>;
}

export function TeachingTeamMember({
  name,
  workRole,
  src,
  alt
}: TeachingTeamMemberProps) {
  return (
    <VStack textAlign="center">
      <Image
        src={src}
        alt={alt}
        width={250}
        height={250}
        style={{ borderRadius: 25 }}
      />
      <VStack spacing={0}>
        <Text>{name}</Text>
        <Text fontStyle="italic">{workRole}</Text>
      </VStack>
    </VStack>
  );
}
