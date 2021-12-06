// import * as data from "./data.json"
// python  -m http.server




let result = fetch('../data.json')
    .then(res => res.json())
    .then(response => {
        let data = [];
        let property = {};
        for(let obj of response) {
            for(let prop in obj) {
                property[prop] = (obj[prop])
            }
            data.push(property);
            property = {};
        }
        
        for(let i = 0; i < data.length; i++) {
            let person = document.createElement('div');
            person.innerHTML = "<div class='datalist-person'><div class='avatar'></div><div class='personName'>" + data[i].name + "</div>";
            document.body.querySelector(".datalist").insertAdjacentHTML('afterbegin', person.innerHTML);
            document.querySelector(".datalist-person").setAttribute('id', i);
        }

        let persons = document.querySelector(".datalist");
        persons.addEventListener('click', doSmth, false);

        function doSmth(e) {
            if(e.target !== e.currentTarget) {
                let target = e.target;
                console.log(e.target);
                if(e.target.id == '') {
                    target = e.target.parentNode;
                }
                let clickedItem = Number(target.id) + 1;

                let personalPage = document.createElement('div');
                personalPage.innerHTML = "<div class='personalPage'></div>";
                document.body.querySelector(".container").insertAdjacentHTML('beforeend', personalPage.innerHTML);
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == clickedItem) {
                        document.querySelector(".datalist").setAttribute('style', 'display: none');
                        let personalCard = document.createElement('div');
                        personalCard.classList.add(".personalCard");
                        personalCard.innerHTML = "<div class='personalCard-person  active'><div id='close'></div><div class='avatar'></div><div class='personName'>" + data[i].name + "</div>";
                        document.body.querySelector(".personalPage").insertAdjacentHTML('afterbegin', personalCard.innerHTML);
                        document.body.querySelector(".personalPage").insertAdjacentHTML('beforeend', "<div class='popular'>В друзьях</div>");
                        let friends = data[i].friends;
                        for(let i = 0; i < data.length; i++) {
                            if(friends.indexOf(data[i].id) != -1) {
                                let friendCard = document.createElement('div');
                                friendCard.classList.add(".personalCard");
                                friendCard.innerHTML = "<div class='personalCard-person'><div class='icon'></div><div class='personName'>" + data[i].name + "</div>";
                                document.body.querySelector(".personalPage").insertAdjacentHTML('beforeend', friendCard.innerHTML);
                            }
                        }
                        document.body.querySelector(".personalPage").insertAdjacentHTML('beforeend', "<div class='popular'>Не в друзьях</div>");
                        let counter = 0;
                        for(let i = 0; i < data.length; i++) {
                            if(friends.indexOf(data[i].id) == -1 && counter < 3) {
                                counter++;
                                let friendCard = document.createElement('div');
                                friendCard.classList.add(".personalCard");
                                friendCard.innerHTML = "<div class='personalCard-person'><div class='icon'></div><div class='personName'>" + data[i].name + "</div>";
                                document.body.querySelector(".personalPage").insertAdjacentHTML('beforeend', friendCard.innerHTML);
                            }
                        }
                        document.body.querySelector(".personalPage").insertAdjacentHTML('beforeend', "<div class='popular'>Популярные</div>");
                        let pop = popular(data);
                        for(let i = 0; i < pop.length; i++) {
                            let popularCard = document.createElement('div');
                            popularCard.classList.add(".personalCard");
                            popularCard.innerHTML = "<div class='personalCard-person'><div class='icon'></div><div class='personName'>" + data[i].name + "</div>";
                            document.body.querySelector(".personalPage").insertAdjacentHTML('beforeend', popularCard.innerHTML);
                        }
                        document.querySelector("#close").addEventListener('click', function() {
                            document.querySelector('.container').removeChild(document.querySelector(".personalPage"));
                            document.querySelector(".datalist").setAttribute('style', 'display: flex');
                        });
                        break;
                    } 
                } 
            }
        }
    })

function popular(data) {
    let popularity = {};
    for(let i = 1; i < data.length + 1; i++) {
        popularity[i] = 0;
        for(let j = 0; j < data.length; j++) {
            if (data[j].friends.indexOf(i) !== -1) {
                popularity[i] += 1;
            }
        }
        if(data[i-1].id == i) {
            data[i-1].popularity = popularity[i];
        }
    }
    let topPopular = data.sort(function(a,b) {
        return a.popularity - b.popularity;
    }).reverse().slice(0, 3);
    return topPopular;

}