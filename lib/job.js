/**
 * Job commands.
 */

/**
 * Expose job commands.
 */
module.exports = function job(upstart) {
  var initctl = upstart.initctl;
  var match = upstart.match;

  /**
   * Parse a response by initctl.
   * @param  {String} res
   * @return {Object}     { name, pid }
   */
  function parseJobResponse(res) {
    var name = match(upstart.config.listName, res)
      , pid = match(upstart.config.listPID, res);

    return { name: name, pid: pid ? parseInt(pid, 10) : false };
  }

  /**
   * Job helper.
   * @param {String}   command
   * @param {String}   job
   * @param {Array[String]} env optional
   * @param {Function} cb
   */
  upstart.job = function job(command, job, env, cb) {
    if(typeof env === "object")
      env = Object.keys(env).map(function(key) {
          return key + "=" + this[key];
        }, env);
    else if(typeof env === "string") env = [env];
    else if(typeof env === "function") cb = env, env = [];
    else if(!(env instanceof Array)) env = [];

    upstart.initctl(command, [job].concat(env), function jobCb(err, stdout, stderr) {
      if(err && cb) return cb(err, null, stdout, stderr);
      var res = parseJobResponse(stdout);
      if(cb) cb(null, res.name, res.pid, stdout, stderr);
    });
  };

  /**
   * Start job.
   * @param {String} job
   * @param {Object} env optional
   */
  upstart.start = upstart.job.bind(null, "start");

  /**
   * Stop job.
   * @param {String}   job
   * @param {Object}   env optional
   * @param {Function} cb
   */
  upstart.stop = upstart.job.bind(null, "stop");

  /**
   * Restart job.
   * @param {String}   job
   * @param {Object}   env optional
   * @param {Function} cb
   */
  upstart.restart = upstart.job.bind(null, "restart");

  /**
   * Send HUP signal to job.
   * @param {String}   job
   * @param {Object}   env optional
   * @param {Function} cb
   */
  upstart.reload = upstart.job.bind(null, "reload");

  /**
   * Query status of job.
   * @param {String}   job
   * @param {Object}   env optional
   * @param {Function} cb
   */
  upstart.status = upstart.job.bind(null, "status");

  /**
   * List known jobs.
   * @param {Function} cb
   */
  upstart.list = function list(cb) {
    initctl("list", null, function listCb(err, stdout, stderr) {
      if(err) return cb(err);

      var jobs = {};
      stdout
        .split(upstart.config.listNL)
        .map(parseJobResponse)
        .forEach(function(job) {
          if(!job.name) return;
          this[job.name] = job.pid ? parseInt(job.pid, 10) : false;
        }, jobs);

      if(cb) cb(null, jobs, stdout);
    });
  };
};