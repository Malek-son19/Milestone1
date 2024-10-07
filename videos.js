// Define the YouTube video IDs and descriptions
const videos = {
    'NAmc74KK7JI': {
        title: 'يسلم المرءَ أخوه',
        description: 'قصيدة تتحدث عن الأخوة وقيمتها في العلاقات الإنسانية.'
    },
    'zuJxjPK2TgU': {
        title: 'القصيـدة الرباعيـة في الوعـظ والسنـة',
        description: 'قصيدة تتناول موضوعات الوعظ والتوجيه الديني وفق السنة النبوية.'
    },
    'oWzo-SsqOVY': {
        title: 'لامية ابن الوردي',
        description: 'قصيدة مشهورة لابن الوردي تتناول مواضيع الأخلاق والمواعظ.'
    },
    '_qXLo4wTk9E': {
        title: 'نظم مثلث قطرب للبهنسي',
        description: 'نظم شعري يتناول مثلثات قطرب، وهو نوع من الأشعار التعليمية.'
    },
    '9XscxBi-M40': {
        title: 'ما للمنية أدعوها وتبتعد',
        description: 'قصيدة تعبر عن التأمل في الموت والمنية وكيف تبتعد عن الإنسان.'
    }
};

// Theme toggle logic
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Check localStorage for theme preference
let currentTheme = localStorage.getItem('theme') || 'light';

// Apply stored theme
applyTheme(currentTheme);

// Event listener for theme toggle button
themeToggle.addEventListener('click', () => {
    currentTheme = toggleTheme(currentTheme);
    localStorage.setItem('theme', currentTheme); // Save theme preference
});

// YouTube player setup
let player;
let currentVideoIndex = 0;
const videoIDs = Object.keys(videos);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: videoIDs[currentVideoIndex],
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    console.log("Player is ready.");
}

function onPlayerError(event) {
    console.error("Error occurred while loading the video:", event);
}

function toggleTheme(currentTheme) {
    const body = document.body;
    const themes = ['light', 'dark', 'blueberry', 'earth'];
    const icons = ['🌞', '🌜', '🫐', '🍃'];
    let index = themes.indexOf(currentTheme);
    index = (index + 1) % themes.length;
    
    themes.forEach(theme => body.classList.remove(theme + '-theme'));
    body.classList.add(themes[index] + '-theme');
    themeIcon.textContent = icons[index];
    return themes[index];
}

function applyTheme(theme) {
    const body = document.body;
    const themes = ['light', 'dark', 'blueberry', 'earth'];
    const icons = ['🌞', '🌜', '🫐', '🍃'];
    
    themes.forEach(t => body.classList.remove(t + '-theme'));
    body.classList.add(theme + '-theme');
    themeIcon.textContent = icons[themes.indexOf(theme)];
}

// Video control functionality
document.getElementById('videos').addEventListener('change', (event) => {
    const selectedVideoId = event.target.value;
    if (selectedVideoId) {
        playVideo(selectedVideoId);
    }
});

document.getElementById('prevButton').addEventListener('click', () => {
    if (currentVideoIndex > 0) {
        currentVideoIndex--;
        playVideo(videoIDs[currentVideoIndex]);
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    if (currentVideoIndex < videoIDs.length - 1) {
        currentVideoIndex++;
        playVideo(videoIDs[currentVideoIndex]);
    }
});

document.querySelectorAll('.video-item').forEach(item => {
    item.addEventListener('click', function() {
        const videoId = this.getAttribute('data-videoid');
        playVideo(videoId);
    });
});

function playVideo(videoId) {
    player.loadVideoById(videoId);
    updateDescription(videoId);
    currentVideoIndex = videoIDs.indexOf(videoId);
    updateButtonStates();
}

function updateDescription(videoId) {
    document.getElementById('poemDescription').textContent = videos[videoId].description;
}

function updateButtonStates() {
    document.getElementById('prevButton').disabled = currentVideoIndex === 0;
    document.getElementById('nextButton').disabled = currentVideoIndex === videoIDs.length - 1;
}

// Initial button state update
updateButtonStates(); 

