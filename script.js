const pickUpRooms = new Set();
const deliveryRooms = new Set();

// List of non-existing rooms based on your rules
const nonExistingRooms = [
    // First floor
    '101', '102', '103', '104', '105', '106', '113', '123', '124', '180',
    // Second to fourth floors (missing room 13)
    '213', '313', '413',
    // Fifth floor (missing 13, 17-20, and 558)
    '513', '517', '518', '519', '520', '558',
    // Sixth floor (missing 13, 17-20)
    '613', '617', '618', '619', '620',
    // Seventh floor (missing 13, 17-20)
    '713', '717', '718', '719', '720',
    // Eighth floor (missing 13, 17-20)
    '813', '817', '818', '819', '820',
    // Ninth floor (missing 13, 17-20)
    '913', '917', '918', '919', '920'
];

// Helper function to check if the room exists
function roomExists(roomNumber) {
    // Ensure the room number is between 01 and 80
    const roomOnFloor = parseInt(roomNumber) % 100; // Extract the room number (last two digits)

    if (roomOnFloor > 80 || roomOnFloor < 1) {
        return false; // Room numbers must be between 01 and 80 on any floor
    }

    return !nonExistingRooms.includes(roomNumber); // Check if the room is in the non-existing list
}

function handlePickUp() {
    const roomNumber = document.getElementById('roomNumber').value.trim();
    
    if (!roomExists(roomNumber)) {
        alert(`Room number ${roomNumber} doesn't exist.`);
        return;
    }

    if (roomNumber && !pickUpRooms.has(roomNumber)) {
        pickUpRooms.add(roomNumber);
        const li = document.createElement('li');
        li.textContent = roomNumber;
        li.onclick = () => confirmPickUp(roomNumber, li);
        document.getElementById('pickUpList').appendChild(li);
        document.getElementById('roomNumber').value = ''; // Clear input
    } else {
        alert('Pick up order for this room already exists.');
    }
}

function handleDelivery() {
    const roomNumber = document.getElementById('roomNumber').value.trim();
    
    if (!roomExists(roomNumber)) {
        alert(`Room number ${roomNumber} doesn't exist.`);
        return;
    }

    if (roomNumber && !deliveryRooms.has(roomNumber)) {
        deliveryRooms.add(roomNumber);
        const li = document.createElement('li');
        li.textContent = roomNumber;
        li.onclick = () => confirmDelivery(roomNumber, li);
        document.getElementById('deliveryList').appendChild(li);
        document.getElementById('roomNumber').value = ''; // Clear input
    } else {
        alert('Delivery order for this room already exists.');
    }
}

function confirmPickUp(roomNumber, listItem) {
    const confirmation = confirm(`Have you picked up the order for room ${roomNumber}?`);
    if (confirmation) {
        pickUpRooms.delete(roomNumber);
        listItem.remove();
    }
}

function confirmDelivery(roomNumber, listItem) {
    const confirmation = confirm(`Have you delivered the order for room ${roomNumber}?`);
    if (confirmation) {
        deliveryRooms.delete(roomNumber);
        listItem.remove();
    }
}