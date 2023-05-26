import Header from '../Header';
import Footer from '../Footer';
import { Container, Box } from '@chakra-ui/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Box py={5}>
        <Container>{children}</Container>
      </Box>
      <Footer />
    </>
  );
}
