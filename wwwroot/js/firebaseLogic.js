var firebaseConfig = {
 //config
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
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            customParameters: {
                prompt: 'select_account'
            }
        },
        {
            provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
            scopes: ["repo"],
        },
    ],
};


firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
    ui.start("#firebaseui-auth-container", uiConfig);

})


