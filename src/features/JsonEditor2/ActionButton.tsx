interface ActionButtonProps {
  children: React.ReactNode;
  confirmMessage?: string;
  onClick: () => void;
  visible: boolean;
}

export function ActionButton({
  children,
  confirmMessage,
  onClick,
  visible,
}: ActionButtonProps) {
  if (!visible) return null;
  return (
    <button
      style={{
        color: '#888',
        background: 'none',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
      }}
      onClick={() => {
        if (!confirmMessage || confirm(confirmMessage)) onClick();
      }}
    >
      {children}
    </button>
  );
}
