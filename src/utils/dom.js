export function addClass(el, className) {
    if(hasClass(el, className)) {
        return
    }
    let newClass;
    if (el.className === "") { // 元素没有类
        newClass = [];
        newClass.push(className);
    }else { // 存在类
        newClass = el.className.split(' ');
        newClass.push(className);
    }
    el.className = newClass.join(' ');
}

export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}

export function getAttribute(el, name, val) {
    const prefix = 'data-';
    name = prefix + name;
    if(val) {
        return el.setAttribute(name, val);
    }

    return el.getAttribute(name);
}