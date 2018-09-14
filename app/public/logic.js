$(function () {

    $('.submit').on('click', () => {
        event.preventDefault();
        // object for the new user aka friend
        let newUser = {
            name: $('.name').val(),
            image: $('.imglink').val(),
            scores: []
        };

        let scoresArray = [];
        // loop through the questions to get the score of each
        $('.browser-default').each(function () {
            // push the answers in scores array
            scoresArray.push(parseInt($(this).val()))
        }).promise().done(() => {
            // scores array because newUser.scores
            newUser.scores = scoresArray;
            console.log(scoresArray)

            let currentURL = window.location.origin;

            $.post(`${currentURL}/api/friends`, newUser, (data) => {
                // stuff here mannn
            });
        })
    });



    $('select').formSelect();
});