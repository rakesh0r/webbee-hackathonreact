export function groupBy<K, V>(array: V[], fn: string | ((V) => K)): Map<K, V[]> {
    if (typeof fn === 'string' || fn instanceof String) {
        const key = fn as string
        fn = (item: V) => item[key]
    }

    return array.reduce((acc: Map<K, V[]>, curr: V) => {
        const key = (fn as (V) => K)(curr)
        if (acc.has(key)) {
            acc.get(key).push(curr)
        } else {
            acc.set(key, [curr])
        }
        return acc
    }, new Map<K, V[]>())
}