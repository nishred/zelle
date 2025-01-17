import Button from "@repo/ui/button";

import { createOnRampTransaction } from "../lib/actions/create-on-ramp-transaction";

const BankTransferForm = () => {
  return (
    <form action={createOnRampTransaction} className="flex flex-col gap-2 p-4">


      <div className="flex flex-col gap-1">
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="border-2 border-solid border-slate-400 px-2 py-3 rounded-md"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Bank</label>

        <select
          name="bank"
          className="border-2 border-solid border-slate-400 px-2 py-2 rounded-md"
        >
          <option value={"hdfc"}>HDFC</option>

          <option value={"hdfc"}>Axis Bank</option>
        </select>
      </div>

      <div className="flex justify-center mt-10">
        <Button type="submit">Add Money</Button>
      </div>
    </form>
  );
};

export default BankTransferForm;



