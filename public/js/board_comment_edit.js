const comment_edit_btn = document.querySelectorAll('.comment_edit_btn');

comment_edit_btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const comment_content = btn.parentElement.previousElementSibling.querySelector('.comment_content');
        const comment_edit_form = btn.parentElement.previousElementSibling.querySelector('.comment_edit_form');

        comment_content.classList.toggle('comment_edit_toggle');
        comment_edit_form.classList.toggle('comment_edit_toggle');
    })
})