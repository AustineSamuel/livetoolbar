import { transactions } from "@/app_modules/types/transaction.types";

const fakeTransactions: transactions[] = [
  {
    ref: 'TXN001',
    id: '1',
    docId: 'doc_1',
    amountBefore: 5000,
    amountAfter: 4500,
    createdAt: '2025-07-18T10:00:00Z',
    updatedAt: '2025-07-18T10:01:00Z',
    status: 'success',
    data: {},
    message: 'Purchase completed',
    transactionAmount: -500,
  },
  {
    ref: 'TXN002',
    id: '2',
    docId: 'doc_2',
    amountBefore: 4500,
    amountAfter: 4600,
    createdAt: '2025-07-17T12:30:00Z',
    updatedAt: '2025-07-17T12:35:00Z',
    status: 'success',
    data: {},
    message: 'Wallet top-up',
    transactionAmount: +100,
  },
  {
    ref: 'TXN003',
    id: '3',
    amountBefore: 4600,
    amountAfter: 4600,
    createdAt: '2025-07-16T08:45:00Z',
    updatedAt: '2025-07-16T08:45:30Z',
    status: 'failed',
    data: {},
    message: 'Payment declined',
    transactionAmount: 0,
  }
];
export default fakeTransactions