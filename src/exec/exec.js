import childProcess from "child_process";

function promiseExec(cwd, cmd) {
    return new Promise(resolve => {
        childProcess.exec(
            cmd,
            {maxBuffer: Infinity, encoding: "utf8", cwd},
            // We need to use the callback API here
            (err, stdout, stderr) => void resolve({err, stdout, stderr}) // eslint-disable-line promise/prefer-await-to-callbacks
        );
    });
}

export default (async function exec(cwd, cmd) {
    const {err, stdout, stderr} = await promiseExec(cwd, cmd);

    if (err !== null) {
        err.stdout = stdout;
        err.stderr = stderr;

        throw err;
    }

    return {stdout, stderr};
});
