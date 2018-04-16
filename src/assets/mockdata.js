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
    month_sales: 201,
    rating: 0,
	rating_count: 0,
    satisfy_count: 1,
    satisfy_rate: 90,
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
    month_sales: 13,
    rating: 0,
	rating_count: 0,
    satisfy_count: 0,
    satisfy_rate: 48,
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
    }, {
        //required
		sku: 103,
		name: 'strawberry flavor',
        specs_id: 2,
        //price and fee
        original_price: 39,
        price: 39,
		packing_fee: 1,
        
        rating: 0,
        stock: 40,
		promotion_stock: 5,
        sold_out: false
    }]
}]

export const foods2 = [{
    //shop id
    shop_id: 1,
    //food category id
    category_id: 2,
    item_id: 3,
    //infos
	name: 'chocolate brownie cake',
    description: 'very popular',
    image: '/static/foods/shop1/cake3.jpg',
    //ratings
    month_sales: 101,
    rating: 0,
	rating_count: 0,
    satisfy_count: 1,
    satisfy_rate: 80,
    //specs
	specs: [{
        //required
		sku: 104,
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
    category_id: 2,
    item_id: 4,
    //infos
	name: 'chocolate brownie cake 2',
    description: 'very delicious too',
    image: '/static/foods/shop1/cake4.jpg',
    //ratings
    month_sales: 131,
    rating: 0,
	rating_count: 0,
    satisfy_count: 0,
    satisfy_rate: 98,
    //specs
	specs: [{
        //required
		sku: 105,
		name: 'chocolate flavor',
        specs_id: 1,
        //price and fee
        original_price: 129,
        price: 129,
		packing_fee: 1,
        
        rating: 0,
        stock: 30,
		promotion_stock: 2,
        sold_out: false
    }, {
        //required
		sku: 106,
		name: 'strawberry flavor',
        specs_id: 2,
        //price and fee
        original_price: 329,
        price: 329,
		packing_fee: 1,
        
        rating: 0,
        stock: 40,
		promotion_stock: 5,
        sold_out: false
    }]
}]

export const shop = {
    //shop id
    id: 1,
    //shop name
    name: 'vincent\'s cake',
    //shop address
    address: 'CF Richmond Centre floor 1, section 1038',
    //shop desc
    description: "No description yet~",
    //minimum order total money
    minimum_order_amount: 35,
    //shop category
    category: 'Cake',
    //shop identification, license for selling
    //shop image
    image: '/static/shops/shop.jpeg',
    //shop location
	latitude: 101,
	longitude: 38,
	opening_hours: ["08:30/20:30"],
	phone: '7789551234',
	rating: 5,
	rating_count: 10,
	order_number: 100,
	status: 1
}