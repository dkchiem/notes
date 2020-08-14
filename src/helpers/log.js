function dev(logData) {
  const env = process.env.NODE_ENV;
  if (env === 'development') {
    console.log(
      '%c[DEV] ' + `%c${logData}`,
      'color: gold; font-weight: bold',
      '',
    );
  }
}

function error(logData) {
  const env = process.env.NODE_ENV;
  console.error(
    '%c[ERROR] ' + `%c${logData}`,
    'color: red; font-weight: bold',
    '',
  );
}

export default { dev, error };
