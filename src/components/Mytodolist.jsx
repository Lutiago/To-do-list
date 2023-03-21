import { useState } from "react";

export function Mytodolist() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  return (
    <div class="position-absolute top-50 start-50 translate-middle-x">
      <input
        placeholder="What needs to be done?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            const newList = [{ task: task, done: false }, ...list];
            setList(newList);
            setTask("");
          }
        }}
      />

      <ul>
        {list.map((Item, index) => {
          if (Item.done) return null;
          return (
            <li key={index}>
              {Item.task}
              <button
                onClick={() => {
                  const newList = [...list];
                  newList[index].done = true;
                  setList(newList);
                }}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
      <div>{list.filter((item) => !item.done).length} items left</div>
    </div>
  );
}
