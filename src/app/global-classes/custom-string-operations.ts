export class CustomStringOperations {
    static extractBirthFromCURP(curp: string) {
    let finalDate = '';
    let numericYear = + (curp.substring(0, 2));

    if (numericYear <= 99 && numericYear >= 80) {
      numericYear += 1900;
    } else {
      numericYear += 2000;
    }

    finalDate = numericYear + '-' + curp.substring(2, 4) + '-' + curp.substring(4, 6);
    return finalDate;
    }
}
