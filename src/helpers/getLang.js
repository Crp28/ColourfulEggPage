export const getLang = (location) => {
    let language;
    if (location.pathname.slice(0, 3) === "/zh") language = "/zh"
    else if (location.pathname.slice(0, 3) === "/en") language = "/en"
    else language = "/zh"
    return language
}