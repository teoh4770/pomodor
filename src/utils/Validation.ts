class Validation {
  static string(value: string, min = 1, max = Infinity) {
    value = value.trim();

    return value.length >= min && value.length <= max;
  }

  static positiveNumber(value: number) {
    return value > 0;
  }

  static lessThan(value: number, compareTo: number) {
    return value < compareTo;
  }
}

export { Validation }