document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const docValid = urlParams.get('valid');

    let checksPassed = (/true/).test(docValid);  // for example, set this to false if checks did not pass

    let iconElement = document.getElementById("resultIcon");

    let gov = document.getElementById("gov_val");

    let blockchain = document.getElementById("blockchain_val");

    if (checksPassed) {
        gov.textContent="True";
        blockchain.textContent="True";
        iconElement.classList.add("fa-check");
        iconElement.style.color = "green";
    } else {
        iconElement.classList.add("fa-times");
        iconElement.style.color = "red";
    }
});

window.onload = finish;

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
    /* END progress bar */