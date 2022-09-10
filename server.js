require('dotenv').config()

const express = require('express')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
  origin: 'https://gym-hub-ecommerce.herokuapp.com'
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const products = [
  {
    id: 1,
    name: 'Power Rack',
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw74d4cb5d/images/573526/Rebel_573526_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 60000,
    salePrice: 50000,
    rating: 4.5,
    description: 'Allowing you to perform a range of different exercises like chin ups, pulls ups and various forms of weight training, the Celsius RK2 Full Rack is the perfect addition to your home gym. The adjustable safety bars allow you to quickly and easily customise to your height for greater safety when lifting. Constructed to be able to be bolted into the ground, you will experience superior stability.',
    collections: ['equipment', 'weight-training', 'home-gym']
  },
  {
    id: 2,
    name: 'Smith Machine',
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw1e793baa/images/573523/Rebel_573523_hi-res.jpg?sw=558&sh=558&sm=fit',
    originalPrice: 120000,
    salePrice: 100000,
    rating: 4,
    description: 'For added safety when lifting, the Celsius ST1 Smith Machine is built to allow you to lift weights without needing a spotter. Designed with multi stage safety stops, a height adjustable bar holder and 4 plate storage posts, you can start your fitness journey today. The Celsius ST1 Smith Machine can be bolted into the ground for extra stability and support',
    collections: ['equipment', 'weight-training', 'home-gym']
  },
  {
    id: 3,
    name: 'Adjustable Bench',
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw288daae2/images/573097/Rebel_573097_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 20000,
    salePrice: null,
    rating: 5,
    description: 'Complete your workout at home with the Celsius BC2 FID Bench. An adjustable backrest can deliver various angles of incline and decline to allow for better flexibility in your training session. The durable padding helps enhance your comfort level, while the feet holders help keep you locked into the correct position.',
    collections: ['equipment', 'weight-training', 'home-gym', 'bestsellers']
  },
  {
    id: 4,
    name: 'Flat Bench',
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw83322796/images/573096/Rebel_573096_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 22000,
    salePrice: null,
    rating: 5,
    description: 'Built with versatility in mind, the Celsius BC1 Flat Bench allows you to perform a wide range of exercises. Made with dual density upholstery and durable tubular steel, this is one flat bench that is built to last. Make sure your home gym has everything it needs with the Celsius BC1 Flat Bench.',
    collections: ['equipment', 'weight-training', 'home-gym']
  },
  {
    id: 5,
    name: 'Standard Barbell',
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw25b04c3f/images/406393/Rebel_406393_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 9000,
    salePrice: null,
    rating: 5,
    description: 'A very straight forward barbell, 183cm (6ft) in length with roughed gripping areas for more traction and less chance of slippage even once you work up a sweat. Suitable for use with most weight benches and great for squats there are many workouts you can do with a standard barbell. For safety it is best to always work with a spotter when using this product either on a weight bench or for squats.',
    collections: ['equipment', 'weight-training', 'home-gym']
  },
  {
    id: 6,
    name: 'Olympic Barbell',
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dwcedfd7fc/images/355267/Rebel_355267_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 20000,
    salePrice: 18000,
    rating: 4,
    description: `With added rotation between the inner and outer sleeves, the 700lb Olympic Straight Bar with Brass Bushings will allow you to lift more easily with reduced torque. Perfect for clean and jerk and snatch motions, this bar will fit Olympic weight plates. The brass bushings between the inner and outer sleeves are durable, so you'll get great value for money with your new barbell.`,
    collections: ['equipment', 'weight-training', 'home-gym']
  },
  {
    id: 7,
    name: '1.25kg Olympic Weight Plate',
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw95f68de0/images/389659/Rebel_389659_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 1000,
    salePrice: null,
    rating: 4,
    description: 'The Celsius Weight Plate is ideal for both Olympic and general weightlifting with a durable stainless steel inner sleeve for easy loading onto the bar. Plates are colour coded with a solid rubber coating for easy weight identification.',
    collections: ['equipment', 'weight-training', 'weight-plates']
  },
  {
    id: 8,
    name: '2.5kg Olympic Weight Plate',
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw65979d5a/images/389660/Rebel_389660_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 2000,
    salePrice: null,
    rating: 5,
    description: 'The Celsius Weight Plate is ideal for both Olympic and general weightlifting with a durable stainless steel inner sleeve for easy loading onto the bar. Plates are colour coded with a solid rubber coating for easy weight identification.',
    collections: ['equipment', 'weight-training', 'weight-plates']
  },
  {
    id: 9,
    name: '5kg Olympic Weight Plate',
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dwe4800238/images/389661/Rebel_389661_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 4000,
    salePrice: null,
    rating: 4.5,
    description: 'The Celsius Weight Plate is ideal for both Olympic and general weightlifting with a durable stainless steel inner sleeve for easy loading onto the bar. Plates are colour coded with a solid rubber coating for easy weight identification.',
    collections: ['equipment', 'weight-training', 'weight-plates']
  },
  {
    id: 10,
    name: '10kg Olympic Weight Plate',
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw6ecf24b5/images/389662/Rebel_389662_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 8000,
    salePrice: null,
    rating: 4,
    description: 'The Celsius Weight Plate is ideal for both Olympic and general weightlifting with a durable stainless steel inner sleeve for easy loading onto the bar. Plates are colour coded with a solid rubber coating for easy weight identification.',
    collections: ['equipment', 'weight-training', 'weight-plates']
  },
  {
    id: 11,
    name: '20kg Olympic Weight Plate',
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dwee5d371b/images/389663/Rebel_389663_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 15000,
    salePrice: 12000,
    rating: 5,
    description: 'The Celsius Weight Plate is ideal for both Olympic and general weightlifting with a durable stainless steel inner sleeve for easy loading onto the bar. Plates are colour coded with a solid rubber coating for easy weight identification.',
    collections: ['equipment', 'weight-training', 'weight-plates']
  },
  {
    id: 12,
    name: '55cm Medicine Ball',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/6ea680ebd5101096c649fff5ead2cfa0_ae756c91-ad7f-4c06-9ab3-178961abd98a_812x.progressive.jpg?v=1661094210',
    originalPrice: 3900,
    salePrice: null,
    rating: 5,
    description: 'Gaiam Performance 55cm Balanceball. Use the Gaiam Balanceball to improve your body’s core strength and natural balance while getting trim and toned.',
    collections: ['equipment', 'weight-training', 'medicine-balls-kettlebells']
  },
  {
    id: 13,
    name: '65cm Medicine Ball',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/41c20eead73003507586f01303e406a2_812x.progressive.jpg?v=1661094122',
    originalPrice: 3900,
    salePrice: null,
    rating: 5,
    description: 'Gaiam Performance 65cm Balanceball. Use the Gaiam Balanceball to improve your body’s core strength and natural balance while getting trim and toned.',
    collections: ['equipment', 'weight-training', 'medicine-balls-kettlebells']
  },
  {
    id: 14,
    name: '75cm Medicine Ball',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/6d6cb8a80a17df795497e2a6a089aaf4_812x.progressive.jpg?v=1661094128',
    originalPrice: 3900,
    salePrice: 2900,
    rating: 5,
    description: 'Gaiam Performance 75cm Balanceball. Use the Gaiam Balanceball to improve your body’s core strength and natural balance while getting trim and toned.',
    collections: ['equipment', 'weight-training', 'medicine-balls-kettlebells']
  },
  {
    id: 15,
    name: '8kg Kettlebell',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/98dcb8b4d0ee84c48234b3bb91028254_812x.progressive.jpg?v=1660954111',
    originalPrice: 6500,
    salePrice: null,
    rating: 4,
    description: 'Domyos 8kg Kettlebell. Our design team developed this kettlebell specifically for cross training. Combine muscle strengthening and cardio training! KETTLEBELL workouts give you more strength, more power but also more flexibility and resistance.',
    collections: ['equipment', 'weight-training', 'medicine-balls-kettlebells']
  },
  {
    id: 16,
    name: '12kg Kettlebell',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/48e9619ed9804384995ef98a02d33e63_812x.progressive.jpg?v=1660954094',
    originalPrice: 8000,
    salePrice: 7200,
    rating: 4.5,
    description: 'Domyos 12kg Kettlebell. Our design team developed this kettlebell specifically for cross training. Combine muscle strengthening and cardio training! KETTLEBELL workouts give you more strength, more power but also more flexibility and resistance.',
    collections: ['equipment', 'weight-training', 'medicine-balls-kettlebells']
  },
  {
    id: 17,
    name: '16kg Kettlebell',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/745a456ec7a1632b1335a97a99919683_812x.progressive.jpg?v=1660954094',
    originalPrice: 9500,
    salePrice: null,
    rating: 4.5,
    description: 'Domyos 16kg Kettlebell. Our design team developed this kettlebell specifically for cross training. Combine muscle strengthening and cardio training! KETTLEBELL workouts give you more strength, more power but also more flexibility and resistance.',
    collections: ['equipment', 'weight-training', 'medicine-balls-kettlebells']
  },
  {
    id: 18,
    name: 'Door Pull Up Bar',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/df631e6d8c59efd1225faca07080bee4_740x.progressive.jpg?v=1660942340',
    originalPrice: 6000,
    salePrice: 2000,
    rating: 4,
    description: 'Domyos Door Pull Bar. Our team designed this pull-up bar for bodyweight training: pull-ups, press-ups and dips. Use any grip you want: wide, narrow or hammer.',
    collections: ['equipment', 'calisthenics', 'pull-up-bars', 'bestsellers']
  },
  {
    id: 19,
    name: 'Pull Up Bar (70-95cm)',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/f17ed2f582943a07a32e2f8ac8793e66_740x.progressive.jpg?v=1660944586',
    originalPrice: 5500,
    salePrice: null,
    rating: 4.5,
    description: 'Domyos 70-95cm Door Pull Up Bar. Our passionate weight training team designed this pull-up bar for easy bodyweight workouts at home.',
    collections: ['equipment', 'calisthenics', 'pull-up-bars']
  },
  {
    id: 20,
    name: 'Pull Up Bar (95-100cm)',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/f17ed2f582943a07a32e2f8ac8793e66_acd4ba92-7dab-40df-909c-fac53f33180e_812x.progressive.jpg?v=1660944591',
    originalPrice: 3500,
    salePrice: 1500,
    rating: 4.5,
    description: 'Domyos 95-100cm Door Pull Up Bar. Our passionate weight training team designed this pull-up bar for easy bodyweight workouts at home.',
    collections: ['equipment', 'calisthenics', 'pull-up-bars']
  },
  {
    id: 21,
    name: 'Dip Bars',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/d63e666320431d1406ec7e42ce16cbd4_740x.progressive.jpg?v=1660946152',
    originalPrice: 9000,
    salePrice: null,
    rating: 4,
    description: 'Domyos Dip Bar (pair). Our team designed this compact dip bar station to help you build upper body strength at home. Mobile, compact and complete parallel bars that let you work your entire body using static and dynamic bodyweight exercises.',
    collections: ['equipment', 'calisthenics', 'pull-up-bars']
  },
  {
    id: 22,
    name: 'Gymnastic Rings',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/8361eafe0e6cc55c7db05df6d7936402_812x.progressive.jpg?v=1660973401',
    originalPrice: 7500,
    salePrice: null,
    rating: 4,
    description: 'Cross Training Wooden Rings. These rings have been developed for cross training by our design teams. Practical, lightweight, and easy to move for training anywhere. Made from birch wood for a natural grip.',
    collections: ['equipment', 'calisthenics', 'pull-up-bars']
  },
  {
    id: 23,
    name: '15kg Resistance Bands',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/17b4c18b0fb832949cddb4d276ee0663_812x.progressive.jpg?v=1660986611',
    originalPrice: 2000,
    salePrice: null,
    rating: 4.5,
    description: 'Domyos 15kg Resistance Bands. Our design teams developed this elastic band for your weight training, cross training, or physical preparation sessions.',
    collections: ['equipment', 'calisthenics', 'resistance-bands']
  },
  {
    id: 24,
    name: '25kg Resistance Bands',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/cba7ebdcbe8ce4bcbf0499fcd4b91e92_670x.progressive.jpg?v=1660986645',
    originalPrice: 3000,
    salePrice: 2500,
    rating: 4,
    description: 'Domyos 25kg Resistance Bands. Our design teams developed this elastic band for your weight training, cross training, or physical preparation sessions.',
    collections: ['equipment', 'calisthenics', 'resistance-bands']
  },
  {
    id: 25,
    name: '35kg Resistance Bands',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/906ee0d4359a5df46bb98f549fbe6a73_812x.progressive.jpg?v=1660986606',
    originalPrice: 4000,
    salePrice: null,
    rating: 4,
    description: 'Domyos 35kg Resistance Bands. Our design teams developed this elastic band for your weight training, cross training, or physical preparation sessions.',
    collections: ['equipment', 'calisthenics', 'resistance-bands']
  },
  {
    id: 26,
    name: '45kg Resistance Bands',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/c120a36246ba3e5e8b407ad82815f6cc_812x.progressive.jpg?v=1660986611',
    originalPrice: 4500,
    salePrice: null,
    rating: 4.5,
    description: 'Domyos 45kg Resistance Bands. Our design teams developed this elastic band for your weight training, cross training, or physical preparation sessions.',
    collections: ['equipment', 'calisthenics', 'resistance-bands']
  },
  {
    id: 27,
    name: '5kg Adjustable Weight Vest',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/c65d78f889c06d6c8504db64fbdd90ec_812x.progressive.jpg?v=1661012610',
    originalPrice: 5000,
    salePrice: null,
    rating: 4.5,
    description: 'Domyos 5kg Adjustable Weight Vest. Intensify your bodyweight exercises and improve your muscular endurance.',
    collections: ['equipment', 'calisthenics', 'weight-vests']
  },
  {
    id: 28,
    name: '10kg Adjustable Weight Vest',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/ac6e2ff8cfe2157b230fef1e6a0a81ae_812x.progressive.jpg?v=1661012498',
    originalPrice: 10000,
    salePrice: null,
    rating: 4.5,
    description: 'Domyos 10kg Adjustable Weight Vest. Intensify your bodyweight exercises and improve your muscular endurance.',
    collections: ['equipment', 'calisthenics', 'weight-vests']
  },
  {
    id: 29,
    name: '30kg Adjustable Weight Vest',
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/e4ea87a408cc1b34faf75679110dd84e_812x.progressive.jpg?v=1661091751',
    originalPrice: 20000,
    salePrice: 15000,
    rating: 5,
    description: 'Force USA 30kg Adjustable Weight Vest. Wearing a weight vest is a functional and safe way to add resistance to your cardio workout.',
    collections: ['equipment', 'calisthenics', 'weight-vests']
  },
  {
    id: 30,
    name: `Nike Men's Running Shoes`,
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dwf760094b/images/61560801/Rebel_61560801_blackwhite_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 11000,
    salePrice: null,
    rating: 5,
    description: `Any time is the perfect time to get started. The Nike Revolution 6 Next Nature deliver versatile comfort, perfect to help build a passion for running. A soft foam cushions every step for a comfortable run with the outsole engineered for flexibility. Plush mesh creates a comfortable fit that lets feet breathe throughout every run. Taking a favourite model and making it more comfortable, the Revolution 6 are engineered to be reached for every morning.`,
    collections: ['equipment', 'running', 'running-shoes', 'bestsellers']
  },
  {
    id: 31,
    name: `Nike Women's Running Shoes`,
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw390fbf8a/images/63762001/Rebel_63762001_whitesilver_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 11000,
    salePrice: null,
    rating: 5,
    description: `Nike's most tested shoe, quickly became it's most beloved by runners. Take the next step forwards with the Nike React Infinity Run Flyknit 3. The Infinity Run Flyknit 3 retains the high-stacked React midsole with its rocker shaping for a smooth running sensation, built to help keep runners on the track.`,
    collections: ['equipment', 'running', 'running-shoes']
  },
  {
    id: 32,
    name: `Adidas Men's Running Shoes`,
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dwf248b0b2/images/59485801/Rebel_59485801_blackwhite_hi-res.jpg?sw=558&sh=558&sm=fit',
    originalPrice: 10000,
    salePrice: 9000,
    rating: 4,
    description: `No matter your motivation, the adidas Fluidstreet Running Shoes will have you feeling good on your feet. Built on a plush bed of Cloudfoam, the Fluidstreet keep feet fresh thanks to their lightweight mesh upper. Simple and comfortable, the Fluidstreet are the right running choice.`,
    collections: ['equipment', 'running', 'running-shoes']
  },
  {
    id: 33,
    name: `Adidas Women's Running Shoes`,
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dwff784fca/images/62432801/Rebel_62432801_pink_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 20000,
    salePrice: null,
    rating: 4.5,
    description: `Built on a thick bed of Boost cushioning, the Ultraboost 22 are engineered to deliver smooth, responsive strides. Crafted in a rocker shape with a new LEP system, they smooth transitions and deliver a snappier, more responsive sensation through transitions. This helps runners preserve their energy, allowing them to push the pace harder or strive for longer distances. Get moving and fall in love with running in the Ultraboost 22.`,
    collections: ['equipment', 'running', 'running-shoes']
  },
  {
    id: 34,
    name: `Asics Men's Running Shoes`,
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dwe8b49999/images/62829101/Rebel_62829101_blackgreen_hi-res.jpg?sw=1000&sh=1000&sm=fit',
    originalPrice: 14000,
    salePrice: 10000,
    rating: 4,
    description: `Not everyone can run every day, the Asics GEL Excite 9 is built for runners that want a comfortable shoe, built for active days. Whether those active days include a run, or just a busy day on your feet. The Asics GEL Excite 9's soft engineered jacquard mesh upper is highly breathable to help feet stay cool and comfortable. GEL technology in the rearfoot and a full-length Amplifoam cushioning midsole create flexible cushioning to absorb the shock of footfalls. Stay on your feet and feel fresher throughout your day in the Asics GEL Excite 9.`,
    collections: ['equipment', 'running', 'running-shoes']
  },
  {
    id: 35,
    name: `Asics Women's Running Shoes`,
    url: 'https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dwd656e83d/images/63485801/Rebel_63485801_blackrosegold_hi-res.jpg?sw=558&sh=558&sm=fit',
    originalPrice: 14000,
    salePrice: null,
    rating: 4.5,
    description: `Head off-road in the Asics GEL Venture 8 Running Shoes. Built to get dirty, the GEL Venture 8 feature a new lug arrangement to deliver better grip on dirt tracks. Their GEL cushioning absorbs shock underfoot and the upper features less overlays to help keep you feeling light on your feet.`,
    collections: ['equipment', 'running', 'running-shoes']
  },
  {
    id: 36,
    name: `Running Beanie`,
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/99a2cc3ca21209c61efb97fc2e6c85db_812x.progressive.jpg?v=1661103629',
    originalPrice: 2900,
    salePrice: 1900,
    rating: 4.5,
    description: `2XU Running Beanie. 2XU Running Beanie. Run Beanie features a lightweight, brushed thermal fabric, that is moisture-wicking to keep your head warm and dry all winter long`,
    collections: ['equipment', 'running', 'running-accessories']
  },
  {
    id: 37,
    name: `Running Belt`,
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/342ebb93fe5cf933f3a9505a2c7eacf1_812x.progressive.jpg?v=1661103597',
    originalPrice: 2900,
    salePrice: null,
    rating: 4,
    description: `Run Belt. 2XU RUN BELT BLK/BLK. Run Belt is designed for comfort to sit flat against the body with ample storage for a phone and keys in its secure zip pocket.`,
    collections: ['equipment', 'running', 'running-accessories']
  },
  {
    id: 38,
    name: `Running Gloves`,
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/e2ff7174babd08f5eae792c45ee05a31_6bfb6ec3-1568-430a-9918-6ce6dcef9e70_812x.progressive.jpg?v=1661098729',
    originalPrice: 3500,
    salePrice: null,
    rating: 5,
    description: `2XU Run Glove. 2XU Moisture-wicking and quick-drying makes it easy to recover from any activity. The 2XU Run Glove features a lightweight, brushed thermal fabric, that is moisture-wicking and touch screen compatible so you can keep cold hands at bay all winter long.`,
    collections: ['equipment', 'running', 'running-accessories']
  },
  {
    id: 40,
    name: `White Smart Watch`,
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/c06db5053192bae8e118283c1cd91358_812x.progressive.jpg?v=1661093291',
    originalPrice: 58000,
    salePrice: null,
    rating: 4.5,
    description: `Garmin Forerunner 245 Running Smart Watch White. MUSIC FOR THE EXTRA MILE
    You do the running. This GPS running smartwatch does the thinking. It even gets to know you, mile after mile and song after song.`,
    collections: ['equipment', 'running', 'running-accessories']
  },
  {
    id: 41,
    name: `Black Smart Watch`,
    url: 'https://cdn.shopify.com/s/files/1/0066/6563/3903/products/1c5ac8409226694687042cb3e17f8dd3_812x.progressive.jpg?v=1661090842',
    originalPrice: 58000,
    salePrice: 45000,
    rating: 4.5,
    description: `Garmin Forerunner 245 Running Smart Watch Black. MUSIC FOR THE EXTRA MILE
    You do the running. This GPS running smartwatch does the thinking. It even gets to know you, mile after mile and song after song.`,
    collections: ['equipment', 'running', 'running-accessories']
  },
  {
    id: 42,
    name: `Apex T-Shirt`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/ApexSsT-Shirt_Cs_OnyxGrey-CourtBlue-A1A8U-GBH5.A_600x.jpg?v=1660139239',
    originalPrice: 6500,
    salePrice: null,
    rating: 4.5,
    description: `Intense training requires durable, reliable performance wear. That's why Apex is designed with strategically placed heat-mapping zones to keep you cool and dry throughout your training.`,
    collections: ['clothing', 'men', 'men-shirts-tops', 'bestsellers']
  },
  {
    id: 43,
    name: `Apex Seamless T-Shirt`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/ApexLST-shirt_Seamless_-CherryBrownPepperRedA1A8H-NBL11_600x.jpg?v=1660744441',
    originalPrice: 6500,
    salePrice: null,
    rating: 4,
    description: `Apex is built to keep you cool so you're free to focus on your best performance yet: no distractions, no exceptions. Heat-mapping ventilation supports you through the toughest training sessions. Sweat-wicking, breathable fabrics offer comfort when your training won’t. Because no matter where you train, Apex is coming with you. And it’s here till you reach your best.`,
    collections: ['clothing', 'men', 'men-shirts-tops']
  },
  {
    id: 44,
    name: `Sport Stripe Long Sleeve T-Shirt`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/SportLsT-ShirtOnyxGreyA1A9B-GBCY.A_600x.jpg?v=1652713844',
    originalPrice: 5500,
    salePrice: 3500,
    rating: 5,
    description: `Sport. Durable, breathable, never-want-to-take-offable. This collection’s been made for those who love to play sport. The pique fabric is lightweight and durable, keeping you cool and keeping up with however you play. Oh, and it’s super comfortable too. Then, it’s all finished off with sleek angled panels and colour pops for a classic sport aesthetic. Because it doesn’t matter if you’re playing to win or playing for fun - take playing seriously.`,
    collections: ['clothing', 'men', 'men-shirts-tops']
  },
  {
    id: 45,
    name: `Crest T-Shirt`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/CrestSST-Shirt-PebbleGreyA1A3J-GBC010_600x.jpg?v=1660148924',
    originalPrice: 3500,
    salePrice: null,
    rating: 5,
    description: `If rest day were a range, it’d probably be Crest. Consistently comfortable and casually stylish, you can wear it anywhere and pair it with anything. A durable embroidered logo keeps it looking fresh no matter how many times you wear it, and a warm, incredibly soft interior keeps you comfortable however you spend your down time.`,
    collections: ['clothing', 'men', 'men-shirts-tops']
  },
  {
    id: 46,
    name: `Arrival T-Shirt`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/ArrivalRegSST-Shirt-AtlanticBlueA2A1J-UBPH21.A_600x.jpg?v=1660139271',
    originalPrice: 3000,
    salePrice: null,
    rating: 4.5,
    description: `Arrival is your chance to realise everything you’re capable of. Created to encourage you to aspire more, perform more and achieve more, this collection features sweat-wicking tech, lightweight material, and plenty of styles and sizes to match your conditioning goals and needs.`,
    collections: ['clothing', 'men', 'men-shirts-tops']
  },
  {
    id: 47,
    name: `Form T-Shirt`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/LiftingSsT-ShirtBlackA2A1CA2A1C-BBBB13_600x.jpg?v=1656670885',
    originalPrice: 5500,
    salePrice: 3500,
    rating: 4,
    description: `The Form collection is made for lifting. A lightweight, sweat-wicking fabric pairs with mesh panels for ventilation, silicone graphics to help grip the barbell, and side splits for ease of movement. No distractions. No limits.`,
    collections: ['clothing', 'men', 'men-shirts-tops']
  },
  {
    id: 48,
    name: `Critical T-Shirt`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/CriticalSlimSsT-ShirtRep-M-A0017BlackA1A3H-A1A3H-BBGW.A-Edit.HK_600x.jpg?v=1649232541',
    originalPrice: 4000,
    salePrice: null,
    rating: 4.5,
    description: `Basic-yet-functional, Critical gets the job done, every time. Stretchy materials allow full freedom of movement through every lift, a minimalist design means you’ll have full focus on your training, and physique-accentuating seams provide an understated lifting aesthetic. Train your hardest, and Critical will never let you down.`,
    collections: ['clothing', 'men', 'men-shirts-tops']
  },
  {
    id: 49,
    name: `Geo Seamless Long Sleeve T-Shirt`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/GeoSeamlessLsTBlackCharcoalGreyA2A4JA2A4J-BBF9.A-Edit_BK_600x.jpg?v=1652175938',
    originalPrice: 5500,
    salePrice: null,
    rating: 5,
    description: `Release your movement and reimagine your capabilities in the Geo Lightweight Seamless Long Sleeve T-Shirt. Add a new level of freedom and focus to your training with the lightweight polyester-nylon construction, sweat-wicking capabilities and breathable mesh structures of this gym top. Then stand out when you do with muscle-shaping raglan sleeves and an all-over camo pattern.`,
    collections: ['clothing', 'men', 'men-shirts-tops']
  },
  {
    id: 50,
    name: `Critical Hoodie`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/CriticalSlimHoodieRep-M-A0017BlackA1A1I-A1A1I-BBGW.A1-Edit_BK_600x.jpg?v=1650961698',
    originalPrice: 6500,
    salePrice: null,
    rating: 5,
    description: `Basic-yet-functional, Critical gets the job done, every time. Stretchy materials allow full freedom of movement through every lift, a minimalist design means you’ll have full focus on your training, and physique-accentuating seams provide an understated lifting aesthetic. Train your hardest, and Critical will never let you down.`,
    collections: ['clothing', 'men', 'men-hoodies-jackets']
  },
  {
    id: 51,
    name: `Crest Hoodie`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/CrestHoodieNavyA1A1K13.A-EditTIFF_IS_82e58378-c595-4852-818f-7d5cfa675046_600x.jpg?v=1644330853',
    originalPrice: 6500,
    salePrice: 4500,
    rating: 4,
    description: `The Crest Hoodie is an essential layer for the workout commute or to complete any gym style. Boasting a warm, incredibly soft interior, adjustable drawcord hood for customisable comfort, and a minimalist design, you can’t go wrong with this hoodie.`,
    collections: ['clothing', 'men', 'men-hoodies-jackets']
  },
  {
    id: 52,
    name: `Arrival Zip Up Hoodie`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/ArrivalZipUpHoodieCoreOliveA1A6J-EBF1.A_ZH_ZH_600x.jpg?v=1652175899',
    originalPrice: 6500,
    salePrice: null,
    rating: 4.5,
    description: `Always be ready to work out with a purpose in the Arrival Zip Up Hoodie. This easy-to-wear hoodie comes in a slim fit, long sleeve design to look good with any workout fit. Throw this on and layer up to workout in comfort and style.`,
    collections: ['clothing', 'men', 'men-hoodies-jackets']
  },
  {
    id: 53,
    name: `Power Zip Hoodie`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/PowerZipHoodieRep-M-A0011BlackBlackA1A3N-BBH022_600x.jpg?v=1657188071',
    originalPrice: 8500,
    salePrice: null,
    rating: 4.5,
    description: `The Power collection is made to fail with you, time and time again. Durable, stretchy fabrics will support you through every lift and graphic patterns make every fail look and feel epic. Lifting-specific designs and detailing mean zero distractions, so you can surpass your limits fully focused. Perfect pump covers, and ultra flattering shapes so you can show off your hard work. Power. With you until failure.`,
    collections: ['clothing', 'men', 'men-hoodies-jackets']
  },
  {
    id: 54,
    name: `Speed Evolve Windbreaker`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/RunningWindbreakerPapayaOrangeA2A9UA2A9U-OBC71A-Edit_BK_600x.jpg?v=1649232561',
    originalPrice: 8500,
    salePrice: 5500,
    rating: 3,
    description: `Take your goals in your stride with Speed. With lightweight materials and a zero-distraction construction, you’ll stay cool, dry and ready to focus on nothing but your goals. Because whatever your reason for running, Speed gets you there.`,
    collections: ['clothing', 'men', 'men-hoodies-jackets']
  },
  {
    id: 55,
    name: `Critical 2.0 Hoodie`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/CriticalSlimHoodieLightGreyCoreMarlA1A1I10.A_ZH_GB_c618d7eb-84a0-4921-8a4a-1652a48f2ffd_600x.jpg?v=1648824018',
    originalPrice: 6500,
    salePrice: null,
    rating: 4,
    description: `The Critical 2.0 Hoodie keeps the focus on training. Whether it’s to support your pre-workout stretching or for the times you just want to sweat your way through a training session, it’s the gym pullover you’ll rely on time and time again.`,
    collections: ['clothing', 'men', 'men-hoodies-jackets']
  },
  {
    id: 56,
    name: `Arrival 7" Shorts`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/ArrivalSlim7ShortSilhouetteGreyA2A1L-GBP45.A_600x.jpg?v=1660139260',
    originalPrice: 4500,
    salePrice: null,
    rating: 5,
    description: `Arrival is your chance to realise everything you’re capable of. Created to encourage you to aspire more, perform more and achieve more, this collection features sweat-wicking tech, lightweight material, and plenty of styles and sizes to match your conditioning goals and needs.`,
    collections: ['clothing', 'men', 'men-shorts-pants']
  },
  {
    id: 57,
    name: `Studio Shorts`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/StudioShortCherryBrown-A1A4H-NBCF.A_ZH_ZH_600x.jpg?v=1650450060',
    originalPrice: 6000,
    salePrice: null,
    rating: 4.5,
    description: `When you’re always on the move, you need clothes that’ll move with you. With high-stretch, lightweight fabrics for full freedom of movement and a buttery soft feel for all-out comfort, Studio’s got your back. Not just for your next mobility session, but for whatever else your day throws at you, too.`,
    collections: ['clothing', 'men', 'men-shorts-pants']
  },
  {
    id: 58,
    name: `Critical 7" Shorts`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/CriticalSlim7inchShortBlack-A2A2V-BBBB4-Edit_AS_600x.jpg?v=1660139308',
    originalPrice: 5500,
    salePrice: 4000,
    rating: 4,
    description: `Basic-yet-functional, Critical gets the job done, every time. Stretchy materials allow full freedom of movement through every lift, a minimalist design means you’ll have full focus on your training, and physique-accentuating seams provide an understated lifting aesthetic. Train your hardest, and Critical will never let you down.`,
    collections: ['clothing', 'men', 'men-shorts-pants']
  },
  {
    id: 59,
    name: `Crest Shorts`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/CRESTSHORTNAVY803.A-Edit_ZH_ZH_f4466ff1-a3fc-4602-89ef-78b343a2b302_600x.jpg?v=1657105193',
    originalPrice: 5500,
    salePrice: null,
    rating: 5,
    description: `If rest day were a piece of clothing, it would probably be these shorts, whether you’re out and about or strictly in front of the TV. A drawcord waist for adjustable comfort, three pockets for storage, and a warm, incredibly soft interior make the Crest Shorts exactly what you need for your next rest day.`,
    collections: ['clothing', 'men', 'men-shorts-pants']
  },
  {
    id: 60,
    name: `Map Print Shorts`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/GFXTrendAOPShort-REP-M-A0026MidnightBlackA3A3S-BBTC5_600x.jpg?v=1657623699',
    originalPrice: 5500,
    salePrice: null,
    rating: 4,
    description: `A piece you can pair with anything doesn’t have to be boring. That’s where the latest Graphic collection steps in. This simple, stylish design can be worn for work or play, whilst the Gymshark graphic print adds a touch of individuality to your look. Say hello to your new staple item.`,
    collections: ['clothing', 'men', 'men-shorts-pants']
  },
  {
    id: 61,
    name: `Sport Stripe 7" Shorts`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/SportShortGraphicCourtBlue-A1A9T-UBDN.A-Edit_BK_600x.jpg?v=1649232569',
    originalPrice: 5500,
    salePrice: 4000,
    rating: 4,
    description: `Sport. Durable, breathable, never-want-to-take-offable. This collection’s been made for those who love to play sport. The pique fabric is lightweight and durable, keeping you cool and keeping up with however you play. Oh, and it’s super comfortable too. Then, it’s all finished off with sleek angled panels and colour pops for a classic sport aesthetic. Because it doesn’t matter if you’re playing to win or playing for fun - take playing seriously.`,
    collections: ['clothing', 'men', 'men-shorts-pants']
  },
  {
    id: 62,
    name: `Adapt Seamless Crop Top`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/ADAPTCAMOSEAMLESSSSCROPTOP-AloeGreenMossOliveB4A2T-EBZP22.A_600x.jpg?v=1661176274',
    originalPrice: 7000,
    salePrice: null,
    rating: 5,
    description: `It’s time to complete your latest workout mission in Adapt Camo. A refreshed camo jacquard meets our signature seamless fabric to create your perfect training partner. And with plenty of styles, versatile colours, and sweat-wicking tech to keep you cool and dry, Adapt Camo’s here to help you reach your best.`,
    collections: ['clothing', 'women', 'women-shirts-tops']
  },
  {
    id: 63,
    name: `Rest Day Cropped Pullover`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/RESTDAYSWEATSCROPPULLOVER-BlackCoreMarlB3A9W-BBBC.A_600x.jpg?v=1660139396',
    originalPrice: 9500,
    salePrice: 7000,
    rating: 4.5,
    description: `Rest up in Rest Day Sweats. This versatile collection is designed with our thickest, heaviest fabric yet so you can feel the difference when you wear it. The clean aesthetic makes it the next staple look in your wardrobe. Wear your Rest Day Sweats to and from the gym, to warm up, or just about anywhere on your next rest day.`,
    collections: ['clothing', 'women', 'women-shirts-tops']
  },
  {
    id: 64,
    name: `Apex Seamless Crop Top`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/ApexSeamlessCropTopOnyxGrey-BlackB3A4T-GBHX1_600x.jpg?v=1660139229',
    originalPrice: 9500,
    salePrice: null,
    rating: 4,
    description: `Apex is built to keep you cool so you're free to focus on your best performance yet: no distractions, no exceptions. Heat-mapping ventilation supports you through the toughest training sessions. Sweat-wicking, breathable fabrics offer comfort when your training won’t. Functional, zero-distraction designs are made to match your every move. Because no matter where you train, Apex is coming with you. And it’s here till you reach your best.`,
    collections: ['clothing', 'women', 'women-shirts-tops']
  },
  {
    id: 65,
    name: `Apex Seamless Top`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/ApexSeamlessSsTopAtlanticBlue-SharkBlueB4A2Y-UBP61_600x.jpg?v=1660308969',
    originalPrice: 7500,
    salePrice: null,
    rating: 4,
    description: `Apex is built to keep you cool so you're free to focus on your best performance yet: no distractions, no exceptions. Heat-mapping ventilation supports you through the toughest training sessions. Sweat-wicking, breathable fabrics offer comfort when your training won’t. Functional, zero-distraction designs are made to match your every move. Because no matter where you train, Apex is coming with you. And it’s here till you reach your best.`,
    collections: ['clothing', 'women', 'women-shirts-tops']
  },
  {
    id: 66,
    name: `Training Long Sleeve Crop Top`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/TRAININGLONGSLEEVECROPTOP-CoreOliveB2A4F-EBF13_c1ef1e65-ba06-41fa-ae4d-d7315c53a83a_600x.jpg?v=1660139494',
    originalPrice: 5500,
    salePrice: 3500,
    rating: 4.5,
    description: `The collection full of colour pop pieces and mix and match designs, Training is your go-to whatever your session. Rely on the simple, sleek designs to carry you through your workout, gym commute and anywhere in between. Go bold and mix and match your favourite colours or build your wardrobe around the basics.`,
    collections: ['clothing', 'women', 'women-shirts-tops']
  },
  {
    id: 67,
    name: `Vital Seamless Crop Top`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/VitalSeamlessWCropTopBakedMaroonMarlB1A3D-NBLL1.A1_600x.jpg?v=1658763592',
    originalPrice: 6500,
    salePrice: null,
    rating: 5,
    description: `Whatever conditioning means to you, Vital’s got something to help you feel, and perform, your best. Seamless designs mean comfort and confidence from workout to time out. Lightweight fabrics in the looser designs mean fewer distractions. And sweat-wicking tech paired with breathable marl mesh dots mean you’ll be cool, dry and focused on the days you’re moving more. Because you can do it all, and so can Vital.`,
    collections: ['clothing', 'women', 'women-shirts-tops']
  },
  {
    id: 68,
    name: `Studio T-Shirt`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/StudioWShortSleeveTopCoconutWhite-B1A7A-WBBB.A_600x.jpg?v=1656931671',
    originalPrice: 7000,
    salePrice: null,
    rating: 4,
    description: `With soft, smooth and stretchy materials for that second skin feel, Studio fits flawlessly into your day. Bright colours and bold designs make sure you never fade into the crowd. And the perfect zero-distraction designs allow you to focus on your form in the studio, and your flow, wherever you go.`,
    collections: ['clothing', 'women', 'women-shirts-tops']
  },
  {
    id: 69,
    name: `Sport Midi T-Shirt`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/SportWSsTeeBaliGreenB2A8Q-EBFZ.A-Edit_ZH_600x.jpg?v=1652886884',
    originalPrice: 5000,
    salePrice: null,
    rating: 4.5,
    description: `Durable, breathable, and never-want-to-take-offable. This is Sport, the collection made for those who love to play. Keep focused on your game in lightweight, breathable fabrics with mesh panelling to maximise air flow. Stay cool, calm and comfy with your head in the game. Because we take playing seriously.`,
    collections: ['clothing', 'women', 'women-shirts-tops']
  },
  {
    id: 70,
    name: `Apex Seamless Sports Bra`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/APEXSEAMLESSSPORTSBRA-SharkBlueAtlanticBlueB3A4R-UBP43_600x.jpg?v=1660139234',
    originalPrice: 9500,
    salePrice: null,
    rating: 5,
    description: `Apex is built to keep you cool so you're free to focus on your best performance yet: no distractions, no exceptions. Heat-mapping ventilation supports you through the toughest training sessions. Sweat-wicking, breathable fabrics offer comfort when your training won’t. Functional, zero-distraction designs are made to match your every move. Because no matter where you train, Apex is coming with you. And it’s here till you reach your best.`,
    collections: ['clothing', 'women', 'women-sports-bras']
  },
  {
    id: 71,
    name: `Scoop Neck Sports Bra`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/ScoopNeckTrainingSportsBraPepperRedB2A7D-RBHF5copy_600x.jpg?v=1658763565',
    originalPrice: 6500,
    salePrice: 5000,
    rating: 4,
    description: `Your training requires the right amount of support. With lightweight, breathable designs, comfortable cups and supportive straps, you can rely on our sports bras to be there for you, and for yours. Layer your look under a top or wear alone with your favourite leggings or shorts. No matter what, you’re free to focus on nothing but your performance.`,
    collections: ['clothing', 'women', 'women-sports-bras']
  },
  {
    id: 72,
    name: `Adapt Seamless Sports Bra`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/ADAPTCAMOSEAMLESSSPORTSBRA-A0105StormRedCherryBrownB3A4D-RBLM41.A_600x.jpg?v=1661176282',
    originalPrice: 7500,
    salePrice: null,
    rating: 4.5,
    description: `It’s time to complete your latest workout mission in Adapt Camo. A refreshed camo jacquard meets our signature seamless fabric to create your perfect training partner. And with plenty of styles, versatile colours, and sweat-wicking tech to keep you cool and dry, Adapt Camo’s here to help you reach your best.`,
    collections: ['clothing', 'women', 'women-sports-bras']
  },
  {
    id: 73,
    name: `Minimal Sports Bra`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/OPTION3_MINIMAL_TRAININGSPORTSBRA-CoastalBlueB3A2J-UBPP.A_600x.jpg?v=1658763562',
    originalPrice: 4500,
    salePrice: null,
    rating: 5,
    description: `Your training requires the right amount of support. With lightweight, breathable designs, comfortable cups and supportive straps, you can rely on our sports bras to be there for you, and for yours. Layer your look under a top or wear alone with your favourite leggings or shorts. No matter what, you’re free to focus on nothing but your performance.`,
    collections: ['clothing', 'women', 'women-sports-bras']
  },
  {
    id: 74,
    name: `Vital Seamless V Neck Sports Bra`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/VitalSeamlessSportsBraAwBakedMaroonMarlB3A4K-NBLL2.A1_1583e473-e1b8-4473-bf82-65480a9c7545_600x.jpg?v=1660139578',
    originalPrice: 8500,
    salePrice: 6500,
    rating: 4.5,
    description: `Whatever conditioning means to you, Vital’s got something to help you feel, and perform, your best. Seamless designs mean comfort and confidence from workout to time out. Lightweight fabrics in the looser designs mean fewer distractions. And sweat-wicking tech paired with breathable marl mesh dots mean you’ll be cool, dry and focused on the days you’re moving more. Because you can do it all, and so can Vital.`,
    collections: ['clothing', 'women', 'women-sports-bras']
  },
  {
    id: 75,
    name: `Studio Sports Bra`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/StudioSportsBraAppleGreen-B2A9Z-EBFX.A_600x.jpg?v=1656931669',
    originalPrice: 7500,
    salePrice: null,
    rating: 5,
    description: `With soft, smooth and stretchy materials for that second skin feel, Studio fits flawlessly into your day. Bright colours and bold designs make sure you never fade into the crowd. And the perfect zero-distraction designs allow you to focus on your form in the studio, and your flow, wherever you go.`,
    collections: ['clothing', 'women', 'women-sports-bras']
  },
  {
    id: 76,
    name: `Vital Seamless Leggings`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/VITALSEAMLESSLEGGINGSBLACK27.A_ZH_ZH_7dbf9c1a-c695-479e-b67f-3e822329d155_600x.jpg?v=1658993467',
    originalPrice: 8500,
    salePrice: null,
    rating: 5,
    description: `Train, sweat and perform in the Vital Seamless 2.0 Leggings. Combining a high-waisted fit, sweat-wicking fabric and seamless contours, they’re constructed to ensure confidence and support for a workout, with additional style for good measure.`,
    collections: ['clothing', 'women', 'women-pants-leggings']
  },
  {
    id: 77,
    name: `Adapt Seamless Leggings`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/AdaptCamoSeamlessLeggingsENG-L-A0059StormRed-CherryBrown-B3A6A-RBLK18.A-Edit_AS_600x.jpg?v=1661176277',
    originalPrice: 10000,
    salePrice: null,
    rating: 4,
    description: `It’s time to complete your latest workout mission in Adapt Camo. A refreshed camo jacquard meets our signature seamless fabric to create your perfect training partner. And with plenty of styles, versatile colours, and sweat-wicking tech to keep you cool and dry, Adapt Camo’s here to help you reach your best.`,
    collections: ['clothing', 'women', 'women-pants-leggings']
  },
  {
    id: 78,
    name: `Training Leggings`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/TRAININGLEGGINGS-PepperRedB2A8F-RBHF.A_600x.jpg?v=1658763577',
    originalPrice: 8000,
    salePrice: 6500,
    rating: 4.5,
    description: `The collection full of colour pop pieces and mix and match designs, Training is your go-to whatever your session. Rely on the simple, sleek designs to carry you through your workout, gym commute and anywhere in between. Go bold and mix and match your favourite colours or build your wardrobe around the basics.`,
    collections: ['clothing', 'women', 'women-pants-leggings']
  },
  {
    id: 79,
    name: `Rest Day Sweats Joggers`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/PremiumSweatsJoggerBlackCoreMarlB2A7Q-BBBC.A_ZH_ZH_600x.jpg?v=1639496871',
    originalPrice: 8500,
    salePrice: null,
    rating: 5,
    description: `Rest up in the Rest Day Sweats Joggers. These versatile joggers are designed with our thickest, heaviest fabric yet so you can feel the difference when you wear it. The clean aesthetic makes these joggers the next staple piece in your wardrobe. Wear them to and from the gym, to warm up, or just about anywhere on your next rest day too.`,
    collections: ['clothing', 'women', 'women-pants-leggings']
  },
  {
    id: 80,
    name: `Training Joggers`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/TRAININGJOGGERS-WinterTealB3A7R-TBBY.A_600x.jpg?v=1658763576',
    originalPrice: 7500,
    salePrice: 6000,
    rating: 4,
    description: `The collection full of colour pop pieces and mix and match designs, Training is your go-to whatever your session. Rely on the simple, sleek designs to carry you through your workout, gym commute and anywhere in between. Go bold and mix and match your favourite colours or build your wardrobe around the basics.`,
    collections: ['clothing', 'women', 'women-pants-leggings']
  },
  {
    id: 81,
    name: `Vital Seamless Joggers`,
    url: 'https://cdn.shopify.com/s/files/1/1693/6097/products/VitalSeamlessJoggerBakedMaroonMarlB3A8H-NBLL121.VitalSeamlessJoggerBakedMaroonMarlB3A8H-NBLL_600x.jpg?v=1660139560',
    originalPrice: 9500,
    salePrice: null,
    rating: 4.5,
    description: `Whatever conditioning means to you, Vital’s got something to help you feel, and perform, your best. Seamless designs mean comfort and confidence from workout to time out. The new looser, long-length styles offer full coverage for those who want it. And sweat-wicking tech mean you’ll be cool, dry and focused on the days you’re moving more. Because you can do it all, and so can Vital.`,
    collections: ['clothing', 'women', 'women-pants-leggings']
  },
]

app.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  res.send(
    products.find(product => +product.id === +id)
  )
})

app.get('/product/:id/recommended', async (req, res) => {
  const { id } = req.params;
  const product = products.find(product => +product.id === +id)
  const collection = product.collections[2]
  res.send(
    products
      .filter(product => +product.id !== +id && product.collections.includes(collection))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)
  )
})

app.get('/products/:collection', async (req, res) => {
  try {
    const { collection } = req.params
    res.send(
      products.filter(product => product.collections.includes(collection))
    )
  } catch (error) {
    res.status(500).json({ error: e.message })
  }
})

app.get('/offers', async (req, res) => {
  try {
    res.send(
      products
        .filter(product => product.salePrice > 0)
        .sort((a, b) => b.rating - a.rating)
    )
  } catch (error) {
    res.status(500).json({ error: e.message })
  }
})

// Handles any requests that don't match the ones above
// app.get('*', (req, res) =>{
//   res.sendFile(path.join(__dirname, 'build', 'index.html')); 
// });

app.post('/checkout', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => {
        const product = products.find(product => product.id === item.id)
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: [product.url]
            },
            unit_amount: product.salePrice || product.originalPrice
          },
          quantity: item.quantity
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))