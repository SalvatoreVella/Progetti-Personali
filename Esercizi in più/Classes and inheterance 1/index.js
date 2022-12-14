class Shape {
    name;
    sides;
    sideLength;
    constructor(name, sides, sideLength) {
        this.name = name;
        this.sides = sides;
        this.sideLength = sideLength;
    }
    calcPerimeter = () => console.log(this.sides * this.sideLength);
}

const square = new Shape("square", 4, 5);

const triangle = new Shape("triangle", 3, 3);

square.calcPerimeter();

triangle.calcPerimeter();

class Square extends Shape {

    constructor(sideLength, name = "square", sides = 4) {
        super(name, sides, sideLength);
    }
    calcArea = () => console.log(this.sideLength * this.sideLength);
}

const newSquare = new Square(5);

newSquare.calcArea();

newSquare.calcPerimeter();

console.log(newSquare);