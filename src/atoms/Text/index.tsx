import React, { forwardRef, ReactNode, CSSProperties } from 'react';

interface TextProps {
  children: ReactNode;
  styled: CSSProperties;
}

const Text = forwardRef<HTMLDivElement, TextProps>(({ children, styled }, ref) => {
  
  return (
    <div style={styled} ref={ref}>
      {children}
    </div>
  );
});

export default Text;