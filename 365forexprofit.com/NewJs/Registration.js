if (document.readyState == "Loading") {
  document.addEventListener("DOMContentLoaded", dom)
} else {
  dom();
}


function dom() {
  //Get the id of the form 
  const Registration_form = document.getElementById("Registration_form");
  console.log(Registration_form);
  //Add an eventlistener and preventDefault
  Registration_form.addEventListener("submit", function(e) {
    e.preventDefault();
  
  //Get you email&password values
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  
  
  //create a function for signing up new users 
  async function SignupNewUsers() {
     try {
       const NewUser = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
       // Get values of user's info and store as an object
       let user = {
         Date_Registered: Date.now(),
         Ref_Number: document.getElementById("under_reference").value,
         Username: document.getElementById("uname").value,
         FullName: document.getElementById("name").value,
         Email: document.getElementById("email").value,
         PhoneNumber: document.getElementById("ií8").value,
         Password: document.getElementById("password").value,
         Confirmation_of_password: document.getElementById("password_confirmation").value
       
       }
       writeUserData();
     } catch (error) {
       console.log(error.message)
     }
  }
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log(user.uid);
      localStorage.setItem("uid", user.uid);
      console.log(user.email);
    }
  });
  
  function writeUserData(user) {
    firebase.database().ref('users/' + user.uid).set(JSON.parse(JSON.stringify(user))
    );
    Resetform()
    VerifyUser()
  }
  
  function Resetform() {
    Registration_form.reset();
  }
  
  function VerifyUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
        console.log(user.email);
        var user = firebase.auth().currentUser;
    
    
        if (user != null) {
          email = user.email;
          emailVerified = user.emailVerified;
          uid = user.uid;
          console.log(emailVerified)
        }
    
    RedirectToDashboard();
    
        firebase.database().ref('/users/' + userId).on('value').then(function(snapshot) {
          console.log(snapshot.val())
        });
    
    
    
    
      } else {
      RedirectToVerificationPage();
      }
    });
  }
  
  function RedirectToDashboard() {
    window.location.replace("../Dashboard/dashboard.html");
  }
  });
  
  function RedirectToVerificationPage() {
    window.location.replace("../VerifyEmail.html");
  }
  
  
  
  
  
  
  
  
  
}




 
 