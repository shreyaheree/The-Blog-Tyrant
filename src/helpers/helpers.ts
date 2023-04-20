
import moment from "moment";

export const formatDate = (date: Date) => moment(date).format('ll')
export const formatTime = (date: Date) => moment(date).format('LT')

export function hex2rgb(hex: string) {
    let validHEXInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!validHEXInput) {
        return false;
    }
    return [
        parseInt(validHEXInput[1], 16),
        parseInt(validHEXInput[2], 16),
        parseInt(validHEXInput[3], 16),
    ]
}