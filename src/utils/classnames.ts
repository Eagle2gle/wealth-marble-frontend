const classNames = (...classnames: (string | false)[]) =>
  classnames.filter(Boolean).join(' ').trim();

export default classNames;
