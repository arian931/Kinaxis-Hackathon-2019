export default class InputL {
    constructor(paddle) {
        document.addEventListener("keydown", event => {
            //alert(event.keyCode);
            switch (event.keyCode) {
                case 79:
                    //right
                    console.log("Moving up");
                    paddle.moveUp();
                    break;
                case 76:
                    //left
                    console.log("Moving Down");
                    paddle.moveDown();
                    break;
            }
        });
    }
}