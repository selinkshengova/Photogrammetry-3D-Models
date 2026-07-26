/* =========================================================
   INTERACTIVE 3D VIEWER - viewer.js
   Diploma Project 2026
   GitHub Releases Model Loader Fix
========================================================= */


/* ---------------- DOM ELEMENTS ---------------- */

const viewer = document.getElementById('viewer');
const loader = document.getElementById('loader');

const modelTitle = document.getElementById('modelTitle');
const modelName = document.getElementById('modelName');
const statusText = document.getElementById('status');

const resetCameraBtn = document.getElementById('resetCamera');
const rotateBtn = document.getElementById('rotateButton');
const fullscreenBtn = document.getElementById('fullscreenBtn');


/* ---------------- MODEL NAMES ---------------- */

const MODEL_NAMES = {

    'owl.glb': 'Бухал',
    'pharaoh.glb': 'Фараон',
    'hoopoe.glb': 'Папуняк',
    'donkey.glb': 'Магаре',
    'eagle.glb': 'Орел',
    'lion.glb': 'Лъв',
    'dog.glb': 'Куче'

};


/* ---------------- GITHUB RELEASE MODEL LINKS ---------------- */

const MODEL_URLS = {

    'owl.glb':
    'https://github.com/selinkshengova/Photogrammetry-3D-Models/releases/download/v1.0/owl.glb',

    'pharaoh.glb':
    'https://github.com/selinkshengova/Photogrammetry-3D-Models/releases/download/v1.0/pharaoh.glb',

    'hoopoe.glb':
    'https://github.com/selinkshengova/Photogrammetry-3D-Models/releases/download/v1.0/hoopoe.glb',

    'donkey.glb':
    'https://github.com/selinkshengova/Photogrammetry-3D-Models/releases/download/v1.0/donkey.glb',

    'eagle.glb':
    'https://github.com/selinkshengova/Photogrammetry-3D-Models/releases/download/v1.0/eagle.glb',

    'lion.glb':
    'https://github.com/selinkshengova/Photogrammetry-3D-Models/releases/download/v1.0/lion.glb',

    'dog.glb':
    'https://github.com/selinkshengova/Photogrammetry-3D-Models/releases/download/v1.0/dog.glb'

};



/* ---------------- READ URL PARAMETER ---------------- */

const params = new URLSearchParams(window.location.search);

const modelFile = params.get('model');


if (modelFile && MODEL_URLS[modelFile]) {


    // Load model from GitHub Release

    viewer.src = MODEL_URLS[modelFile];


    const title =
        MODEL_NAMES[modelFile] ||
        modelFile.replace('.glb','');


    modelTitle.textContent = title;

    modelName.textContent = title;

    document.title =
        `${title} | Interactive 3D Viewer`;


    statusText.textContent =
        "Loading...";

    statusText.style.color =
        "#F59E0B";


}

else {


    modelTitle.textContent =
        "Няма избран модел";


    modelName.textContent =
        "Няма избран модел";


    statusText.textContent =
        "No model selected";


    statusText.style.color =
        "#EF4444";

}



/* ---------------- LOADER ---------------- */


viewer.addEventListener('load',()=>{


    loader.style.opacity = "0";


    setTimeout(()=>{

        loader.style.display="none";

    },500);



    statusText.textContent =
        "Ready";


    statusText.style.color =
        "#22C55E";


    saveInitialCamera();


});



viewer.addEventListener('error',()=>{


    statusText.textContent =
        "Error";


    statusText.style.color =
        "#EF4444";


    loader.innerHTML = `

        <div style="text-align:center">

            <h2>❌ Грешка</h2>

            <p>
            Моделът не можа да бъде зареден.
            Проверете GitHub Release файла.
            </p>

        </div>

    `;


});





/* ---------------- CAMERA RESET ---------------- */


let initialOrbit = '';

let initialTarget = '';

let initialFov = '';



function saveInitialCamera(){


    initialOrbit =
        viewer.getCameraOrbit().toString();


    initialTarget =
        viewer.cameraTarget.toString();


    initialFov =
        viewer.fieldOfView.toString();


}



resetCameraBtn.addEventListener('click',()=>{


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



rotateBtn.addEventListener('click',()=>{


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


fullscreenBtn.addEventListener('click',async()=>{


    try{


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


    }


    catch(error){


        console.error(
            "Fullscreen error:",
            error
        );


    }


});



document.addEventListener(
'fullscreenchange',
()=>{


    if(!document.fullscreenElement){


        fullscreenBtn.textContent =
            "Fullscreen";


    }


});





/* ---------------- KEYBOARD SHORTCUTS ---------------- */


document.addEventListener(
'keydown',
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





/* ---------------- PAGE FADE ---------------- */


window.addEventListener('load',()=>{


    document.body.style.opacity="0";


    requestAnimationFrame(()=>{


        document.body.style.transition =
            "opacity .4s ease";


        document.body.style.opacity="1";


    });


});





/* ---------------- CONSOLE ---------------- */


console.log(

"%cInteractive Photogrammetry Viewer",

"color:#38BDF8;font-size:16px;font-weight:bold"

);


console.log(

"Models loaded from GitHub Releases"

);
