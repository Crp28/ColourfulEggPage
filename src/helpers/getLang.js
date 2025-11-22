export const getLang = (location) => {
    // Remove the base path if present (for GitHub Pages subdirectory deploys)
    const base = process.env.PUBLIC_URL || '';
    let pathname = location.pathname.startsWith(base)
        ? location.pathname.slice(base.length)
        : location.pathname;
    let language;
    if (pathname.startsWith('/zh')) language = '/zh';
    else if (pathname.startsWith('/en')) language = '/en';
    else language = '/zh';
    return language;
}