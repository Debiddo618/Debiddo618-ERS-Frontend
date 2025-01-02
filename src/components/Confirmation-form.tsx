import { Button } from './ui/button'
import { useDeleteReimbursement } from '@/hooks/use-deleteReimbursement';
import { useDeleteUser } from '@/hooks/use-deleteUser';

interface ConfirmationFormProps {
  message: string,
  id: number,
  entity: string,
  handleCloseForm: any,
  user: any | null
}

export default function ConfirmationForm({ message, id, entity, handleCloseForm, user }: ConfirmationFormProps) {
  const { mutate: deleteReimbursement } = useDeleteReimbursement();
  const { mutate: deleteUser } = useDeleteUser();

  const handleConfirm = () => {
    if (entity === 'reimbursement') {
      deleteReimbursement(id);
    } else if (entity === 'user') {
      deleteUser(id);
    }
    handleCloseForm;
  };

  return (
    <div className="absolute w-full top-0 left-0 bottom-0 bg-zinc-50 flex justify-center items-center">
      <div className="w-96 p-5 rounded-md shadow-md bg-white">
        <div className='text-center'>{message}</div>
        {user ?
          <div className='text-center mb-2'>
            <p><b>UID</b>: {user.id} <b>Username</b>: {user.username}</p>
          </div>
          : null}
        <div className="flex justify-evenly">
          <Button variant={"outline"} onClick={handleCloseForm}>Cancel</Button>
          <Button className="bg-red-500 hover:bg-red-500 hover:opacity-75" onClick={handleConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}
