import 'dotenv/config'
import OpenAI from 'openai';

const product_list = `
# Fashion Shop Product List

## Women's Clothing:

- T-shirt  
  - Price: $20  
  - Available Sizes: Small, Medium, Large, XL  
  - Available Colors: Red, White, Black, Gray, Navy
  
- Elegant Evening Gown  
  - Price: $150  
  - Available Sizes: Small, Medium, Large, XL  
  - Available Colors: Black, Navy Blue, Burgundy

- Floral Summer Dress  
  - Price: $45  
  - Available Sizes: Small, Medium, Large  
  - Available Colors: Floral Print, Blue, Pink

- Professional Blazer  
  - Price: $80  
  - Available Sizes: Small, Medium, Large, XL  
  - Available Colors: Black, Gray, Navy

## Men's Clothing:
- Classic Suit Set  
  - Price: $200  
  - Available Sizes: Small, Medium, Large, XL  
  - Available Colors: Charcoal Gray, Navy Blue, Black

- Casual Denim Jeans  
  - Price: $35  
  - Available Sizes: 28, 30, 32, 34  
  - Available Colors: Blue Denim, Black

- Polo Shirt Collection  
  - Price: $25 each  
  - Available Sizes: Small, Medium, Large, XL  
  - Available Colors: White, Blue, Red, Green

## Accessories:
  - Stylish Sunglasses  
    - Price: $20  
    - Available Colors: Black, Brown, Tortoise Shell
  
  - Leather Handbag  
    - Price: $60  
    - Available Colors: Brown, Black, Red
  
  - Classic Wristwatch  
    - Price: $50  
    - Available Colors: Silver, Gold, Rose Gold

## Footwear:
    - High-Heel Ankle Boots  
      - Price: $70  
      - Available Sizes: 5-10  
      - Available Colors: Black, Tan, Burgundy
    
    - Comfortable Sneakers  
      - Price: $55  
      - Available Sizes: 6-12  
      - Available Colors: White, Black, Gray
    
    - Formal Leather Shoes  
      - Price: $90  
      - Available Sizes: 7-11  
      - Available Colors: Brown, Black

      ## Kids' Collection:
      - Cute Cartoon T-shirts  
        - Price: $15 each  
        - Available Sizes: 2T, 3T, 4T  
        - Available Colors: Blue, Pink, Yellow
      
      - Adorable Onesies  
        - Price: $25  
        - Available Sizes: Newborn, 3M, 6M, 12M  
        - Available Colors: Pastel Blue, Pink, Mint Green
      
      - Trendy Kids' Backpacks  
        - Price: $30  
        - Available Colors: Blue, Red, Purple
      
      ## Activewear:
      - Yoga Leggings  
        - Price: $30  
        - Available Sizes: Small, Medium, Large  
        - Available Colors: Black, Gray, Teal
      
      - Running Shoes  
        - Price: $40  
        - Available Sizes: 6-12  
        - Available Colors: White, Black, Neon Green
      
      - Quick-Dry Sports T-shirt  
        - Price: $20  
        - Available Sizes: Small, Medium, Large  
        - Available Colors: Red, Blue, Gray
`

const context = `
You are ShopBot, an AI assistant for my online fashion shop - Nhi Yen. 

Your role is to assist customers in browsing products, providing information, and guiding them through the checkout process. 

Be friendly and helpful in your interactions.

We offer a variety of products across categories such as Women's Clothing, Men's clothing, Accessories, Kids' Collection, Footwears and Activewear products. 

Feel free to ask customers about their preferences, recommend products, and inform them about any ongoing promotions.

The Current Product List is limited as below:

${product_list}

Make the shopping experience enjoyable and encourage customers to reach out if they have any questions or need assistance.

Return result with product details in JSON format.
`

async function main() {
    const openai = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY'],
    });
    
    // write prompt to openai through which i can get the response in correct json format with product details so that i can render frontend 

    const prompt = "I want blue Tshirt";

    const chat_completion = await openai.chat.completions.create({
      messages: [{role: 'system', content: context},{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });
    console.log(chat_completion.choices[0].message.content);
}

main().catch(console.error);