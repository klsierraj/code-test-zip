document.querySelector('#form').addEventListener('submit', fetchLocations);

function fetchLocations (e) {
    const zip = document.querySelector('.zip-input').value;

    fetch(`http://api.zippopotam.us/us/${zip}`)
    .then(response => {
        if(response.status !=200) {
            document.querySelector('#results').innerHTML = `
            <div class="message-error">
            <p>Invalid Zipcode, please try again</p>
            </div>
            `;
            throw Error(response.statusText);
        }else {
            return response.json();
        }
    })
    .then(data => {
       console.log(data)
       let results = "";
       data.places.forEach(place => {
        results += `
        <div class="card-details">
        <h2> Details  </h2>
        <div class="card-container">


        <div class="card-item">
        <h4>City</h4>
        <p>${place["place name"]}</p> </div>

        <div class="card-item">
        <h4>State</h4>
        <p>${place["state"]}</p> </div>      
        
        <div class="card-item">
        <h4>State abbreviation</h4>
        <p>${place["state abbreviation"]}</p> </div> 

        <div class="card-item">
        <h4>Longitude</h4>
        <p>${place["longitude"]}</p> </div>    

        <div class="card-item">
        <h4>Latitude</h4>
        <p>${place["latitude"]}</p> </div>   
        
        </div>



        </div>
        `
       })

       document.querySelector("#results").innerHTML= results;
    })
    .catch(err => console.log(err));

    e.preventDefault();

}