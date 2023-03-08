var img = ""
var status = ""
var objects = []

function preload() {
    img = loadImage("dog_cat.jpg")
}

function setup() {
    canvas = createCanvas(640,420)
    canvas.center()
    objectToDetector = ml5.objectDetector("cocossd", modelLoaded)
}

function draw() {
    image(img, 0, 0, 640, 420)
    if (status != "") {
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: detectando objetos"
            fill("red")
            percent = Math.floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x +5, objects[i].y +13)
            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function modelLoaded() {
    console.log("O modelo foi carregado corretamente!")
    status = true
    objectToDetector.detect(img, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        objects = results
    }
    
}