class map {
    constructor() {
        this.array = [];
        for (var x = 0; x < 10000; x++) {
            this.array[x] = 1;
        }
        this.front = true;
        this.back = false;
        this.right = false;
        this.left = false;
        this.startingLocationX = 0;
        this.startingLocationY = 0;
        this.currentX;
        this.currentY;
        this.PossibleDirections = [];
        this.first = false;
        this.RCToIndex;
        this.howManyInDirectionF;
        this.howManyInDirectionD;
        this.howManyInDirectionR;
        this.howManyInDirectionL;
    }
    drawMap() {
        console.log("DrawMap")
        // if (this.first) {
        //     Walk();
        // } else {
        //     while (this.Hunt()) {
        //         break;
        //     }
        // }
        this.Walk();
    }
    Walk() {
        this.currentX = this.startingLocationX;
        this.currentY = this.startingLocationY;
        while (true) {
            console.log("walk");
            for (var x = 1; x < 3; x++) {
                if (this.currentY + x < 100) {
                    this.RCToIndex = ((this.currentY + x) * 100) + this.currentX;
                    if (this.array[this.RCToIndex] == 1) {
                        this.howManyInDirectionD++;
                    }
                }
            }
            for (var x = 1; x < 3; x++) {
                if (this.currentY - x > 0) {
                    this.RCToIndex = ((this.currentY - x) * 100) + this.currentX;
                    if (this.array[this.RCToIndex] == 1) {
                        this.howManyInDirectionF++;
                    }
                }
            }
            for (var x = 1; x < 3; x++) {
                if (this.currentX + x < 100) {
                    this.RCToIndex = ((this.currentY * 100)) + (this.currentX + x);
                    if (this.array[this.RCToIndex] == 1) {
                        this.howManyInDirectionL++;
                    }
                }
            }
            for (var x = 1; x < 3; x++) {
                if (this.currentX - x > 0) {
                    this.RCToIndex = ((this.currentY * 100)) + (this.currentX - x);
                    if (this.array[this.RCToIndex] == 1) {
                        this.howManyInDirectionR++;
                    }
                }
            }
            if (this.howManyInDirectionD + this.howManyInDirectionF + this.howManyInDirectionL + this.howManyInDirectionR == 0) {
                console.log("No Moves Left. LET THE HUNT BEGIN");
                if (!this.Hunt()) {
                    break;
                }
            } else {
                var directionsCounter = 0;
                if (this.howManyInDirectionD > 0) {
                    this.PossibleDirections[directionsCounter] = "D";
                    directionsCounter++;
                }
                if (this.howManyInDirectionF > 0) {
                    this.PossibleDirections[directionsCounter] = "F";
                    directionsCounter++;
                }
                if (this.howManyInDirectionR > 0) {
                    this.PossibleDirections[directionsCounter] = "R";
                    directionsCounter++;
                }
                if (this.howManyInDirectionL > 0) {
                    this.PossibleDirections[directionsCounter] = "L";
                    directionsCounter++;
                }
                let choice = Math.random * (directionsCounter - 1);
                let indexForAsigning;
                switch (this.PossibleDirections[choice]) {
                    case "D":
                        for (var y = 0; y < this.howManyInDirectionD; y++) {
                            indexForAsigning = ((this.currentY + y) * 100) + (this.currentX);
                            array[indexForAsigning] = 0;
                        }
                        break;
                    case "F":
                        for (var y = 0; y < this.howManyInDirectionF; y++) {
                            indexForAsigning = ((this.currentY - y) * 100) + (this.currentX);
                            array[indexForAsigning] = 0;
                        }
                        break;
                    case "R":
                        for (var y = 0; y < this.howManyInDirectionR; y++) {
                            indexForAsigning = ((this.currentY) * 100) + (this.currentX + y);
                            array[indexForAsigning] = 0;
                        }
                        break;
                    case "L":
                        for (var y = 0; y < this.howManyInDirectionL; y++) {
                            indexForAsigning = ((this.currentY) * 100) + (this.currentX - y);
                            array[indexForAsigning] = 0;
                        }
                        break;
                }
            }
            break;
        }
    }
    Hunt() {
        var huntsLeft = false;
        while (true) {
            console.log("hunt");
            for (var m = 0; m < 100; m++) {
                for (var n = 0; n < 100; n++) {
                    var indexForHunt = ((m) * 100) + (n);
                    if (this.array[indexForHunt] == 0) {
                        if (m - 1 > 0) {
                            var indexForHuntF = ((m - 1) * 100) + (n);
                            if (this.array[indexForHuntF] == 1) {
                                this.startingLocationX = n;
                                this.startingLocationY = m;
                                huntsLeft = true;
                                this.Walk();
                                break;
                            }
                        }
                        if (m + 1 > 0) {
                            var indexForHuntD = ((m + 1) * 100) + (n);
                            if (this.array[indexForHuntF] == 1) {
                                this.startingLocationX = n;
                                this.startingLocationY = m;
                                huntsLeft = true;
                                this.Walk();
                                break;
                            }
                        }
                        if (n + 1 < 100) {
                            var indexForHuntR = ((m) * 100) + (n + 1);
                            if (this.array[indexForHuntF] == 1) {
                                this.startingLocationX = n;
                                this.startingLocationY = m;
                                huntsLeft = true;
                                this.Walk();
                                break;
                            }
                        }
                        if (n - 1 > 0) {
                            var indexForHuntL = ((m) * 100) + (n - 1);
                            if (this.array[indexForHuntF] == 1) {
                                this.startingLocationX = n;
                                this.startingLocationY = m;
                                huntsLeft = true;
                                this.Walk();
                                break;
                            }
                        }

                    }
                }
            }
            break;
        }
        return huntsLeft;
    }
}