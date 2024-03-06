var inp = document.getElementById("input");
    var pickupColumn = document.getElementById("pickupColumn");
    var deliveryColumn = document.getElementById("deliveryColumn");

    function isValidRoomNumber(number) {
        // Check if the room number is within the valid range
        return number >= 101 && number <= 980
            && number !== 180
            && number !== 173
            && number !== 172
            
            
            && (number % 100) !== 0
            && (number % 100) !== 13
            && (number % 100) <= 80;
    }

    function show(columnId) {
        var column = document.getElementById(columnId);
        var inputValue = parseInt(inp.value);

        if (!isNaN(inputValue) && isValidRoomNumber(inputValue)) {
            // Check if the room number is already in the column
            var existingItems = column.getElementsByClassName("pending-item");
            for (var i = 0; i < existingItems.length; i++) {
                var existingValue = parseInt(existingItems[i].innerText);
                if (inputValue === existingValue) {
                    Swal.fire({
                        title: 'Alert',
                        text: 'Room number already added. Please enter a different room number.',
                        icon: 'warning'
                    });
                    return;
                }
            }

            // If not, add the new room number in descending order
            var newDiv = document.createElement("div");
            newDiv.className = "pending-item";
            newDiv.innerText = inputValue;

            var insertIndex = 0;
            for (var j = 0; j < existingItems.length; j++) {
                var existingValue = parseInt(existingItems[j].innerText);
                if (inputValue > existingValue) {
                    break;
                }
                insertIndex++;
            }

            if (insertIndex < existingItems.length) {
                column.insertBefore(newDiv, existingItems[insertIndex]);
            } else {
                column.appendChild(newDiv);
            }

            // Add click event to remove the room number with SweetAlert confirmation
            newDiv.onclick = function () {
                var actionType = columnId === "pickupColumn" ? "picked up" : "delivered";
                Swal.fire({
                    title: 'Confirmation',
                    text: 'Have you ' + actionType + ' this item?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        newDiv.remove();
                    }
                });
            };
        } else {
            Swal.fire({
                title: 'Alert',
                text: 'Invalid room number. Please enter a valid room number.',
                icon: 'error'
            });
        }
    }