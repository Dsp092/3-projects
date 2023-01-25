status="0";
input="";
objects=[];
object_detector="";

function setup()
{
    video=createCapture(VIDEO);
    video.hide();
    video.size(500,500);
    canvas=createCanvas(300,250);
    canvas.position(480,250);
    canvas.center();
}

function start()
{
    input=document.getElementById("input_object").value;
    document.getElementById("status").innerHTML="Status:Detecting the Object";
    object_detector=ml5.objectDetector("cocossd",modelloaded);
   
}

function modelloaded()
{
    console.log("modelloaded");
    status=true;
}

function draw()
{
image(video,0,0,300,300);
if(status != "")
{
    object_detector.detect(video,gotResults);
    for(i=0;i < objects.length;i++)
    {
        console.log(objects.length);
        document.getElementById("status").innerHTML="Status:Objects have been Detected";
        fill("#02fafa");
        text(objects[i].label + "" + percent + "%",objects[i].x + 15,objects[i].y + 15);
        percent=floor(objects[i].confidence * 100);
        stroke("#02fafa");
        nofill();

if(objects[i].label==input)
{
    video.stop();
    object_detector.dectect(gotResults);
    document.getElementById("if_found").innerHTML=input +"found";
var synth=window.speechSynthesis;
var utterThis=new SpeechSynthesisUtterance(input+"found");
synth.speak(utterThis);
}
else
{
    document.getElementById("if_found").innerHTML=input+"Not found";
}
    }
}
}

function gotResults(error,results)
{
if(error)
{
    console.log(error);
}
else
{
console.log(results);
objects=results;
}
}