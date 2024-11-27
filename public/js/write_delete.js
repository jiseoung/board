const write_delete_btn = document.getElementById('write_delete_btn');
const write_delete_url = "/board/delete";

write_delete_btn.addEventListener('click', () => {
    if(confirm("Are you sure you want to delete your write?")) {
        fetch(write_delete_url, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                page: page,
            })
        })
        .then(response => {
            if (!response.ok) {
                console.log(response.status);
            }
            alert('delete complete');
            location.href = "/board/";
        })
        .catch(e => {
            console.error("withdraw_user fetch error : " + e);
        });
    }
})