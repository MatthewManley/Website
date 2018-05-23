export const GetCookie = (name: string): string | null => {
    if (typeof document === "undefined") {
        return null;
    }

    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        const last = parts.pop();
        if (last === undefined) {
            return null;
        }
        return last.split(";").shift() || null;
    }
    return null;
};

export const SetCookie = (name: string, value: string): void => {
    if (typeof document === "undefined") {
        return;
    }
    document.cookie = name + "=" + value + "; path=/; Secure; SameSite=Strict;";
};
