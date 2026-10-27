import React, { useState, useEffect } from 'react';
import { User, Smartphone, Save, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, updateProfile } = useAuth();
  const { success, error } = useToast();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setMobile(currentUser.mobile || '');
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!name.trim()) {
      setValidationError('Please enter your full name');
      return;
    }
    if (!/^\d{10}$/.test(mobile.trim())) {
      setValidationError('Mobile number must be exactly 10 digits');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = updateProfile({ name, mobile });
      setLoading(false);

      if (res.success) {
        success('Profile updated successfully!');
        onClose();
      } else {
        setValidationError(res.error || 'Failed to update profile');
        error(res.error || 'Update failed');
      }
    }, 300);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile Details">
      <form onSubmit={handleSubmit} className="space-y-4">
        {validationError && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-brand-red/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          icon={User}
          required
        />

        <Input
          label="Mobile Number (10 Digits)"
          type="tel"
          maxLength="10"
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
          placeholder="10-digit mobile"
          icon={Smartphone}
          required
        />

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-num">
            Username
          </label>
          <input
            type="text"
            disabled
            value={currentUser?.username || ''}
            className="w-full bg-[#0A0D1D] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">
            Username is fixed and cannot be changed
          </span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          loading={loading}
          icon={Save}
          className="mt-2"
        >
          Save Changes
        </Button>
      </form>
    </Modal>
  );
};
