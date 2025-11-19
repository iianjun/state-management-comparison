import { type Product } from "@repo/shared";

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Running Shoes",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1519976691384-bd9c1d4a95fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbmVha2Vyc3xlbnwxfHx8fDE3NjMyOTk0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Footwear",
    description:
      "Lightweight and comfortable running shoes with advanced cushioning technology. Perfect for daily runs and athletic activities.",
    rating: 4.5,
    reivewCount: 128,
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzYzMjgxOTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Electronics",
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life. Crystal clear sound quality and comfortable fit.",
    rating: 4.8,
    reivewCount: 256,
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNofGVufDF8fHx8MTc2MzIxODYxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Electronics",
    description:
      "Advanced smart watch with health tracking, GPS, and water resistance. Monitor your fitness goals with precision.",
    rating: 4.6,
    reivewCount: 189,
  },
  {
    id: 4,
    name: "Travel Backpack",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1680039211156-66c721b87625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZ3xlbnwxfHx8fDE3NjMyODA5MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Accessories",
    description:
      "Durable and spacious travel backpack with multiple compartments. Perfect for adventures and daily commutes.",
    rating: 4.4,
    reivewCount: 95,
  },
  {
    id: 5,
    name: "Designer Sunglasses",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1663585703603-9be01a72a62a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjMyODUxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Accessories",
    description:
      "Stylish polarized sunglasses with UV protection. Classic design that complements any outfit.",
    rating: 4.7,
    reivewCount: 143,
  },
  {
    id: 6,
    name: "Ultra Laptop",
    price: 1299.99,
    image:
      "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjMyNTEyNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Electronics",
    description:
      "High-performance laptop with stunning display and all-day battery. Perfect for work and creative projects.",
    rating: 4.9,
    reivewCount: 312,
  },
  {
    id: 7,
    name: "Leather Jacket",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwamFja2V0JTIwZmFzaGlvbnxlbnwxfHx8fDE3NjM1MTMxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Clothing",
    description:
      "Classic leather jacket with modern fit. Genuine leather construction for timeless style and durability.",
    rating: 4.6,
    reivewCount: 87,
  },
  {
    id: 8,
    name: "Yoga Mat Pro",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1746796751590-a8c0f15d4900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0JTIwZml0bmVzc3xlbnwxfHx8fDE3NjM0NTg0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Sports",
    description:
      "Premium non-slip yoga mat with extra cushioning. Eco-friendly material perfect for all types of workouts.",
    rating: 4.5,
    reivewCount: 164,
  },
  {
    id: 9,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVldG9vdGglMjBzcGVha2VyfGVufDF8fHx8MTc2MzU1NzA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Electronics",
    description:
      "Waterproof Bluetooth speaker with powerful sound. 12-hour battery life for music on the go.",
    rating: 4.7,
    reivewCount: 203,
  },
  {
    id: 10,
    name: "Coffee Maker Deluxe",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1608354580875-30bd4168b351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlciUyMG1hY2hpbmV8ZW58MXx8fHwxNzYzNTMyNzkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Home",
    description:
      "Programmable coffee maker with thermal carafe. Brew perfect coffee every morning with ease.",
    rating: 4.4,
    reivewCount: 112,
  },
  {
    id: 11,
    name: "Ergonomic Office Chair",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1688578735972-b61ec274df7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrJTIwY2hhaXIlMjBvZmZpY2V8ZW58MXx8fHwxNzYzNTM2NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Home",
    description:
      "Comfortable office chair with lumbar support and adjustable features. Perfect for long work sessions.",
    rating: 4.8,
    reivewCount: 156,
  },
  {
    id: 12,
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMHN0YWlubGVzc3xlbnwxfHx8fDE3NjM1MDE4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Accessories",
    description:
      "Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof.",
    rating: 4.6,
    reivewCount: 289,
  },
  {
    id: 13,
    name: "Professional Camera",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1694055839361-302387897f17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBkaWdpdGFsJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzYzNTU3MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Electronics",
    description:
      "High-resolution digital camera with interchangeable lenses. Capture professional-quality photos and 4K video.",
    rating: 4.9,
    reivewCount: 178,
  },
  {
    id: 14,
    name: "Tennis Racket Elite",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1738141061812-09b52265981a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjByYWNrZXQlMjBzcG9ydHxlbnwxfHx8fDE3NjM1NTczMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Sports",
    description:
      "Lightweight carbon fiber tennis racket with enhanced power and control. Perfect for intermediate to advanced players.",
    rating: 4.7,
    reivewCount: 93,
  },
  {
    id: 15,
    name: "Winter Coat Premium",
    price: 189.99,
    image:
      "https://images.unsplash.com/photo-1760533091973-1262bf57d244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBjb2F0JTIwamFja2V0fGVufDF8fHx8MTc2MzU0MDYyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Clothing",
    description:
      "Insulated winter coat with water-resistant exterior. Stay warm and stylish during cold weather.",
    rating: 4.5,
    reivewCount: 124,
  },
  {
    id: 16,
    name: "Phone Case Designer",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1634878655694-d54b883770ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhc2UlMjBtb2Rlcm58ZW58MXx8fHwxNjM1MTkzODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Accessories",
    description:
      "Protective phone case with modern design. Drop protection with wireless charging compatibility.",
    rating: 4.3,
    reivewCount: 267,
  },
  {
    id: 17,
    name: "Electric Kettle Smart",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1609741892423-1ede732b247e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGtldHRsZSUyMGtpdGNoZW58ZW58MXx8fHwxNzYzNTQ1NTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Home",
    description:
      "Fast-boiling electric kettle with temperature control. Perfect for tea, coffee, and instant meals.",
    rating: 4.6,
    reivewCount: 198,
  },
  {
    id: 18,
    name: "LED Desk Lamp",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrJTIwbGFtcCUyMG1vZGVybnxlbnwxfHx8fDE3NjM0ODA3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Home",
    description:
      "Modern LED desk lamp with adjustable brightness and color temperature. Energy-efficient and eye-friendly.",
    rating: 4.5,
    reivewCount: 141,
  },
  {
    id: 19,
    name: "Gaming Mouse Pro",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NjM0Njc0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Electronics",
    description:
      "High-precision gaming mouse with customizable RGB lighting. Ergonomic design for extended gaming sessions.",
    rating: 4.8,
    reivewCount: 234,
  },
  {
    id: 20,
    name: "Classic Denim Jeans",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1602585198422-d795fa9bfd6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjM1NTEyMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Clothing",
    description:
      "Premium denim jeans with comfortable stretch fabric. Timeless style perfect for any casual occasion.",
    rating: 4.4,
    reivewCount: 176,
  },
];
