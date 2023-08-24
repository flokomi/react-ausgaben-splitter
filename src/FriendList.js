import Friend from "./Friend";

export default function FriendList({
  friends,
  onClick,
  selectedFriend,
  onSelection,
  showEditFriend,
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onClick={onClick}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
          showEditFriend={showEditFriend}
        />
      ))}
    </ul>
  );
}
