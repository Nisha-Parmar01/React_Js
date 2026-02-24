    export const Getstoragedata = () => {
    return JSON.parse(sessionStorage.getItem("products")) || [];
    };
    export const Setstoragedata = (data) => {
    return sessionStorage.setItem('products' ,JSON.stringify(data));
    };
