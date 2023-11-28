// document.getElementById('waterAgreementForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the form from submitting in a traditional way
    
//     const data = {
//         city: document.getElementById('city').value,
//         startDateOfContract: new Date(document.getElementById('startDateOfContract').value),
//         // ... other fields ...
//     };

//     sendToServer(data);
// });


function onSubmitForm() {
    const data = {
    	consumerName: document.getElementById('name').value,
        city: document.getElementById('city').value,
        startDateOfContract: document.getElementById('startDateOfContract').value,
        supplier: document.getElementById('city').value,
        consumerVatNumber: 12345,
        applicationDate: document.getElementById('startDateOfContract').value,
        agreementId: 12345,
        apartmentAddress: document.getElementById('address').value,
        floor: document.getElementById('floor').value,
        waterMeterNumber: 54321,
        billingCycleDays: document.getElementById('billingCycleDays').value,
        invoicePaymentDays: 5,
        supplyThreshold: document.getElementById('supplyThreshold').value,
        leakNotificationLimit: document.getElementById('leakNotificationLimit').value
    };

    fetch('http://bion.ddnsgeek.com:3000/generate-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const markdownText = data.clause;
        sessionStorage.setItem('draftedClause', markdownText);

        fetch('https://ledger1.drosatos.eu:8888/api/Contracts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'zK9QQRrWSPtmJsjYE0GziWD0xZyr7jiBkM8QX5jQeFiKPhGVJfmH7S6UYLYBhhzP'
            },
            body: JSON.stringify({
                id: '<DOC_HASH>',
                contract: markdownText
            })
        })
        .then(response => {
            if (response.status !== 200) {
                window.alert('Error occurred while writing the contract')
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            window.location.href = 'contract.html';
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error("Error generating contract:", error));
    
    return false;  	
}

window.onload = step1;

    /* START progress bar */
function step(number, state) {
    const step_element = document.getElementById('step'+number) ? document.getElementById('step'+number) : document.createElement("div");
    const step_line = document.getElementById('line'+number) ? document.getElementById('line'+number) : document.createElement("div");
    
    step_element.innerHTML = '<span>'+number+'</span>';
    step_element.className = '';
    step_line.className = '';

    if (state == 'current') {
        step_element.classList.add('steps_current');
        step_line.classList.add('line_empty');   			
    }
    else if (state == 'next') {
        step_element.classList.add('steps_next');
        step_line.classList.add('line_empty');
    }
    else {
        step_element.innerHTML = '<span><i class="fa fa-check"></i></span>';
        step_element.classList.add('steps');
        step_line.classList.add('line');			
    
    }
}

function step1() {
    step(1, 'current');
    step(2, 'next');
    step(3, 'next');
}
function step2() {
    step(1, 'previous');
    step(2, 'current');
    step(3, 'next');
}
function step3() {
    step(1, 'previous');
    step(2, 'previous');
    step(3, 'current');
}
function finish() {
    step(1, 'previous');
    step(2, 'previous');
    step(3, 'previous');	
}
