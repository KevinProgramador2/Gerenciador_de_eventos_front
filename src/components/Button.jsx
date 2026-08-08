export default function Button({
  loading,
  loadingText = "Carregando...",
  children,
  ...props
}) {
  return (
    <button disabled={loading} {...props}>
      {loading ? loadingText : children}
    </button>
  );
}
