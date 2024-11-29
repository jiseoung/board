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
            .then(response => {
                if (!response.ok) {
                    console.log(response.status);
                }
                alert('delete completed');
                location.href="/board/show?page=" + page;
            })
            .catch(e => {
                console.log('comment delete error : ' + e);
            })
        }
    })
})
