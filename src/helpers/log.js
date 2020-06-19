function dev(logData) {
  console.log(
    '%c[DEV] ' + `%c${logData}`,
    'color: gold; font-weight: bold',
    '',
  );
}

export default { dev };
