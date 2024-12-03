// Selecting the gun element and setting up rotation
const gun = document.querySelector('.gun');

// Initial rotation angle
let angle = 0;

// Animation loop for 3D rotation
function rotateGun() {
  angle += 0.5; // Rotate incrementally
  gun.style.transform = `translate(-50%, -50%) rotateY(${angle}deg)`; // Apply rotation
  
  // Request the next frame of the animation
  requestAnimationFrame(rotateGun);
}

// Start the rotation animation
rotateGun();
// JavaScript for dynamic effects (optional)
const navLinks = document.querySelectorAll('.nav-links li a');

navLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.transform = 'scale(1.1)';
  });

  link.addEventListener('mouseout', () => {
    link.style.transform = 'scale(1)';
  });
});
