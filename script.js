// VARIABLES
const audioList = document.querySelector("#audioList")
const allSlider = document.querySelectorAll("input[type=range]")
const allAudio = document.querySelectorAll(".audio")
const audioLegend = []

// FUNCTIONS
function createSoundNode(name, audioFilePath) {
    index = audioList.childElementCount
    audioPiece = {
        "index": index,
        "name": name,
        "audio": new Audio(audioFilePath)
    }
    audioPiece.audio.volume = 0.5
    audioLegend.push(audioPiece)
    audioPiece.audio.onended = bindEndEventToAudio(audioPiece.audio, index)

    let audioNode = document.createElement("DIV")
    audioNode.dataset.name = name
    audioNode.dataset.index = index
    audioNode.classList.add("audio")
    audioNode.innerHTML = `
        <h3 class="audioTitle">${name.slice(0, 1).toUpperCase() + name.slice(1)}</h3>
        <div class="audioSetting">
            <label class="audioSettingLabel">Volume: 50%</label>
            <input type="range" class="slider" min="0" max="100" value="50" onchange="changeAudio(this)">
        </div>
        <button onclick="toggleAudioPlay(this)" class="audioSettingButton">Play</button>
        <button onclick="toggleAudioLoop(this)" class="audioSettingButton">Loop</button>
        <button onclick="fadeAudio(this, 0.03)" class="audioSettingButton">Fade Out</button>
        <button onclick="fadeAudio(this, 0.02)" class="audioSettingButton">Slow Fade Out</button>
    `;
    audioList.appendChild(audioNode)
}

// UTILITY
const delay = ms => new Promise(res => setTimeout(res, ms));

// TEMPLATE FUNCTION
function changeAudio(slider) {
    slider.parentElement.children[0].innerText = "Volume: " + slider.value + "%"
    currentAudioElement = audioLegend.find(({ name }) => name === slider.parentElement.parentElement.dataset.name);
    currentAudioElement.audio.volume = slider.value / 100
}

function toggleAudioPlay(playButton) {
    currentAudioElement = audioLegend.find(({ name }) => name === playButton.parentElement.dataset.name);
    if (playButton.classList.contains("audioSettingButtonOn")) {
        currentAudioElement.audio.pause()
        playButton.innerText = "Play"
    } else {
        currentAudioElement.audio.play()
        playButton.innerText = "Pause"
    }
    playButton.classList.toggle("audioSettingButtonOn")
}

function toggleAudioLoop(loopButton) {
    currentAudioElement = audioLegend.find(({ name }) => name === loopButton.parentElement.dataset.name);
    if (loopButton.classList.contains("audioSettingButtonOn")) {
        currentAudioElement.audio.loop = false
    } else {
        currentAudioElement.audio.loop = true
    }
    loopButton.classList.toggle("audioSettingButtonOn")
}

function bindEndEventToAudio(audioElement, index) {
    return function() {
        audioElement.currentTime = 0;
        if (!audioElement.loop) {
            audioNode = audioList.children[index]
            audioNode.children[2].innerText = "Play"
            audioNode.children[2].classList.remove("audioSettingButtonOn")
        }
    }
}

async function fadeAudio(fadeButton, fadeFactor) {
    currentAudioElement = audioLegend.find(({ name }) => name === fadeButton.parentElement.dataset.name);
    playButton = fadeButton.parentElement.children[2];
    slider = fadeButton.parentElement.children[1].children[1]
    sliderIndicator = fadeButton.parentElement.children[1].children[0]
    while (currentAudioElement.audio.volume > 0) {
        if (currentAudioElement.audio.volume - fadeFactor <= 0) {
            currentAudioElement.audio.volume = 0
        } else {
            currentAudioElement.audio.volume -= fadeFactor
        }
        console.log(currentAudioElement.audio.volume)
        slider.value = currentAudioElement.audio.volume * 100
        sliderIndicator.innerText = `Volume: ${Math.round(currentAudioElement.audio.volume * 100)}%`
        await delay(500)
    }
    currentAudioElement.audio.pause()
    playButton.innerText = "Play"
    playButton.classList.remove("audioSettingButtonOn")
    currentAudioElement.audio.volume = 0.5
    sliderIndicator.innerText = `Volume: 50%`
    slider.value = currentAudioElement.audio.volume * 100
}

// LOGIC
createSoundNode("generator", "src/generator.mp3")
createSoundNode("dead Phone", "src/deadPhone.mp3")
createSoundNode("thunder strike", "src/thunder.mp3")
createSoundNode("continuous thunder", "src/thunderstorm.mp3")
createSoundNode("gunshot", "src/gunshot.mp3")
createSoundNode("shotgun", "src/shotgun.mp3")
createSoundNode("snowstorm", "src/snowstorm.mp3")
createSoundNode("snowmobile", "src/snowmobile.mp3")
createSoundNode("fire", "src/fire.mp3")
createSoundNode("eerie SFX", "src/eerieSFX.mp3")
createSoundNode("scary Ambient 1", "src/scaryAmbient1.mp3")
createSoundNode("scary Ambient 2", "src/scaryAmbient2.mp3")

// HOWLER.JS