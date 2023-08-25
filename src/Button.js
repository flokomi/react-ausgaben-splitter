export default function Button({ children, onClick, btnAnimate, btnWelcome }) {
  return (
    <button className={`btn ${btnAnimate} ${btnWelcome}`} onClick={onClick}>
      {children}
    </button>
  );
}
