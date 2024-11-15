function file_download() {
    const file_name = document.getElementById('file_name').innerText;
    const url = "/board/show/download";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            file_name: file_name,
        })
    })
    .then(response => {
        if (!response.ok) throw new Error("File download failed");
        return response.blob();  
    })
    .then(blob => {
        const download_url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = download_url;
        a.download = file_name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(download_url); 
    })
    .catch(e => {
        console.error("file_download error:" + e);
    });
}
