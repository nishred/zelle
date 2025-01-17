import { getRecentTransactions } from "../lib/actions/get-recent-transactions";

import RecentTransaction from "./recent-transaction";

import { Transaction } from "./recent-transaction";

const RecentTransactions = async () => {
  const transactions = (await getRecentTransactions()) as Transaction[];

  return (
    <div className="col-start-2 col-end-3 row-start-2 row-end-3 bg-white shadow-lg rounded-lg flex flex-col overflow-auto">
      {transactions.map((transaction) => {
        return (
          <RecentTransaction key={transaction.id} transaction={transaction} />
        );
      })}
    </div>
  );
};

export default RecentTransactions;
