module.exports = function check(str, bracketsConfig) {

  let specialChars = /[!@#$%^&*()[\],.?":{}|<>]/;
  let newStr = str;
  let newConfig = [];

  // Search special characters in config and add backslash

  for (let i = 0; i < bracketsConfig.length; i++) {
    let bracketsPair = bracketsConfig[i];
    newConfig[i] = [];

    for (let j = 0; j < 2; j++) {

      if (specialChars.test(bracketsPair[j])) {
        newConfig[i][j] = `\\${bracketsPair[j]}`;
      } else {
        newConfig[i][j] = bracketsPair[j];
      }

    }
  }

  // Create regex for config

  let stringConfig = newConfig.join('|').replace(/,/g, '');
  let reg = new RegExp(stringConfig, 'g');

  // Test regex

  while (reg.test(newStr)) { newStr = newStr.replace(reg, ''); }

  return newStr == '' ? true : false;
}