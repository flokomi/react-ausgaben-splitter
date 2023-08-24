import Button from "./Button.js";

// function FriendList({
//   friends,
//   onClick,
//   selectedFriend,
//   onSelection,
//   showEditFriend,
// }) {
//   return (
//     <ul>
//       {friends.map((friend) => (
//         <Friend
//           friend={friend}
//           key={friend.id}
//           onClick={onClick}
//           selectedFriend={selectedFriend}
//           onSelection={onSelection}
//           showEditFriend={showEditFriend}
//         />
//       ))}
//     </ul>
//   );
// }
export default function Friend({
  friend,
  onClick,
  selectedFriend,
  onSelection,
  showEditFriend,
}) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt="user"></img>
      <h3>{friend.name}</h3>
      <p>€{friend.expense}</p>
      <Button onClick={() => onSelection(friend)}>
        {!isSelected ? "Edit" : "Close"}
      </Button>
    </li>
  );
}
