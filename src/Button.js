export default function Button({ children, onClick, animate }) {
  return (
    <button className={`btn ${animate}`} onClick={onClick}>
      {children}
    </button>
  );
}
