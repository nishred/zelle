import { createp2pTransfer } from "../../../lib/actions/p2pTransfer";

const p2pPage = async () => {
  return (
    <div className="h-full flex items-center">
      <form
        action={createp2pTransfer}
        className="w-[384px] mx-auto bg-white rounded-lg shadow-lg p-12 flex flex-col"
      >
        <h1 className="text-4xl font-semibold text-slate-500 mb-4 uppercase">
          Send
        </h1>

        <div className="mb-5">
          <label
            htmlFor="numbner"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Number
          </label>
          <input
            type="text"
            id="number"
            name="number"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Transfer
        </button>
      </form>
    </div>
  );
};

export default p2pPage;
