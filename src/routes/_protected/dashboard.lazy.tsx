import { useContext, useEffect, useState } from 'react';
import { getUser, User } from '@/lib/authUtils';
import axiosInstance from '@/lib/axios-config';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import Reimbursement from '@/components/Reimbursement';
import ReimbursementEditForm from '@/components/Reimbursement-editform';
import ReimbursementList from '@/components/Reimbursement-list';
import { useFetchRole } from '@/hooks/use-fetchRole';
import { useFetchReimbursementByUser } from '@/hooks/use-fetchReimbursementByUser';
import { ReimbursementTable } from '@/components/Reimbursement-table';

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

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const { data: role } = useFetchRole(user?.userId);

  return (
    <div className="">
      {!selected && (
        <div className="">
          {role === "MANAGER" ? <ReimbursementTable /> : null}
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
