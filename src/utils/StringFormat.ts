export function formatCapitalize(str: string) {
  return str.replace(
    /(^|\s)([a-zàáảãạâầấẩẫậăắằẳẵặèéẻẽẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữự])(\w*)/g,
    (_, space: string, firstChar: string, restOfWord: string) => {
      return space + firstChar.toUpperCase() + restOfWord.toLowerCase();
    }
  );
}
