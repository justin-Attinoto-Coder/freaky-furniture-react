import Hero from '../../components/home/Hero';
   import NewsSection from '../../components/home/NewsSection';
   import Accordion from '../../components/common/Accordion';
   import ProductCard from '../../components/common/ProductCard';
   import PropTypes from 'prop-types';
   import '../../../src/index.css';
   const HomePage = ({ furnitureItems }) => {
     // Filter products to only include those with a publishing date within the past 7 days
     const filterRecentProducts = (products) => {
       const sevenDaysAgo = new Date();
       sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
       return products.filter(product => new Date(product.publishing_date) >= sevenDaysAgo);
     };

     // Filter products to only include those in the specified category
     const filterByCategory = (products, category) => {
       return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
     };

     // Shuffle the array and limit to 4 products
     const getRandomProducts = (products, limit) => {
       const shuffled = [...products].sort(() => 0.5 - Math.random());
       return shuffled.slice(0, limit);
     };

     const recentProducts = getRandomProducts(filterRecentProducts(furnitureItems), 4);
     const moblerProducts = getRandomProducts(filterByCategory(furnitureItems, 'Living Room'), 4);
     const forvaringProducts = getRandomProducts(filterByCategory(furnitureItems, 'Storage'), 4);
     const detaljerProducts = getRandomProducts(filterByCategory(furnitureItems, 'Office'), 4);
     const textilProducts = getRandomProducts(filterByCategory(furnitureItems, 'Textile'), 4);

     return (
       <div>
         <h1>Welcome to Freaky Furniture</h1>
         <Hero />
         <NewsSection products={recentProducts} />
         <div id="mobler" className="my-8">
           <h2 className="text-2xl font-bold mb-4">Möbler</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {moblerProducts.map(product => (
               <ProductCard key={product.id} product={product} />
             ))}
           </div>
         </div>
         <div id="forvaring" className="my-8">
           <h2 className="text-2xl font-bold mb-4">Förvaring</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {forvaringProducts.map(product => (
               <ProductCard key={product.id} product={product} />
             ))}
           </div>
         </div>
         <div id="detaljer" className="my-8">
           <h2 className="text-2xl font-bold mb-4">Detaljer</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {detaljerProducts.map(product => (
               <ProductCard key={product.id} product={product} />
             ))}
           </div>
         </div>
         <div id="textil" className="my-8">
           <h2 className="text-2xl font-bold mb-4">Textil</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {textilProducts.map(product => (
               <ProductCard key={product.id} product={product} />
             ))}
           </div>
         </div>
         <Accordion />
       </div>
     );
   };

   HomePage.propTypes = {
     furnitureItems: PropTypes.arrayOf(
       PropTypes.shape({
         id: PropTypes.number.isRequired,
         name: PropTypes.string.isRequired,
         description: PropTypes.string,
         image: PropTypes.string.isRequired,
         category: PropTypes.string,
         publishing_date: PropTypes.string,
       })
     ).isRequired,
   };

   export default HomePage;