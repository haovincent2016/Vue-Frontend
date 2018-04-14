/* shop */
const shopSchema = new mongoose.Schema({
    //shop id
    id: Number,
    //shop name
    name: {
        type: String,
        required: true 
    },
    //shop address
    address: String,
    //shop desc
    description: { type: String, default: "No description yet~" },
    //minimum order total money
    float_minimum_order_amount: { type: Number, default: 0 },
    //shop category
    category: String,
    //shop identification, license for selling
    //shop image
    image: { type: String, default: "" },
    //shop location
	latitude: Number,
	longitude: Number,
	opening_hours: { type: Array, default: ["08:30/20:30"] },
	phone: {
        type: String,
        required: true 
    },
	rating: { type: Number, default: 0 },
	rating_count: { type: Number, default: 0 },
	order_number: { type: Number, default: 0 },
	status: { type: Number, default: 0 }
});


/* food */
const foodSchema = new Schema({
    //shop id
    shop_id: {type: Number, isRequired: true},
    //food category id
    category_id: {type: Number, isRequired: true},
    item_id: {type: Number, isRequired: true},
    //infos
	name: {type: String, isRequired: true},
    description: {type: String, default: ""},
    image: {type: String, isRequired: true},
    //ratings
    month_sales: {type: Number, default: 0},
    rating: {type: Number, default: 0},
	rating_count: {type: Number, default: 0},
    satisfy_count: {type: Number, default: 0},
    satisfy_rate: {type: Number, default: 0},
    //specs
	specs: [{
        //required
		sku: {type: Number, isRequired: true},
		name: {type: String, isRequired: true},
        specs_id: {type: Number, isRequired: true},
        //price and fee
        original_price: {type: Number, default: 0},
        price: {type: Number, default: 0, isRequired: true},
		packing_fee: {type: Number, default: 0},
        
        rating: {type: Number, default: 0},
        stock: {type: Number, default: 0, isRequired: true},
		promotion_stock: {type: Number, default: 0},
        sold_out: {type: Boolean, default: false}
    }]
})

/* food category */
const categorySchema = new Schema({
	id: Number,
	image: String,
	name: String
});
