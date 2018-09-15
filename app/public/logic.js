$(function () {

    $('.submit').on('click', () => {
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
                image: $('#imgLink').val().trim(),
                scores: []
            };

            let scoresArray = [];
            // loop through the questions to get the score of each
            $('.browser-default').each(function () {
                // push the answers in scores array
                scoresArray.push(parseInt($(this).val()));
            }).promise().done(() => {
                // scores array becomes newUser.scores
                newUser.scores = scoresArray;

                console.log(scoresArray);

            })
            let currentURL = window.location.origin;
            console.log(currentURL);

            $.post(`${currentURL}/api/friends`, newUser, (data) => {
                if (data) {
                    console.log(data)
                    $('.friendName').text(data.name);
                    $('.friendImg').attr(src, data.image);
                    $('#name').val('');
                    $('#imgLink').val('');
                    $('.browser-default').each(function () {
                        $(this).val('');
                    })
                }
            })

        } else {
            console.log('Fill out that form')
        }
    });


    $('.modal').modal();
    $('select').formSelect();
});