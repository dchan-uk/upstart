/**
 * Expose common stuff.
 */
var upstart = exports = module.exports = {};

/**
 * Call initctl.
 * @param  {String} command
 * @param  {Array}  args    optional
 * @return {cp.ChildProcess}
 */
upstart.initctl = function initctl(command, args, cb) {
  var command = [upstart.config.initctl, command].concat(args || []).join(" ");
  return cp.exec(command, cb);
};

/**
 * Match helper.
 * @param  {RegExp} regexp
 * @param  {String} str
 * @return {String|null}
 */
exports.match = function match(regex, str) {
  var res = str.match(regex);
  return res === null ? null : res[1];
};