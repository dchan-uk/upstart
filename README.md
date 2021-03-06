# upstart

Simple wrapper module for Upstart.

## Installation

```
npm install upstart
```

## Usage

```js
var upstart = require("upstart");

upstart.start("my-job", function(err, name, pid, stdout, stderr) {
  if(err) return console.err("Oh noes...", stderr);

  console.log("Started", name, "with pid", pid);
});

upstart.restart("my-job", function(err, name, pid, stdout, stderr) {
  if(err) return console.err("Wat?", stderr);

  console.log("All systems running on", name, pid);
});

upstart.reload("my-job", function(err, name, pid, stdout, stderr) {
  if(err) return console.err("Wat?", stderr);

  console.log("Config reloaded.");
});

upstart.status("my-job", function(err, name, pid, stdout, stderr) {
  console.log("Do we rock and roll?")
  if(err) return console.err("Cable broke.", stderr);

  if(pid)
    console.log("Yeah, we do on ", pid);
  else
    console.log("Nah, we don't.")
});

upstart.stop("my-job", function(err, name, pid, stdout, stderr) {
  if(err) return console.err("I don't even...", stderr);

  console.log("He's dead Jim.", name);
  console.log("I can't feel a PID:", pid);
});

upstart.emit("networking", function(err) {
  if(err) return console.err("Dude, srsly. Check your permissions.", stderr);
});
```