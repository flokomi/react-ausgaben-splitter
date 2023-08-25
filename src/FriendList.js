import Friend from "./Friend";

export default function FriendList({
  friends,
  setFriends,
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
          friends={friends}
          setFriends={setFriends}
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
