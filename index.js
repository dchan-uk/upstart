/**
 * Expose `upstart`.
 */
var upstart = module.exports = {};

/**
 * Import config.
 */
upstart.config = require("./lib/config");

/**
 * Import subsets.
 */
["./lib/common", "./lib/job", "./lib/event", "./lib/other"]
  .map(require)
  .forEach(function(subset) {
    subset(this);
  }, upstart);