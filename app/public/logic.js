$(function () {

    $('.submit').on('click', (event) => {
        event.preventDefault();

        const validateForms = () => {

            let checkValidation = true;

            $('.validate').each(function () {
                if (!$(this).val()) {
                    checkValidation = false;
                }
            });

            $('.browser-default').each(function () {
                if (!$(this).val()) {
                    checkValidation = false;
                }
            });

            return checkValidation;
        }

        if (validateForms()) {
            // object for the new user aka friend
            let newUser = {
                name: $('#name').val().trim(),
                photo: $('#imgLink').val().trim(),
            };

            let scoresArray = [];
            // loop through the questions to get the score of each
            $('.browser-default').each(function () {
                // push the answers in scores array
                scoresArray.push($(this).val());
            }).promise().done(() => {

                // make a new key: value in the newUser object 
                newUser.scores = scoresArray;

                console.log(newUser.scores);

            })

            let currentURL = window.location.origin;
            console.log(currentURL);

            $.post(`${currentURL}/api/friends`, newUser, (data) => {
                if (data) {
                    console.log(data)
                    // $('.friendName').text(data.name);
                    // $('.friendImg').attr('src', data.photo);
                    $('.modal-content').empty();
                    $('#name').val('');
                    $('#imgLink').val('');
                    $('.browser-default').each(function () {
                        $(this).val('');
                    });

                    data.forEach(element => {
                        console.log(element)
                        $('.friendName').text(element.name);
                        $('.friendImg').attr('src', element.photo);
                    });

                    if (data.length > 1) {
                        $('.title').text('Your Best matches!');
                    } else {
                        $('.title').text('You best match!');
                    };

                    $('.modal').modal();

                }
            });



        } else {
            console.log('Fill out that form')
        }


    });


    $('select').formSelect();
});