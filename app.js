window.addEventListener('load', () => {
    let long; //Longitude 
    let lat; //Latitude

    // Variables to let us change the description on each div on the html file
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')

    //If location exists *it needs to have location activated when pop-up
    //Gets location to use on the api
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //Proxy to let us use the api anywhere because it does not work on local
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/2aa07ed9297085dbe1a7a42f1871dd0d/${lat},${long}`;


            //Fetchs data from the API 
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data); //see data from the API in the console
                    const { temperature, summary, icon } = data.currently; //gets this data from the api

                    //Set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //Formula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Change temperature to Celsius/Farenhait
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "\u2109") {
                            temperatureSpan.textContent = "\u2103"; //Celsius degree symbol
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "\u2109"; //Fahrenheit degree symbol
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });


    } else {
        h1.textConcent = "This is not working because location it's not enabled or your navegator doesn't allow it"

    }
    // Function for Skycons to work
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        //Skycons needs to have _ in the icon information and ours has - instead. Also the texts needs to be  uppercase
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play(); //starts the animation
        return skycons.set(iconID, Skycons[currentIcon]); //return so we can run it up
    }

});