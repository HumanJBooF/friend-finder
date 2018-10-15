$(function () {

    const $div = $(`<div class="friends">`);
    const $div2 = $(`<div class="friendImages">`);
    const $title = $(`<h3 class="title">`);

    $('.submit').on('click', () => {
        event.preventDefault();

        const validateForms = () => {

            let checkValidation = true;

            $('.validate').each(function () {
                if (!$(this).val()) checkValidation = false;
            });

            $('.browser-default').each(function () {
                if (!$(this).val()) checkValidation = false;
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
            // console.log(currentURL);

            $.post(`${currentURL}/api/friends`, newUser, (data) => {
                if (data) {
                    console.log(`this is the data: ${data}`)
                    $('.modal-content').empty();
                    $('#name').val('');
                    $('#imgLink').val('');
                    $('.browser-default').each(function () {
                        $(this).val('');
                    });

                    data.forEach(element => {
                        // console.log(element)
                        let name = element.name;
                        let url = element.photo;
                        let header = $(`<h4>`).text(name);
                        let photo = $(`<img class="circle" width="250px">`).attr('src', url);
                        $div.append(header);
                        $div2.append(photo);
                        // console.log($div, $div2, 'IS IT WORKING');
                        $('.modal-content').append($div2, $div);

                    });

                    if (data.length > 1) {
                        $title.text('Your best matches');
                        $('.modal-content').prepend($title);
                    } else {
                        $title.text('Your best match!');
                        $('.modal-content').prepend($title);
                    };


                }
            });



        } else {
            $('.modal-content').empty();
            let $err = $(`<h4>You need to fill out the whole form!</h4>`);
            let $errDiv = $(`<div class="modal-error">`).append($err);
            $('.modal-content').append($errDiv);
            let error = $(`<h3 class="error red-text text-accent-4">ERROR!</h3>`);
            $('.modal-content').prepend(error);
            console.log('Fill out that form');
        }

    });


    $('.modal').modal();
    $('select').formSelect();
});