import type {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
} from 'react-hook-form';

interface UserData {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  age?: number;
  description?: string;
}

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<FieldValues>;
  user?: UserData;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export { DeleteConfirmationModalProps, UserData, UserFormModalProps };
