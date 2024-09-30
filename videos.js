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
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.textContent = '🌜'; // Moon icon for dark mode
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.textContent = isDark ? '🌜' : '🌞';
});

// YouTube video functionality (same as your original code)
let player;
let currentVideoIndex = 0;
const videoIDs = Object.keys(videos);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: videoIDs[currentVideoIndex],
    });
}

function playVideo(videoId) {
    player.loadVideoById(videoId);
    updateDescription(videoId);
}

function updateDescription(videoId) {
    document.getElementById('poemDescription').textContent = videos[videoId].description;
}

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
    item.addEventListener('click', function () {
        const videoId = this.getAttribute('data-videoid');
        playVideo(videoId);
    });
});