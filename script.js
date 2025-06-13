document.addEventListener('DOMContentLoaded', function() {
  function toggleMenu() {
    const navLinks = document.getElementsByClassName("nav-links");
    navLinks.classList.toggle("active");
  }


    //highlight active navbar link
  const navlinks = document.querySelectorAll('.navbar a');
  const currentPage = window.location.pathname.split("/").pop(); // e.g., "about.html"

  navlinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  // Parent text animation
    const words = ['Parents', 'Moms', 'Dads', 'Guardians'];
    const parentText = document.getElementById('parents-text');
    if (!parentText) return;

    let currentIndex = 0;
    setInterval(() => {
        parentText.style.opacity = 0;
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % words.length;
            parentText.textContent = words[currentIndex];
            parentText.style.opacity = 1;
        }, 500);
    }, 3000);

    //sitter box click redirect
    box.addEventListener('click', () => {
        window.location.href = 'sitters.html';
    });
});

    //Sitter filter buttons
    document.querySelector('.filter-buttons').addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const location = e.target.dataset.location;
            document.querySelectorAll('.sitter').forEach(sitter => {
                sitter.style.display = (location === 'all' || sitter.dataset.location === location) ? 'block' : 'none';
            });
        }
    });

    //smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
        
   //email subscription form 
    document.querySelector('form[action="subscribe"]')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        alert(email.includes('@') ? `Thanks for subscribing with ${email}!` : 'Please enter a valid email');
        e.target.reset();
    });
