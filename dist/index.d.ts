export default class Jate extends Date {
    #private;
    months: string[];
    monthsShort: string[];
    days: string[];
    daysShort: string[];
    getMonthName(type?: 'long' | 'short'): string;
    getDayName(type?: 'long' | 'short'): string;
    getDayOfYear(): number;
    format(formatter: string): string;
    getMonthNumber(): number;
    getQuarter(): number;
}
