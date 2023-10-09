window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    clearCanvas = document.querySelector(".clear-canvas");
    predict = document.querySelector(".predict");
    confirm = document.querySelector(".confirm");
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = 'destination-under';
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    resultDisplay = document.getElementById("result");

    //Resizing
    canvas.height = 672;
    canvas.width = 672;

    const setCanvasBackground = () => {
    // setting whole canvas background to white, so the downloaded img background will be white
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000"; // setting fillstyle back to the selectedColor, it'll be the brush color
    }
    setCanvasBackground();
    //variables
    let isDrawing = false;

    function startPosition(){
        isDrawing = true;
    }
    function finishedPosition(){
        isDrawing = false;
        ctx.beginPath();
    }

    function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

    }

    function draw(e){
        if(!isDrawing) return;
        ctx.lineWidth = 40;
        ctx.lineCap = "round";

        pos = getMousePos(canvas, e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        pos = getMousePos(canvas, e);
        ctx.moveTo(pos.x, pos.y);
    }

    clearCanvas.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setCanvasBackground();
        document.getElementById("result").value = '';
    });

    predict.addEventListener("click", () => {
       let canvasUrl = canvas.toDataURL();
       fetch('/pic', {
            method: 'POST',
             headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({data: canvasUrl})
       }).then(response => response.json()).then(response => {
       document.getElementById("result").value = response.result;
       })
    });

    confirm.addEventListener("click", () => {
        let canvasUrl = canvas.toDataURL();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setCanvasBackground();
        fetch('/confirm', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({data: document.getElementById("result").value,
            pic: canvasUrl})
        })
        document.getElementById("result").value = '';
    })


    //EventListeners
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
});