class Car
{
    constructor(x,y)
    {
       var options=
        {
            isStatic:false,
            friction:5,
            restitution:1
        }
        this.body = Bodies.circle(x,y,100, options);
        this.width = 300;
        this.height = 250;
        this.image = loadImage("obstacle1.png");
        World.add(world,this.body);
    }

    display()
    {
        var position = this.body.position;
        push();
        imageMode(CENTER);
        //ellipseMode(RADIUS)
        image(this.image, position.x+175, position.y+175);
        //ellipse(position.x,position.y, 100, 100);
        console.log(position);
        pop();
    }
}