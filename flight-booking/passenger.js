 // Variables for passenger counts
 let adults = 1;
 let children = 0;
 let infants = 0;

 // Show dropdown box right below when an option is selected
 document.getElementById('passenger-dropdown').addEventListener('click', function() {
     const passengerSelection = document.getElementById('passenger-selection');
     const dropdown = document.getElementById('passenger-dropdown');
     
     // Positioning the selection box right below the dropdown
     passengerSelection.style.display = 'block';
     const dropdownRect = dropdown.getBoundingClientRect();
     passengerSelection.style.top = dropdownRect.bottom + window.scrollY + 'px';
     passengerSelection.style.left = dropdownRect.left + 'px';

     // Update displayed values
     document.getElementById('adult-count').textContent = adults;
     document.getElementById('child-count').textContent = children;
     document.getElementById('infant-count').textContent = infants;
 });

 // Update the displayed passenger count in the dropdown after adjusting numbers
 function updateDropdownText() {
     const updatedText = `${adults} Adults, ${children} Children, ${infants} Infants`;
     document.getElementById('passenger-dropdown').options[document.getElementById('passenger-dropdown').selectedIndex].textContent = updatedText;
 }

 // Increment and decrement functionality
 document.getElementById('adult-increment').addEventListener('click', function() {
     adults++;
     document.getElementById('adult-count').textContent = adults;
     updateDropdownText();
 });

 document.getElementById('adult-decrement').addEventListener('click', function() {
     if (adults > 1) {
         adults--;
         document.getElementById('adult-count').textContent = adults;
         updateDropdownText();
     }
 });

 document.getElementById('child-increment').addEventListener('click', function() {
     children++;
     document.getElementById('child-count').textContent = children;
     updateDropdownText();
 });

 document.getElementById('child-decrement').addEventListener('click', function() {
     if (children > 0) {
         children--;
         document.getElementById('child-count').textContent = children;
         updateDropdownText();
     }
 });

 document.getElementById('infant-increment').addEventListener('click', function() {
     infants++;
     document.getElementById('infant-count').textContent = infants;
     updateDropdownText();
 });

 document.getElementById('infant-decrement').addEventListener('click', function() {
     if (infants > 0) {
         infants--;
         document.getElementById('infant-count').textContent = infants;
         updateDropdownText();
     }
 });

 // Confirm button to hide the passenger selection dropdown
 document.getElementById('confirm-passengers').addEventListener('click', function() {
     document.getElementById('passenger-selection').style.display = 'none';
 });