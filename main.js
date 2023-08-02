objects = [];
status = "";
video = "";

function setup()
{
    canvas = createCanvas(480,370);
    canvas.position(520, 160)

    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start()
{
    objectsDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: identificando Objetos";
}

function modelLoaded()
{
    console.log("Modelo Carregado!!!")
    status = true;
    console.log("Modelo Carregado!")
    status = true;
    video.loop();
    video.speed(3);
    video.volume(0);
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectsDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objetos Detectados";
            document.getElementById("numberOfObjects").innerHTML = "Quantidade de Objetos Detectados " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}