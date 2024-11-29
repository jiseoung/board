const report_btn = document.getElementById('report_btn');
//url query 가져오는 것은 이미 다른 js파일에 정의되어서 다시 정의할 필요 없음
const report_url = "/board/show/report";

report_btn.addEventListener('click', () => {
    if(confirm("Would you like to report this post?")) {
        fetch(report_url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                page: page
            })
        })
        .then(response => {
            if (!response.ok) {
                console.log(response.status);
            }
            alert('report completed');
        })
        .catch(e => {
            console.log('report error : ' + e);
        })
    }
})