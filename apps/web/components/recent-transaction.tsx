export type Transaction = {
  amount: number;
  id: number;
  token: string;
  provider: string;
  startTime: Date;
  status: "Processing" | "Success" | "Failure";
  userId: number;
};

const statusVariant = {
  Success: "bg-green-500",
  Processing: "bg-yellow-500",
  Failure: "bg-red-500",
};

const RecentTransaction = ({ transaction }: { transaction: Transaction }) => {
  const text = transaction.amount > 0 ? "Received INR" : "Sent INR";

  return (
    <div className="px-4 border-b border-slate-100 border-solid py-1 flex flex-col gap-2">
      <span
        className={`px-2 py-2 text-white text-xs rounded-lg font-semibold ${statusVariant[transaction.status]} self-start`}
      >
        {transaction.status}
      </span>

      <div className="flex justify-between">
        <div>{text}</div>

        <div className="text-green-500 font-semibold text-xl">
          {`${transaction.amount > 0 ? "+" : "-"} ${Math.abs(transaction.amount) / 100}`}
        </div>
      </div>

      <div>{transaction.startTime.toLocaleDateString()}</div>
    </div>
  );
};

export default RecentTransaction;
