    export const Getstoragedata = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
    };
    export const Setstoragedata = (data) => {
    return localStorage.setItem('products' ,JSON.stringify(data));
    };
