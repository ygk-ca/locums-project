var fs = require('fs');

array = [
    {
      id: "1",
      start: "DayPilot.Date.today().addDays(1).addHours(10)",
      end: "DayPilot.Date.today().addDays(1).addHours(16)",
      text: "Belleville Clinic #3 \n Dr. Jake John \n 10:00 AM - 4:00 PM",
    },
    {
      id: "2",
      start: "DayPilot.Date.today().addHours(12)",
      end: "DayPilot.Date.today().addHours(18)",
      text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
    },
    {
      id: "3",
      start: "DayPilot.Date.today().addHours(12)",
      end: "DayPilot.Date.today().addHours(18)",
      text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
    },
    {
      id: "4",
      start: "DayPilot.Date.today().addHours(12)",
      end: "DayPilot.Date.today().addHours(18)",
      text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
    },
    {
      id: "5",
      start: "DayPilot.Date.today().addHours(12)",
      end: "DayPilot.Date.today().addHours(18)",
      text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
    },
    {
      id: "6",
      start: "DayPilot.Date.today().addHours(12)",
      end: "DayPilot.Date.today().addHours(18)",
      text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
    },
    {
      id: "7",
      start: "DayPilot.Date.today().addHours(12)",
      end: "DayPilot.Date.today().addHours(18)",
      text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
    }
  ];

json = JSON.stringify(array);
fs.writeFile ("calendar.json", JSON.stringify(json), function(err) {
    if (err) throw err;
    console.log('complete');
    }
);