let x;
let y;
let radius = 0;
const initialColor = '#efefef';


document.querySelectorAll('.x-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.x-button').forEach(btn => {
            btn.classList.remove('active');
        });

        this.classList.add('active');
        x = this.getAttribute('value');
    });
});

document.getElementById('bottom').addEventListener('submit', function(event) {
    x = document.querySelector('.x-button.active');
    y = document.querySelector('.y-input');
    radius = document.querySelector('input[class="radius-radio"]:checked');

    if (x === null || y === null || radius === null) {
        alert('Please select values for x, y, and radius.');
        event.preventDefault();
    } else {
        x = Number(x.getAttribute('value'));
        y = Number(y.value);
        radius = Number(radius.value);

        if (isNaN(x) || isNaN(y) || y < -5 || y > 3) {
            alert('Please enter valid coordinates.');
            event.preventDefault();
        } else {
            let prevCircle = document.querySelector('#coordinatePlane circle');
            if (prevCircle) {
                prevCircle.remove();
            }

            const coords = `x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&r=${encodeURIComponent(radius)}`;
            console.log(coords)
            //createNotification("Отправка запроса с координатами: " + coords);
            //sendGetRequest(coords);

            fetch('~/public_html/httpd-root/fcgi-bin/WebLab1-1.jar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    x: x,
                    y: y,
                    r: radius,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка сети или сервера');
                    }
                    return response.text();
                })
                .then(result => {
                    console.log(result);
                    createNotification("Ответ сервера: " + result);
                    makeData(result)
                })
                .catch(error => {
                    createNotification("Ошибка: " + error.message);
                });

            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            // const point = { x: x * 40 + 200, y: -y * 40 + 200 };
            // const triangle = [originX, originY, originX - unitSegment, originY, originX, originY - 2 * unitSegment]; // Координаты треугольника
            // const ellipse = { center: { x: originX, y: originY }, radius: { a: unitSegment, b: unitSegment } }; // Эллипс с центром (200, 200) и радиусами a=100, b=100
            // const rectangle = { x: originX, y: originY, width: unitSegment, height: 2 * unitSegment }; // Прямоугольник

            // circle.setAttribute("cx", x * 40 + 200);
            // circle.setAttribute("cy", -y * 40 + 200);
            // circle.setAttribute("r", 5*radius);
            // circle.setAttribute("fill", "black");

            const probitie = new Audio("~/public_html/www/sound/probitie1.mp3");
            const neProbil = new Audio("~/public_html/www/sound/neProbil.mp3");

            // if (isPointInAnyShape(point, triangle, ellipse, rectangle)) {
            //     probitie.play();
            // } else {
            //     neProbil.play();
            // }

            // document.getElementById("coordinatePlane").appendChild(circle);
            event.preventDefault();
        }
    }
});

const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('mousemove', (event) => {
    const rect = submitButton.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    submitButton.style.background = `linear-gradient(${angle}deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1))`;
});

submitButton.addEventListener('mouseleave', () => {
    submitButton.style.background = initialColor;
});

let n = 1; // Initial attempt number

function makeData(data) {
    // Split the input data into an array
    let array = data.split(',');

    // Log data for debugging
    console.log(array[0], array[1], array[2], array[3], array[4]);

    // Update the history section with the appropriate values
    document.getElementById("Number").textContent = n;
    document.getElementById("XHistory").textContent = array[0];
    document.getElementById("YHistory").textContent = array[1];
    document.getElementById("RHistory").textContent = array[2];

    // Increment the attempt number
    n++;

    // Calculate the position for the pointer
    let pointer = document.getElementById("pointer");
    let cx = 200 + 150 * Number.parseFloat(array[0]) / Number.parseFloat(array[2]);
    let cy = 200 - 150 * Number.parseFloat(array[1]) / Number.parseFloat(array[2]);
    const probitie = new Audio("~/public_html/www/sound/probitie1.mp3");
    const neProbil = new Audio("~/public_html/www/sound/neProbil.mp3");


    if (array[3] === "true") {
        pointer.setAttribute("fill", "green");
        createNotification("Попадание");
        document.getElementById("hit").textContent = "Да";
        probitie.play();
    } else {
        pointer.setAttribute("fill", "red");
        createNotification("Мимо!");
        document.getElementById("hit").textContent = "Нет";
        neProbil.play();
    }

    let currentDate = new Date();
    document.getElementById("time").textContent = currentDate.toLocaleString();

    // Update the run time
    document.getElementById("run").textContent = array[4];

    // Set the position of the pointer on the canvas
    pointer.setAttribute('cx', cx);
    pointer.setAttribute('cy', cy);
    pointer.setAttribute('visibility', 'visible');
}


function createNotification(message) {
    let outputContainer = document.getElementById("outputContainer");
    if (outputContainer.contains(document.querySelector(".notification"))) {
        let stub = document.querySelector(".notification");
        stub.textContent = message;
        stub.classList.replace("outputStub", "errorStub");
    } else {
        let notificationTableRow = document.createElement("h4");
        notificationTableRow.innerHTML = "<span class='notification errorStub'></span>";
        outputContainer.prepend(notificationTableRow);
        let span = document.querySelector(".notification");
        span.textContent = message;
    }
}

// function isPointInQuarterEllipse(point, ellipse) {
//     const { x: h, y: k } = ellipse.center;
//     const { a, b } = ellipse.radius;
//     const { x, y } = point;
//
//     if (x < h || y < k) return false;
//
//     return ((x - h) ** 2) / (a ** 2) + ((y - k) ** 2) / (b ** 2) <= 1;
// }
//
// function isPointInRectangle(point, rectangle) {
//     const { x, y } = point;
//     const { x: rectX, y: rectY, width, height } = rectangle;
//
//     return x >= rectX && x <= rectX + width && y >= rectY && y <= rectY + height;
// }
//
// function isPointInTriangle(point, triangle) {
//     const { x, y } = point;
//     const [x1, y1, x2, y2, x3, y3] = triangle;
//
//     const area = Math.abs((x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2)) / 2);
//     const area1 = Math.abs((x*(y2 - y3) + x2*(y3 - y) + x3*(y - y2)) / 2);
//     const area2 = Math.abs((x1*(y - y3) + x*(y3 - y1) + x3*(y1 - y)) / 2);
//     const area3 = Math.abs((x1*(y2 - y) + x2*(y - y1) + x*(y1 - y2)) / 2);
//
//     return area === area1 + area2 + area3;
// }
//
// function isPointInAnyShape(point, triangle, ellipse, rectangle) {
//     return isPointInTriangle(point, triangle) ||
//         isPointInQuarterEllipse(point, ellipse) ||
//         isPointInRectangle(point, rectangle);
// }
