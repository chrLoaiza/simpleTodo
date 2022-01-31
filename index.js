// @ts-nocheck
let items = [];
window.addEventListener("load", () => {
  document.getElementById("titleBtn").addEventListener("click", () => {
    const inputValue = document.getElementById("titleInput").value;

    document.getElementById("titleText").innerText = inputValue;
  });

  document.getElementById("items").addEventListener("click", handleClick);

  document
    .getElementById("addElementBtn")
    .addEventListener("click", addElement);
});

const addElement = () => {
  const item = document.getElementById("elementInput").value;
  const itemData = {
    item,
    id: createUUID(),
    checked: false,
  };
  items.push(itemData);

  modifyList();
};

const handleClick = (event) => {
  if (event.target.tagName === "BUTTON") {
    const data = event.target.dataset;
    if (data.type && data.type === "done") {
      const newData = items.map((ele) => {
        if (ele.id === event.target.parentElement.dataset.id) {
          return { ...ele, checked: true };
        }
        return ele;
      });

      items = newData;
    } else if (data.type && data.type === "remove") {
      const newData = items.filter(
        (ele) => ele.id !== event.target.parentElement.dataset.id
      );
      items = newData;
    }
    modifyList();
  }
};

const modifyList = () => {
  const htmlList = items.map((itemData) => {
    return `<li ${itemData.checked ? 'class="checked"' : ""}">
      <div data-id=${itemData.id} class="todo-item">
        <p>${itemData.item}</p>
        <button data-type="done" ${
          itemData.checked ? "disabled" : ""
        } class="done">Done</button>
        <button data-type="remove" class="remove">Remove</button>
      </div>
    </li>`;
  });

  const list = document.getElementById("items");
  list.innerHTML = htmlList.join("");
};
const createUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
