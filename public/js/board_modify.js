document.addEventListener('DOMContentLoaded', () => {
    const file = document.getElementById('file');
    const file_label = document.getElementById('file_label');

    if (file.files.length > 0) {
        file_label.textContent = file.files[0].name;
    } else {
        file_label.textContent = file_label.dataset.originalName;
    }

    file.addEventListener('change', () => {
        if (file.files.length > 0) {
            file_label.textContent = file.files[0].name;
        } else {
            file_label.textContent = file_label.dataset.originalName;
        }
    });
});