const generateStars = (containerId, count = 70) => {
    const container = document.getElementById(containerId);
    for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(star);
    }
}

export { generateStars };