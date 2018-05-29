export const GetCookie = (name: string): string | undefined => {
    if (typeof document === "undefined") {
        return undefined;
    }

    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        const last = parts.pop();
        if (last === undefined) {
            return undefined;
        }
        return last.split(";").shift() || undefined;
    }
    return undefined;
};

export const SetCookie = (name: string, value: string): void => {
    if (typeof document === "undefined") {
        return;
    }
    document.cookie = name + "=" + value + "; path=/; secure; SameSite=Strict;";
};
