export const foods = [{
    //shop id
    shop_id: 1,
    //food category id
    category_id: 1,
    item_id: 1,
    //infos
	name: 'cheese cake',
    description: 'very delicious',
    image: '/static/foods/shop1/cake.jpeg',
    //ratings
    month_sales: 0,
    rating: 0,
	rating_count: 0,
    satisfy_count: 0,
    satisfy_rate: 0,
    //specs
	specs: [{
        //required
		sku: 101,
		name: 'mango flavor',
        specs_id: 1,
        //price and fee
        original_price: 20,
        price: 20,
		packing_fee: 2,
        
        rating: 0,
        stock: 20,
		promotion_stock: 5,
        sold_out: false
    }]
}, {
    //shop id
    shop_id: 1,
    //food category id
    category_id: 1,
    item_id: 2,
    //infos
	name: 'cheese cake 2',
    description: 'very delicious too',
    image: '/static/foods/shop1/cake2.jpeg',
    //ratings
    month_sales: 0,
    rating: 0,
	rating_count: 0,
    satisfy_count: 0,
    satisfy_rate: 0,
    //specs
	specs: [{
        //required
		sku: 102,
		name: 'mango flavor',
        specs_id: 1,
        //price and fee
        original_price: 29,
        price: 29,
		packing_fee: 1,
        
        rating: 0,
        stock: 30,
		promotion_stock: 2,
        sold_out: false
    }]
}]