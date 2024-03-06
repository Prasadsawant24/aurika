// index.js

function openRegisterForm() {
    document.getElementById('register-form').style.display = 'block';
}

function openSignInForm() {
    // Implement the sign-in form logic here
}

function createExcel() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    const workbook = XLSX.utils.book_new();
    const sheetData = [[username, password]];
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'UserCredentials');

    // Save the workbook as an XLSX file
    XLSX.writeFile(workbook, 'user_credentials.xlsx');
}


function closeRegisterForm() {
    document.getElementById('register-form').style.display = 'none';
}

function closeForgotPasswordForm() {
    document.getElementById('forgot-password-form').style.display = 'none';
}