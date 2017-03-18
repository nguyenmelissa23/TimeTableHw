// Initialize Firebase
var config = {
    apiKey: "AIzaSyDOqH0DOtwWNAxgdAi5pAgw9BpXeU3p9EQ",
    authDomain: "train-time-2ed45.firebaseapp.com",
    databaseURL: "https://train-time-2ed45.firebaseio.com",
    storageBucket: "train-time-2ed45.appspot.com",
    messagingSenderId: "914003238583"
};
firebase.initializeApp(config);
var database = firebase.database();

//on Submit button
$("input[name=submit]").on("click", function(event) {
    event.preventDefault();
    // user input
    var trainName = $("input[name=name]").val().trim();
    var destination = $("input[name=destination]").val().trim();
    var firstTime = moment($("input[name=firstTrainTime]").val().trim(), "DD/MM/YY").format("X");
    var frequency = $("input[name=frequency]").val().trim();
    // object for data
    var newEmp = {
    trainName:      trainName,
    destination:    destination,
    firstTime:      firstTime,
    frequency:      frequency
    };

    database.ref().push(newEmp);
    
    $("input").val("");
    
    return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  //store info from firebase
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;
    
    //convert first time 
    var convertedFirstTime = (moment(firstTime), minute);
    console.log(convertedFirstTime);
    
    var diffTime = moment().diff(moment(convertedFirstTime), "minutes");
    console.log(diffTime);

    var timeRemain = diffTime % frequency; 
    console.log(timeRemain);

    var minAway = timeRemain;
    var nextArr = moment().add(minAway, "minutes");
    nextArr = moment(nextArr).format("hh:mm");
    
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextArr + "</td><td>" + minAway + "</td></tr>");
});