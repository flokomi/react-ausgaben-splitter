import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
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
  friends,
  setFriends,
  selectedFriend,
  onSelection,
}) {
  const isSelected = selectedFriend?.id === friend.id;

  function handleDelete() {
    let id = null;

    friends.map((cur) => (cur.id === friend.id ? (id = cur.id) : null));

    setFriends((friends) => friends.filter((friend) => friend.id !== id));
  }

  return (
    <div className="friend-row">
      <button className="btn-delete" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
      <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt="user"></img>
        <h3>{friend.name}</h3>
        <p>€{friend.expense}</p>
        <Button onClick={() => onSelection(friend)}>
          {!isSelected ? "Edit" : "Close"}
        </Button>
      </li>
    </div>
  );
}
