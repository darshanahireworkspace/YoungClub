import React from 'react';
import { YoungClubLogo } from '../common/YoungClubLogo';

export const Logo = ({ variant = 'full', className = '', glow = true }) => {
  if (variant === 'icon-only') {
    return <YoungClubLogo height={32} className={className} />;
  }

  if (variant === 'small') {
    return <YoungClubLogo height={34} className={className} />;
  }

  // Full variant
  return <YoungClubLogo height={42} className={className} />;
};
