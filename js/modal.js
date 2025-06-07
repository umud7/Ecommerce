document.addEventListener('DOMContentLoaded', function() {
            // Modal elementlərini əldə edirik
            const modal = document.getElementById('modal');
            const modalContentArea = document.getElementById('modal-content-area');
            const closeBtn = document.querySelector('.close-btn');
            
            // Bütün "Ətraflı" butonlarını seçirik
            const detailButtons = document.querySelectorAll('.details-btn');
            
            // "Ətraflı" butonlarına klik hadisəsi əlavə edirik
            detailButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const projectId = this.getAttribute('data-project');
                    const projectContent = document.getElementById(projectId).innerHTML;
                    
                    // Modal pəncərəyə məzmunu əlavə edirik
                    modalContentArea.innerHTML = projectContent;
                    
                    // Modal pəncərəni göstəririk
                    modal.style.display = 'block';
                    
                    // Səhifənin scroll olmasını dayandırırıq
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Modal pəncərəni bağlamaq üçün "X" butonuna klik hadisəsi
            closeBtn.addEventListener('click', closeModal);
            
            // Modal pəncərənin xaricində klik etdikdə bağlanması
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });
            
            // ESC düyməsinə basdıqda modal pəncərəni bağlamaq
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    closeModal();
                }
            });
            
            // Modal pəncərəni bağlamaq funksiyası
            function closeModal() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });




         const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const stars = [];
  const starCount = 150;

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.2
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function updateStars() {
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.y += s.speed;
      if (s.y > height) {
        s.y = 0;
        s.x = Math.random() * width;
      }
    }
  }

  function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });