export const pick =
  (...props) =>
  obj => {
    return Object.assign({}, ...props.map(k => ({ [k]: obj[k] })))
  }

export const isNil = v => v === undefined || v === null
