/**
 * Configuration.
 */

module.exports = {
    // Directory of .conf files
    dir: "/etc/init"

    // Name or absolute path of initctl binary
  , initctl: "initctl"

    // New line regex for `initctl list`
  , listNL: /\n/

    // Job name regex for `initctl list`
  , listName: /^([^\s]+)/

    // Process ID regex for `initctl list`
  , listPID: /process\s([0-9]+)$/
  };