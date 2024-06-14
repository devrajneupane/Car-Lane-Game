export const keys = {
  left: false,
  right: false,
  enter: false,
  space: false,
};

document.addEventListener("keydown", (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowLeft":
    case "a": {
      keys.left = true;
      break;
    }

    case "ArrowRight":
    case "d": {
      keys.right = true;
      break;
    }
    case "Enter": {
      keys.enter = true;
      break;
    }
    case " ": {
      keys.space = true;
      break;
    }
  }
});

document.addEventListener("keyup", () => {
  keys.left = false;
  keys.right = false;
  keys.enter = false;
  keys.space = false;
});
