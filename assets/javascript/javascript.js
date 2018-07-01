// Initialize Firebase
var config = {
    apiKey: "AIzaSyADaacYh9WfNPWktuq0Z9T8sivz5F3Bd1s",
    authDomain: "fir-dcdi.firebaseapp.com",
    databaseURL: "https://fir-dcdi.firebaseio.com",
    projectId: "fir-dcdi",
    storageBucket: "fir-dcdi.appspot.com",
    messagingSenderId: "163784529275"
};
firebase.initializeApp(config);

var database = firebase.database();

var employeeName;
var employeeRole;
var employeeRate;
var employeeStart;
var monthlyRate;
var worked;
var total;


$("#submit").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    employeeName = $("#emName").val().trim();
    employeeRole = $("#emRole").val().trim();
    employeeStart = $("#emStart").val().trim();
    employeeRate = $("#emRate").val().trim();
    // var startDay = moment(employeeStart);
    // // var now = moment();
    // worked = moment().diff(startDay, "months", true);
    // ;
    // console.log("WORKED", Math.round(worked));
    // total = worked * employeeRate;

    database.ref().push({
        name: employeeName,
        role: employeeRole,
        start: employeeStart,
        rate: employeeRate,
        // months: Math.round(worked),
        // total: total,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
      })



})

database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().start);
    console.log(childSnapshot.val().rate);
    console.log(childSnapshot.val().dateAdded);

});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    var newRow = $("<tr>");
    newRow.append($("<td>").text(snapshot.val().name));
    newRow.append($("<td>").text(snapshot.val().role));
    newRow.append($("<td>").text(snapshot.val().start));
    newRow.append($("<td>").text(snapshot.val().months));
    newRow.append($("<td>").text(snapshot.val().rate));
    newRow.append($("<td>").text(snapshot.val().total));
    newRow.appendTo($("tbody"));
    // $("#name-display").text(snapshot.val().name);
    // $("#role-display").text(snapshot.val().role);
    // $("#start-display").text(snapshot.val().start);
    // $("#months-display").text(snapshot.val().months);
    // $("#rate-display").text(snapshot.val().start);
    // $("#total-display").text(snapshot.val().months);
  });

  console.log(moment().format("MMM Do YY"));
  console.log(moment().format("DD/MM/YY hh:mm A"));

