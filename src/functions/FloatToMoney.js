export default function floatToMoney (floatNumber) {
    return floatNumber.toFixed(2).replace(".", ",")
}