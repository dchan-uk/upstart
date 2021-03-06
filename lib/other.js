/**
 * Other Commands.
 */

/**
 * Expose other commands.
 */
module.exports = function other(upstart) {
  var initctl = upstart.initctl;

  /**
   * Reload the configuration of the init daemon.
   * @param {Function} cb
   */
  upstart.reloadConfig =
  upstart.reloadConfiguration =initctl.bind(null, "reload-configuration", []);

  /**
   * Request the version of the init daemon.
   * @param {Function} cb
   */
  upstart.version = initctl.bind(null, "version", []);

  /**
   * Change the minimum priority of log messages from the init daemon.
   * @param {String} priority optional
   * @param {Function} cb
   */
  upstart.priority =
  upstart.logPriority = function logPriority(priority, cb) {
    if(typeof priority === "function") cb = priority, priority = null;
    initctl("log-priority", [priority], cb);
  };
};