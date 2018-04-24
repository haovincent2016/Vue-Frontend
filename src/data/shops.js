import { baseUrl } from '@/config'
export const shop1 = {
    //shop id
    id: 1,
    //shop name
    name: 'vincent\'s cake',
    //shop address
    address: 'CF Richmond Centre floor 1, section 1038',
    //shop desc
    description: "no description yet~",
    //shop notie
    notice: "♥ quality ensured ♥ please contact us at 123-567890 if you found any problems",
    //shop delivery
    delivery: "v's delivery",
    //minimum order total money
    minimum_order_amount: 35,
    //shop category
    category: 'Cake',
    //shop identification, license for selling
    //shop image
    image: baseUrl+'static/shops/shop1.jpeg',
    brand: baseUrl+'static/shops/brand1.png',
    //shop location
	latitude: 101,
	longitude: 38,
	opening_hours: ["Mon 08:30/20:30", "Tue 08:30/20:30", " Wed 08:30/20:30", "Thu 08:30/20:30", "Fri 08:30/20:30", " Sat closed", "Sun closed"],
    phone: '7789551234',
    sale: 100,
	rating: 4,
	rating_count: 10,
	order_number: 100,
	status: 1
}