import { FirestoreProvider, useInitFirestore } from 'reactfire';
import { initializeFirestore } from 'firebase/firestore';
import { Box, Center, Spinner } from '@chakra-ui/react';

export default function FirestoreProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    error,
    status,
    data: firestoreInstance,
  } = useInitFirestore(async (firebaseApp) => {
    const db = initializeFirestore(firebaseApp, {});
    return db;
  });
  if (error) {
    return <Box>{error.message}</Box>;
  }
  if (status === 'loading') {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }
  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  );
}
