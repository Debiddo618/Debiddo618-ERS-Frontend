import { useContext, useEffect, useState } from 'react';
import { getUser, User } from '@/lib/authUtils';
import axiosInstance from '@/lib/axios-config';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import Reimbursement from '@/components/Reimbursement';
import ReimbursementEditForm from '@/components/Reimbursement-editform';
import ReimbursementList from '@/components/Reimbursement-list';

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

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['reimb', user?.userId],
    queryFn: async () => {
      if (!user?.userId) return null;
      try {
        const resp = await axiosInstance.get(`/api/reimbursements/user/${user.userId}`);
        return resp.data;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    enabled: !!user?.userId,
  });

  const pendingReimbursements = data?.filter((reimbursement: Reimbursements) => reimbursement.status === 'pending') || [];
  const approvedReimbursements = data?.filter((reimbursement: Reimbursements) => reimbursement.status === 'approved') || [];
  const rejectedReimbursements = data?.filter((reimbursement: Reimbursements) => reimbursement.status === 'rejected') || [];

  return (
    <div className='flex justify-evenly p-4 w-screen backdrop-blur-lg bg-white/30'>
      <ReimbursementList list={pendingReimbursements} setSelected={setSelected} status={"PENDING"}/>

      <ReimbursementList list={approvedReimbursements} setSelected={setSelected} status={"APPROVED"}/>

      <ReimbursementList list={rejectedReimbursements} setSelected={setSelected} status={"REJECTED"}/>

      {selected && <ReimbursementEditForm selected={selected} setSelected={setSelected} />}
    </div>
  );
}
