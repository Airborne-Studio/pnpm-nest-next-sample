import { Button, Modal, Text } from '@mantine/core';
import type React from 'react';

import { styles } from './DashboardHomeStyles';
import type { DeleteConfirmationModalProps } from './types';

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => (
  <Modal opened={open} onClose={onClose} title="Confirm Deletion" size="sm">
    <Text>
      Are you sure you want to delete this user? This action cannot be undone.
    </Text>
    <div style={styles.buttonBox}>
      <Button data-testid="delete" color="red" onClick={onConfirm}>
        Delete
      </Button>
      <Button color="gray" onClick={onClose}>
        Cancel
      </Button>
    </div>
  </Modal>
);

export default DeleteConfirmationModal;
