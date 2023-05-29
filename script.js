/* Submit form event listener */
let form = document.querySelector('#form')
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    userDetails(email);
    emailInput.value = '';
    let htmlOutput = '';
});
/*  */

function userDetails(email) {
    const userData = {
        user_mail_id: email
    };
    fetch('https://zincubate.in/api/MovieTicketChecker?action=getAllDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(data => {
            const secBody = document.querySelector('.section__body');
            secBody.innerHTML = '';

            if (data.length === 0) {
                secBody.textContent = 'No details found for the email.';
            } else {
                data.theatre.forEach(theatre => {
                    
                    let htmlOutput = `<div class="card">
                    <img src="${theatre.thumbnail_url}">
                    <div class="card__content">
                        <h2>${theatre.theatre_name}</h2>
                        <div class="card__content--hide">
                            <p>User rating : ${theatre.customer_rating}</p>
                            <a href="javascript:void(0)" class="card__open">View Shows</a>
                        </div>
                        <div class="card__content--colwrap">
                                <div class="card__content--colbox">
                                    <h3>${theatre.show1_movie}</h3>
                                    <p>${theatre.show1_time}</>
                                </div>
                                <div class="card__content--colbox">
                                    <h3>${theatre.show2_movie}</h3>
                                    <p>${theatre.show2_time}</>
                                </div>
                                <div class="card__content--colbox">
                                    <h3>${theatre.show3_movie}</h3>
                                    <p>${theatre.show3_time}</>
                                </div>
                                <div class="card__content--colbox">
                                    <h3>${theatre.show4_movie}</h3>
                                    <p>${theatre.show4_time}</>
                                </div>
                            </div>
                    </div>
                    <a href="javascript:void(0)" class="card__close">X</a>
                </div>`
                    secBody.insertAdjacentHTML("beforeend", htmlOutput);
                });
                cardTrigger();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function cardTrigger() {
    let card = document.querySelectorAll('.card');
    card.forEach((input) => {
        input.querySelector('.card__open').addEventListener('click', () => {
            card.forEach((input) => {
                input.classList.remove('active');
            });
            input.classList.add('active');
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        })
        input.querySelector('.card__close').addEventListener('click', () => {
            card.forEach((input) => {
                input.classList.remove('active');
            });
        })
    })
}