exports.exec = cmd => {
    // eslint-disable-next-line global-require
    const exec = require('child_process').exec;
    return new Promise(resolve => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.warn(error);
        }
        resolve(stdout || stderr);
      });
    });
  };
  