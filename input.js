export default class InputR {
  constructor(paddle) {
    document.addEventListener("keydown", event => {
      //alert(event.keyCode);
      switch (event.keyCode) {
        case 87:
          //right
          //console.log("Moving up");
          paddle.moveUp();
          break;
        case 83:
          //left
          //console.log("Moving Down");
          paddle.moveDown();
          break;
      }
    });
  }
}

