import React from 'react';

const furnitureItems = [
  {
    id: 1,
    name: 'Furniture Item 1',
    description: 'Description for furniture item 1',
    image: '/path/to/image1.jpg',
  },
  {
    id: 2,
    name: 'Furniture Item 2',
    description: 'Description for furniture item 2',
    image: '/path/to/image2.jpg',
  },
  {
    id: 3,
    name: 'Furniture Item 3',
    description: 'Description for furniture item 3',
    image: '/path/to/image3.jpg',
  },
  {
    id: 4,
    name: 'Furniture Item 4',
    description: 'Description for furniture item 4',
    image: '/path/to/image4.jpg',
  },
  {
    id: 5,
    name: 'Furniture Item 5',
    description: 'Description for furniture item 5',
    image: '/path/to/image5.jpg',
  },
  {
    id: 6,
    name: 'Furniture Item 6',
    description: 'Description for furniture item 6',
    image: '/path/to/image6.jpg',
  },
];

const getRandomItems = (items, count) => {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Mobler = () => {
  const randomItems = getRandomItems(furnitureItems, 4);

  return (
    <section className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Random Furniture Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {randomItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mobler;