var firebaseConfig = {
    //your conig",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(firebase.auth());
let uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            let isNewUser = authResult.additionalUserInfo.isNewUser
            firebase.auth().currentUser.getIdToken().then((token) => {
                let url = window.location.href;
                if (url.split('').includes('?')) {
                    url += `&token=${token}&IsNewUser=${isNewUser}&handler=auth`
                }
                else {
                    url += `?token=${token}&IsNewUser=${isNewUser}&handler=auth`
                }
                window.location = url

            })

            return false;
        },
    },


    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
            provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,

            scopes: ["repo"],
        },
    ],
};


firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
    ui.start("#firebaseui-auth-container", uiConfig);

})


let intervalId = setInterval(
    function () {
        let uiBlock = document.getElementsByClassName('firebaseui-container')
        if (uiBlock.length < 1) {
            let customLoader = document.getElementById('customLoader')
            customLoader.style.display = "block"
            clearInterval(intervalId);
        }
    },
    500
)