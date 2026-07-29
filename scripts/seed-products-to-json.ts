import { products, categories } from '../constants/products';
import * as fs from 'fs';

fs.writeFileSync('/tmp/products.json', JSON.stringify(products, null, 2));
fs.writeFileSync('/tmp/categories.json', JSON.stringify(categories, null, 2));

console.log(`Exported ${products.length} products, ${categories.length} categories`);
