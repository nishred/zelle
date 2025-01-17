import { auth } from "../../lib/auth";
import UserAppBar from "../../components/user-app-bar";
import SideBar from "../../components/side-bar";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-5 min-h-screen bg-slate-200">
      <div className="col-start-1 col-end-6 row-start-1 row-end-2">
        <UserAppBar />
      </div>

      <div className="col-start-1 col-end-2 row-start-2 row-end-3">
        <SideBar />
      </div>

      <main className="row-start-2 row-end-3 col-start-2 col-end-6">
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
