const comment_delete_btn = document.querySelectorAll('.comment_delete_btn');
const comment_delete_url = "/board/show/comment"

comment_delete_btn.forEach((btn) => {
    const com_index = btn.getAttribute('value');

    btn.addEventListener('click', () => {
        if(confirm("Are you sure you want to delete this comment?")) {
            fetch(comment_delete_url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    com_index: com_index
                })
            })
            .then(async (response) => {
                if (response.ok) {
                    alert('Delete completed!');
                    location.href = "/board/show?page=" + page;
                } else {
                    alert('Fail');
                    location.href = "/board/show?page=" + page;
                }
            })
            .catch(e => {
                console.log('Comment delete error: ' + e);
                alert('error');
            });
        }
    })
})
