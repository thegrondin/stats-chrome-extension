//import { thisIsATest } from "./storage.mjs";

//thisIsATest();

var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
var oneWeekAgo = new Date().getTime() - microsecondsPerWeek;

// Track the number of callbacks from chrome.history.getVisits()
// that we expect to get.  When it reaches zero, we have all results.
var numRequestsOutstanding = 0;

chrome.history.search(
  {
    text: "", // Return every history item....
    startTime: oneWeekAgo, // that was accessed less than one week ago.
  },
  function (historyItems) {
    console.log(historyItems);
  }
);
