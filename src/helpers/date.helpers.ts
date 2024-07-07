export class DateHelpers {
  static calculateNextBillingDate(plan: string): Date {
    const currentDate = new Date();

    switch (plan.toLowerCase()) {
      case "monthly":
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case "quarterly":
        currentDate.setMonth(currentDate.getMonth() + 3);
        break;
      case "bi-annually":
        currentDate.setMonth(currentDate.getMonth() + 6);
        break;
      case "yearly":
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        throw new Error("Invalid billing plan");
    }

    return currentDate;
  }

  static formatTimeToShortString(date: Date): string {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: 'Africa/Lagos'
    });
  }

  static formatDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
}
