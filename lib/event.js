/**
 * Event Commands.
 */

/**
 * Expose event commands.
 */
module.exports = function event(upstart) {
  var initctl = upstart.initctl;

  /**
   * Emit an event.
   * @param  {String}   event
   * @param  {Object}   env   optional
   * @param  {Function} cb
   */
  upstart.emit = function emit(event, env, cb) {
    if(typeof env === "object")
      env = Object.keys(env).map(function(key) {
          return key + "=" + this[key];
        }, env);
    else if(typeof env === "string") env = [env];
    else if(typeof env === "function") cb = env, env = [];
    else if(!(env instanceof Array)) env = [];

    initctl("emit", [event].concat(env), cb);
  };
};