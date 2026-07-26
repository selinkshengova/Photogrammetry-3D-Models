/* =========================================================
   INTERACTIVE 3D VIEWER - viewer.js
   GitHub Pages Model Loader Version
========================================================= */


/* ---------------- DOM ELEMENTS ---------------- */

const viewer = document.getElementById("viewer");
const loader = document.getElementById("loader");

const modelTitle = document.getElementById("modelTitle");
const modelName = document.getElementById("modelName");
const statusText = document.getElementById("status");

const resetCameraBtn = document.getElementById("resetCamera");
const rotateBtn = document.getElementById("rotateButton");
const fullscreenBtn = document.getElementById("fullscreenBtn");



/* ---------------- MODEL NAMES ---------------- */

const MODEL_NAMES = {

    "owl.glb": "Бухал",
    "pharaoh.glb": "Фараон",
    "hoopoe.glb": "Папуняк",
    "donkey.glb": "Магаре",
    "eagle.glb": "Орел",
    "lion.glb": "Лъв",
    "dog.glb": "Куче"

};



/* ---------------- MODEL PATHS ---------------- */

const MODEL_URLS = {


    "owl.glb":
    "https://selinkshengova.github.io/Photogrammetry-3D-Models/models/owl.glb",


    "pharaoh.glb":
    "https://selinkshengova.github.io/Photogrammetry-3D-Models/models/pharaoh.glb",


    "hoopoe.glb":
    "https://selinkshengova.github.io/Photogrammetry-3D-Models/models/hoopoe.glb",


    "donkey.glb":
    "https://selinkshengova.github.io/Photogrammetry-3D-Models/models/donkey.glb",


    "eagle.glb":
    "https://selinkshengova.github.io/Photogrammetry-3D-Models/models/eagle.glb",


    "lion.glb":
    "https://selinkshengova.github.io/Photogrammetry-3D-Models/models/lion.glb",


    "dog.glb":
    "https://selinkshengova.github.io/Photogrammetry-3D-Models/models/dog.glb"

};





/* ---------------- LOAD MODEL ---------------- */


const params =
new URLSearchParams(window.location.search);


const modelFile =
params.get("model");



if(modelFile && MODEL_URLS[modelFile]){


    const modelURL =
    MODEL_URLS[modelFile];


    console.log(
        "Loading model:",
        modelURL
    );


    viewer.src =
    modelURL;



    const title =
    MODEL_NAMES[modelFile]
    ||
    modelFile.replace(".glb","");



    modelTitle.textContent =
    title;


    modelName.textContent =
    title;


    document.title =
    `${title} | Interactive 3D Viewer`;



    statusText.textContent =
    "Loading...";


    statusText.style.color =
    "#F59E0B";



}

else{


    modelTitle.textContent =
    "Няма избран модел";


    modelName.textContent =
    "Няма избран модел";


    statusText.textContent =
    "No model selected";


    statusText.style.color =
    "#EF4444";

}





/* ---------------- MODEL LOADED ---------------- */


viewer.addEventListener(
"load",
()=>{


    loader.style.opacity =
    "0";


    setTimeout(()=>{


        loader.style.display =
        "none";


    },500);



    statusText.textContent =
    "Ready";


    statusText.style.color =
    "#22C55E";



    saveInitialCamera();


});





/* ---------------- MODEL ERROR ---------------- */


viewer.addEventListener(
"error",
()=>{


    console.error(
        "Model loading failed:",
        viewer.src
    );


    statusText.textContent =
    "Error";


    statusText.style.color =
    "#EF4444";



    loader.innerHTML = `

        <div style="text-align:center">

            <h2>❌ Грешка</h2>

            <p>
            Моделът не може да бъде зареден.
            Проверете папка models/.
            </p>

        </div>

    `;


});






/* ---------------- CAMERA RESET ---------------- */


let initialOrbit = "";
let initialTarget = "";
let initialFov = "";



function saveInitialCamera(){


    initialOrbit =
    viewer.getCameraOrbit().toString();


    initialTarget =
    viewer.cameraTarget.toString();


    initialFov =
    viewer.fieldOfView.toString();


}




resetCameraBtn.addEventListener(
"click",
()=>{


    if(!initialOrbit)
    return;


    viewer.cameraOrbit =
    initialOrbit;


    viewer.cameraTarget =
    initialTarget;


    viewer.fieldOfView =
    initialFov;


});






/* ---------------- AUTO ROTATE ---------------- */


let autoRotateEnabled = true;



rotateBtn.addEventListener(
"click",
()=>{


    autoRotateEnabled =
    !autoRotateEnabled;



    viewer.autoRotate =
    autoRotateEnabled;



    rotateBtn.textContent =
    autoRotateEnabled
    ?
    "Auto Rotate"
    :
    "Start Rotation";


});






/* ---------------- FULLSCREEN ---------------- */


fullscreenBtn.addEventListener(
"click",
async()=>{


    if(!document.fullscreenElement){


        await document.documentElement.requestFullscreen();


        fullscreenBtn.textContent =
        "Exit Fullscreen";


    }


    else{


        await document.exitFullscreen();


        fullscreenBtn.textContent =
        "Fullscreen";


    }


});






/* ---------------- KEYBOARD SHORTCUTS ---------------- */


document.addEventListener(
"keydown",
(e)=>{


    const key =
    e.key.toLowerCase();


    if(key==="r")
    resetCameraBtn.click();


    if(key==="a")
    rotateBtn.click();


    if(key==="f")
    fullscreenBtn.click();


});






/* ---------------- CONSOLE ---------------- */


console.log(
"%cInteractive Photogrammetry Viewer",
"color:#38BDF8;font-size:16px;font-weight:bold"
);


console.log(
"Models loaded from GitHub Pages"
);
