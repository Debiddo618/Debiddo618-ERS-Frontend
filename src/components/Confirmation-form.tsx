import React from 'react'
import { Button } from './ui/button'
import { useDeleteReimbursement } from '@/hooks/use-deleteReimbursement';

interface ConfirmationFormProps {
  message: string,
  id: number,
  entity: string,
  handleCloseForm: any
}


export default function ConfirmationForm({ message, id, entity, handleCloseForm }: ConfirmationFormProps) {
  const { mutate: deleteById } = useDeleteReimbursement();
  return (

    <div className="absolute w-full h-screen top-0 left-0 bg-white flex justify-center items-center">
      <div className="w-96 p-5 rounded-md shadow-md">
        <div className='text-center mb-5'>{message}</div>
        <div className="flex justify-evenly">
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={() => deleteById(id)}>Confirm</Button>
        </div>
      </div>
    </div>
  )
}

