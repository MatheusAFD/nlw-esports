//18:00 =>

export function convertHoursStringToMInutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);

  const minutesAmount = hours * 60 + minutes;

  return minutesAmount;
}
