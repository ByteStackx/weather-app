import React from 'react';

type Props = {
  variant?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string; 
};

export const Text: React.FC<Props> = ({ variant, children, style, className }) => {
  if (variant === 'h1') return <h1 className={className} style={style}>{children}</h1>;
  if (variant === 'h2') return <h2 className={className} style={style}>{children}</h2>;
  if (variant === 'h3') return <h3 className={className} style={style}>{children}</h3>;
  if (variant === 'h4') return <h4 className={className} style={style}>{children}</h4>;
  if (variant === 'h5') return <h5 className={className} style={style}>{children}</h5>;
  if (variant === 'p') return <p className={className} style={style}>{children}</p>;
  if (variant === 'span') return <span className={className} style={style}>{children}</span>;
  return <div className={className} style={style}>{children}</div>;
};
