import Button from "./Button.js";

export default function AddFriend({
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
