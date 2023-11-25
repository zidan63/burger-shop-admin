export function formatCapitalize(str: string) {
  return str.replace(
    /(^|\s)([a-zàáảãạâầấẩẫậăắằẳẵặèéẻẽẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữự])(\w*)/g,
    (_, space: string, firstChar: string, restOfWord: string) => {
      return space + firstChar.toUpperCase() + restOfWord.toLowerCase();
    }
  );
}

export function formatCurrency(currency: string, number: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });

  return formatter.format(number);
}
