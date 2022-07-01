export default class Jate extends Date {
    #private;
    static defaultFormat: string;
    static namedFormat: any;
    static setFormat(name: string, format: string): void;
    static removeFormat(name: string): void;
    months: string[];
    monthsShort: string[];
    days: string[];
    daysShort: string[];
    getMonthName(type?: 'long' | 'short'): string;
    getDayName(type?: 'long' | 'short'): string;
    getDayOfYear(): number;
    nformat(name: string): string;
    format(formatter?: string): string;
    getMonthNumber(): number;
    getQuarter(): number;
}
