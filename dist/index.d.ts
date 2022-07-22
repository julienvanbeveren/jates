export default class Jate extends Date {
    #private;
    static defaultFormat: string;
    static namedFormat: any;
    static setFormat(name: string, format: string): void;
    static removeFormat(name: string): void;
    private static months;
    private static monthsShort;
    private static days;
    private static daysShort;
    getMonthName(type?: 'long' | 'short'): string;
    getDayName(type?: 'long' | 'short'): string;
    getDayOfYear(): number;
    nformat(name: string): string;
    format(formatter?: string): string;
    add(amount: number, type: string): void;
    getMonthNumber(): number;
    getQuarter(): number;
}
