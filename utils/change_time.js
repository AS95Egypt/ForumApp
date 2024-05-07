const { exec } = require("child_process");

function changeTime() {
  const newTimestamp = "2024-03-20 13:05:00"; // Adjust the timestamp as needed

  exec(`date --set="${newTimestamp}"`, (err, stdout, stderr) => {
    if (err) {
      console.error("Error setting system time:", err);
      console.error(stderr);
    } else {
      console.log("System time successfully set to:", stdout);
    }
  });

  process.exit();
}

changeTime();
