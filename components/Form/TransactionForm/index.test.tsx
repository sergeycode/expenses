import { render, screen, fireEvent, act } from '@testing-library/react';
import TransactionForm from './index';

describe('TransactionForm', () => {
  test('renders form with title, amount, and date inputs', () => {
    render(
      <TransactionForm
        type="expense"
        onClose={() => {}}
        isOpen={true}
        onSubmit={() => {}}
      />
    );

    const titleInput = screen.getByTestId('title');
    const amountInput = screen.getByTestId('amount');
    const dateInput = screen.getByTestId('date');

    expect(titleInput).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
  });

  test('calls onSubmit with form values when submit button is clicked', async () => {
    const handleSubmit = jest.fn();

    render(
      <TransactionForm
        type="expense"
        onClose={() => {}}
        isOpen={true}
        onSubmit={handleSubmit}
      />
    );

    const titleInput = screen.getByTestId('title');
    const amountInput = screen.getByTestId('amount');
    const dateInput = screen.getByTestId('date');
    const submitButton = screen.getByText('Submit');

    // Fill in form inputs
    fireEvent.change(titleInput, { target: { value: 'Sample Title' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.change(dateInput, { target: { value: '2023-05-28' } });

    // Works with Formik
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Sample Title',
      amount: 100,
      date: new Date('2023-05-28T04:00:00.000Z'),
    });
  });
});
