const CharacterAmountRange = document.getElementById("CharacterAmountRange");
const CharacterAmountNumber = document.getElementById("CharacterAmountNumber");
const IncludeUppercaseElement = document.getElementById("IncludeUppercase");
const IncludeNumbersElement = document.getElementById("IncludeNumbers");
const IncludeSymbolsElement = document.getElementById("IncludeSymbols");
const form = document.getElementById("PasswordGeneratorForm");
const PasswordDisplay = document.getElementById("PasswordDisplay");

const LOWERCASE_CHARACTER_CODES = arrayFromLowToHigh(97, 122);
const UPPERCASE_CHARACTER_CODES = arrayFromLowToHigh(65, 90);
const NUMBER_CHARACTER_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHARACTER_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

CharacterAmountNumber.addEventListener("input", updateSliderAndNumber);
CharacterAmountRange.addEventListener("input", updateSliderAndNumber);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = CharacterAmountNumber.value;
  const includeUppercase = IncludeUppercaseElement.checked;
  const includeNumbers = IncludeNumbersElement.checked;
  const includeSymbols = IncludeSymbolsElement.checked;
  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  PasswordDisplay.innerText = password;
});

function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let charCodes = LOWERCASE_CHARACTER_CODES;
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHARACTER_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHARACTER_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHARACTER_CODES);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

function updateSliderAndNumber(e) {
  const value = e.target.value;
  CharacterAmountNumber.value = value;
  CharacterAmountRange.value = value;
}