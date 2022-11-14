export default class Jate extends Date {
    #private;
    static defaultFormat: string;
    static namedFormat: any;
    static setFormat(name: string, format: string): void;
    static removeFormat(name: string): void;
    getMonthName(type?: 'long' | 'short'): string;
    getDayName(type?: 'long' | 'short'): string;
    getDayOfYear(): number;
    nformat(name: string): string;
    format(string?: string): string;
    add(amount: number, type: string): Jate;
    subtract(amount: number, type: string): Jate;
    getMonthNumber(): number;
    getQuarter(): number;
}
