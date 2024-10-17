const sideMenu = document.querySelector("aside");
const profileBtn = document.querySelector("#profile-btn");
const themeToggler = document.querySelector(".theme-toggler");
const nextDay = document.getElementById('nextDay');
const prevDay = document.getElementById('prevDay');

// Load the saved theme preference on page load
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggler.querySelector('span:nth-child(1)').classList.remove('active');
        themeToggler.querySelector('span:nth-child(2)').classList.add('active');
    }
};

profileBtn.onclick = function() {
    sideMenu.classList.toggle('active');
}

window.onscroll = () => {
    sideMenu.classList.remove('active');
    if (window.scrollY > 0) {
        document.querySelector('header').classList.add('active');
    } else {
        document.querySelector('header').classList.remove('active');
    }
}

themeToggler.onclick = function() {
    document.body.classList.toggle('dark-theme');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');

    // Save the theme preference
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

let setData = (day) => {
    document.querySelector('table tbody').innerHTML = ''; // Clear previous table data  
    let daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    document.querySelector('.timetable div h2').innerHTML = daylist[day];

    // Assuming you have a predefined array for each day
    let dayData = []; // Replace with actual data for the specific day
    switch(day){
        case 0: dayData = Sunday; break;
        case 1: dayData = Monday; break;
        case 2: dayData = Tuesday; break;
        case 3: dayData = Wednesday; break;
        case 4: dayData = Thursday; break;
        case 5: dayData = Friday; break;
        case 6: dayData = Saturday; break;
    }

    dayData.forEach(sub => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${sub.time}</td>
            <td>${sub.roomNumber}</td>
            <td>${sub.subject}</td>
            <td>${sub.type}</td>
        `;
        document.querySelector('table tbody').appendChild(tr);                        
    });
}

let now = new Date();
let today = now.getDay(); // Get the current day
let day = today; // Store the current day

function timeTableAll() {
    document.getElementById('timetable').classList.toggle('active');
    setData(today);
    document.querySelector('.timetable div h2').innerHTML = "Today's Timetable";
}

nextDay.onclick = function() {
    day <= 5 ? day++ : day = 0; 
    setData(day);
}

prevDay.onclick = function() {
    day >= 1 ? day-- : day = 6;    
    setData(day);
}

setData(day); // Set the data in the table on window load
document.querySelector('.timetable div h2').innerHTML = "Today's Timetable"; // Prevent overwriting the heading on load
