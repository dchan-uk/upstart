/**
 * Expose `upstart`.
 */
var upstart = module.exports = {};

/**
 * Import initctl helper.
 */
upstart.initctl = require("./lib/common").initctl;

/**
 * Import subsets.
 */
["./lib/config", "./lib/job", "./lib/event", "./lib/other"]
  .map(require)
  .forEach(function(subset) {
    subset(this);
  }, upstart);
