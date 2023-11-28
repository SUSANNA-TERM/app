let docHash;

function validate(hash) {
    return fetch('http://bion.ddnsgeek.com:3000/validateSignature/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "document-id": hash,
            "document_pdf_retrieval": "content-uri",
            "context": "govgr"
        })
    })
    .then(response => response.status === 200)
    .catch(error => {
        console.error('Error:', error)
        return false;
    });
}

async function navigate() {
    if (docHash) {
        location.href = 'check.html?valid=' + encodeURIComponent(await validate(docHash))
    } else {
        location.href = 'check.html?valid=' + encodeURIComponent(false)
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('formFile').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async function (e) {
                const arrayBuffer = e.target.result;

                // Loading the PDF
                const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
                const pdf = await loadingTask.promise;

                // Fetching the first page (all pages have the document's hash)
                const page = await pdf.getPage(1);

                // Extracting the document's code from the text
                const textContent = await page.getTextContent();
                const index = textContent.items.findIndex(item => item.str === 'Κωδικός εγγράφου');

                if (index === -1) {
                    docHash = '';
                } else {
                    docHash = textContent.items[index + 1]['str'].substring(2)
                }
            };

            reader.readAsArrayBuffer(file);
        }
    });

    document.getElementById('inputText').addEventListener('change', function (event) {
        docHash = event.target.value;
    });
});
