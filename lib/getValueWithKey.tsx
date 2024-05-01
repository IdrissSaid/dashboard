const getValueWithKey = (key: string, data: [{ key: string, value: string }], defaultValue='None') => {
  const foundItem = data.find(item => item.key === key);
  return foundItem ? foundItem?.value : defaultValue;
}

export default getValueWithKey;