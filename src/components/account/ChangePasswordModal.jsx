import React, { useState } from 'react';
import { KeyRound, Lock, Save, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { changePassword } = useAuth();
  const { success, error } = useToast();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!oldPassword) {
      setValidationError('Please enter your current password');
      return;
    }
    if (newPassword.length < 4) {
      setValidationError('New password must be at least 4 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setValidationError('New passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = changePassword({ oldPassword, newPassword, confirmPassword });
      setLoading(false);

      if (res.success) {
        success('Password updated successfully!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
      } else {
        setValidationError(res.error || 'Failed to change password');
        error(res.error || 'Password update failed');
      }
    }, 300);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <form onSubmit={handleSubmit} className="space-y-4">
        {validationError && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-brand-red/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <Input
          label="Current Password"
          placeholder="Enter current password"
          type="password"
          icon={Lock}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <Input
          label="New Password"
          placeholder="At least 4 characters"
          type="password"
          icon={KeyRound}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <Input
          label="Confirm New Password"
          placeholder="Repeat new password"
          type="password"
          icon={KeyRound}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          loading={loading}
          icon={Save}
          className="mt-2"
        >
          Update Password
        </Button>
      </form>
    </Modal>
  );
};
