document.addEventListener("DOMContentLoaded", () => {
  const navHTML = `
    <div id="backdrop" class="backdrop"></div> <!-- Added display: block; to make it open by default -->
    <nav class="animated-content closed" id="main-nav"> <!-- Removed animated-content closed class to make it open by default -->
      <div class="nav-container">
        <ul class="nav-links">
      <!--    <div class="logo">SKR</div>-->
          <li><a href="/home"><i class="fas fa-house cuhs"></i><span>Home</span></a></li>
          <li><a href="/games"><i class="fas fa-gamepad cuhs"></i><span>Games</span></a></li>
          <li><a href="/apps"><i class="fas fa-mobile-alt cuhs"></i><span>Apps</span></a></li>
          <li><a href="/animes"><i class="fas fa-tv cuhs"></i><span>Anime</span></a></li>
          <li><a href="/settings"><i class="fas fa-gear cuhs"></i><span>Settings</span></a></li>
          <li><a href="/song"><i class="fas fa-music cuhs"></i><span>Songs</span></a></li>
        </ul>
      </div>
    </nav>
    <button id="nav-toggle"><i class="fas fa-bars"></i></button> <!-- Changed icon to times instead of bars to make it open by default -->
  `;

  document.body.insertAdjacentHTML("afterbegin", navHTML);

  const nav = document.getElementById("main-nav");
  const btn = document.getElementById("nav-toggle");
  const backdrop = document.getElementById("backdrop");
  setTimeout(() => {
    nav.classList.add("show");
  }, 1255);
  btn.addEventListener("click", () => {
    nav.classList.toggle("closed");
    if (nav.classList.contains("closed")) {
      backdrop.style.display = 'none';
      btn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      backdrop.style.display = 'block';
      btn.innerHTML = '<i class="fas fa-times"></i>';
    }
  });

  // Add styles for backdrop
  const style = document.createElement('style');
  style.textContent = `
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none; /* Best */
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
      transition: all 0.3s ease;
    }
  `;
  document.head.appendChild(style);
});
