import Reimbursement from '@/components/Reimbursement';
import { getUser, User } from '@/lib/authUtils'
import axiosInstance from '@/lib/axios-config';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'
import { ShowFormContext } from '../_protected';
import ReimbursementForm from '@/components/Reimbursement-form';

export const Route = createLazyFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

type Reimbursements = {
  reimbId: number;
  description: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
};

function RouteComponent() {
  const [user, setUser] = useState<User | null>(null);
  const showForm = useContext(ShowFormContext);

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
    <div className='flex justify-around p-4'>
      <div className="w-50 h-full">
        <h1 className='mb-3 text-center font-semibold'>PENDING</h1>
        {pendingReimbursements.map((reimbursement: Reimbursements) => (
          <div key={reimbursement.reimbId}>
            <Reimbursement title={reimbursement.description} id={reimbursement.reimbId} amount={reimbursement.amount} status={reimbursement.status} showDelete={true} showEdit={true} />
          </div>
        ))}
      </div>
      <div className="w-50 h-full">
        <h1 className='mb-3 text-center font-semibold'>APPROVED</h1>
        {approvedReimbursements.map((reimbursement: Reimbursements) => (
          <div key={reimbursement.reimbId}>
            <Reimbursement title={reimbursement.description} id={reimbursement.reimbId} amount={reimbursement.amount} status={reimbursement.status} showDelete={true} showEdit={false} />
          </div>
        ))}
      </div>
      <div className="w-50 h-full">
        <h1 className='mb-3 text-center font-semibold'>REJECTED</h1>
        {rejectedReimbursements.map((reimbursement: Reimbursements) => (
          <div key={reimbursement.reimbId}>
            <Reimbursement title={reimbursement.description} id={reimbursement.reimbId} amount={reimbursement.amount} status={reimbursement.status} showDelete={true} showEdit={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
