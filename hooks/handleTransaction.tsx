import { useFirestore } from 'reactfire';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

export function useHandleTransaction() {
  const firestore = useFirestore();

  const handleTransaction = async ({
    id,
    userId,
    title,
    amount,
    date,
    type,
  }: {
    id?: string;
    userId: string;
    title: string;
    amount: number;
    date: string;
    type: string;
  }) => {
    const transactionsRef = collection(firestore, 'transactions');
    let transactionUpdateRef;

    if (id) {
      transactionUpdateRef = doc(firestore, 'transactions', id as string);
      await updateDoc(transactionUpdateRef, {
        userId,
        title,
        amount,
        date,
        type,
      });
    } else {
      await addDoc(transactionsRef, {
        userId,
        title,
        amount,
        date,
        type,
      });
    }
  };

  return { handleTransaction };
}
