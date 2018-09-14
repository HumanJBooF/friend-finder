$(function () {

    $('.submit').on('click', () => {
        event.preventDefault();

        let newUser = {
            name: $('.name').val(),
            image: $('.imglink').val(),
            scores: []
        };

        let scoresArray = [];
        $('.browser-default').each(function () {
            scoresArray.push(parseInt($(this).val()))
        }).promise().done(() => {
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