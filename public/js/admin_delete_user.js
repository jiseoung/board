const delete_user_btn = document.getElementById('delete_user');
const delete_username = delete_user_btn.getAttribute('value');
const delete_user_url = "/admin/manage_users/delete";

delete_user_btn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete this account?")) {
        fetch(delete_user_url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username : delete_username
            })
        })
        .then(response => {
            if (!response.ok) {
                console.log(response.status);
            }
            alert('delete completed');
            location.href = "/admin/manage_users";
        })
        .catch(e => {
            console.log('good btn error : ' + e);
        })
    }
})