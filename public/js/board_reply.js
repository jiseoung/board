const reply_btn = document.querySelectorAll('.reply_btn');

reply_btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const reply_form= btn.parentElement.nextElementSibling.querySelector('.reply_form');

        reply_form.classList.toggle('reply_toggle');
    });
});