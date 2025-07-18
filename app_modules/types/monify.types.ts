// types/monnify.types.ts
export interface MonnifyReservedAccount {
  accountReference: string;
  accountName: string;
  customerEmail: string;
  accounts: {
    bankCode: string;
    bankName: string;
    accountNumber: string;
  }[];
  contractCode: string;
  customerName: string;
  currencyCode: string;
  reservationReference: string;
}
