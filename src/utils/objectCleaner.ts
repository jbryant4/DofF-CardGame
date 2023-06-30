import { CardDocument } from '~/models/Card';

function objectCleaner(obj: any): Partial<CardDocument> {
  return Object.keys(obj)
    .filter(key => {
      const value = obj[key];

      return (
        value !== undefined &&
        value !== null &&
        !(
          value === '' ||
          value === 0 ||
          (Array.isArray(value) && value.length === 0)
        )
      );
    })
    .reduce((result, key) => {
      result[key] = obj[key];

      return result;
    }, {});
}

export default objectCleaner;
