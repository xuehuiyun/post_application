export function safeJsonParse(str: string): any {
    try {
        const parsed = JSON.parse(str);
        return parsed;
    } catch (ex) {
        return {};
    }
}

export function queryBuilder(query: Record<string, string | boolean>): string {
    let q = "?";
    for (const key in query) {
        if (query[key] !== null && query[key] !== undefined) {
            q += `${key}=${query[key].toString()}&`;
        }
    }
    return q;
}
