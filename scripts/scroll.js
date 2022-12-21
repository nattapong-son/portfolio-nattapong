document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.getElementById('marqueeWrapper');
  const track = document.getElementById('marqueeTrack');
  
  // Duplicate the track for a perfect seamless effect
  const clone = track.cloneNode(true);
  wrapper.appendChild(clone);

  let trackWidth = track.offsetWidth;
  let pos = 0;
  let speed = 0.2;
  let targetSpeed = 0.2;
  const normalSpeed = 0.2;

  function animate() {
    speed += (targetSpeed - speed) * 0.08;
    pos -= speed;

    // Reset when the first full track has scrolled out of view
    if (Math.abs(pos) >= trackWidth) {
      pos += trackWidth; // This is the trick: add trackWidth instead of set pos = 0
    }
    wrapper.style.transform = `translate3d(${pos}px, 0, 0)`;
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    // Recalc on resize for perfect loop
    trackWidth = track.offsetWidth;
  });

  wrapper.addEventListener('mouseenter', () => { targetSpeed = 0; });
  wrapper.addEventListener('mouseleave', () => { targetSpeed = normalSpeed; });
});
