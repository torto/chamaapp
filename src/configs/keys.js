const production = {
  firebase:{

  }
}

const dev = {
  firebase: {
    apiKey: "AIzaSyB-6LWTzctZxnx9lOadBKW-TSUld7zrt4U",
    authDomain: "test-chamaapp.firebaseapp.com",
    databaseURL: "https://test-chamaapp.firebaseio.com/"
  }
}

export default process.env.NODE_ENV === "production" ? production : dev
