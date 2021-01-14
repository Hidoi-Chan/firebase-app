export function isValid(value) {
    if (value.length >= 10 && value.length <= 256) {
        return true
    } else {
        return false
    }
}