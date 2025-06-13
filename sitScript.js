document.addEventListener('DOMContentLoaded', function () {
    const bookButtons = document.querySelectorAll('.btn');
  
    bookButtons.forEach(button => {
      button.addEventListener('click', function () {
        const name = this.closest('.Lewis').querySelector('h1')?.textContent;
        alert(`You have booked ${name}!`);
      });
    });
  });
  