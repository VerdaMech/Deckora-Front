import React from 'react';

function Text({ children, variant = 'p', className = '' }) {
  const tagByVariant = {
    title: 'h1',
    subtitle: 'h2',
    p: 'p',
    span: 'span',
  };

  const Tag = tagByVariant[variant] || 'p';

  return <Tag className={className}>{children}</Tag>;
}

export default Text;
