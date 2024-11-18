const withdraw_user_btn = document.getElementById('withdraw_user');
url = "/user/info/withdraw_user";

withdraw_user_btn.addEventListener('click', () => {
    if(confirm("Are you sure you want to delete your account?")) {
        fetch(url, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                answer: true,
            })
        })
        .then(response => {
            if (response) {
                location.href="/";
            }
        })
        .catch(e => {
            console.error("withdraw_user fetch error : " + e);
        });
    }
})