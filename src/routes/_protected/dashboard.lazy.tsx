import { useContext, useEffect, useState } from 'react';
import { getUser, User } from '@/lib/authUtils';
import { createLazyFileRoute } from '@tanstack/react-router';
import ReimbursementEditForm from '@/components/Reimbursement-editform';
import ReimbursementList from '@/components/Reimbursement-list';
import { ShowFormContext } from '../_protected';
import ManagerDashboard from '@/components/Manager-Dashboard';
import { useFetchRole } from '@/hooks/users/use-fetchRole';

export const Route = createLazyFileRoute('/_protected/dashboard')({
  component: RouteComponent,
});

type Reimbursements = {
  reimbId: number;
  description: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
};

function RouteComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [selected, setSelected] = useState<Reimbursements | null>(null);
  const show = useContext(ShowFormContext);  

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const { data: role } = useFetchRole(user?.userId);

  return (
    <div>
      {(!selected && !show) && (
        <div>
          {role === "MANAGER" && <ManagerDashboard userId={user?.userId} />}
          {role === "EMPLOYEE" && (
            <div className='flex justify-evenly p-4 w-screen backdrop-blur-lg bg-white/30'>
              <ReimbursementList
                setSelected={setSelected}
                status={"pending"}
                user={user}
              />
              <ReimbursementList
                setSelected={setSelected}
                status={"approved"}
                user={user}
              />
              <ReimbursementList
                setSelected={setSelected}
                status={"rejected"}
                user={user}
              />
            </div>
          )}
        </div>
      )}
      {selected && (
        <ReimbursementEditForm
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </div>
  );
}
