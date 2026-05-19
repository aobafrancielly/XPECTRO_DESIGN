document.addEventListener('mousemove', (e) => {
            const glow = document.getElementById('bg-glow');
            glow.style.setProperty('--mouse-x', `${e.clientX}px`);
            glow.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
