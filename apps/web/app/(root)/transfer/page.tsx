import BankTransferForm from "../../../components/bank-transfer-form";
import RecentTransactions from "../../../components/recent-transactions";

const TransferPage = () => {
  return (
    <div className="h-full p-8 flex flex-col gap-8">
      <h1 className="text-5xl text-slate-600 font-bold tracking-wide">
        Transfer
      </h1>

      <div className="pb-9 h-[66%]">
        <div className="h-full grid grid-rows-2 grid-cols-2 gap-2">
          <div className="col-start-1 col-end-2 row-start-1 row-end-3 bg-white shadow-lg rounded-lg">
            <BankTransferForm />
          </div>

          <div className="col-start-2 col-end-3 row-start-1 row-end-2 bg-white shadow-lg rounded-lg">
            Account balance
          </div>

          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default TransferPage;
