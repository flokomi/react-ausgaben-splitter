export default function Button({
  children,
  onClick,
  btnAnimate,
  btnWelcome,
  btnAddFriend,
}) {
  return (
    <button
      className={`btn ${btnAnimate} ${btnWelcome} ${btnAddFriend}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
