export default function Result({ friends, averageExpense }) {
  return (
    friends.length > 1 && (
      <div className="result">
        <ul>
          {friends.map((friend) => (
            <li
              className={averageExpense - friend.expense > 0 ? "red" : "green"}
              key={friend.id}
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
