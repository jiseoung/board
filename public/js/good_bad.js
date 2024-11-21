const good_btn = document.getElementById('good_btn');
const bad_btn = document.getElementById('bad_btn');
const url_search = new URLSearchParams(location.search);
const page = url_search.get('page');
const url = '/board/show/good_bad';

good_btn.addEventListener('click', () => {
    fetch(url, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            page: page,
            click: 'good'
        })
    })
    .then(response => {
        if (!response.ok) {
            console.log(response.status);
        }
        if (good_btn.style.backgroundColor === 'skyblue') {
            good_btn.style.backgroundColor = 'white'
        }
        else {
            good_btn.style.backgroundColor = 'skyblue'
            bad_btn.style.backgroundColor = 'white'
        }
    })
    .catch(e => {
        console.log('good btn error : ' + e);
    })
})

bad_btn.addEventListener('click', () => {
    fetch(url, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            page: page,
            click: 'bad'
        })
    })
    .then((response) => {
        if (!response.ok) {
            console.log(response.status);
        }
        if (bad_btn.style.backgroundColor === 'red') {
            bad_btn.style.backgroundColor = 'white'
        }
        else {
            bad_btn.style.backgroundColor = 'red'
            good_btn.style.backgroundColor = 'white'
        }
    })
    .catch(e => {
        console.log('bad btn error : ' + e);
    })
})