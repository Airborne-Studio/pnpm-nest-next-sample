import { Button, Modal, TextInput } from '@mantine/core';
import type React from 'react';

import { styles } from './DashboardHomeStyles';
import type { UserFormModalProps } from './types';

const UserFormModal: React.FC<UserFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  user,
  register,
  errors,
}) => (
  <Modal
    opened={open}
    onClose={onClose}
    title={user ? 'Edit User' : 'Add New User'}
    size="lg"
  >
    <form onSubmit={onSubmit}>
      <TextInput
        data-testid="Name"
        label="Name"
        {...register('name', { required: 'Please input name!' })}
        error={errors.name?.message}
      />
      <TextInput
        data-testid="First Name"
        label="First Name"
        {...register('firstName', { required: 'Please input first name!' })}
        error={errors.firstName?.message}
      />
      <TextInput
        data-testid="Last Name"
        label="Last Name"
        {...register('lastName', { required: 'Please input last name!' })}
        error={errors.lastName?.message}
      />
      <TextInput label="Address" {...register('address')} />
      <TextInput label="Phone Number" {...register('phoneNumber')} />
      <TextInput label="Age" type="number" {...register('age')} />
      <TextInput label="Description" {...register('description')} />
      <div style={styles.buttonBox}>
        <Button type="submit">Submit</Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  </Modal>
);

export default UserFormModal;
