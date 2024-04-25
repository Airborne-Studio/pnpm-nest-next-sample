import { Button, ScrollArea, Table } from '@mantine/core';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/redux/store';
import {
  addUserData,
  deleteUserData,
  editUserData,
  fetchUserData,
} from '@/redux/table/tableSlice';

import { styles } from './DashboardHomeStyles';
import DeleteConfirmationModal from './DeleteConfirmModal';
import type { UserData } from './types';
import UserFormModal from './UserFormModal';

export const DashboardHome: FC = () => {
  const form = useForm<UserData>();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.table.data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleAddNew = () => {
    setEditingUser(null);
    form.reset();
    setIsModalVisible(true);
    dispatch(fetchUserData());
  };

  const handleEdit = useCallback(
    (user: UserData) => {
      setEditingUser(user);
      form.reset(user);
      setIsModalVisible(true);
    },
    [form]
  );

  const handleSubmit = form.handleSubmit((data) => {
    if (editingUser) {
      dispatch(editUserData({ ...data, id: editingUser.id }));
    } else {
      dispatch(addUserData(data));
    }
    setIsModalVisible(false);
    dispatch(fetchUserData());
  });

  const handleDeleteRequest = (userId: number) => {
    setUserToDelete(userId);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUserData(userToDelete)).then(() => {
        dispatch(fetchUserData());
      });
      setDeleteModalVisible(false);
    }
  };

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.firstName}</Table.Td>
      <Table.Td>{user.lastName}</Table.Td>
      <Table.Td>{user.address || '-'}</Table.Td>
      <Table.Td>{user.phoneNumber || '-'}</Table.Td>
      <Table.Td>{user.age || '-'}</Table.Td>
      <Table.Td>{user.description || '-'}</Table.Td>
      <Table.Td style={{ ...styles.buttonBox, marginTop: 0 }}>
        <Button onClick={() => handleEdit(user)}>Edit</Button>
        <Button onClick={() => handleDeleteRequest(user.id)} color="red">
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Home</h1>
        <p>Welcome to the dashboard</p>
      </div>
      <Button
        data-testid="addUser"
        onClick={handleAddNew}
        style={styles.button}
      >
        Add New User
      </Button>
      <ScrollArea>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>First Name</Table.Th>
              <Table.Th>Last Name</Table.Th>
              <Table.Th>Address</Table.Th>
              <Table.Th>Phone Number</Table.Th>
              <Table.Th>Age</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      <UserFormModal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
        user={editingUser}
        register={form.register}
        errors={form.formState.errors}
      />
      <DeleteConfirmationModal
        open={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
