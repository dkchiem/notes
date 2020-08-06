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

export default { dev };
