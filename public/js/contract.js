

const markdownText = sessionStorage.getItem('draftedClause');

window.addEventListener('DOMContentLoaded', (event) => {

    const md = window.markdownit();

    const htmlContent = md.render(markdownText);

    document.getElementById('markdownContent').innerHTML = htmlContent;
});

        function convertToPDF() {
            fetch('http://bion.ddnsgeek.com:3000/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ markdown: markdownText })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'contract.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch(error => console.error('Error:', error));
        }

        window.onload = step2;

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

