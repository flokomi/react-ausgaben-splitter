import { useState } from "react";
import "animate.css";
import FriendList from "./FriendList.js";
import Button from "./Button.js";
import AddFriend from "./AddFriend.js";
import EditFriend from "./EditFriend.js";

// import { useRef } from "react";

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
      <div className="main-header">
        <h1>Expenses Splitter</h1>
        {friends.length > 1 && (
          <h2>
            Total: €{totalExpense} / For each: €{averageExpense.toFixed(0)}{" "}
            (rounded)
          </h2>
        )}
      </div>
      <div className="sidebar">
        <FriendList
          friends={friends}
          setFriends={setFriends}
          onClick={handleSelection}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
          showEditFriend={showEditFriend}
          averageExpense={averageExpense}
        />

        {
          <div>
            {showAddFriend && (
              <AddFriend
                onAddFriend={handleAddFriend}
                name={name}
                setName={setName}
                image={image}
                setImage={setImage}
                expense={expense}
                setExpense={setExpense}
              ></AddFriend>
            )}
            <div
              // Butten center for start screen
              className={friends.length === 0 && !showAddFriend ? "center" : ""}
            >
              {showEditFriend === false && (
                <Button
                  onClick={handleShowAddFriend}
                  btnAnimate={
                    friends.length === 0
                      ? "animate__animated animate__backInDown"
                      : ""
                  }
                  btnWelcome={
                    friends.length === 0 && !showAddFriend ? "btn-welcome" : ""
                  }
                  btnAddFriend={"btn-addFriend"}
                  friends={friends}
                >
                  {showAddFriend ? "Close" : "Add a friend"}
                </Button>
              )}
            </div>
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
    </div>
  );
}
