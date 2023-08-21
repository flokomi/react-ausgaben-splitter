import { useState } from "react";

const friends = [
  {
    id: 7373983948,
    name: "Flo",
    image: "https://i.pravatar.cc/48?u=7373983948",
    expense: 35,
  },
  {
    id: 7373987738,
    name: "Dani",
    image: " https://i.pravatar.cc/48?u=7373987738",
    expense: 70,
  },
  {
    id: 2292983948,
    name: "Axel",
    image: "https://i.pravatar.cc/48?u=2292983948",
    expense: 5,
  },
];

export default function App() {
  return (
    <div className="splitter">
      <Splitter />
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

function Splitter() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showEditFriend, setShowEditFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);

    // setShowEdit((show) => (showEdit ? !show : show));
  }

  function handleShowEditFriend() {
    console.log("hi there");
    if (showAddFriend === false) {
      setShowEditFriend((show) => !show);
    }
  }

  return (
    <div className="sidebar">
      <FriendList onClick={handleShowEditFriend} />

      {
        <div>
          {showAddFriend && <AddFriend />}
          {showEditFriend === false && (
            <Button onClick={handleShowAddFriend}>
              {showAddFriend ? "Add" : "Add a friend"}
            </Button>
          )}
        </div>
      }

      {
        <div>
          {showEditFriend && showAddFriend === false && <EditFriend />}
          {showEditFriend && showAddFriend === false && (
            <Button onClick={handleShowEditFriend}>
              {showEditFriend && "Update"}
            </Button>
          )}
        </div>
      }
    </div>
  );
}

function FriendList({ onClick }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onClick={onClick} />
      ))}
    </ul>
  );
}

function Friend({ friend, onClick }) {
  return (
    <li>
      <img src={friend.image} alt="user"></img>
      <h3>{friend.name}</h3>
      <p>€{friend.expense}</p>
      <Button onClick={onClick}>Edit</Button>
    </li>
  );
}

function AddFriend() {
  return (
    <form className="form-add-friend">
      <label>Friend name</label>
      <input type="text"></input>
      <label>Image URL</label>
      <input type="text" placeholder="https://i.pravatar.cc/48"></input>
      <label>Expense in €</label>
      <input type="text"></input>
    </form>
  );
}

function EditFriend(name, image, expense) {
  return (
    <form className="form-add-friend">
      <label>Friend name</label>
      <input type="text"></input>
      <label>Image URL</label>
      <input type="text" placeholder="https://i.pravatar.cc/48"></input>
      <label>Expense in €</label>
      <input type="text"></input>
    </form>
  );
}
