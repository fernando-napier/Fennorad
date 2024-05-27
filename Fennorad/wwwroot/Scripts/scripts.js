window.getDimensions = function () {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
};

window.clipboardCopy = {
    copyText: function (text) {
        navigator.clipboard.writeText(text)
            .catch(function (error) {
                alert(error);
            });
    }
};

function scrollWindowToBottom() {
    var height = document.body.scrollHeight;
    window.scrollTo(0, height);
}

function scrollToBottomOfDiv() {
    var objDiv = document.getElementById("claude_messages");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(res, rej, options);
    });
}

async function getGpsLocation() {
    var position = await getPosition();  // wait for getPosition to complete
    return {
        lat: position.coords.latitude,
        long: position.coords.longitude
    }
}

function resetSelect() {
    document.getElementById('downloadOptions').selectedIndex = 0;
}

function resetSelectUrl() {
    document.getElementById('downloadOptionsUrl').selectedIndex = 0;
}

const IS_YOUTUBE = window.location.hostname.search(/(?:^|.+\.)youtube\.com/) > -1 ||
    window.location.hostname.search(/(?:^|.+\.)youtube-nocookie\.com/) > -1;
const IS_MOBILE_YOUTUBE = window.location.hostname == 'm.youtube.com';
const IS_DESKTOP_YOUTUBE = IS_YOUTUBE && !IS_MOBILE_YOUTUBE;
const IS_VIMEO = window.location.hostname.search(/(?:^|.+\.)vimeo\.com/) > -1;

const IS_ANDROID = window.navigator.userAgent.indexOf('Android') > -1;

// Page Visibility API
if (IS_ANDROID || !IS_DESKTOP_YOUTUBE) {
    Object.defineProperties(document.wrappedJSObject,
        { 'hidden': { value: false }, 'visibilityState': { value: 'visible' } });
}

window.addEventListener(
    'visibilitychange', evt => evt.stopImmediatePropagation(), true);

// Fullscreen API
if (IS_VIMEO) {
    window.addEventListener(
        'fullscreenchange', evt => evt.stopImmediatePropagation(), true);
}

// User activity tracking
if (IS_YOUTUBE) {
    loop(pressKey, 60 * 1000, 10 * 1000); // every minute +/- 5 seconds
}

function pressKey() {
    const keyCodes = [18];
    let key = keyCodes[getRandomInt(0, keyCodes.length)];
    sendKeyEvent("keydown", key);
    sendKeyEvent("keyup", key);
}

function sendKeyEvent(aEvent, aKey) {
    document.dispatchEvent(new KeyboardEvent(aEvent, {
        bubbles: true,
        cancelable: true,
        keyCode: aKey,
        which: aKey,
    }));
}

function loop(aCallback, aDelay, aJitter) {
    let jitter = getRandomInt(-aJitter / 2, aJitter / 2);
    let delay = Math.max(aDelay + jitter, 0);

    window.setTimeout(() => {
        aCallback();
        loop(aCallback, aDelay, aJitter);
    }, delay);
}

function getRandomInt(aMin, aMax) {
    let min = Math.ceil(aMin);
    let max = Math.floor(aMax);
    return Math.floor(Math.random() * (max - min)) + min;
}