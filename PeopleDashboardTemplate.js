
async function getPeople() {
	try {
		const response = await fetch("https://randomuser.me/api/?results=25&nat=us");
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
        }
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Could not get names: ${error}`);
	}
}

async function buildTable() {
	try {
		const data = await getPeople();
		const peopleArray = data?.results || [];

		for(let i = 0; i < peopleArray.length; i++) {
			const person = peopleArray[i];
			const fullName = `${person.name.title} ${person.name.first} ${person.name.last}`;
			const address = `${person.location.street.number} ${person.location.street.name}`;
			const city = `${person.location.city}`;
			const state = `${person.location.state}`;
			const zipcode = `${person.location.postcode}`;
			const latitude = `${person.location.coordinates.latitude}`;
			const longitude = `${person.location.coordinates.longitude}`;
			const phone = `${person.phone}`;
			const newRow = `<tr id="${i}"><td>${fullName}</td><td>${address}</td><td>${city}</td><td>${state}</td><td>${zipcode}</td><td>${latitude}</td><td>${longitude}</td></tr>`;
			$('#people').append(newRow);
			
			const rowEl = document.getElementById(i.toString());
			rowEl.addEventListener('mouseover', function() {
				this.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
				this.title = phone;
			});
			rowEl.addEventListener('mouseout', function() {
				this.style.backgroundColor = '';
			});
			
		}
		console.log(peopleArray);
	} catch (e) {
		console.log("Error " + e);
	}
}

buildTable();




