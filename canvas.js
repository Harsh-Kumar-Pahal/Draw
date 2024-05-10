var canvas = document.getElementById('draw');
var toolBar = document.getElementById('toolBar');
var ctx = canvas.getContext('2d');

const erase = document.getElementById('erase');
const pen = document.getElementById('pen');

const CanvasOffsetX = canvas.offsetLeft;
const CanvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - CanvasOffsetX;
canvas.height = window.innerHeight - CanvasOffsetY;


let isPainting = false;
let lineWidth = 1;

let isButtonSelected = false;
let EraseColor = "white";
let isEraseing = false;

let isPenSelected = false;
let isWritting = false;
let bgColor

let StartX;
let StartY;

pen.addEventListener('click', e=>{
    pen.style.backgroundColor = "#c3c3c3";
    pen.style.transform = "translateY(-20%)";
    pen.style.transition = "0.4s";
    pen.style.borderTop = "2px solid black";
    // pen.style.borderRadius = "10px";

        canvas.addEventListener('mousedown', (e) =>{
            if(isPenSelected){
                isPainting = true;
                StartX = e.clientX;
                StartY = e.clientY;
                ctx.beginPath();
                ctx.moveTo(e.clientX - CanvasOffsetX, e.clientY - CanvasOffsetY);
            }
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (isPainting) {
                ctx.lineTo(e.clientX - CanvasOffsetX, e.clientY - CanvasOffsetY);
                ctx.lineWidth = lineWidth;
                ctx.stroke();
                ctx.beginPath(); // Start a new path for the next line segment
                ctx.moveTo(e.clientX - CanvasOffsetX, e.clientY - CanvasOffsetY);
            }
        });
        
        canvas.addEventListener('mouseup', (e)=>{
            isPainting = false;
            ctx.stroke();
            ctx.beginPath();
        });

    isPenSelected = !isPenSelected;

    if(!isPenSelected){
        pen.style.transform = "translateY(0%)";
        pen.style.transition = "0.4s";
        pen.style.backgroundColor = "";
        pen.style.borderTop = "none";
    }
});

toolBar.addEventListener('click', e =>{
    if(e.target.id ===  'clear'){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolBar.addEventListener('change', e=>{
    if(e.target.id === 'stroke'){
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth'){
        lineWidth = e.target.value;
    }
});

const red = document.getElementById("red");

red.addEventListener('click', () => {
    ctx.strokeStyle = "red"; // Set stroke color to red
});

const green = document.getElementById("green");

green.addEventListener('click', () => {
    ctx.strokeStyle = "green"; // Set stroke color to red
});

const yellow = document.getElementById("yellow");

yellow.addEventListener('click', () => {
    ctx.strokeStyle = "yellow"; // Set stroke color to red
});

const blue = document.getElementById("blue");

blue.addEventListener('click', () => {
    ctx.strokeStyle = "blue"; // Set stroke color to red
});




// Assuming you have a button with ID 'selectButton'
const selectBubble = document.getElementById('bubble');
selectBubble.addEventListener('click', () => {

    selectBubble.style.backgroundColor = "#c3c3c3";
    selectBubble.style.borderTop = "2px solid black";
    selectBubble.style.transform = "translateY(-20%)";
    selectBubble.style.transition = "0.4s";

    canvas.addEventListener('mousemove', e => {
        if (isButtonSelected) {
            const radius = 20; // Radius of the circle
            const mouseX = e.clientX;
            const mouseY = e.clientY ; // Adjusting Y position to center the circle
            // Clear the canvas within the circular area
            ctx.clearRect(mouseX - radius, mouseY - radius, 2 * radius, 2 * radius); // Clear the canvas only within the circular area 
            ctx.beginPath();
        ctx.arc(mouseX, mouseY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // Adjust the color and transparency of the circle
        ctx.stroke();          
        } 
    });
    isButtonSelected = !isButtonSelected; // Toggle the selection state
    if(!isButtonSelected){
        selectBubble.style.transform = "translateY(10%)";
        selectBubble.style.transition = "0.4s";
        selectBubble.style.backgroundColor = "";
        selectBubble.style.borderTop = "none";
        window.location.reload();
    }

    
});


// Assuming you have a button with ID 'selectButton'
const selectButton = document.getElementById('erase');
selectButton.addEventListener('click', () => {
    selectButton.style.backgroundColor = "#c3c3c3";
    selectButton.style.borderTop = "2px solid black";
    selectButton.style.transform = "translateY(-20%)";
    selectButton.style.transition = "0.4s";

    canvas.addEventListener('mousemove', e => {
        if (isButtonSelected) {
            const radius = 20; // Radius of the circle
            const mouseX = e.clientX;
            const mouseY = e.clientY ; // Adjusting Y position to center the circle
            // Clear the canvas within the circular area
            ctx.clearRect(mouseX - radius, mouseY - radius, 2 * radius, 2 * radius); // Clear the canvas only within the circular area          
        } 
    });
    isButtonSelected = !isButtonSelected; // Toggle the selection state
    if(!isButtonSelected){
        selectButton.style.transform = "translateY(10%)";
        selectButton.style.transition = "0.4s";
        selectButton.style.backgroundColor = "";
        selectButton.style.borderTop = "none";

    }
});


 

        

        // Save drawing data to localStorage
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('drawingData', canvas.toDataURL());
        });

        // Load drawing data from localStorage when page is loaded
        window.addEventListener('load', () => {
            const savedData = localStorage.getItem('drawingData');
            if (savedData) {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                };
                img.src = savedData;
            }
        });


        // Function to handle touch start event
function handleTouchStart(e) {
    if (isPenSelected) {
        isPainting = true;
        const touch = e.touches[0];
        StartX = touch.clientX;
        StartY = touch.clientY;
        ctx.beginPath();
        ctx.moveTo(touch.clientX - CanvasOffsetX, touch.clientY - CanvasOffsetY);
    }
}

// Function to handle touch move event
function handleTouchMove(e) {
    e.preventDefault(); // Prevent scrolling while drawing
    if (isPainting) {
        const touch = e.touches[0];
        ctx.lineTo(touch.clientX - CanvasOffsetX, touch.clientY - CanvasOffsetY);
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
}

// Function to handle touch end event
function handleTouchEnd() {
    isPainting = false;
    ctx.beginPath();
}

// Adding event listeners for touch input
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);

        // Download canvas as image
document.getElementById('download').addEventListener('click', function() {
    // Create a temporary canvas element
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    var tempCtx = tempCanvas.getContext('2d');
    
    // Fill the temporary canvas with white background
    tempCtx.fillStyle = '#ffffff'; // white color
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    
    // Draw the current canvas content onto the temporary canvas
    tempCtx.drawImage(canvas, 0, 0);

    // Create a download link for the temporary canvas
    var link = document.createElement('a');
    link.download = 'canvas_image.png';
    link.href = tempCanvas.toDataURL();
    link.click();
    
    
});