/* =========================================================
   INTERACTIVE 3D VIEWER - viewer.js
   Diploma Project 2026
========================================================= */

const viewer = document.getElementById('viewer');
const loader = document.getElementById('loader');

const modelTitle = document.getElementById('modelTitle');
const modelName = document.getElementById('modelName');
const statusText = document.getElementById('status');

const resetCameraBtn = document.getElementById('resetCamera');
const rotateBtn = document.getElementById('rotateButton');
const fullscreenBtn = document.getElementById('fullscreenBtn');

/* ---------------- Model Names ---------------- */

const MODEL_NAMES = {
    'owl.glb': 'Бухал',
    'pharaoh.glb': 'Фараон',
    'hoopoe.glb': 'Папуняк',
    'donkey.glb': 'Магаре',
    'eagle.glb': 'Орел',
    'lion.glb': 'Лъв',
    'dog.glb': 'Куче'
};

/* ---------------- Read URL Parameter ---------------- */

const params = new URLSearchParams(window.location.search);
const modelFile = params.get('model');

if (modelFile) {
    viewer.src = `models/${modelFile}`;

    const title =
        MODEL_NAMES[modelFile] ||
        modelFile.replace('.glb', '');

    modelTitle.textContent = title;
    modelName.textContent = title;
    document.title = `${title} | Interactive 3D Viewer`;

    statusText.textContent = 'Loading…';
    statusText.style.color = '#F59E0B';
} else {
    modelTitle.textContent = 'Няма избран модел';
    modelName.textContent = 'Няма избран модел';
    statusText.textContent = 'No model selected';
    statusText.style.color = '#EF4444';
}

/* ---------------- Loader ---------------- */

viewer.addEventListener('load', () => {
    loader.style.opacity = '0';

    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);

    statusText.textContent = 'Ready';
    statusText.style.color = '#22C55E';

    saveInitialCamera();
});

viewer.addEventListener('error', () => {
    statusText.textContent = 'Error';
    statusText.style.color = '#EF4444';

    loader.innerHTML = `
        <div style="text-align:center">
            <h2 style="margin-bottom:10px">❌ Грешка</h2>
            <p>Моделът не можа да бъде зареден.</p>
        </div>
    `;
});

/* ---------------- Camera Reset ---------------- */

let initialOrbit = '';
let initialTarget = '';
let initialFov = '';

function saveInitialCamera() {
    initialOrbit = viewer.getCameraOrbit().toString();
    initialTarget = viewer.cameraTarget.toString();
    initialFov = viewer.fieldOfView.toString();
}

resetCameraBtn.addEventListener('click', () => {
    if (!initialOrbit) return;

    viewer.cameraOrbit = initialOrbit;
    viewer.cameraTarget = initialTarget;
    viewer.fieldOfView = initialFov;
});

/* ---------------- Auto Rotate ---------------- */

let autoRotateEnabled = true;

rotateBtn.addEventListener('click', () => {
    autoRotateEnabled = !autoRotateEnabled;
    viewer.autoRotate = autoRotateEnabled;

    rotateBtn.textContent =
        autoRotateEnabled ? 'Auto Rotate' : 'Start Rotation';
});

/* ---------------- Fullscreen ---------------- */

fullscreenBtn.addEventListener('click', async () => {
    try {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
            fullscreenBtn.textContent = 'Exit Fullscreen';
        } else {
            await document.exitFullscreen();
            fullscreenBtn.textContent = 'Fullscreen';
        }
    } catch (err) {
        console.error('Fullscreen error:', err);
    }
});

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        fullscreenBtn.textContent = 'Fullscreen';
    }
});

/* ---------------- Keyboard Shortcuts ---------------- */

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key === 'r') resetCameraBtn.click();
    if (key === 'a') rotateBtn.click();
    if (key === 'f') fullscreenBtn.click();
});

/* ---------------- Smooth Fade In ---------------- */

window.addEventListener('load', () => {
    document.body.style.opacity = '0';

    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity .4s ease';
        document.body.style.opacity = '1';
    });
});

/* ---------------- Console Banner ---------------- */

console.log(
    '%cInteractive Photogrammetry Viewer',
    'color:#38BDF8;font-size:16px;font-weight:bold'
);
console.log('Viewer initialized successfully.');