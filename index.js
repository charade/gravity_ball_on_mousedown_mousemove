let canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
let ctx = canvas.getContext('2d');
let color =['#658CBF','#F2CA52','#F2BE5C','#BF6A4B','#F29991']

window.addEventListener('resize',()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})
//////////////////////////////////////
class Particle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.radius = 10*Math.random() + 10;
        //we want the friction close < 1 and close to 1 
        //that way the velocity decreases progressively
        this.friction  = this.radius/(this.radius+1); 
        //initial speed
        this.velocity = 8;
        this.color = color[Math.floor(color.length*Math.random())]
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update(){
        this.draw()
        /*
            gravity effect :
            when ball.y > canvas.innerHeight ball.y decrease ,the velovity also
            each time cause of friction force
        */
        if(this.y + this.radius >= canvas.height + 2){
            this.velocity *= -this.friction;
        }
        else{
            // get the ball bounce
            this.velocity += 1;
        }
        this.y +=  this.velocity;
    }
}
////////////////////////////////////////

let isMouseDown = false;
function init(e){
    particleArr.push(new Particle(e.x,e.y))
    
}
canvas.addEventListener('mousedown',(e)=> {
    isMouseDown = true;
})
//Array to load particles while if mouse is down;
let particleArr = [];
//on mouse up we do not draw particle anymore
addEventListener('mouseup', ()=> isMouseDown= false);

//on mouse move we draw particle on mouse coordinates if the mouve move
addEventListener('mousemove',(e)=>{
    if(isMouseDown){
        init(e);
    }
})
//animation loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let el of particleArr){
        el.update();
    }
    requestAnimationFrame(animate)
}
animate();


