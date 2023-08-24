import Button from "./Button.js";

export default function EditFriend({
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
