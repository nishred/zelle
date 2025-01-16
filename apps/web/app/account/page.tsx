import { auth } from "../../lib/auth";

const AccountPage = async () => {
  const session = await auth();

  return (
    <div>
      <h1 className="text-8xl">{session?.user?.name}</h1>
    </div>
  );
};

export default AccountPage;
