const dayTextFormat = (n: number, text_forms: string[]): string => {  
    n = Math.abs(n) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 === 1) { return text_forms[0]; }
    return text_forms[2];
}

export const getFormattedDate = (date: string) => {
    const parsedDate: Date = new Date(Date.parse(date));
    const diff: number = new Date().valueOf() - parsedDate.valueOf();
    if (diff < 0) return 'когда-то в будущем...';
    const day = 24 * 60 * 60 * 1000;
    const time = parsedDate.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Moscow'});
    if (diff < day) {
        return `Cегодня, ${time} i-GMT+3`;
    } else if (diff < day * 2) {
        return `Вчера, ${time} i-GMT+3`;
    } else {
        const days = Math.floor(diff / day);
        const daysFormat = dayTextFormat(days, ['день', 'дня', 'дней']);
        return `${days} ${daysFormat} назад, ${time} i-GMT+3`;
    }
}