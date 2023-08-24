import { useState } from "react";
import "animate.css";

// const initialFriends = [
//   {
//     id: 7373983948,
//     name: "Flo",
//     image: "https://i.pravatar.cc/48?u=7373983948",
//     expense: 35,
//   },
//   {
//     id: 7373987738,
//     name: "Dani",
//     image: " https://i.pravatar.cc/48?u=7373987738",
//     expense: 70,
//   },
//   {
//     id: 2292983948,
//     name: "Axel",
//     image: "https://i.pravatar.cc/48?u=2292983948",
//     expense: 5,
//   },
// ];

function Button({ children, onClick, animate }) {
  return (
    <button className={`btn ${animate}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState([]);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showEditFriend, setShowEditFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  let totalExpense = 0;
  friends.map((friend) => (totalExpense = totalExpense + friend.expense));

  let averageExpense = 0;
  totalExpense > 0
    ? (averageExpense = totalExpense / friends.length)
    : (averageExpense = 0);

  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const [expense, setExpense] = useState("");

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);

    setName("");
    setImage("https://i.pravatar.cc/48");
    setExpense("");
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  }

  function handleEditFriend(updatedFriend) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === updatedFriend.id
          ? { ...friend, expense: updatedFriend.expense }
          : friend
      )
    );
    setShowEditFriend(false);
    setSelectedFriend(null);
  }

  function handleSelection(friend) {
    if (showAddFriend) {
      setShowAddFriend(false);
    }

    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));

    console.log(selectedFriend);

    setShowEditFriend((show) =>
      selectedFriend?.id === friend.id ? false : true
    );

    setName("");
    setImage("https://i.pravatar.cc/48");
    setExpense("");
  }

  return (
    <div className="app">
      <h1>Expense Splitter</h1>
      {friends.length > 1 && (
        <h2>
          Total: €{totalExpense} / For each: €{averageExpense.toFixed(0)}
        </h2>
      )}
      <div className="sidebar">
        <FriendList
          friends={friends}
          onClick={handleSelection}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
          showEditFriend={showEditFriend}
        />

        {
          <div>
            {showAddFriend && (
              <AddFriend
                onAddFriend={handleAddFriend}
                // setShowAddFriend={setShowAddFriend}
                name={name}
                setName={setName}
                image={image}
                setImage={setImage}
                expense={expense}
                setExpense={setExpense}
              ></AddFriend>
            )}
            {showEditFriend === false && (
              <Button
                onClick={handleShowAddFriend}
                animate={
                  friends.length === 0
                    ? "animate__animated animate__backInDown"
                    : ""
                }
                friends={friends}
              >
                {showAddFriend ? "Close" : "Add a friend"}
              </Button>
            )}
          </div>
        }

        {
          <div>
            {showEditFriend && showAddFriend === false && (
              <EditFriend
                onEditFriend={handleEditFriend}
                selectedFriend={selectedFriend}
                name={name}
                setName={setName}
                image={image}
                setImage={setImage}
                expense={expense}
                setExpense={setExpense}
              />
            )}
          </div>
        }
      </div>
      <Result friends={friends} averageExpense={averageExpense} />
    </div>
  );
}

function FriendList({
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

function Friend({
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

function AddFriend({
  onAddFriend,
  // setShowAddFriend,
  name,
  setName,
  image,
  setImage,
  expense,
  setExpense,
}) {
  function handleSumbit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name: name,
      image: `${image}?=${id}`,
      expense: expense,
      id: id,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
    setExpense("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSumbit}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(el) => setName(el.target.value)}
      ></input>
      <label>Image URL</label>
      <input
        type="text"
        placeholder="https://i.pravatar.cc/48"
        value={image}
        onChange={(el) => setImage(el.target.value)}
        disabled
      ></input>
      <label>Expense in €</label>
      <input
        type="text"
        value={expense}
        onChange={(el) => setExpense(Number(el.target.value))}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function EditFriend({
  selectedFriend,
  onEditFriend,
  name,
  setName,
  image,
  setImage,
  expense,
  setExpense,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    if (!expense) return;

    console.log(selectedFriend);

    const updatedFriend = {
      ...selectedFriend,
      // name: name,
      // image: image,
      expense: expense,
    };

    console.log(updatedFriend);
    onEditFriend(updatedFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      {/* <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(el) => setName(el.target.value)}
      ></input> */}
      {/* <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(el) => setImage(el.target.value)}
      ></input> */}
      <label>Expense in €</label>
      <input
        type="text"
        value={expense}
        onChange={(el) => setExpense(Number(el.target.value))}
        placeholder={selectedFriend.expense}
      ></input>
      <Button>Update</Button>
    </form>
  );
}

function Result({ friends, averageExpense }) {
  return (
    friends.length > 1 && (
      <div className="result">
        <ul>
          {friends.map((friend) => (
            <li
              className={averageExpense - friend.expense > 0 ? "red" : "green"}
            >
              <h3>{averageExpense - friend.expense > 0 ? "OWES" : "GETS"}</h3>
              <p>€{Math.abs((averageExpense - friend.expense).toFixed(0))}</p>
              <span>!</span>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
