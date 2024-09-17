const attributes = [
  "name.first",
  "name.last",
  "location.street.name",
  "location.city",
  "location.state",
];

const getNestedValue = (obj, path) =>
  path.split(".").reduce((acc, part) => acc && acc[part], obj);

const setNestedValue = (obj, path, value) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const lastObj = keys.reduce((acc, key) => {
    if (!acc[key]) acc[key] = {};
    return acc[key];
  }, obj);
  lastObj[lastKey] = value;
  return obj;
};

const totalLength = (obj, attributes) => {
  return attributes.reduce((acc, attribute) => {
    const value = getNestedValue(obj, attribute);
    return acc + (value ? value.length : 0);
  }, 0);
};

const getRatio = (obj, attribute) => {
  return getNestedValue(obj, attribute).length / totalLength(obj, attributes);
};

const Spain = "aábcdeéfghiíjklmnñoópqrstuúüvwxyzÁÉÍÓÚÜÑ\n";
const France =
  "aàâæbcçdeéèêëfghiîïjklmnoôœpqrstuùûüvwxyÿzÀÂÆBCÇDEÉÈÊËFGHIÎÏJKLMNOÔŒPQRSTUÙÛÜVWXYŸZ\n";
const Iran =
  "ا آ ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی\n";

const charDict = {
  Spain,
  France,
  Iran,
};

const deleteAtRandomPosition = (str, region) => {
  // console.log("deleted at: ", str);
  const index = Math.floor(Math.random() * str.length);
  return str.slice(0, index) + str.slice(index + 1);
};

const insertAtRandomPosition = (str, region) => {
  // console.log("inserted at:", str);
  const index = Math.floor(Math.random() * str.length);
  return (
    str.slice(0, index) +
    charDict[region][Math.floor(Math.random() * charDict[region].length)] +
    str.slice(index)
  );
  return str;
};

const swapCharacters = (str, region) => {
  // console.log("swapped at: ", str);
  const index1 = Math.floor(Math.random() * str.length);
  const index2 = Math.floor(Math.random() * str.length);
  return (
    str.slice(0, index1) +
    str[index2] +
    str.slice(index1 + 1, index2) +
    str[index1] +
    str.slice(index2 + 1)
  );
};

const modificationFunctions = [
  insertAtRandomPosition,
  deleteAtRandomPosition,
  swapCharacters,
];

const modifiyString = (str, region) => {
  const possibility = 1 + (str.length > 0) + (str.length > 1);
  return modificationFunctions[Math.floor(Math.random() * possibility)](
    str,
    region
  );
};

const modifyObject = (obj, error_count) => {
  return attributes.reduce(
    (acc, attribute) => {
      let local_error = error_count * getRatio(obj, attribute);
      let modifiedValue = getNestedValue(acc, attribute);

      while (local_error >= 1) {
        modifiedValue = modifiyString(modifiedValue, obj.location.country);
        local_error -= 1;
      }

      if (Math.random() < local_error) {
        modifiedValue = modifiyString(modifiedValue, obj.location.country);
      }

      acc = setNestedValue(acc, attribute, modifiedValue);

      return {
        ...acc,
      };
    },
    { ...obj }
  );
};

export default modifyObject;
