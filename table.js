let arrs = {
    idArr: [],
    prodArr: [],
    deptArr: [],
    priceArr: [],
    stockArr: [],
}
let max = {
    id: 7,
    product: 12,
    dept: 15,
    price: 5,
    stock: 14,
}
let table = '';
let formating = function (product) {
    product.forEach(element => { 
        arrs.idArr.push(element.item_id.toString());
        arrs.prodArr.push(element.product_name);
        arrs.deptArr.push(element.department_name);
        arrs.priceArr.push(element.price.toString());
        arrs.stockArr.push(element.stock_quantity.toString());
        switch(true) {
            case (max.id < element.item_id.toString().length):
                max.id = element.item_id.toString().length;
            case (max.product < element.product_name.length):
                max.product = element.product_name.length;
            case (max.dept < element.department_name.length):
                max.dept = element.department_name.length;
            case (max.price < element.price.toString().length):
                max.price = element.price.toString().length;
            case (max.stock < element.stock_quantity.toString().length):
                max.stock = element.stock_quantity.toString().length;
        }
    });
    table = 'item id'.padEnd(max.id) + ' | ' + 'product name'.padEnd(max.product) + ' | ' + 'department name'.padEnd(max.dept) + ' | ' + 'price'.padEnd(max.price) + ' | ' + 'stock quantity'.padEnd(max.stock)
    let tableline = table.replace(/./g, '*');
    console.log('\n' + '*' + tableline)
    console.log(' ' + table)
    console.log('*' + tableline)
    for (i = 0; i < arrs.idArr.length; i++) {
        console.log(' ' + arrs.idArr[i].padEnd(max.id) + ' | ' + arrs.prodArr[i].padEnd(max.product) + ' | ' + arrs.deptArr[i].padEnd(max.dept) + ' | ' + '$' + arrs.priceArr[i].padEnd(max.price) + '  | ' + arrs.stockArr[i].padEnd(max.stock))
    }
    table = '';
    arrs = {
        idArr: [],
        prodArr: [],
        deptArr: [],
        priceArr: [],
        stockArr: [],
    }
    max = {
        id: 7,
        product: 12,
        dept: 15,
        price: 5,
        stock: 14,
    }
}
module.exports = formating; 
